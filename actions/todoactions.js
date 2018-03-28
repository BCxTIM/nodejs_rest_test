var exports = module.exports = {};


var supertest = require('supertest');
const url = "http://localhost:5000";
var api = supertest(url);
var should = require('should');

/**
 *
 * @param message
 * @HTTP status - HTTP response code
 * @boolean
 */
exports.getAllTasks = function (message, status, error) {
    it(message, function (done) {
        api
            .get('/todos')
            .end(function (err, res) {
                res.statusCode.should.equal(status);
                res.body.error.should.equal(error);
                done();
            });
    });
};

/**
 *
 * @param message
 * @HTTP id - task ID
 * @param status - HTTP response code
 * @boolean error - boolean
 */

exports.getTaskById = function (message, id, status, error) {
    it(message, function (done) {
        api
            .get('/todo/' + id)
            .end(function (err, res) {
                res.statusCode.should.equal(status);
                res.body.error.should.equal(error);
                done();
            });
    });
};

/**
 *
 * @param message
 * @HTTP status - HTTP response code
 * @boolean error
 * @JSON todo
 */

exports.createTodo = function (message, status, error, todo) {
    it(message, function (done) {
        const resolving = new Promise(function (resolve) {
            api
                .post('/todo')
                .send(todo)
                .end(function (err, res) {
                    res.statusCode.should.equal(status);
                    res.body.error.should.equal(error);
                    if(error) {
                        res.body.data.should.equal("Task could not be empty");
                    } else {
                        res.body.data.task.should.equal(todo.task);
                    }
                    resolve(res.body);
                });
        });
        resolving.then(function (result) {
            console.log(result.data);
            api
                .get('/todo/' + result.data.id)
                .end(function (err, res) {
                    res.statusCode.should.equal(status);
                    res.body.error.should.equal(error);
                    if (error) {
                        res.body.data.should.equal("Task with id " + result.id + " not found");
                    } else {
                        res.body.data.task.should.equal(result.data.task);
                    }
                    done();
                })
        })
    });
};


