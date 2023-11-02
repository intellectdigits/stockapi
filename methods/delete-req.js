const writeToFile = require("../util/write-to-file");
const writeTouser = require("../util/write-to-users");
module.exports=(req,res)=>{
    let baseurl=req.url.substring(0,req.url.lastIndexOf("/")+1);
    let id=req.url.split("/")[3];

    const regexv4=new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    if(!regexv4.test(id)){
        res.writeHead(404,{"content-Type":"application/json"})
        res.end(JSON.stringify({title:"Invalid uuid", message:"uuid no valid"}));
    }else if(regexv4.test(id)&&baseurl==="/api/stocks/"){
        
   const index=req.stocks.findIndex((movie)=>{
return movie.id===id;
   });
   if(index===-1){
    res.writeHead(404,{"content-Type":"application/json"})
    res.end(JSON.stringify({title:"movie found", message:"movie not found"}));
   }else{
   req.stocks.splice(index,1);
   writeToFile(req.stocks);
   res.writeHead(204,{"Content-type":"application/json"})
   res.end(JSON.stringify(req.stocks));
   }
    }else if(regexv4.test(id)&&baseurl==="/users/user/"){
        
        const index=req.movies.findIndex((movie)=>{
     return movie.id===id;
        });
        if(index===-1){
         res.writeHead(404,{"content-Type":"application/json"})
         res.end(JSON.stringify({title:"movie found", message:"movie not founds"}));
        }else{
        req.movies.splice(index,1);
        writeTouser(req.movies);
        res.writeHead(204,{"Content-type":"application/json"})
        res.end(JSON.stringify(req.movies));
        }
         }

}