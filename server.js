const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('views/assets'));
app.use('/css', express.static('views/css'));
app.use('/js', express.static('views/js'));
// app.use(express.static('views'));
// app.use(express.static('views'));
// app.use(express.static('views'));
// app.use(express.static('views'));

app.get('/', (req, res) => {
    res.render('project');
});

app.listen(process.env.PORT, () => {
    console.log('Server started on port ' + process.env.PORT);
})