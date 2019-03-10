#!/usr/bin/env node
"use strict"

let inquirer = require('inquirer');
let chalk = require('chalk');
let prompt = inquirer.createPromptModule();

let response = chalk.bold.red;
let byDefalut = require('./resume.json');
let byDefalutMsg = 'Wanna know about me?';

var object = {
    resumeHandler : function (resume = byDefalut, msg = byDefalutMsg ) {
        let resumePrompts = {
            type : 'list',
            name : 'resumeOptions',
            message : msg,
            choices : [...Object.keys(resume),'Exit']
        }
        prompt(resumePrompts).then(answer => {
            if(answer.resumeOptions == 'Exit'){
                return
            }
    
            let options = answer.resumeOptions;
    
            console.log(response('--------------------------------------'));
            if(Array.isArray(resume[`${options}`])){
                resume[`${options}`].forEach(info =>{
                    console.log(response(info))
                })
            }else{
                if(typeof(resume[`${options}`]) !== 'object')
                    console.log(resume[`${options}`])
            }
            console.log(response("--------------------------------------"));
            prompt({
                type : 'list',
                name : 'exitBack',
                message : 'Go Back or Exit?',
                choices : ['Go Back', 'Exit']
            }).then(answer=>{
                if(answer.exitBack == 'Go Back'){
                module.exports.resumeHandler(resume);
                }
                else{
                return;
                }
            });
        });
    }
}

module.exports = object;
