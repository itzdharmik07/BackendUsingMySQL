const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const pool = mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    user:'root',
    password:'password',
    database:'nodejs_back'
})

app.get('/liststudents',(req,res) => {

    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log('connected as id ${connection.threadID}')
       connection.query('SELECT * from student',(err,rows)=>{
        connection.release()
        if(!err){
           res.send(rows)
        }  else{
           console.log(err)
        } 
       })
    })
    
})

app.get('/student/:id',(req,res) => {

    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log('connected as id ${connection.threadID}')
       connection.query('SELECT * from student WHERE id = ?',[req.params.id],(err,rows)=>{
        connection.release()
        if(!err){
           res.send(rows)
        }  else{
           console.log(err)
        } 
       })
    })
    
})

app.post('/addstudent',(req,res) => {

    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log('connected as id ${connection.threadID}')
        const params = req.body;
       connection.query('INSERT INTO student SET ?',params,(err,rows)=>{
        connection.release()
        if(!err){
           res.send('Student has been added successfully.')
        }  else{
           console.log(err)
        } 
       })
    })
    
})
app.delete('/student/:id',(req,res) => {

    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log('connected as id ${connection.threadID}')
       connection.query('DELETE from student WHERE id = ?',[req.params.id],(err,rows)=>{
        connection.release()
        if(!err){
           res.send('Student has been removed successfully.')
        }  else{
           console.log(err)
        } 
       })
    })
    
})

app.put('/updatestudent',(req,res) => {

    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log('connected as id ${connection.threadID}')
        const {id,name,address,rollno} = req.body;
       connection.query('UPDATE student SET name = ?,address = ?,rollno =? WHERE id = ?',[name,address,rollno,id],(err,rows)=>{
        connection.release()
        if(!err){
           res.send('Student Information has been updated  successfully.')
        }  else{
           console.log(err)
        } 
       })
    })
    
})
app.listen(8080,()=>console.log("Listening on port 8080"));

