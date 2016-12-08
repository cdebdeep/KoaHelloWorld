(function () {
    var Router = require('koa-router');

    var router = Router({prefix:'/todo'});

    var mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost/todos');

    var todoSchema = mongoose.Schema({
        id:Number,
        name:String
    });

    var Todo= mongoose.model('Todo',todoSchema);

    var todos=[
        {id:1,name:'Call to Samsung Service Center'},
        {id:2,name:'Long Hair Consolidate'}
    ]

    router.get('/',getFromDB);

    router.get('/:id([0-9]{1,})',getByIdFromDB);

    router.post('/',postToDB);

    router.put('/',putToDB);

    router.delete('/:id',delFromDB)

    function *getFromDB(next) {
        var self =this;
        yield Todo.find(function (err,response) {
            todos=response;
            self.body=todos;
        });
    }
    function *getByIdFromDB(next) {
        var self = this;
        var filter={};
        filter.id=self.params.id;
        yield Todo.find(filter,function (err,res) {
            if(err){
                self.body={message:'Error getting  Todo', type:'Error'}
            }else{
                self.body=res;
            }
        })
    }
    function *postToDB(next) {
        var self = this;
        var todoInfo = self.request.body; //Get the parsed information

        if(!this.request.body.name || !this.request.body.id){
            this.response.status=400;
            this.body={message:'Bad Request'};
        }else{
            var newTodo= new Todo({
                name:todoInfo.name,
                id:todoInfo.id
            })

            yield newTodo.save(function (err,response) {
                if(err){
                    self.body={message:'Error creating new Todo', type:'Error'}
                }else{
                    self.body={message:'Success creating new Todo', type:'Success',todo:todoInfo}
                }
            })
        }
    }
    function *putToDB(next) {
        var self = this;
        var todoInfo = self.request.body; //Get the parsed information
        if(!todoInfo.name || !todoInfo.id){
            this.response.status=400;
            this.body={message:'Bad Request'};
        }else{
            var filter={};
            filter.id=todoInfo.id;

           yield Todo.findOneAndUpdate(filter,{$set: {todoInfo}},function (err,res) {
                if(err){
                    self.body={message:'Error updating Todo', type:'Error'}
                }else{
                    self.body={message:'Success updating Todo', type:'Success',todo:todoInfo}
                }
            })
        }
    }
    function *delFromDB(next) {
        var self = this;
        var id = self.params.id; //Get the parsed information
        if(!id){
            this.response.status=400;
            this.body={message:'Bad Request'};
        }else{
            var filter={};
            filter.id=id;
            yield Todo.findOneAndRemove(filter,function (err,res) {
                if(err){
                    self.body={message:'Error deleting Todo', type:'Error'}
                }else{
                    self.body={message:'Success deleting Todo', type:'Success',id:id}
                }
            })
        }
    }


    function *getByIdFromStaticCollection(next) {
        var ctx = this;
        var searchTodo = todos.filter(function (todo) {
            if (todo.id == ctx.params.id) {
                return true;
            }
        });
        if (searchTodo.length == 1) {
            this.body = searchTodo[0];
        } else {
            this.response.status = 404;
            this.body = {message: 'Todo not found !'}
        }
        yield next;
    }
    function *postToStaticCollection(next) {
        var self = this;

        if(!this.request.body.name || !this.request.body.id){
            this.response.status=400;
            this.body={message:'Bad Request'};
        }else{
            var newTodo= new Todo({
                name:todoInfo.name,
                id:todoInfo.id
            })
            var newId= todos[todos.length-1].id+1;
             todos.push({
             id:newId,
             name:this.request.body.name
             });
             this.body = {message: "New todo created.", location: "/todo/" + newId};
        }

        //yield next;
    }
    function *putToStaticCollection(next) {
        if(!this.request.body.name || !this.request.body.id){
            this.response.status=400;
            this.body={message:'Bad Request'};
        }else{
            var updateIndex = todos.map(function (todo) {
                return todo.id;
            }).indexOf(parseInt(this.params.id));
            if(updateIndex === -1){
                //todo not found then create one
                var newId= todos[todos.length-1].id+1;
                todos.push({
                    id:newId,
                    name:this.request.body.name
                });
                this.body = {message: "New todo created.", location: "/todo/" + newId};
            }else{
                //Update existing todo
                todos[updateIndex]={
                    id:this.params.id,
                    name:this.params.name
                };
                this.body = {message: "Todo id " + this.params.id + " updated.", location: "/todo/" + this.params.id};
            }
        }
        yield next;
    }
    function *delFromStaticCollection(next) {
        var removeIndex=todos.map(function (todo) {
            return todo.id;
        }).indexOf(parseInt(this.params.id));
        if(removeIndex === -1){
            this.body={message:"Not found"}
        }else{
            todos.splice(removeIndex,1);
            this.body = {message: "Todo id " + this.params.id + " removed."};
        }
    }

    module.exports=router;
})();
