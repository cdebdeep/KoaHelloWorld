import React from 'react';
import UserList from './user-list.jsx'
import UserDetails from './user-details.jsx'

const App=()=>(
    <div>
        <h2>User Name.......</h2>
        <div>
            <UserList />
        </div>

    <hr/>
        <h2>User Details...</h2>
        <UserDetails />
    </div>
    );

export default App;