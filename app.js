//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const mysql = require("mysql");

const app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//MySql connection
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});

//Getting the Dashboard
app.get('/', function(req, res) {
    res.render("index");
});

//Getting the registration page
app.get('/register', function(req, res) {
    res.render("register");
});

//Getting the login page
app.get('/login', function(req, res) {
    res.render("login");
});

//Getting data from the user to register
app.post('/register', function(req, res) {

    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    console.log(username);
    console.log(email);
    console.log(password);

    //inserting data to database
    var sql = "insert into userstable VALUES (null,'" + username + "', '" + email + "','" + password + "')";

    con.query(sql, function(err) {
        if (err) throw err;
        res.render("login");
        console.log("record is inserted");

    });

});

//logging into get form
app.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (email && password) {
        con.query("select * from userstable where email=? and password=?", [email, password], function(err, rows, fields) {
            if (rows.length > 0) {
                res.render("details");
            } else {
                console.log('Incorrect username or password');
            }
        });
    }
});

//After successful login, user should get this page
app.get('/details', function(req, res) {
    res.render("details");
});

app.get('/index', function(req, res) {
    res.render("index");
});


app.get("/final", function(req, res) {
    res.render("final");
});

app.get("/userData", function(req, res) {
    con.query("select * from applicants", function(err, rows) {
        if (err) throw err;
        res.render("userData", { user: rows });
        console.log(rows);
    });
});

app.post('/details', function(req, res) {
    var name = req.body.app_name;
    var dob = req.body.dob;
    var age = req.body.age;
    var father = req.body.f_name;
    var mother = req.body.m_name;
    var contact = req.body.contact;
    var aadhar = req.body.aadhar;
    var guardian = req.body.g_name;
    var address = req.body.address;
    var accountHolder = req.body.acc_holder;
    var accountNumber = req.body.acc_num;
    var ifsc = req.body.ifsc;
    var bank = req.body.bank_name;
    var branch = req.body.branch;
    var city = req.body.city;



    var sql = "insert into applicants VALUES (null,'" + name + "', '" + dob + "','" + age + "','" + father + "','" + mother + "', '" + contact + "','" + aadhar + "','" + guardian + "','" + address + "','" + accountHolder + "', '" + accountNumber + "','" + ifsc + "','" + bank + "','" + branch + "', '" + city + "')";

    con.query(sql, function(err) {

        if (err) throw err;
        res.render("final");
        console.log("applicant's record is inserted");

    });
    // con.end();
});


//starting the server in this port number
app.listen(3000, function() {
    console.log("server started");
});