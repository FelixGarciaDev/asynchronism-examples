// promise estructure
const somethingWillHappen = () => {
    // create a promise
    return new Promise((resolve, reject) => {
        // resolve condition
        if (true){
            resolve('HEY everything goes well');
        } else {
            reject('whoops!!!!');
        }
    });
}

somethingWillHappen()
    .then(response => console.log(response))
    .catch(err => console.error(err));

const somethingWillHappen2 = () => {
    return new Promise((resolve, reject) => {
        if(true){            
            setTimeout(function(){
                resolve('True')
            }, 2000)
        } else {
            // is a good practice to define erros like this...
            const error = new Error ('Whooopsss!!');
            reject(error);
        }
    })
}

somethingWillHappen2()
    .then(response => console.log(response))
    .then(response => console.log("we can encadenate thens"))
    .catch(err => console.error(err));

// we can run multiple promises y get an array of responses    
Promise.all([somethingWillHappen(), somethingWillHappen2()])
.then(response => {
    console.log('Array of results', response);
})
.catch(err => {
    console.error(err);
});

// ------------------------------------------------------
// calling APIs with promises
// rick and morty characters https://rickandmortyapi.com/api/character/

let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';

const getData = (url_api) => {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();               
        xhttp.open('GET',url_api, true); // last parameter is for asyncronous execution
        xhttp.onreadystatechange = (() => {            
            if (xhttp.readyState === 4){
                // we can use a ternary operator
                (xhttp.status === 200)
                ? resolve(JSON.parse(xhttp.responseText))
                : reject(new Error('Error ', url_api))
            }            
        });
        xhttp.send()
    });
}

getData(API)
    .then(data => {
        console.log(data.info.count);
        return getData(`${API}${data.results[0].id}`)
    })
    .then(data => {
        console.log(data.name)
        return getData(data.origin.url)
    })
    .then(data => {
        console.log(data.dimension)
    })
    .catch(err => console.error(err));