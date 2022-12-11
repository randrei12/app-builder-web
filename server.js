const express = require('express');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const _ = require('lodash');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const bodyParser = require('body-parser');
const validator = require('validator');
(async () => await mongoose.connect(process.env.MONGO_URL + '/app-builder'))(); //connect to mongodb
const db = mongoose.connection;
const { ObjectId } = mongoose.Types; //getting ObjectId for searching by id

const io = new Server(2219, {
    cors: {
        origin: ['http://localhost', `http://localhost:${process.env.PORT}`],
    }
});

app.set('view engine', 'ejs');
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use('/assets', express.static('views/assets'));
app.use('/css', express.static('views/css'));
app.use('/js', express.static('views/dist'));
app.use('/ux', express.static('views/js'));

app.get('/projects', (req, res) => {
    db.collection('projects').find({}).toArray((err, projects) => {
        if (err) return console.log(err);
        res.render('projectsList', { projects: projects.reverse() });
    });
});

//if it's a post request we want to return same thing but as a json instead of html
app.post('/projects', (req, res) => {
    db.collection('projects').find({}).toArray((err, projects) => {
        if (err) return console.log(err);
        res.end(JSON.stringify(projects.reverse()));
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
        doc.data = { design: '{}', blocks: '{}' };
        let resp = await db.collection('projects').insertOne(doc);
        resp.acknowledged ? res.status(201).send(resp.insertedId) : res.status(500).send('An error occured while creating the project');
    } catch {
        res.status(500).send('An error occured while creating the project');
    }
});

app.post('/fetchProject', async (req, res) => {
    try {
        let resp = await db.collection('projects').findOne({ _id: ObjectId(req.body.id) });
        if (!resp) throw new Error();
        res.status(200).send(resp || '{}');
    } catch {
        res.status(500).send('An error occured while retrieving the project data');
    }
});

app.listen(process.env.PORT, () => {
    console.log('Server started on port ' + process.env.PORT);
});

io.on('connection', socket => {
    socket.on('updateDesign', async data => {
        try {
            let id = data.id;
            let target = data.target;
            if (!target || !id) throw new Error();
            if (typeof id !== 'string' || typeof target !== 'object') throw new Error();
            let resp = await db.collection('projects').updateOne({ _id: ObjectId(id) }, { $set: { 'data.design': JSON.stringify(target) } });
            if (!resp.acknowledged || resp.matchedCount === 0) throw new Error();
        } catch (e) {
            console.log('\x1b[31mAn error occured while updating design\n', e);
        };
    });

    socket.on('updateCode', async data => {
        try {
            if (typeof data.id !== 'string') throw new Error();
            JSON.parse(data.code);
            let resp = await db.collection('projects').updateOne({ _id: ObjectId(data.id) }, { $set: { 'data.blocks': data.code } });
            if (!resp.acknowledged || resp.matchedCount === 0) throw new Error();
        } catch (e) {
            console.log('\x1b[31mAn error occured while updating code\n', e);
        };
    });
});