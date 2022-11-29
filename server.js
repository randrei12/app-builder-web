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
        doc.data = { design: {}, blocks: {} };
        let resp = await db.collection('projects').insertOne(doc);
        resp.acknowledged ? res.status(201).send(resp.insertedId) : res.status(500).send('An error occured while creating the project');
    } catch {
        res.status(500).send('An error occured while creating the project');
    }
});

app.post('/getProjectDesign', async (req, res) => {
    try {
        let code = await db.collection('projects').findOne({ _id: ObjectId(req.body.id) });
        if (!code) throw new Error();
        res.status(200).send(code.data.design || '{}');
    } catch {
        res.status(500).send('An error occured while retrieving the project data');
    }
});

app.post('/getProjectCode', async (req, res) => {
    try {
        let code = await db.collection('projects').findOne({ _id: ObjectId(req.body.id) });
        if (!code) throw new Error();
        res.status(200).send(code.data.blocks || '{}');
    } catch {
        res.status(500).send('An error occured while retrieving the project data');
    }
});

app.listen(process.env.PORT, () => {
    console.log('Server started on port ' + process.env.PORT);
});

io.on('connection', socket => {
    console.log(`A new user has connected (${socket.id})`);
    socket.on('updateDesign', data => {
        try {
            data = Array.from(data) || false;
            console.log(data);
            if (data && _.isEqual(Object.keys(data), ['name', 'type', 'styles', 'text', 'id', 'childs'])) {
                console.log(data);
            } else console.log('herror')
        } catch (e) {
            console.log(e);
        }
    });

    socket.on('updateCode', () => {

    });

    socket.on('disconnect', () => {
        console.log(`A user has disconnected (${socket.id})`);
    });
});