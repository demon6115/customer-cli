const mongoose = require('mongoose'); 

//customer schema; 
const customerSchema = mongoose.Schema({
    firstName: String, 
    lastName: String, 
    phone: String, 
    email: String
});

//define and export; 

module.exports = mongoose.model('customer', customerSchema); 