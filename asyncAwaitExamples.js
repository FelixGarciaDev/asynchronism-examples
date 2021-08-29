const doSomeTimeAsync = () => {
    return new Promise((resolve, reject) => {
        (true)
            ? setTimeout(() => resolve('Do something Async'), 3000)
            : reject(new Error ('Test Error'))
    })
}

const doSomeThing = async () => {
    const something = await doSomeTimeAsync();
    console.log(something);
}

const anotherFunction = async () => {
    try {
        const something = await doSomeThing();
    } catch (error) {
        console.error(error)
    }
}

console.log('before')
anotherFunction()
console.log('after')

//calling apis with async await
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

const asyncGetData = async (url_api) => {
    try {
        const data = await getData(url_api)
        const character = await getData(`${API}${data.results[0].id}`)
        const origin = await getData(character.origin.url)

        console.log(data.info.count)
        console.log(character.name)
        console.log(origin.dimension)
    } catch (error){
        console.error(error)
    }
}

console.log('Requesting...')
asyncGetData(API)
console.log('Done!')