'use strict'

var todoactions = require('../actions/todoactions');
var Task = require('../models/todo');


describe("Get todos", function () {
    describe('#GET / todos', function () {
        todoactions.getAllTasks("should get task by id", 200, false);
    });

    describe('#GET / todo by existing id', function () {
        todoactions.getTaskById("should get task by id", 1, 200, false);
    });

    describe('#GET / todo by not existing id', function () {
        todoactions.getTaskById("should get task by id", 666, 400, true);
    });

    describe('#GET / todo by not incorrect id', function () {
        todoactions.getTaskById("should get task by id", "dsadsad", 400, true);
    });

});


describe("Create todo and verify that was created", function () {
    describe("Create valid todo", function () {
            var task = new Task("Tim todo");
            todoactions.createTodo("Create new todo", 200, false, task);
        });

    describe("Do not create todo without task", function () {
        var task = new Task("");
        todoactions.createTodo("Create new todo", 400, true, task);
    });
});

