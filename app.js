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
const employee = require("./lib/class_employee");
const manager = require("./lib/class_manager");
const engineer = require("./lib/class_engineer");
const intern = require("./lib/class_intern");

//array of data that will be input into arrayHTML
const arrayAnswers = [];

//array of html that will be created from inputs and collect inputs
const arrayHTML = [];

//array of html that will be written to the final output team_index.html
const arrayHTMLFinal = [];


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
        name: "id",
        message: "Enter id:"
      },
      {
        type: "input",
        name: "email",
        message: "Enter email address (ex/name@domain.com):"
      },
      {
        type: "input",
        name: "username",
        message: "Enter GitHub username:",
        when: (data) => data.type === 'engineer',
      },
      {
        type: "input",
        name: "school",
        message: "Enter name of school:",
        when: (data) => data.type === 'intern',
      },
      {
        type: "input",
        name: "officenumber",
        message: "Enter office number:",
        when: (data) => data.type === 'manager',
      },
      {
        type: "confirm",
        name: "yesorno",
        message: "Add another team member?"
      }
    ])

        //then with the username and color returned from the user's input...
        .then(function(data) {

          // console.log(data);

          console.log(data.type);

          if (data.type === 'manager') {

            //create new manager with manager class
            const newManager = new manager(data.name, data.id, data.email, data.officenumber);

            //read contents the html file
            fs.readFile("./templates/template_manager.html", "utf8", function(err, data) {

              if (err) {
                throw err;
              }

              arrayAnswers.push(newManager);
              arrayHTML.push(data);
            
              // console.log(data);
              //push HTML to array
              // console.log(arrayHTML);
              console.log(arrayAnswers);

              writeFile();

            // end read file
            });

          // end if statement
          }

          if (data.type === 'intern') {
            
            //create new intern with intern class
            const newIntern = new intern(data.name, data.id, data.email, data.school);

            //read contents the html file
            fs.readFile("./templates/template_intern.html", "utf8", function(err, data) {
              
              if (err) {
                throw err;
              }
              
              // console.log(data);
              //push HTML to array
              arrayHTML.push(data);

              console.log(arrayHTML);

              writeFile();

            // end read file
            });

          // end if statement
          }

          if (data.type === 'engineer') {
           
            //create new engingeer with engineer class
            const newEngineer = new engineer(data.name, data.id, data.email, data.github);

            //read contents the html file
            fs.readFile("./templates/template_engineer.html", "utf8", function(err, data) {
              
              if (err) {
                throw err;
              }
              
              // console.log(data);
              //push HTML to array
              arrayHTML.push(data);
              console.log(arrayHTML);
              
              writeFile();

            });

          }

          if (data.yesorno == true) {

            initiate();

          } 
      
    //end inquirer
     }); 

}

function writeFile() {
  // write to new file in output folder
  fs.appendFile("./output/team_index.html", arrayHTML, function(err) {
  
    if (err) {
      return console.log(err);
    }
  
    console.log("Success!");
  
    });
  }

//run when app is initialized
initiate();
