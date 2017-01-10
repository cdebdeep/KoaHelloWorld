import React from 'react';
import {connect} from 'react-redux';

class UserDetails extends React.Component {
    render(){
        return(
            <div>
                <h2>{this.props.user.first}  {this.props.user.last} </h2>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return{
        user:state.selectedUser
    };
}

export default  connect(mapStateToProps)(UserDetails)
