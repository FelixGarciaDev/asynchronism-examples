// A callback is a function that when creating it...
// we pass a second function as a parameter.

// define a function as always 
function sum(num1, num2){
    return num1 + num2;
}

// then we can define another function with a callback
// its a good practice to name the function parameter "callback"
function calc(num1, num2, callback){
    return callback(num1, num2);
}

// do the callback
console.log(calc(2, 2, sum));
console.log("--------------------------------------------")
// ouput: 4

// ------------------------------------------------------
// API callback...
// rick and morty characters https://rickandmortyapi.com/api/character/

// with the ancient xmlhttprequest...

let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character/';

function getData(url_api, callback){
    let xhttp = new XMLHttpRequest();
    // open connection
    xhttp.open('GET',url_api, true); // last parameter is for asyncronous execution
    xhttp.onreadystatechange = function (event){
        // validate state
        if (xhttp.readyState === 4){
            // validate status
            if(xhttp.status === 200){
                // exec callback
                callback(null, JSON.parse(xhttp.responseText));
            } else {
                const error = new Error('Error ' + url_api)
                return callback(error, null);
            }
        }
    }
    xhttp.send();
}

getData(API, function(error1, data1){
    if (error1){
        return console.error(error1);
    } else {
        getData(API + data1.results[0].id, function (error2, data2){
            if (error2){
                return console.error(error2);
            } else {
                getData(data2.origin.url, function (error3, data3){
                    if (error3){
                        return console.error(error3);
                    } else {
                        console.log(data1.info.count);
                        console.log(data2.name);
                        console.log(data3.dimension);
                    }
                });
            }
        });
    }
});

//for the beautyfyl fecth look on promisesExamples.js