const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http');
const modelsCourses = require('./models/courses.js');
const getDataUsers = require('./models/users');
const getDataRestorants = require('./models/scraps');
const faker = require('faker');
const path = require('path');
const router = express.Router();

const fetch = require('node-fetch');

// fs.appendFile('mynewfile.txt', 'Hello content!', function (err) {
//     if (err) throw err;
//     console.log('Saved!');
// });

function readFile() {
    let datas;
    fs.readFile('mynewfile.txt','utf8', (err, data) => {
        if (err) throw err;
        return  JSON.parse(data)
    });

    return datas
}
function writeFile (data) {
    fs.writeFile('mynewfile.txt',data, (err) => {
        if (err) throw err;
        console.log('Saved!');
    });
    return data;

    let data = {};
    for(let i =0; i <10; i ++) {
        data[i]= {
            id: faker.random.number(),
            name: faker.name.firstName(),
            phone: faker.phone.phoneNumber()
        }
    }
    writeFile(JSON.stringify(data));
}

// buildStructure = (arr) => {
//     let structure = {}
//     for(let i = 0; i < arr.length; i++) {
//         const group = arr[i].group_id;
//         if(!structure[group]) {
//             structure[group] = [arr[i]]
//         } else {
//             structure[group] = [...structure[group],arr[i]]
//         }
//
//
//     }
//     return structure;
// };

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
//================== GET REQUESTS ========================================a

function scraps(datas) {
    getDataRestorants.comment(datas)
        .then(data => {
            if(data === 'DONE') {
                return data
            } else {
                scraps(data);
                return data
            }
    } )
    .catch(() =>{
        console.log({err: 'Комментарии не найдены'});
    })
};

function rebuildFile() {
    fs.readdir('./records/menu', function(err, list) {
        list.forEach(name => {
            const n = name.split('.')[0];
            // fs.mkdir(`./records/menu/${n[0]}`,{}, (err, er) => {
                fs.readFile(`./records/menu/${n}.json`,'utf8', (err, data) => {
                    if (err) throw err;

                    const datas = JSON.parse(data);
                    if(datas[0].payload ) {
                        fs.writeFileSync(`./records/menu/${n}/desc_${n}.json`, JSON.stringify(datas[0].payload.foundPlace),'utf8' ,
                            (err) =>{
                                if(err) console.log(err)
                            });

                        fs.writeFileSync(`./records/menu/${n}/menu_${n}.json`, JSON.stringify(datas[2].payload.categories),'utf8' ,
                            (err) =>{
                                if(err) console.log(err)
                            });
                    }
                });
            // });
        })
    })
}

app.get('/' , (req, res) => {
    // scraps(0)
    res.send('OK')
});

app.get('/api/restaurant?:limit' , (req, res) => {

    console.log(req.params , req.query);
    fs.readFile(`./records/restaurant/restaurant.json`,'utf8', (err, data) => {
        if (err) res.send(err);

        // const parts = slug.slice(lim, lim ? lim + 20 : 20)
        // console.log('=',lim, lim ? lim + 20 : 20)
        // return parts
        res.send(data)
    });
});

app.get('/api/feed' , (req, res) => {
    fs.readFile(`./records/restaurant/feeds.json`,'utf8', (err, data) => {
        if (err) res.send(err);
        res.send(data)
    });
});

app.get('/api/description/:name' , (req, res) => {
    fs.readFile(`./records/menu/${req.params.name}/desc_${req.params.name}.json`,'utf8', (err, data) => {
        if (err) res.send(err);
        res.send(data)
    });
});

app.get('/api/restaurantMenu/:menu' , (req, res) => {
    fs.readFile(`./records/menu/${req.params.menu}/menu_${req.params.menu}.json`,'utf8', (err, data) => {
        if (err) res.send(err);
        res.send(data)
    });
});


// Устарел
app.get('/api/:name' , (req, res) => {
    const exist = fs.existsSync(`./records/menu/${req.params.name}.json`);
    if(exist) {
        fs.readFile(`./records/menu/${req.params.name}.json`, 'utf8', (err,data)  => res.send(data));
        return;
    } else {

        const reg = /-|_/gmi;
        fs.readdir('./records/menu', function(err, list) {

            list.forEach(name => {
                const nameReq = req.params.name.toLowerCase().split(reg);
                const nameList = name.toLowerCase().split(reg);
                const find = nameReq.indexOf(nameList[0].toLowerCase());
                const find1 = nameList.indexOf(nameReq[0].toLowerCase());
                find !== -1 ?console.log('find', find): null;
                find1 !== -1 ?console.log('find1', find1) : null;
                if(find > -1) {
                    console.log(req.params.name, name)
                    fs.rename( `./records/menu/${name}`, `./records/menu/${req.params.name}.json`, function(err) {
                        if ( err ) console.log('ERROR: ' + err);
                        console.log("RENAME DONE -" + req.params.name);
                        fs.readFile(`./records/menu/${req.params.name}.json`, 'utf8', (err,data)  => {
                            res.send(data)
                        });
                    });
                }
            })
        });
        res.send('')
    }

});

app.get('/api/products' , (req, res) => {
    fs.readFile('mynewfile.txt','utf8', (err, data) => {
        if (err) throw err;
        res.send(JSON.parse(data) )
    });
});

app.get('/api/courses', (req, res) => {
    res.send('courses')
});

app.get('/api/courses' + '/:courseId', (req, res) => {
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
const port = process.env.PORT || 3002;
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