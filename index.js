// create dependencies/requirements
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const writeFiles = util.promisify(fs.writeFile);

// inquirer prompts for each section in the README
const promptsText = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Project Name: ',
            name: 'projectTitle',
        },
        {
            type: 'input',
            message: 'Project Description: ',
            name: 'description',
        },
        {
            type: 'input',
            message: 'Intallation Instructions: ',
            name: 'installationInstruc',
        },
        
        {
            type: 'list',
            choices: ["APACHE 2.0", "MIT", "GNU v3"],
            message: 'Project License ',
            name: 'license',
        },
        {
            type: 'input',
            message: 'Repo Contribution Instructions for Users: ',
            name: 'userContributions',
        },
        {
            type: 'input',
            message: 'How to test the app: ',
            name: 'testCommand',
        },
        {
            type: 'input',
            message: "Project Developer Name: ",
            name: 'authorName',
        },
        {
            type: 'input',
            message: "GitHub Username: ",
            name: 'gitUser',
        },
        {
            type: 'input',
            message: 'Email Address: ',
            name: 'email',
        },
    ]);   
}

// variable for creation of readme string and template literal for creation of README structure and content
const readmeGen = ({
    projectTitle,
    description,
    installationInstruc,
    license,
    userContributions,
    testCommand,
    authorName,
    gitUser,
    email
}) => {
    
    let  badgeIcon = "";
    if (license === "APACHE 2.0") {
        badgeIcon = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
    };
    if (license === "MIT") {
        badgeIcon = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
    };
    if (license === "GNU v3") {
        badgeIcon = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
    };
    
    // insert link to more resources for license chosen
    let licenseText = "";
    if (license === "APACHE 2.0") {
        licenseText = "Apache 2.0: https://choosealicense.com/licenses/apache-2.0/"
    };
    if (license === "MIT") {
        licenseText = "MIT: https://choosealicense.com/licenses/mit/"
    };
    if (license === "GNU v3") {
        licenseText = "GNU v3: https://choosealicense.com/licenses/gpl-3.0/"
    };

// format the README with markdown
    return `
# ${projectTitle}
${badgeIcon}
# Table of Contents
* [Description ](#Description)
* [Installation](#Installation)
* [Usage](#Usage)
* [License](#License)
* [Contributing](#Contributing)
* [Tests](#Tests)
* [Questions](#Questions)

# WALK THROUGH VIDEO!

![Video](images/generate-my-readme.gif)

# Description 
### ${description}
# Installation
### ${installationInstruc}
# License
### ${licenseText}
# Contributing
### ${userContributions}
# Tests
### ${testCommand}
# Questions
### Project Created By: ${authorName}
### GitHub User Name:(https://www.github.com/${gitUser})
### Email: ${email}`
}


const init = () => {
    promptsText().then(response => {
        const readmeFile = readmeGen(response);
        writeFiles("README.md", readmeFile)
            .then(() => console.log("Success"))
            .catch(err => console.log(err));
    });
}

init()