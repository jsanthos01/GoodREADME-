const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

getInfo();

async function getInfo() {
    //Asking questions to the user and store all the values inside userData
    const userData = await inquirer.prompt([
        {
            type:"input",
            message: "What is your Github username?",
            name:"username"
        },
        {
            type:"input",
            message: "What would you like your Project Title to be?",
            name:"title"
        },
        {
            type:"input",
            message: "What is the description you want to add about the project?",
            name:"description"
        },
        {
            type:"input",
            message: "What are the steps required to install your project? This could be a install command.",
            name:"install"
        },
        {
            type:"input",
            message: "Provide instructions or command for use.",
            name:"usage"
        },
        {
            type:"input",
            message: "State your License Name.",
            name:"licenseName"
        },
        {
            type:"input",
            message: "State your License URL.",
            name:"licenseURL"
        },
        {
            type:"input",
            message: "Provide examples on how to run a test for your application. This could be a test command.",
            name:"test"
        },
        {
            type:"input",
            message: "Please state the names of all the contributors you would like to add. Seperate them with commas.",
            name:"contributors"
        },
        {
            type:"input",
            message: "Provide the github usernames of the contributors as well",
            name:"contributorUser"
        }
    ]);
    
    //destructer
    const {username, title, description, licenseName, licenseURL, install, usage, test, contributors, contributorUser} = userData;

    //GET USERNAME AND INSERT INSIDE URL
    const apiURL = `https://api.github.com/users/${username}`;
    const githubInfo = await axios.get(apiURL);
    let githubData = githubInfo.data;

    //convert contributors section into an array
    var contributorName = contributors.split(",");
    var contributorGitName = contributorUser.split(",");
    console.log(contributorGitName);
    console.log(contributorName);
    
    var info;
    for (var i = 0; i < contributorGitName.length; i++){
        var contriInfo = await axios.get(`https://api.github.com/users/${contributorGitName[i]}`);
        var contributorProfile = contriInfo.data.avatar_url;
        var contributorUrl = contriInfo.data.html_url;
    }

    //FORMAT GIVEN DATA 

    var formatInfo = `
        \n# ${title}
        \n${description}
        \n## Table of Contents
        \n* [Installation](#${install})\n* [Usage](#${usage})\n* [Contributers](#${contributers})\n* [Tests](#${test})\n* [License](#${licenseName})
        \n## Installation
        \n\`\`\` ${install} \`\`\`
        \n## Usage
        \n\`\`\` ${usage} \`\`\`
        \n## Contributors
        \n
        \n## Tests
        \n
        \n## License
        \n[![license](https://img.shields.io/github/license/DAVFoundation/captain-n3m0.svg?style=flat-square)](${licenseURL})
        \n## Author
        \n${githubData.name}
        \n![ProfilePicture](${githubData.avatar_url})
        \nGithub Email: ${githubData.email}
        \nGithub Repos URL: ${githubData.repos_url}
        `
    const formatedFile = fs.writeFileSync("readme.md", formatInfo );
    

}
