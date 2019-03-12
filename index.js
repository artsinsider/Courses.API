const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http');
const modelsCourses = require('./models/courses.js');
const getDataUsers = require('./models/users');
const faker = require('faker');
const router = express.Router();

// fs.appendFile('mynewfile.txt', 'Hello content!', function (err) {
//     if (err) throw err;
//     console.log('Saved!');
// });

function readFile() {
    fs.readFile('mynewfile.txt','utf8', (err, data) => {
        if (err) throw err;
    });
}
function writeFile (data) {
    fs.writeFile('mynewfile.txt',data, (err) => {
        if (err) throw err;
        console.log('Saved!');
    });
    return data;

    // let data = {};
    // for(let i =0; i <10; i ++) {
    //     data[i]= {
    //         id: faker.random.number(),
    //         name: faker.name.firstName(),
    //         phone: faker.phone.phoneNumber()
    //     }
    // }
    // writeFile(JSON.stringify(data));
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
//================== GET REQUESTS ========================================a


app.get('/' , (req, res) => {
    res.send('hello');
});

app.get('/api/courses', (req, res) => {
    console.log('/api/courses', req.body);
    res.send('courses')
});

app.get('/api/courses' + '/:courseId', (req, res) => {
    // http://localhost:3001/api/courses/1
    getDataUsers.comment(req.params.courseId)
        .then(data => res.send(data))
        .catch(() =>{
            res.status(404).send({err: 'Комментарии не найдены'});
        })
});

app.get('/post/:year/:month', (req, res) => {
    console.log(req.params , req.query);
   res.send(JSON.stringify({params:req.params , query: req.query}))
});

//PORT
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listen on port ${port}...`));

//================== GET REQUESTS ========================================


// ================= POST REQUESTS =======================================

const courses = [{id: 1 ,name: 'course 1'}, {id: 2 ,name: 'course 2'}, {id: 3 ,name: 'course 3'},];

app.post('/api/courses', (req, res) => {
    req.body.id = courses.length + 1 + '';

    const valReqData = modelsCourses.addCourses(req.body);
    if(valReqData) {
        // 400 BAD REQUEST
        res.status(400).send(valReqData);
        return;
    }
    writeFile(JSON.stringify(courses));

    courses.push(valReqData);
    res.send(modelsCourses.addCourses(req.body));
});