const mongoose = require('mongoose');

let conn = null;

//const uri = process.env.DB;
const uri = 'mongodb://127.0.0.1:27017/aws-database';



module.exports.dbConnection = async () => {
    if (conn == null) {
        console.log("Creating new connection");
        console.log("uri ", uri);
        conn = await mongoose.connect(`${uri}`, {
           serverSelectionTimeoutMS:5000
        });
        console.log("Connection created");
        return conn;
    }
    console.log("Reusing the established connection");
};
