const mongoose =require('mongoose');

const {PORT, DB, HOST}= process.env.MongoDB;
mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`, {useNewUrlParser: true});
//mongoose.connect(`mongodb://localhost:27017/bootcamp`, {useNewUrlParser: true});
module.exports = mongoose;
//console.log(HOST)