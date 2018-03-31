'use strict'

var todoactions = require('../actions/todoactions');
var Todo = require('../models/todo');

describe("Get todos", function () {
    describe('#GET / todos', function () {
        it("Should get all todos", function (done) {
            todoactions.getAllTodos(200, false, done);
        });
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
        let expectedTodo = new Todo(null, "Tim todo");
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
            todoactions.verifyTodoBodyById(expectedTodo, actualTodo);
            done();
        });
    });
    describe("Create valid todo with  status 2", function () {
        let expectedTodo = new Todo(null, "Tim todo");
        console.log(expectedTodo);
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
            todoactions.verifyTodoBodyById(expectedTodo, actualTodo);
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
        let expectedTodo = new Todo(null, null, null);
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


describe("Search todo", function () {
    describe("Search existing todo by task", function () {
        it("Should return existing todo", function (done) {
            todoactions.searchTodoByTaskName("tim", 200, false, function () {
                done();
            });
        });
    });

    describe("Search not existing todo by task", function () {
        it("Should return 404", function (done) {
            todoactions.searchTodoByTaskName("kkfkgfkgfkgkgf", 404, true, function () {
                done();
            });
        });
    });
});

describe("Update todos", function () {
    describe("Update existing todo with task", function () {
        var expectedTodo = new Todo(100, "Update1");
        var actualTodo;

        it("Should update existing todo", function (done) {
            todoactions.updateTodo(expectedTodo, 200, false, function () {
                done();
            });
        });

        it("should get existing todo", function (done) {
            todoactions.getTodoById(expectedTodo.id, 200, false, function (response) {
                actualTodo = response;
                done();
            });
        });

        it("verify that todo was updated", function (done) {
            todoactions.verifyTodoBodyById(expectedTodo, actualTodo);
            done();
        });
    });

    describe("Update existing todo with task undefined", function () {
        var expectedTodo = new Todo(100, "undefined");
        var actualTodo;
        it("Should update existing todo", function (done) {
            todoactions.updateTodo(expectedTodo, 200, false, function () {
                done();
            });
        });

        it("should get existing todo", function (done) {
            todoactions.getTodoById(expectedTodo.id, 200, false, function (response) {
                actualTodo = response;
                done();
            });
        });

        it("verify that todo was updated", function (done) {
            todoactions.verifyTodoBodyById(expectedTodo, actualTodo);
            done();
        });
    });

    describe("Try to update existing todo with task type of undefined", function () {
        var todo = new Todo(100);
        var expectedTodo;
        var actualTodo;

        it("should get existing todo", function (done) {
            todoactions.getTodoById(100, 200, false, function (response) {
                expectedTodo = response;
                done();
            });
        });

        it("Should not update existing todo", function (done) {
            todoactions.updateTodo(todo, 400, true, function () {
                done();
            });
        });

        it("should get existing todo after update", function (done) {
            todoactions.getTodoById(100, 200, false, function (response) {
                actualTodo = response;
                done();
            });
        });

        it("verify that todo was not updated", function (done) {
            todoactions.verifyTodoBodyById(expectedTodo.data, actualTodo);
            done();
        });
    });

    describe("Try to update existing todo with task is empty", function () {
        var todo = new Todo(100, "");
        var expectedTodo;
        var actualTodo;

        it("should get existing todo", function (done) {
            todoactions.getTodoById(100, 200, false, function (response) {
                expectedTodo = response;
                done();
            });
        });

        it("should get existing todo after update", function (done) {
            todoactions.getTodoById(100, 200, false, function (response) {
                actualTodo = response;
                done();
            });
        });

        it("verify that todo was not updated", function (done) {
            todoactions.verifyTodoBodyById(expectedTodo.data, actualTodo);
            done();
        });
    });

    describe("Update existing todo with task is null", function () {
        var expectedTodo = new Todo(100, "null");
        var actualTodo;

        it("Should not update existing todo", function (done) {
            todoactions.updateTodo(expectedTodo, 200, false, function () {
                done();
            });
        });

        it("should get existing todo", function (done) {
            todoactions.getTodoById(expectedTodo.id, 200, false, function (response) {
                actualTodo = response;
                done();
            });
        });

        it("verify that todo was updated", function (done) {
            todoactions.verifyTodoBodyById(expectedTodo, actualTodo);
            done();
        });
    });

    describe("Try to update existing todo with task type of is null", function () {
        var todo = new Todo(100, "");
        var expectedTodo;
        var actualTodo;

        it("should get existing todo", function (done) {
            todoactions.getTodoById(100, 200, false, function (response) {
                expectedTodo = response;
                done();
            });
        });

        it("Should not update existing todo", function (done) {
            todoactions.updateTodo(todo, 400, true, function () {
                done();
            });
        });

        it("should get existing todo after update", function (done) {
            todoactions.getTodoById(100, 200, false, function (response) {
                actualTodo = response;
                done();
            });
        });

        it("verify that todo was not updated", function (done) {
            todoactions.verifyTodoBodyById(expectedTodo.data, actualTodo);
            done();
        });
    });

    describe("Try to update non existing todo with task", function () {
        var todo = new Todo("new one");
        it("Should show error that task id not exist in DB", function (done) {
            todoactions.updateTodo(todo, 400, true, function () {
                done();
            });
        });
    });
});
