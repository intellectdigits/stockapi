const fs=require("fs");
const path=require("path")
module.exports=(data)=>{
    console.log(data);

    fs.writeFileSync(path.join(__dirname,"..","data","customers.json"),JSON.stringify(data),"utf-8")
}