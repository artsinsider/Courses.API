const Joi = require('joi');


// ========== EXAMPLE JOI ==========
const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{9,30}$/),
    access_token: [Joi.string(), Joi.number()],
    birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email({ minDomainAtoms: 2 })
}).with('username', 'birthyear').without('password', 'access_token');

const data ={ username: 'John', birthyear: 1994, password: 'f4df8rg9j', email: 'test@test.n'};

// You can also pass a callback which will be called synchronously with the validation result.
Joi.validate(data, schema);  // err === null -> valid
// ===============================



const ADD_COURSES = Joi.object().keys({
    id: Joi.number().min(2).max(18).required(),
    name: Joi.string().min(3).max(36).required()
});

function addCourses(model) {
    return Joi.validate(model, ADD_COURSES, (err, val) => {
        console.log("=====ERR=====", err, typeof model.id)
        return err === null ? val : err.details[0].message;
    });
}

const courses = {
    addCourses
};

module.exports = courses;