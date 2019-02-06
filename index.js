const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http');
const modelsCourses = require('./models/courses.js');

fs.appendFile('mynewfile.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
});

function writeFile (data) {
    fs.writeFile('mynewfile.txt',data, (err) => {
        if (err) throw err;
        console.log('Saved!');
    })
}

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
});

app.get(course, (req, res) => {
    res.send(htmlTqmlate)
});

app.get(course + '/:courseId', (req, res) => {
    if(!arr[req.params.courseId]) {
       return res.status(404).send('This course with the given ID')
    }
   res.send(rep(req.params.courseId))
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