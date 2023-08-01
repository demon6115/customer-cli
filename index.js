const mongoose = require('mongoose');

//Connect to DB

mongoose.connect('mongodb://127.0.0.1/customercli'); 
mongoose.Promise = global.Promise; 
var db = mongoose.connection; 
// db.on('connected', () => {
//     console.log('Mongoose default connection done'); 
// })
db.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err); 
})


//Import customer model, 
const Customer = require('./models/customer'); 

//add Customer
const addCustomer = (customer) => {
    Customer
        .create(customer)
        .then(customer => {
            console.info('New Customer added'); 
            db.close(); 
        }); 
}
//Find Customer
const findCustomer = (name) => {
    //make case insensitive; 
    const search = new RegExp(name, 'i'); 
    Customer
        .find({$or: [
            {firstName: search}, 
            {lastName: search}
        ]})
        .then(customer => {
            console.info(customer); 
            console.info(`${customer.length} matches`);
            db.close(); 
        }); 
}
//update Customer
const updateCustomer = (_id, customer) => {
    Customer
        .updateOne({_id}, customer)
        .then(customer => {
            console.info('Customer Updated'); 
            db.close(); 
        });
}

//remove Customer
const removeCustomer = (_id) => {
    Customer
        .deleteOne({_id})
        .then(customer => {
            console.info('Customer removed'); 
            db.close(); 
        });
}

//list Customers: 
const listCustomers = () => {
    Customer
        .find()
        .then(customers => {
            console.info(customers); 
            console.info(`${customers.length} customers`); 
            db.close(); 
        }); 
}


//export all methods: 

module.exports = {
    addCustomer, 
    findCustomer,
    updateCustomer, 
    removeCustomer, 
    listCustomers
}

















// *******Handling promises in JSON; 
// const fetchPromise = fetch(
//     "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/productZs.json"
// );

// fetchPromise
//     .then(res => {
//         if(!res.ok){
//             // throw new Error(`HTTP error: ${res.status}`);
//             throw new Error(res.status);
//         }
//         return res.json();
//     })
//     .then(data => console.log(data[0].name))
//     .catch(error => console.log(error));

// // fetchPromise.then((res) => {
// //     const jsonPromise = res.json();
// //     jsonPromise.then((data) => {
// //         console.log(data[0].name);

// //     })
// // });

// console.log("Started request...");

// console.log(fetchPromise);

// async function fetchProducts() {
//     try {
//         // after this line, our function will wait for the `fetch()` call to be settled
//         // the `fetch()` call will either return a Response or throw an error
//         const response = await fetch(
//             "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
//         );
//         if (!response.ok) {
//             throw new Error(`HTTP error: ${response.status}`);
//         }
//         console.log('checking...'); 
//         // after this line, our function will wait for the `response.json()` call to be settled
//         // the `response.json()` call will either return the parsed JSON object or throw an error
//         const data = await response.json();
//         console.log('checking 2...'); 
//         console.log(data[0].name);
//     } catch (error) {
//         console.error(`Could not get products: ${error}`);
//     }
// }
// fetchProducts();
