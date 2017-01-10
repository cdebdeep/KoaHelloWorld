/**
 * Created by debdeep.chaudhuri on 1/6/2017.
 */
export default function (state={},action) {
    switch(action.type){
        case "USER_SELECTED":
            return action.payload;
            break;
    }
    return state;
}
