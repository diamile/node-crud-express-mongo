const express = require('express');
const mongoose = require('mongoose');
const rooter = require('./routes/routes');
const Handlebars = require('handlebars');
const exhbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access")
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('views',path.join(__dirname,"/views/"));

app.set('view engine','hbs');

app.engine(
'hbs',exhbs({extname:'hbs',defaultLayout:'mainLayout',layoutsDir:__dirname+'/views/layouts/',
handlebars:allowInsecurePrototypeAccess(Handlebars)})


);


app.use('/employee',rooter);

mongoose.connect("mongodb://localhost/crud",{useUnifiedTopology:true,useNewUrlParser:true},(err)=>{
    if(!err){
        console.log('database is created successfully');
    }
    else{
        console.log(err);
    }
});
app.listen(8081 , ()=>{console.log('server is running on port 8081')});