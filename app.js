const express = require("express");
const mysql=require("mysql");
const app =express();
const db=mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   database:'nod js-login'
});

db.connect((error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("MySql connected")
    }
});

