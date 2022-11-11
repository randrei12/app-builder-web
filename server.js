const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('views/assets'));
app.use('/css', express.static('views/css'));
app.use('/js', express.static('views/dist'));
// app.use(express.static('views'));
// app.use(express.static('views'));
// app.use(express.static('views'));
// app.use(express.static('views'));

app.get('/projects', (req, res) => {
    res.render('projectsList');
});

app.get('/projects/:id', (req, res) => {
    res.redirect(`/projects/${req.params.id}/design`);
});

app.get('/projects/:id/:type', (req, res) => {
    if (!['design', 'blocks'].includes(req.params.type)) return res.redirect('/project/:id/design');
    res.render('project');
});

app.get('/', (req, res) => {
    res.redirect('/project')
});

app.listen(process.env.PORT, () => {
    console.log('Server started on port ' + process.env.PORT);
})