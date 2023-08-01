#!/usr/bin/env node
const program = require('commander'); 
const { prompt } = require('inquirer'); 

const {
    addCustomer, 
    findCustomer, 
    updateCustomer, 
    removeCustomer, 
    listCustomers
} = require('./index'); 

//Customer Question
const questions = [
    {
        type: 'input', 
        name: 'firstName', 
        message: 'Customer First name'
    },
    {
        type: 'input', 
        name: 'lastName', 
        message: 'Customer Last name'
    },
    {
        type: 'input', 
        name: 'phone', 
        message: 'Customer Phone no.'
    },
    {
        type: 'input', 
        name: 'email', 
        message: 'Customer Email address'

    }
];

program
    .version('1.0.0')
    .description('Client Management System'); 


//ADD COMMAND
    //  without using inquirer. 

// program
//     .command('add <firstName> <lastName> <phone> <email>')
//     .alias('a')
//     .description('Add a customer')
//     .action((firstName, lastName, phone, email) => {
//         addCustomer({firstName, lastName, phone, email}); 
//     });

    //by using inquirer. 
program
    .command('add')
    .alias('a')
    .description('Add a customer')
    .action(() => {
        prompt(questions).then(answers => addCustomer(answers)); 
    });

//FIND CUSTOMER
program 
    .command('find <name>')
    .alias('f')
    .description('Find a customer')
    .action(name => findCustomer(name)); 

//UPDATE CUSTOMER
program
    .command('update <_id>')
    .alias('u')
    .description('Update a customer')
    .action(_id => {
        prompt(questions).then(answers => updateCustomer(_id, answers)); 
    });

//REMOVE CUSTOMER
program
    .command('remove <_id>')
    .alias('r')
    .description('Remove a customer')
    .action(_id => removeCustomer(_id));
    
//LIST CUSTOMER
program
    .command('list')
    .alias('l')
    .description('List all customer')
    .action(() => listCustomers());

program.parse(process.argv); 
