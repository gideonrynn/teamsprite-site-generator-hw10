// The first class is an `Employee` parent class with the following properties and
// methods:

//   * name
//   * id
//   * title -- should this be email?
//   * getName()
//   * getId()
//   * getEmail()
//   * getRole() // Returns 'Employee'

//create employee parent class with three properties and four methods
class Employee {

    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        //readme says title but method says getEmail() and email is on the homework screenshots
        // this.title = title;
    }

    //use return and the property to get the value
    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return "Employee";
    }

    printInfo() {
        console.log(`Name: ${this.name}`);
        console.log(`Id: ${this.id}`);
        console.log(`Email: ${this.email}`);
    }
}

//* testing directly on class_employee.js *//
// const testEmployee = new Employee("Sarah", 2253713, "sarah.dillard@northwestern.edu");

// console.log(testEmployee);

// testEmployee.printInfo();
// testEmployee.getName();
// testEmployee.getId();
// testEmployee.getEmail();
// testEmployee.getRole();

//export employee so it can be accessed externally
module.exports = Employee;