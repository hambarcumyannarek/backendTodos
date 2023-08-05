import path from 'path';
import fs from 'fs';
import express from 'express';

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/', (request, response) => {
    response.redirect('/js-DOM-search.html')
})


app.get('/data', (request, response) => {
    fs.promises.readFile(path.resolve('data.json'), 'utf8').then(result => {
        response.send(result);
    })
})

app.post('/data', (request, response) => {
    fs.promises.writeFile(path.resolve('data.json'), JSON.stringify(request.body, undefined, 2)).then(() => {
        response.send('OK');
    })
    console.log(request.body)
})


app.listen(3001);