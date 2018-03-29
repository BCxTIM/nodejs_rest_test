var exports = module.exports = {};


var supertest = require('supertest');
const url = "http://localhost:5000";
var api = supertest(url);
var should = require('should');


/**
 * Get all tasks
 * @HTTP status
 * @boolean error
 */
exports.getAllTasks = function (status, error) {
    api
        .get('/todos')
        .end(function (err, res) {
            res.statusCode.should.equal(status);
            res.body.error.should.equal(error);
        });
};

/**
 *
 * @param id
 * @HTTP status
 * @boolean error
 */

exports.getTaskById = function (id, status, error) {
    api
        .get('/todo/' + id)
        .end(function (err, res) {
            res.statusCode.should.equal(status);
            res.body.error.should.equal(error);
            if (res.body.error) {
                res.body.data.should.equal("Task with id " + id + " not found");
            }
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
            res.statusCode.should.equal(status);
            res.body.error.should.equal(error);
            if (error) {
                res.body.data.should.equal("Task could not be empty");
            } else {
                res.body.data.task.should.equal(todo.task);
            }
            callback(res.body);
        });
};


