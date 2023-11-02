const requestbodyparser=require("../util/body-parser")
const crypto=require("crypto")
const writeToCustomers = require("../util/write-to-customers")
writetofile=require("../util/write-to-file")
writetosales=require("../util/write-to-sales")
writetousers=require("../util/write-to-users")
const express = require("express") 
const path = require("path") 
const multer = require("multer") 
const app = express() 


var fs = require('fs');
module.exports=async (req,res)=>{

    if(req.url==="/login"){
       
               try{
            let body =await requestbodyparser(req);
            console.log(body)
            for(var i=0;i<req.movies.length;i++){
               if(req.movies[i].username===body.username && req.movies[i].password===body.password ) {
              
                res.statusCode=200;
                res.write(JSON.stringify(req.movies[i])); 
                res.end(); 
              
               }
                

            }

res.end();
        }catch(err){
console.log(err)
res.writeHead(404,{"content-Type":"application/json"})
res.end(JSON.stringify({title:"Invalid body", message:"request body invalid"}));

        }
    }
    if(req.url==="/filtersales"){
       
        try{
     let body =await requestbodyparser(req);
     console.log(body)
     const filteredresult=[];
     for(var i=0;i<req.sales.length;i++){
        if(req.sales[i].username===body.username) {
            console.log(req.sales[i].username+""+body.username)    
       filteredresult.push(req.sales[i])
         res.statusCode=200;
        
       //  res.end(); 
       
        }
       

     }
     res.write(JSON.stringify(filteredresult));
     console.log(req.sales.length) 
      console.log(filteredresult)  
res.end();
 }catch(err){
console.log(err)
res.writeHead(404,{"content-Type":"application/json"})
res.end(JSON.stringify({title:"Invalid body", message:"request body invalid"}));

 }
}
if(req.url==="/filterBycustomer"){
       
    try{
 let body =await requestbodyparser(req);
 console.log(body)
 const filteredresult=[];
 for(var i=0;i<req.sales.length;i++){
    if(req.sales[i].client===body.client) {
        console.log(req.sales[i].username+""+body.username)    
   filteredresult.push(req.sales[i])
     res.statusCode=200;
    
   //  res.end(); 
   
    }
   

 }
 res.write(JSON.stringify(filteredresult));
 console.log(req.sales.length) 
  console.log(filteredresult)  
res.end();
}catch(err){
console.log(err)
res.writeHead(404,{"content-Type":"application/json"})
res.end(JSON.stringify({title:"Invalid body", message:"request body invalid"}));

}
}
if(req.url==="/filterByproduct"){
       
    try{
 let body =await requestbodyparser(req);
 console.log(body)
 const filteredresult=[];
 for(var i=0;i<req.sales.length;i++){
    if(req.sales[i].item===body.item) {
        console.log(req.sales[i].username+""+body.username)    
   filteredresult.push(req.sales[i])
     res.statusCode=200;
    
   //  res.end(); 
   
    }
   

 }
 res.write(JSON.stringify(filteredresult));
 console.log(req.sales.length) 
  console.log(filteredresult)  
res.end();
}catch(err){
console.log(err)
res.writeHead(404,{"content-Type":"application/json"})
res.end(JSON.stringify({title:"Invalid body", message:"request body invalid"}));

}
}

    if(req.url==="/api/stocks"){
        try{
            let body =await requestbodyparser(req);
body.id=crypto.randomUUID();
req.stocks.push(body)
writetofile(req.stocks)
res.writeHead(200,{"content-Type":"application/json"})
res.end();

        }catch(err){
console.log(err)
res.writeHead(404,{"content-Type":"application/json"})
res.end(JSON.stringify({title:"Invalid body", message:"request body invalid"}));

        }
    }
    if(req.url==="/addCustomer"){
       
      

        try{
            let body =await requestbodyparser(req);
body.id=crypto.randomUUID();
console.log("hghghgh")
req.customers.push(body)
writeToCustomers(req.customers)
res.writeHead(200,{"content-Type":"application/json"})
res.write(JSON.stringify(req.customers));

res.end();

        }catch(err){
console.log(err)
res.writeHead(404,{"content-Type":"application/json"})
res.end(JSON.stringify({title:"Invalid body", message:"request body invalid"}));

        }
    }
    if(req.url==="/api/pos"){
        try{
            let body =await requestbodyparser(req);
body.id=crypto.randomUUID();
req.sales.push(body)
writetosales(req.sales)
res.writeHead(200,{"content-Type":"application/json"})
res.end();

        }catch(err){
console.log(err)
res.writeHead(404,{"content-Type":"application/json"})
res.end(JSON.stringify({title:"Invalid body", message:"request body invalid"}));

        }
    }
    if(req.url==="/api/insertuser"){
        try{
            let body =await requestbodyparser(req);
body.id=crypto.randomUUID();
req.movies.push(body)
writetousers(req.movies)
res.writeHead(200,{"content-Type":"application/json"})
res.end();

        }catch(err){
console.log(err)
res.writeHead(404,{"content-Type":"application/json"})
res.end(JSON.stringify({title:"Invalid body", message:"request body invalid"}));

        }
    }
}