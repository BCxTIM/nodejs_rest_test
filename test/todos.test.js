'use strict'

var todoactions = require('../actions/todoactions');
var Todo = require('../models/todo');


describe("Get todos", function () {
    describe('#GET / todos', function () {
        it("Should get all todos", function (done) {
            todoactions.getAllTodos(200, false);
            done();
        })
    });

    describe('#GET / todo by existing id', function () {
        it("Should get todo by id", function (done) {
            todoactions.getTodoById(1, 200, false, function () {
                done();
            });
        })
    });

    describe('#GET / todo by not existing id', function () {
        it("should not get todo by not existing id", function (done) {
            todoactions.getTodoById(666, 400, true, function () {
                done();
            });
        });
    });

    describe('#GET / todo by not incorrect id', function () {
        it("should not get todo by incorrect id", function (done) {
            todoactions.getTodoById("dsadsad", 400, true, function () {
                done();
            });
        });
    });
});


describe("Testing creation todo", function () {
    describe("Create valid todo without to set status", function () {
        let expectedTodo = new Todo("Tim todo");
        var result;
        var actualTodo;
        it("Should create a new todo with default status 1", function (done) {
            todoactions.createTodo(200, false, expectedTodo, function (response) {
                result = response;
                done();
            });
        });

        it("Should get new todo created", function (done) {
            todoactions.getTodoById(result.data.id, 200, false, function (todo) {
                actualTodo = todo;
                done();
            });
        });
        it("Should verify body from new todo created", function (done) {
            todoactions.verifyTodoBodyById(result.data.id, expectedTodo, actualTodo);
            done();
        });
    });
    describe("Create valid todo with  status 2", function () {
        let expectedTodo = new Todo("Tim todo", 2);
        var result;
        var actualTodo;
        it("Should create a new todo with status 2", function (done) {
            todoactions.createTodo(200, false, expectedTodo, function (response) {
                result = response;
                done();
            });
        });

        it("Should get new todo created", function (done) {
            todoactions.getTodoById(result.data.id, 200, false, function (todo) {
                actualTodo = todo;
                done();
            });
        });

        it("Should verify body from new todo created", function (done) {
            todoactions.verifyTodoBodyById(result.data.id, expectedTodo, actualTodo);
            done();
        });
    });

    describe("Try create todo without task", function () {
        let expectedTodo = new Todo();
        var result;
        it("Try to create todo without task", function (done) {
            todoactions.createTodo(400, true, expectedTodo, function (response) {
                result = response;
                done();
            });
        });

        it("Should verify that new todo is not created", function (done) {
            todoactions.getTodoById(result.data.id, 400, true, function () {
                done();
            });
        });
    });

    describe("Try create todo with null values", function () {
        let expectedTodo = new Todo(null, null);
        var result;
        it("Try to create todo without task", function (done) {
            todoactions.createTodo(400, true, expectedTodo, function (response) {
                result = response;
                done();
            });
        });

        it("Should verify that new todo is not created", function (done) {
            todoactions.getTodoById(result.data.id, 400, true, function () {
                done();
            });
        });
    });
});


