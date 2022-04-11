const mysql=require("mysql");
const jwt =require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const async = require("hbs/lib/async");
const db=mysql.createConnection({ 
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});
exports.register=(req,res)=>{
console.log(req.body);
}
 
const{firstname,lastname,email,password,confirmpassword}=req.body;
db.query('SELECT email FROM users WHERE email=?',[email],async(error,results)=>{
  if(error) {
      console.log(error);
     } 


      if(results.length>0){
          return res.render('register',{
          message:'That email is already in use'
         });
         }
           else if(password!==confirmpassword){
            return res.render('register',{
           message:'Passwords do not match'
           });
     }
       let hashedPassword=await bcrypt.hash(password,8);
       console.log(hashedPassword);
      
         db.query('Insert into users set ?',{firstname:firstname,lastname:lastname,email:email,password:hashedPassword},(error,results)=>{
if(error){
    console.log(error);
}
else{
    console.log(results);
    return res.render('register',{
        message:'user registered'
        });
}
 
 });

});

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    if(!email || !password) {
      return res.status(400).render('login', {
        message: 'Please provide an email and password'
      });
    }
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      console.log(results);
      if(!results || !(await bcrypt.compare(password, results[0].password))){
        res.status(401).render('login', {
          message: 'Email or Password is incorrect'
        });
      }else{
        const id = results[0].id;
        res.status(200).redirect('/');
      }
    });
  } catch (error) {
    console.log(error);
  }
};



