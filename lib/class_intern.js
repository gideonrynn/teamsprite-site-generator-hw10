// The other three classes will extend `Employee`. 
// In addition to `Employee`'s properties and methods, `Intern` will also have:

//   * school 

//   * getSchool()

//   * getRole() // Overridden to return 'Intern'

//require class_employee file for class Employee to be extended
const Employee = require("./class_employee");

//create Intern class that extends Employee with one additional property (school) and two methods (getSchool and update getRole)
class Intern extends Employee {

     //add school parameter, which will refers to the school in the property
    //since the Intern constructor should also have the Employee's properties and methods, include those as parameters in addition to school
    constructor (name, id, email, school) {

        //add super as a requirement for the extended class, which contains the Employee parameters
        super(name, id, email);

        //set property specific to Intern class
        this.school = school;
    }

    //set two methods, one of which changes the getRole() from the Employee class
    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern"
    }

}

//export Intern so it can be used externally
module.exports = Intern;