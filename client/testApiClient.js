/**
 * Created by debdeep.chaudhuri on 1/6/2017.
 */

(()=>{
    var axios = require('axios')
    axios.get('http://localhost:3000/Todo')
        .then(function (response) {
           console.log(response.data)
        }).catch(function (err) {
        console.log(err)
    })
})();

function a(b) {
    function b(c) {
        console.log(c)
        return c
    }
    return b
}


var testFunction= a=>b=>c=>{
    console.log(a)
    return 'ssss'
}
testFunction('1');