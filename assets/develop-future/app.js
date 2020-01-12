const inquirer = require("inquirer");
const fs = require("fs");
const employee = require("./lib/class_employee");
const manager = require("./lib/class_manager");
const engineer = require("./lib/class_engineer");
const intern = require("./lib/class_intern");

//array of input data that will be input into arrayHTML
let arrayAnswers = [];

//array containing html template that will be updated from inputs
let arrayHTML = [];

//array of stored and updated html templates that will be written to the final output team_index.html
let arrayHTMLTeam = [];

//array containing final html template that will be updated with stored arrayHTMLFinal and pushed to team page
let arrayHTMLFinal = [];

//create variable that will contain list of questions for user to buid team
//uses validation to ensure no blank entries
const questions = [
  {
    type: "list",
    name: "type",
    message: "Select the team member's role:",
    choices: ["manager", "engineer", "intern"]
  },
  {
    type: "input",
    name: "name",
    message: "Enter name:",
    validate: (text) => {
      if (text === "") {
          return "Please enter a name";
      }

      return true;
  }
    
  },
  {
    type: "input",
    name: "id",
    message: "Enter id:",
    validate: (text) => {
      if (text === "") {
          return "Please enter an id";
      }

      return true;
  }
  },
  {
    type: "input",
    name: "email",
    message: "Enter email address (ex/name@domain.com):",
    validate: (text) => {
      if (text === "") {
          return "Please enter an email address";
      }

      return true;
  }
  },
  {
    type: "input",
    name: "username",
    message: "Enter GitHub username (input will link to github site):",
    when: (answers) => answers.type === 'engineer',
    validate: (text) => {
      if (text === "") {
          return "Please enter a Github username";
      }

      return true;
  }
  },
  {
    type: "input",
    name: "school",
    message: "Enter name of school (will link to google search for school):",
    when: (answers) => answers.type === 'intern',
    validate: (text) => {
      if (text === "") {
          return "Please enter school name";
      }

      return true;
  }
  },
  {
    type: "input",
    name: "officenumber",
    message: "Enter office number:",
    when: (answers) => answers.type === 'manager',
    validate: (text) => {
      if (text === "") {
          return "Please enter office number";
      }

      return true;
  }
  },
  {
    type: "confirm",
    name: "yesorno",
    message: "Add another team member?",
    validate: (text) => {
      if (text === "") {
          return "Enter 'y' to add another team member or 'n' to generate team page";
      } 

      return true;
  }

  }
];

const background = [
  {
    type: "list",
    name: "image",
    message: "Select your preferred background:",
    choices: ["seigaiha", "palmleaf", "sun"]
  }
]


//function runs with node app.js that will prompt users for team info, generate answer and html arrays from html templates
function initiate() {

    inquirer.prompt(questions)

        .then((answers) => {

          if (answers.type === 'manager') {

            //create new manager with manager class
            const newManager = new manager(answers.name, answers.id, answers.email, answers.officenumber);
            
            //push newManager to answers array
            arrayAnswers.push(newManager);

            arrayHTML = [];

            //read contents of the html file
            fs.readFile("./templates/template_manager.html", "utf8", function(err, data) {
              if (err) { throw err;}

              //push the html pulled from the template into an array 
              arrayHTML.push(data);

              //return the HTML with the placeholders replaced by newManager data
              arrayHTML = arrayHTML.map(arrayHTML => {
                return arrayHTML.replace(/{{ id }}/g, newManager["id"]).replace(/{{ email }}/g, newManager["email"]).replace(/{{ officenumber }}/g, newManager["officeNumber"]).replace(/{{ name }}/g, newManager["name"]).replace(/{{ type }}/g, newManager.getRole());
                
              });

              //push updated html into array final that will hold all updated html data
              arrayHTMLTeam.push(arrayHTML);

            // end read file
            });

          // end if statement
          }

          if (answers.type === 'intern') {
            
            //create new intern with intern class
            const newIntern = new intern(answers.name, answers.id, answers.email, answers.school);

            //push newIntern to answers array
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
              arrayHTMLTeam.push(arrayHTML);

            // end read file
            });

          // end if statement
          }

          if (answers.type === 'engineer') {
           
            //create new engineer with engineer class
            const newEngineer = new engineer(answers.name, answers.id, answers.email, answers.username);

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
              arrayHTMLTeam.push(arrayHTML);
            
            });

          } 
          
          if (answers.yesorno === false) {

            //run function that creates final team page output
            createTeamPage();

          } else {

            //run prompts and array creation for next team member
            initiate();

          }
      
    //end inquirer
     }); 

}

//function that creates final team page output
function createTeamPage() {

    //read contents the html file
    fs.readFile("./templates/template_index.html", "utf8", function(err, data) {
              
      if (err) {
        throw err;
      }

      arrayHTMLFinal.push(data);

      arrayHTMLTeam = arrayHTMLTeam.join('');

      //return the HTML with the placeholders replaced by newEngineer data
      arrayHTMLFinal = arrayHTMLFinal.map(arrayHTMLFinal => {
        return arrayHTMLFinal.replace(/{{ newteam }}/g, arrayHTMLTeam);
      });

      // write to new file in output folder
      fs.writeFile("./output/index.html", arrayHTMLFinal, function(err) {
      
        if (err) {
          return console.log(err);
        }

        inquirer.prompt(background)

          .then((answersBKG) => {

            if (background.image === "seigaiha") {

              $("body").css("background", "../assets/images/seigaiha.png/");
              $("#team").text("check it out");

            }

            if (background.image === "palmleaf") {

              $("body").css("background", "../assets/images/palm-leaf.png/");
              $("#team").text("check it out");

            }

            if (background.image === "sun") {

              $("body").css("background", "../assets/images/sun-pattern.png/");
              $("#team").text("check it out");

            }

            console.log(answersBKG);
      
        console.log("Your team page has been created in the 'output' folder!");
      
        });

    });

  });

}

  console.log(`Follow the prompts below to build your team and page.`);
//run when app is initialized
initiate();
