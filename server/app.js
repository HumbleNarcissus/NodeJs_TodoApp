const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

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

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    //validation
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    //find and return todo
    Todo.findById(id).then((todo) => {
        //check query result
        if (!todo) {
            res.status(404).send();
        }

        res.send({todo});

    }).catch((err) => {
        res.status(400).send();
    });
});

app.listen(3000, () => {
    console.log('Running on 3000...')
});

module.exports = {app};