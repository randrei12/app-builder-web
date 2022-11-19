const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const bodyParser = require('body-parser');
const validator = require('validator');

(async () => await mongoose.connect(process.env.MONGO_URL + '/app-builder'))(); //connect to mongodb
const db = mongoose.connection;
const { ObjectId } = mongoose.Types; //getting ObjectId for searching by id

app.set('view engine', 'ejs');
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use('/assets', express.static('views/assets'));
app.use('/css', express.static('views/css'));
app.use('/js', express.static('views/dist'));
app.use('/ux', express.static('views/js'));

app.get('/projects', (req, res) => {
    db.collection('projects').find({}).toArray((err, projects) => {
        if (err) throw err;
        res.render('projectsList', { projects: projects.reverse() });
    });
});

app.get('/projects/:id', (req, res) => {
    res.redirect(`/projects/${req.params.id}/design`);
});

app.get('/projects/:id/:type', (req, res) => {
    if (!['design', 'blocks'].includes(req.params.type)) return res.redirect('/project/:id/design');
    res.render('project');
});

app.get('/', (req, res) => {
    res.redirect('/projects')
});

app.post('/newProject', async (req, res) => {
    try {
        let doc = {};
        let title = req.body.title.trim();
        let platforms = req.body.platforms;
        if (!title || ![1, 2, 3].includes(Object.keys(platforms).length)) throw new Error();
        doc.title = validator.escape(req.body.title);
        doc.platforms = platforms;
        let resp = await db.collection('projects').insertOne(doc);
        resp.acknowledged ? res.status(201).send(resp.insertedId) : res.status(500).send('An error occured while creating the project');
    } catch {
        res.status(500).send('An error occured while creating the project');
    }
});

app.post('/updateProjectCode/design', async (req, res) => {
    //code
});

app.post('/updateProjectCode/blocks', async (req, res) => {
    let { code, id } = req.body;
    try {
        let obj = JSON.parse(code);
        if (typeof obj.blocks.languageVersion !== 'number' || !Array.isArray(obj.blocks.blocks)) throw new Error();
    } catch {
        return res.status(500).send('Malformed request data');
    }
    
    try {
        let resp = await db.collection('projects').updateOne({ _id: ObjectId(id) }, { $set: { 'data.blocks': code }});
        if (!resp.acknowledged || resp.modifiedCount === 0) throw new Error();
    } catch {
        return res.status(500).send('An error occured while updating the project code');
    }
    
    res.status(200).send('ok');
});

app.post('/getProjectCode', async (req, res) => {
    try {
        let code = await db.collection('projects').findOne({ _id: ObjectId(req.body.id) });
        if (!code) throw new Error();
        res.status(200).send(code.data.blocks);
    } catch {
        res.status(500).send('An error occured while retrieving the project data');
    }
});

app.listen(process.env.PORT, () => {
    console.log('Server started on port ' + process.env.PORT);
});