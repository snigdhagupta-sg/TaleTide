const path = require('path');
require ('dotenv').config({path: path.resolve(__dirname, '.env')});
const mongoose = require ('mongoose');
async function ConnectMongo(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}
module.exports = ConnectMongo;