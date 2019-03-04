#!/usr/bin/env node
"use strict"

let inquirer = require('inquirer');
let chalk = require('chalk');
let prompt = inquirer.createPromptModule();

let response = chalk.bold.red;
let resume = require('./resume.json');

let resumePrompts = {
    type : 'list',
    name : 'resumeOptions',
    message : 'Wanna know about me?',
    choices : [...Object.keys(resume),'Exit']
}

let main = () =>{
    console.log('Hello, This is Duffer')
    resumeHandler();
}

function resumeHandler(){
    prompt(resumePrompts).then(answer => {
        if(answer.resumeOptions == 'Exit'){
            return
        }

        let options = answer.resumeOptions;

        console.log(response('--------------------------------------'));
        resume[`${options}`].forEach(info =>{
            console.log(response(info))
        })
        console.log(response("--------------------------------------"));
        prompt({
            type : 'list',
            name : 'exitBack',
            message : 'Go Back or Exit?',
            choices : ['Go Back', 'Exit']
        }).then(answer=>{
            if(answer.exitBack == 'Go Back'){
            resumeHandler();
            }
            else{
            return;
            }
        });
    });
}

main();