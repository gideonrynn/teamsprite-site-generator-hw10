//app.js runs the application
//lib contains the classes for each type
//template contains the html templates for each type
//output is where the rendered file(s)

// ### User input
// The project must prompt the user to build an engineering team. An engineering
// team consists of a manager, and any number of engineers and interns.

// The project must generate a `team.html` page in the `output` directory, that displays a nicely formatted team roster. Each team member should display the following in no particular order:
//   * Name
//   * Role
//   * ID
//   * Role-specific property (School, link to GitHub profile, or office number)


const inquirer = require("inquirer");
const fs = require("fs");


function initiate() {

    console.log(`Follow the prompts below to build your team and page.`);

    inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Select the team member's role:",
        choices: ["manager", "engineer", "intern"]
      },
      {
        type: "input",
        name: "name",
        message: "Enter name:"
      },
      {
        type: "input",
        name: "username",
        message: "Enter GitHub username:",
        when: (data) => data.type === 'engineer',
      }
    ])

        //then with the username and color returned from the user's input...
        .then(function(data) {

          console.log(data);

          initiate();
          

    //end inquirer
     }); 

}

//run when app is initialized
initiate();

