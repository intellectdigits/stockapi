const requestbodyparser=require("../util/body-parser")
const crypto=require("crypto")
writetofile=require("../util/write-to-file")
module.exports=async (req,res)=>{

    if(req.url==="/login"){
       
               try{
            let body =await requestbodyparser(req);
            console.log(body)
            for(var i=0;i<req.movies.length-1;i++){
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

}