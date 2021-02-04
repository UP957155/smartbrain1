const express = require('express');
const postgres = require('postgres');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const sql = postgres('postgres://postgres:1997PEpa@localhost:5432/smartbrain');
class Query {
    constructor(){
       this.answer = async (req,res) => {
            res = await req
            return res;
        }
    }
}
const letter = new Query();
const app = express();
const saltRounds = 10;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('succes');
})
//Signin
app.post('/signin', (req, res) => {signin.handleSignin(req, res, bcrypt, letter, sql)});
//Register
app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, letter, sql, saltRounds)});
//Profile
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, letter, sql)});
//Increase score
app.put('/image', (req, res) => {
    let { id } = req.body;
    let found = false
    database.users.forEach((user) => {
       if (user.id === id){
           found = true
           user.number++
           return res.json(user.number);
       }
    })
    if (found === false){
        res.status(400).json('can not found')
    }
})

//Clarifai
app.post('/imageUrl', (req, res) => {image.handleApiCall(req,res)});


//Listen port
app.listen(process.env.PORT || 3000, ()=> {
    console.log('app is running on port ' + process.env.PORT)
})