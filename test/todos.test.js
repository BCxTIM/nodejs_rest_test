'use strict'

const todoactions = require('../actions/todoactions');
const Todo = require('../models/todo');

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

    let nonExitingIds = [-100,66666, "dsadadad"];
    nonExitingIds.forEach(function (id) {
        describe('#GET / todo by not existing id', function () {
            it("should not get todo by not existing id", function (done) {
                todoactions.getTodoById(id, 400, true, function () {
                    done();
                });
            });
        });
    });
});


describe("Testing creation todo", function () {
    describe("Create valid todo without to set status", function () {
        let expectedTodo = new Todo(null, "Tim todo");
        let result;
        let actualTodo;
        it("Should create a new todo with default status 1", function (done) {
            todoactions.createTodo(201, false, expectedTodo, function (response) {
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
        let expectedTodo = new Todo(null, "Tim todo", 2);
        let result;
        let actualTodo;
        it("Should create a new todo with status 2", function (done) {
            todoactions.createTodo(201, false, expectedTodo, function (response) {
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
        let result;
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
        let result;
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
    var tasksNames = ['Update1', 'undefined', 'null'];
    tasksNames.forEach(function (taskName) {
        describe("Update existing todo with task name '" + taskName + "'", function () {
            let expectedTodo = new Todo(100, taskName);
            let actualTodo;

            it("Should update existing todo", function (done) {
                todoactions.updateTodo(expectedTodo, 201, false, function () {
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
    });

    describe("Try to update existing todo with task name type of undefined", function () {
        let todo = new Todo(100);
        let expectedTodo;
        let actualTodo;

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

    describe("Try to update existing todo with task name  empty", function () {
        let todo = new Todo(100, "");
        let expectedTodo;
        let actualTodo;

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


    describe("Try to update existing todo with task name type of is null", function () {
        let todo = new Todo(100, null);
        let expectedTodo;
        let actualTodo;

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

    describe("Try to update non existing todo with task name 'new one'", function () {
        let todo = new Todo("new one");
        it("Should show error that task id not exist in DB", function (done) {
            todoactions.updateTodo(todo, 400, true, function () {
                done();
            });
        });
    });

    describe("Update the status", function () {
        let expectedTodo = new Todo(100, "Update status", 80);
        let actualTodo;

        it("Should not update existing todo", function (done) {
            todoactions.updateTodo(expectedTodo, 201, false, function () {
                done();
            });
        });

        it("should get existing todo", function (done) {
            todoactions.getTodoById(expectedTodo.id, 200, false, function (response) {
                actualTodo = response;
                done();
            });
        });

        it("verify that todo status was updated", function (done) {
            todoactions.verifyTodoBodyById(expectedTodo, actualTodo);
            done();
        });
    })
});


describe("Delete todo", function () {
    let createdTodo;
    describe("pre-conditions", function () {
        let todo = new Todo(null, "Delete todo");
        it("Create todo", function (done) {
            todoactions.createTodo(201, false, todo, function (response) {
                createdTodo = response;
                done();
            });
        });
        it("verify that todo for deleting created", function (done) {
            todoactions.getTodoById(createdTodo.data.id, 200, false, function () {
                done();
            });
        });
    });

    describe("Deleting existing todo", function () {
        it("Should delete existing todo", function (done) {
            todoactions.deleteTodo(createdTodo.data.id, 200, false, function () {
                done();
            });
        });
        it("verify that todo was deleted successfully", function (done) {
            todoactions.getTodoById(createdTodo.data.id, 400, true, function () {
                done();
            });
        });
    });

    describe("Try to delete non existing todo", function () {
        it("Can not delete existing todo", function (done) {
            todoactions.deleteTodo(createdTodo.data.id, 404, true, function () {
                done();
            });
        });
    });
});
