const requestbodyparser=require("../util/body-parser")

writetofile=require("../util/write-to-file")
module.exports=async (req,res)=>{
    let baseurl=req.url.substring(0,req.url.lastIndexOf("/")+1);
    let id=req.url.split("/")[3];

    const regexv4=new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    if(!regexv4.test(id)){
        res.writeHead(404,{"content-Type":"application/json"})
        res.end(JSON.stringify({title:"Invalid uuid", message:"uuid no valid"}));
    }else if(regexv4.test(id)&&baseurl==="/api/stocks/"){
        try{
            let body=await requestbodyparser(req);
            const index=req.stocks.findIndex((movie)=>{
                return movie.id===id;
                   });
                   if(index===-1){
                    res.writeHead(404,{"content-Type":"application/json"})
                    res.end(JSON.stringify({title:"movie found", message:"movie not found"}));
                   }else{
                   req.stocks[index]={id, ...body};
                 //  console.log(body);
                   writetofile(req.stocks);
                   res.writeHead(204,{"Content-type":"application/json"})
                   res.end(JSON.stringify(req.stocks[index]));
                   } 
        }catch(err){
            console.log(err)
            res.writeHead(404,{"content-Type":"application/json"})
            res.end(JSON.stringify({title:"Invalid body", message:"request body invalid"}));
            
                    }
    }else{
        res.writeHead(404,{"content-Type":"application/json"})
        res.end(JSON.stringify({title:"not found", message:"page not found"}));
    }
}