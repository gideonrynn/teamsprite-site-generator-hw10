// The other three classes will extend `Employee`. 
// In addition to `Employee`'s properties and methods, `Engineer` will also have:

//   * github  // GitHub username

//   * getGithub()

//   * getRole() // Overridden to return 'Engineer'

//require class_employee file for class Employee to be extended
const Employee = require("./class_employee");

class Engineer extends Employee {

    //add github parameter, which will refers to GitHub username in the property
    //since the Engineer constructor should also have the Employee's properties and methods, include those as parameters in addition to github
    constructor (name, id, email, github) {

        //add super as a requirement for the extended class, which contains the Employee parameters
        super(name, id, email);

        //set property specific to Engineer class
        this.github = github;
    }

    //set two methods, one of which changes the getRole() from the Employee class 
    getGithub() {
        return this.github;
    }

    getRole() {
        return "Engineer";
    }

}


//export engineer so it can be used externally
module.exports = Engineer;