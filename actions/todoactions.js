var exports = module.exports = {};
require('dotenv').load();



var supertest = require('supertest');
const url = process.env.HOST + process.env.PORT;
var api = supertest(url);
var should = require('should');



/**
 * Get all tasks
 * @HTTP status
 * @boolean error
 */
exports.getAllTodos = function (status, error, done) {
    api
        .get('/todos')
        .end(function (err, res) {
            if(err) throw err;
            res.statusCode.should.equal(status);
            res.body.error.should.equal(error);
            done();
        });
};

/**
 *
 * @param id
 * @HTTP status
 * @boolean error
 */

exports.getTodoById = function (id, status, error, callback) {
    api
        .get('/todo/' + id)
        .end(function (err, res) {
            if(err) throw  err;
            res.statusCode.should.equal(status);
            res.body.error.should.equal(error);
            if (res.body.error) {
                res.body.data.should.equal("Task with id " + id + " not found");
            }
            callback(res.body);
        });
};

/**
 *
 * @HTTP status
 * @boolean error
 * @JSON todo
 * @param callback
 */

exports.createTodo = function (status, error, todo, callback) {
    api
        .post('/todo')
        .send(todo)
        .end(function (err, res) {
            if(err) throw  err;
            res.statusCode.should.equal(status);
            res.body.error.should.equal(error);
            if (error) {
                res.body.data.should.equal("Task could not be empty");
            } else {
                res.body.data.task.should.equal(todo.task);
                if (isEmpty(todo.status)) {
                    res.body.data.status.should.equal(1);
                } else {
                    res.body.data.status.should.equal(todo.status);
                }
            }
            callback(res.body);
        });
};

/**
 * Verify body from todo
 * @param id
 * @param expectedTodo
 * @param actualTodo
 */

exports.verifyTodoBodyById = function (expectedTodo, actualTodo) {
    actualTodo.data.task.should.equal(expectedTodo.task);
    if (isEmpty(expectedTodo.status)) {
        actualTodo.data.status.should.equal(1);
    } else {
        actualTodo.data.status.should.equal(expectedTodo.status);
    }
};


exports.searchTodoByTaskName = function (keyword, status, error, callback) {
    api
        .get('/todo/search/' + keyword)
        .end(function (err, res) {
            if(err) throw err;
            res.statusCode.should.equal(status);
            res.body.error.should.equal(error);
            if(error) {
                res.body.data.should.equal("Todo with keyword " + keyword + " not found")
            }
            callback(res.body);
        });
};


exports.updateTodo = function (todo, status, error, callback) {
    api
        .put('/todo')
        .send(todo)
        .end(function (err, res) {
            if(err) throw err;
            res.statusCode.should.equal(status);
            res.body.error.should.equal(error);
            if(error) {
                if(isEmpty(todo.task)) {
                    res.body.data.should.equal("Task can not be empty")
                } else {
                    res.body.data.should.equal("not found task with id " + todo.id);
                }
            }
            callback(res.body);
        });
};

exports.deleteTodo = function (id, status, error, callback) {
    api
        .delete('/todo')
        .send({id: id})
        .end(function (err, res) {
            if(err) throw err;
            res.statusCode.should.equal(status);
            res.body.error.should.equal(error);
            if(error) {
                res.body.data.should.equal('not found task with id ' + id);
            } else {
                res.body.data.should.equal('Task with id ' + id + ' was deleted successfully');
            }
            callback(res.body);
        });
};

function isEmpty(value) {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}

