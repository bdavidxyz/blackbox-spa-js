var express = require('express');
var _ = require('underscore');

var app = express();

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.static(__dirname));
});

var todos = [];
for (var i = 0; i < 3; i++) {
    todos.push({
        id: i,
        title: 'item' + i,
        completed: (i % 2 === 0)
    });
}
console.log('Initial todos');
console.log(todos);

app.get('/todos', getTodos);
app.post('/todos', createTodo);
app.put('/todos/:id', updateTodo);
app.delete('/todos/:id', deleteTodo);

function getTodos(req, res, next) {
    console.log(req.method + ' ' + req.url + ' - getTodos');
    res.json(todos);
}

function createTodo(req, res, next) {
    console.log(req.method + ' ' + req.url + ' - createTodo');
    var createdTodo = req.body;
    console.log('Payload: ' + JSON.stringify(req.body));
    var todo = {
        id: parseInt(req.body.id, 10),
        title: req.body.title,
        completed: req.body.completed === "true"
    };
    todos.push(todo);
    res.json(todo);
}

function updateTodo(req, res, next) {
    console.log("got it, update");
    console.log(req.method + ' ' + req.url + ' - updateTodo');
    console.log('Payload: ' + req.body);
    var todo = findTodoById(parseInt(req.params.id, 10));
    //todo.title = req.body.title;
    //todo.completed = req.body.completed === "true";
    var updatedTodo = {
        id: parseInt(req.params.id, 10),
        title: req.body.title,
        completed: req.body.completed
    };
    todo.title = updatedTodo.title;
    todo.completed = updatedTodo.completed;
    res.json(todo);
}

function deleteTodo(req, res, next) {
    console.log(req.method + ' ' + req.url + ' - deleteTodo');
    var id = parseInt(req.params.id, 10);
    todos = _.reject(todos, function(todo) {
        return todo.id === id;
    });
    res.send('');
}

function findTodoById(id) {
    return _.findWhere(todos, { id: id });
}

console.log('Express started on port 3000');
app.listen(3000);
