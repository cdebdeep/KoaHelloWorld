import React from 'react';

class TodoCollection extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            todoCollection:[
            {name: 'Need to learn React.js', id: 1},
            {name: 'Need to learn Angular.js 2', id: 2},
            {name: 'Need to learn Asp.Net Core', id: 3}
        ],
            newTodoName:'Put name here...',
            newTodoId:'Put id here...'
        }

        this.updateStateName=this.updateStateName.bind(this);

    }
    updateStateName(e){
        this.setState({newTodoName: e.target.value});
    }

    render() {
        return (
            <div>
                TODO COLLECTION
                <div>
                    {this.state.todoCollection.map((todo,i)=><Todo key={i} Todo={todo} />)}
                </div>
                New Todo
                <div>
                    {<TodoNew updateStatePropName={this.state.updateStateName} Name={this.state.newTodoName}/>}
                </div>
            </div>

        );
    }
}



class Todo extends React.Component {
    render() {
        var styleId={
            color:'#293',
            float:'left'
        }
        var styleName={
            color:'#829'
        }
        var styleContainer={
            color:'#829',
            float:'center'
        }

        return (
            <div style={styleContainer}>
                <div style={styleId}>{this.props.Todo.id}</div>
                <div style={styleName}>{this.props.Todo.name}</div>
            </div>
        );
    }
}

class TodoNew extends React.Component{
    render(){
        return(
            <div>
                <h3>Please insert new TODO here :</h3>
                <div>
                    <input type="text" onChange={this.props.updateStatePropName} value={this.props.Name}/>
                </div>
                <div>
                    <input type="text" onChange={this.props.updateStatePropId} value={this.props.Id}/>
                </div>

            </div>
                    );
    }
}

export default TodoCollection;
