/**
 * Created by debdeep.chaudhuri on 1/6/2017.
 */

export const selectUser=(user)=>{
    console.log(user);
    return{
        type:"USER_SELECTED",
        payload:user
    }
};

