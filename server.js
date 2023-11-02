const http= require('http');
const express = require("express") 
const path = require("path") 
const multer = require("multer") 
const app = express() 
let movies =require("./data/movies.json")

let stocks =require("./data/stocks.json")
let sales =require("./data/sales.json")
let customers =require("./data/customers.json")
const getreq=require("./methods/get-req")
const postreq=require("./methods/post-req")
const putreq=require("./methods/put-req")
const delreq=require("./methods/delete-req")
require('dotenv').config();
const PORT = process.env.PORT || 5001;
const server=app.use((req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","PUT,GET,DELETE,PATCH")
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Origin,Accept,Authorization')

    req.movies=movies;
    req.stocks=stocks;
    req.sales=sales;
    req.customers=customers;
    switch(req.method){
     
        case "GET":
            getreq(req,res);
            break;
            case "POST":
            postreq(req,res);
            break; 
            case "PUT":
            putreq(req,res);
            break; 
            case "DELETE":
                delreq(req,res);
                break;
                default:
                res.setHeader("content-Type","application/json");
                JSON.stringify({title:"hello node",message:"page not found"});
                res.end();    
    }
    

})
server.listen(PORT,()=>{
    console.log(`server started on ${PORT}`)
})