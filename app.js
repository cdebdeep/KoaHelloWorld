
(function () {
    var koa = require('koa');
    var app = koa();

    var router = require('koa-router');
    helloRoute=router();
    todoRoute=router();
    testRoute = router();
    testRoute = router();


    testRoute.get('/Test/:id/:name',function* () {
        console.log(this.request);
        this.body='Koa Route is working fine' +' ID : ' + this.params.id + ' Name :' + this.params.name;
        console.log(this.request)
    });
    testRoute.get('/notFound',function* () {
        this.status =404;
        this.body='Sorry requested resource not found';
        console.log('nnn')

    });

    helloRoute.get('/Hello',function*() {
        this.body='Hello from Koa... as GET Request';
    });
    helloRoute.post('/Hello',function*() {
        this.body='Hello from Koa... as POST Request';
    });

    todoRoute.get('/Todo',function*() {
        this.body='Todo from Koa... as GET Request';
    });
    todoRoute.post('/Todo',function*() {
        this.body='Todo from Koa... as POST Request';
    });




    app.use(testRoute.routes());
    app.use(helloRoute.routes());
    app.use(todoRoute.routes());
    app.use(function* (next) {
        if(this.status !=400) return;
        this.redirect('/notFound')
    })

    app.use(function* (next) {
        this.body='Hello World';
        yield next;
        this.body=this.body + ' ,This is awesome';
    });

    app.use(function* (next) {
        console.log('1');
        yield next;
        console.log("2");
    })

    app.use(function* (next) {
        console.log("3");
        yield next;
        console.log("4");

    })

    app.use(function* () {
        this.body= this.body +' from KOA';
    });


    app.listen(3000,function () {
        console.log('Server is running at http://localhost:3000')
    })

})();


