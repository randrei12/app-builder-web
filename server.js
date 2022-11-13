const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

(async () => await mongoose.connect(process.env.MONGO_URL + '/app-builder'))(); //connect to mongodb
const db = mongoose.connection;

app.set('view engine', 'ejs');
app.use('/assets', express.static('views/assets'));
app.use('/css', express.static('views/css'));
app.use('/js', express.static('views/dist'));
app.use('/ux', express.static('views/js'));

app.get('/projects', (req, res) => {
    db.collection('projects').find({}).toArray((err, projects) => {
        if (err) throw err;
        res.render('projectsList', { projects });
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

app.listen(process.env.PORT, () => {
    console.log('Server started on port ' + process.env.PORT);
});