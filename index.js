const express = require('express');
const app = express();


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


const coursed = (index) => arr[index];
const rep = (id) => htmlTqmlate.replace(/\*li/gi, '' + coursed(id));

const course = '/api/courses';

app.get('/' , (req, res) => {
    res.send(hellow);
});

app.get(course, (req, res) => {
    res.send(htmlTqmlate)
});

app.get(course + '/:courseId', (req, res) => {
    console.log(req.params)
   res.send(rep(req.params.courseId))
});

//PORT
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listen on port ${port}...`));