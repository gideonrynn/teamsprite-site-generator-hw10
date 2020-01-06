// The other three classes will extend `Employee`. 
// In addition to `Employee`'s properties and methods, `Manager` will also have:

//   * officeNumber

//   * getRole() // Overridden to return 'Manager'
//readme missing note about getOfficeNumber(), which shows up in the manager.test.js

//require class_employee file for class Employee to be extended
const Employee = require("./class_employee");

//create Manager class that extends Employee with one additional property (officeNumber) and two methods (getOfficeNumber and update getRole)
class Manager extends Employee {

    //add school parameter, which will refers to the school in the property
    //since the Intern constructor should also have the Employee's properties and methods, include those as parameters in addition to school
    constructor(name, id, email, officeNumber) {

        //add super as a requirement for the extended class, which contains the Employee parameters
        super(name, id, email);

        //create this.officeNumber property, which is specific to the Manager class
        this.officeNumber = officeNumber;
    }

    //set two methods, one of which changes the getRole() from the Employee class 
    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return "Manager";
    }

}

//export Manager so it can be used externally
module.exports = Manager;