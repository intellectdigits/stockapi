module.exports=(req,res)=>{
    let baseurl=req.url.substring(0,req.url.lastIndexOf("/")+1);
    let id=req.url.split("/")[3];
    console.log(id)
    const regexv4=new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    console.log(baseurl)
    if(req.url==="/api/stocks"){
        res.statusCode=200;
        res.setHeader("content-Type","application/json");
       res.write(JSON.stringify(req.stocks)); 
        res.end(); 

    }else if(!regexv4.test(id)){
        res.writeHead(404,{"content-Type":"application/json"})
        res.end(JSON.stringify({title:"Invalid uuid", message:"uuid no valid"}));
    }else if(regexv4.test(id)&&baseurl==="/api/stocks/"){
        res.statusCode=200;
        res.setHeader("content-Type","application/json");
   let filteredstock=req.stocks.filter((stock)=>{
return stock.id===id;
   });
   if(filteredstock.length>0){
    res.statusCode=200;
     
       res.write(JSON.stringify(filteredstock)); 
        res.end(); 
   }else{
    res.writeHead(404,{"content-Type":"application/json"})
    res.end(JSON.stringify({title:"movie found", message:"movie not found"}));
   }
    }else{
        res.writeHead(404,{"content-Type":"application/json"})
        res.end(JSON.stringify({title:"not found", message:"page not found"}));
    }
}