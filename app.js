const inquirer = require("inquirer");
const fs = require("fs");
const employee = require("./lib/class_employee");
const manager = require("./lib/class_manager");
const engineer = require("./lib/class_engineer");
const intern = require("./lib/class_intern");

//array of data that will be input into arrayHTML
let arrayAnswers = [];

//array of html that will be created from inputs and collect inputs
let arrayHTML = [];

//array of html that will be written to the final output team_index.html
let arrayHTMLFinal = [];

let arrayHTMLFinalTemplate = [];


function initiate() {

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
          // console.log(data.type);

          if (data.type === 'manager') {

            //create new manager with manager class
            const newManager = new manager(data.name, data.id, data.email, data.officenumber);
            
            //push newManager to answers array
            arrayAnswers.push(newManager);

            arrayHTML = [];

            //read contents the html file
            fs.readFile("./templates/template_manager.html", "utf8", function(err, data) {
              if (err) { throw err;}

              //push the html pulled from the template into an array 
              arrayHTML.push(data);

              //return the HTML with the placeholders replaced by newManager data
              arrayHTML = arrayHTML.map(arrayHTML => {
                return arrayHTML.replace(/{{ id }}/g, newManager["id"]).replace(/{{ email }}/g, newManager["email"]).replace(/{{ officenumber }}/g, newManager["officeNumber"]).replace(/{{ name }}/g, newManager["name"]).replace(/{{ type }}/g, newManager.getRole());
                
              });

              //push updated html into array final that will hold all updated html data
              arrayHTMLFinal.push(arrayHTML);

            // end read file
            });

          // end if statement
          }

          if (data.type === 'intern') {
            
            //create new intern with intern class
            const newIntern = new intern(data.name, data.id, data.email, data.school);

            arrayAnswers.push(newIntern);

            arrayHTML = [];

            //read contents the html file
            fs.readFile("./templates/template_intern.html", "utf8", function(err, data) {    
              if (err) { throw err; }
              
              //push the information pulled from the template into an array of HTML data
              arrayHTML.push(data);

              //return the HTML with the placeholders replaced by newIntern data
              arrayHTML = arrayHTML.map(arrayHTML => {
                return arrayHTML.replace(/{{ id }}/g, newIntern["id"]).replace(/{{ email }}/g, newIntern["email"]).replace(/{{ school }}/g, newIntern.getSchool()).replace(/{{ name }}/g, newIntern["name"]).replace(/{{ type }}/g, newIntern.getRole());
                
              });

              //push updated html into array that will hold all updated html data
              arrayHTMLFinal.push(arrayHTML);

            // end read file
            });

          // end if statement
          }

          if (data.type === 'engineer') {
           
            //create new engineer with engineer class
            const newEngineer = new engineer(data.name, data.id, data.email, data.username);

            //push newEngineer to answers array
            arrayAnswers.push(newEngineer);
            
            arrayHTML = [];

            //read contents the html file
            fs.readFile("./templates/template_engineer.html", "utf8", function(err, data) {
              
              if (err) {
                throw err;
              }
              
              //push the information pulled from the template into an array of HTML data
              arrayHTML.push(data);

              //return the HTML with the placeholders replaced by newEngineer data
              arrayHTML = arrayHTML.map(arrayHTML => {
                return arrayHTML.replace(/{{ id }}/g, newEngineer["id"]).replace(/{{ email }}/g, newEngineer["email"]).replace(/{{ username }}/g, newEngineer.getGithub()).replace(/{{ name }}/g, newEngineer["name"]).replace(/{{ type }}/g, newEngineer.getRole());
                
              });

              //push updated html into array final that will hold all updated html data
              arrayHTMLFinal.push(arrayHTML);
            
            });

          } 
          
          if (data.yesorno === false) {

            createTeamPage();

          } else {

            initiate();

          }
      
    //end inquirer
     }); 

}

function createTeamPage() {
      
    //read contents the html file
    fs.readFile("./templates/template_index.html", "utf8", function(err, data) {
              
      if (err) {
        throw err;
      }

      arrayHTMLFinalTemplate.push(data);

      arrayHTMLFinal = arrayHTMLFinal.join('');

      //return the HTML with the placeholders replaced by newEngineer data
      arrayHTMLFinalTemplate = arrayHTMLFinalTemplate.map(arrayHTMLFinalTemplate => {
        return arrayHTMLFinalTemplate.replace(/{{ newteam }}/g, arrayHTMLFinal);
      });

      // write to new file in output folder
      fs.writeFile("./output/team_index.html", arrayHTMLFinalTemplate, function(err) {
      
        if (err) {
          return console.log(err);
        }
      
        console.log("Your team page has been created!");
      
        });

    });

  }

  console.log(`Follow the prompts below to build your team and page.`);
//run when app is initialized
initiate();
