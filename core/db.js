const { Database } = require('quickmongo');
const db = new Database('mongodb+srv://Test_Bot:8851020767@test.idqc2xz.mongodb.net/?retryWrites=true&w=majority');
db.connect().then(() => console.log('[ MONGO DB ] Connected to Mongo Database!'));

module.exports = db;