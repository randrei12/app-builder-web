const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const { Server } = require('socket.io');
const _ = require('lodash');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const validator = require('validator');
require('dotenv').config();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL + '/app-builder'); //connect to mongodb
const db = mongoose.connection;
const { ObjectId } = mongoose.Types; //getting ObjectId for searching by id

const corsOptions = +process.env.VITE_PRODUCTION ? {} : { origin: 'http://localhost:3000' };
app.use(cors(corsOptions));

const io = new Server(2219, {
    cors: {
        origin: ['http://localhost', `http://localhost:${process.env.VITE_PORT}`, `http://localhost:${process.env.VITE_SERVER_PORT}`],
    }
});

// app.set('view engine', 'ejs');
app.use(bodyParser.text());
app.use(bodyParser.json());

// app.use('/assets', express.static('views/assets'));
// app.use('/css', express.static('views/css'));
// app.use('/js', express.static('views/dist'));
// app.use('/ux', express.static('views/js'));

app.post('/projects', (req, res) => {
    db.collection('projects').find({}).toArray((err, projects) => {
        if (err) return console.log(err);
        res.end(JSON.stringify(projects.reverse()));
    });
});

app.post('/xml', async (req, res) => {
    fs.readFile('toolbox.xml', (err, xml) => {
        if (err) {
            console.error(err);
            res.status(500).send();
        } else res.send(xml);
    })
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

app.post('/fetchProject', async (req, res) => {
    try {
        let code = await db.collection('projects').findOne({ _id: ObjectId(req.body.id) });
        if (!code) throw new Error();
        res.status(200).send(code || '{}');
    } catch {
        res.status(500).send('An error occured while retrieving the project data');
    }
});

app.listen(process.env.VITE_SERVER_PORT, () => {
    console.log('Server started on port ' + process.env.VITE_SERVER_PORT);
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