const express = require('express');
const bodyParser = require('body-parser');


let {mongoose} = require('./db/mongo');
let {User} = require('./models/user');
let {Todo} = require('./models/todo');


//express app
let app = express();

//setting body-parser
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });

});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, err => {
        res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log('Running on 3000...')
});

module.exports = {app};