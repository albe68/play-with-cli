#!/usr/bin/env node

import chalk from 'chalk';
import inquirer  from 'inquirer';
import gradient  from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import {createSpinner} from 'nanospinner';

console.log(chalk.bgBlueBright('Welcome Guest Player !\n'))
let playerName;
const sleep =(ms=2000)=>new Promise((r)=>setTimeout(r,ms))


async function welcome(){
    const rainbowTitle=chalkAnimation.rainbow('Who want to Be a JavaScript Millionaire?\n')

    await sleep();
    rainbowTitle.stop();

    console.log(`${chalk.bgBlue('HOW TO PLAY\n')}
    ==>${chalk.bgGreenBright('Sign in with you name\n')}
    ==>${chalk.bgGreenBright('Answer the following question and If it is correct you will be Billionaire\n')}
    ==>${chalk.bgRed(' If you  wrong you will be OUT\n')}
    
    `);
    
}


//inquirer

async function askName(){
    const answers =await inquirer.prompt({
        name:'player_name',type:'input',message:'What is your name?',default(){return 'Player'}
    })
    playerName=answers.player_name;
}

//mcq using inquirer

async function question_1(){
    const answers =await inquirer.prompt({
        name:'question_1',
        type:'list',
        message:'Javascipt was created in 10days then released on \n',
        choices:[
            'May 23rd,1995',
            'Nov 24th,1995',
            'Dec 4th,1995',
            'Dec 17,1996'
        ]
    });
    return handleAnswer(answers.question_1=='Dec 4th,1995');
}

async function handleAnswer(isCorrect){
    const spinner=createSpinner('Checking answer....').start();
    await sleep();

    if(isCorrect){
        spinner.success({text:`Nice work ${playerName}.That's a legit Number`})
    }
    else{
spinner.error({text:`game over,you lose lol ${playerName} `});
process.exit(1); //RETRNS 1 MEANS ITS ERROR
    }
}

async function winner(){
    console.clear();
    const msg=`Congrats, ${playerName} !\n $ 1,000,000`;

    figlet (msg,(err,data)=>{
        console.log(gradient.pastel.multiline(data))
    })
}
await welcome()
await askName();
await question_1();
await winner();
