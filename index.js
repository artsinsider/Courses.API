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

function writeFile (data) {
    fs.writeFile('mynewfile.txt',data, (err) => {
        if (err) throw err;
        console.log('Saved!');
    })

    return data;
}

async function comment (id) {
    let users = await getDataUsers.getUsers(id);
    let posts = await getDataUsers.getPosts(users.id);
    let comment = await getDataUsers.getComments(posts[0].id);
    return comment
};

function readFile() {
    fs.readFile('mynewfile.txt','utf8', (err, data) => {
        if (err) throw err;
    });
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
//================== GET REQUESTS ========================================a

const arr = ["<li><a href=\\\"#\\\">The Dawn of Aeronautics</a></li>",
"<li><a href=\"#\">The Invention of the Balloon</a></li>",
"<li><a href=\"#\">The First Balloon Ascent in England</a></li>",
"<li><a href=\"#\">The Development of Balloon Philosophy</a></li>",
"<li><a href=\"#\">Some Famous Early Voyagers</a></li>",
"<li><a href=\"#\">Charles Green and the Nassau Balloon</a></li>",
"<li><a href=\"#\">John Wise - The American Aeronaut</a></li>",
"<li><a href=\"#\">The Balloon in the Service of Science</a></li>",
"<li><a href=\\\"#\\\">Some Noteworthy Ascents</a></li>",
"<li><a href=\\\"#\\\">The Highest Ascent on Record</a></li>"];

const htmlTqmlate = "<div><h4>Chapter listing</h4><ul> *li </ul> </div>;";
const hellow = "<div> <h1 style='text-align: center'>COURSES API NODE EXPRESS</h1>\n <button onclick=\"window.location.replace('/api/courses')\"> Get full course list</button></div>";
const rep = (index) => htmlTqmlate.replace(/\*li/gi, '' + arr[index]);
const course = '/api/courses';

app.get('/' , (req, res) => {
    res.send(hellow);

    // let data = {};
    // for(let i =0; i <10; i ++) {
    //     data[i]= {
    //         id: faker.random.number(),
    //         name: faker.name.firstName(),
    //         phone: faker.phone.phoneNumber()
    //     }
    // }
    //
    // writeFile(JSON.stringify(data));

});

app.get(course, (req, res, next) => {
    console.log('/api/courses', req.body);
    res.send(htmlTqmlate)
});

app.get(course + '/:courseId', (req, res) => {
    // http://localhost:3001/api/courses/1
    comment(req.params.courseId).then(data => res.send(data))
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