'use strict'

var todoactions = require('../actions/todoactions');
var Task = require('../models/todo');


describe("Get todos", function () {
    describe('#GET / todos', function () {
        it("Should get all todos", function (done) {
            todoactions.getAllTasks(200, false);
            done();
        })
    });

    describe('#GET / todo by existing id', function () {
        it("Should get todo by id", function (done) {
            todoactions.getTaskById(1, 200, false);
            done();
        })
    });

    describe('#GET / todo by not existing id', function () {
        it("should not get task by not existing id", function (done) {
            todoactions.getTaskById(666, 400, true);
            done();
        });
    });

    describe('#GET / todo by not incorrect id', function () {
        it("should not get task by incorrect id", function (done) {
            todoactions.getTaskById("dsadsad", 400, true);
            done();
        });
    });
});


describe("Testing creation todo", function () {
    describe("Create valid todo", function () {
        let task = new Task("Tim todo");
        it("Should create a new todo and verify if is created", function (done) {
            let promise = new Promise(function (resolve) {
                todoactions.createTodo(200, false, task, function (response) {
                    resolve(response);
                });
            });
            promise.then(function (result) {
                todoactions.getTaskById(result.data.id, 200, false);
                done();
            })
        });

    });

    describe("Do not create todo without task", function () {
        let task = new Task("");
        it("Should not create a new todo and verify if is not created", function (done) {
            let promise = new Promise(function (resolve) {
                todoactions.createTodo(400, true, task, function (response) {
                    resolve(response);
                });
            });
            promise.then(function (result) {
                todoactions.getTaskById(result.data.id, 400, true);
                done();
            })
        });
    });
});

