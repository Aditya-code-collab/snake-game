const bodyparser=require('body-parser');
const express=require("express");
const app=express();
app.use(express.static("public"));//this is iportant to host the static files as well
app.get("/",function(req,res){
   
    res.sendFile(__dirname+"/index.html");
})






app.listen("3000",function (){
    console.log("server started on port 3000");
    
})