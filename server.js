(function () {
    var koa = require('koa');
    var router = require('koa-router');
    var bodyParser= require('koa-body');
    var logger = require('koa-logger')
    var mongoose = require('mongoose');

    var app =koa();




    //Koa logger
    //app.use(logger())

    //Set up body parsing middleware
    app.use(bodyParser({
        formidable:{uploadDir: './uploads'},
        multipart: true,
        urlencoded: true
    }));

    var todos = require('./todo.js');

    app.use(todos.routes());

    app.listen(3000,function () {
        console.log('Server is running at http://localhost:3000')
    })

})();