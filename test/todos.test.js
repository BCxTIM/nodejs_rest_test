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
            todoactions.getTaskById(1, 200, false, done);
        })
    });

    describe('#GET / todo by not existing id', function () {
        it("should not get task by not existing id", function (done) {
            todoactions.getTaskById(666, 400, true, done);
        });
    });

    describe('#GET / todo by not incorrect id', function () {
        it("should not get task by incorrect id", function (done) {
            todoactions.getTaskById("dsadsad", 400, true, done);
        });
    });
});


describe("Testing creation todo", function () {
    describe("Create valid todo", function () {
        let task = new Task("Tim todo");
        var response;
        it("Should create a new todo", function (done) {
            todoactions.createTodo(200, false, task, function (body) {
                response = body;
                done();
            });
        });

        it("Should verify new todo if is created", function (done) {
            todoactions.getTaskById(response.data.id, 200, false, done);
        });

    });

    describe("Done create todo without task", function () {
        let task = new Task("");
        var response;
        it("Try to create todo", function (done) {
            todoactions.createTodo(400, true, task, function (body) {
                response = body;
                done();
            });
        });

        it("Should verify that new todo is not created", function (done) {
            todoactions.getTaskById(response.data.id, 400, true, done);
        });
    });
});


