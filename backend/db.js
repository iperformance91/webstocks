const mongoose = require('mongoose')
const MONGOURI = "mongodb://hemanthmodani2001:hemanth1234*H@ac-poh6lvy-shard-00-00.rpibmyg.mongodb.net:27017,ac-poh6lvy-shard-00-01.rpibmyg.mongodb.net:27017,ac-poh6lvy-shard-00-02.rpibmyg.mongodb.net:27017/lovefood?ssl=true&replicaSet=atlas-12p8hl-shard-0&authSource=admin&retryWrites=true&w=majority&appName=practicecluster"
const mongoDB = async () => {
    await mongoose.connect(MONGOURI).then(async ()=>{
        console.log("Connected");
        const fetched_data = await mongoose.connection.db.collection("foods");
        const data = await fetched_data.find({}).toArray()
        global.fooditems = data;
    }
    ).catch((err)=>{console.log(err)})
    console.log("Connected Successfully")
    
} 

module.exports = mongoDB ;

