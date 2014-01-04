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
        order: i,
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
    console.log('Payload: ' + JSON.stringify(req.body));
    var todo = {
        id: todos.length,
        title: req.body.title,
        order: req.body.order,
        completed: req.body.completed
    }
    todos.push(todo);
    res.json(todo);
}

function updateTodo(req, res, next) {
    console.log(req.method + ' ' + req.url + ' - updateTodo');
    console.log('Payload: ' + JSON.stringify(req.body));
    var todo = findTodoById(parseInt(req.params.id));
    todo.title = req.body.title;
    todo.completed = req.body.completed;
    todo.order = req.body.order;
    res.json(todo);
}

function deleteTodo(req, res, next) {
    console.log(req.method + ' ' + req.url + ' - deleteTodo');
    var id = parseInt(req.params.id);
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
