// The other three classes will extend `Employee`. 
// In addition to `Employee`'s properties and methods, `Engineer` will also have:

//   * github  // GitHub username

//   * getGithub()

//   * getRole() // Overridden to return 'Engineer'


class Engineer extends Employee {

    //add github parameter, which will refers to GitHub username in the property
    //since the Engineer constructor should also have the Employee's properties and methods, include those as parameters in addition to github
    
    constructor (nameEngineer, idEngineer, emailEngineer, github) {
        //set parameters from Employee class in super
        super(name, id, email);

        //set property specific to Engineer class
        this.github = github;
    }

    //set two methods, one of which changes the getRole() from the Employee class 
    getGitHub() {
        return this.github;
    }

    getRole() {
        return "Engineer";
    }

    printInfo() {
        console.log(`Name: ${this.name}`);
        console.log(`Id: ${this.id}`);
        console.log(`Email: ${this.email}`);
    }

}



module.exports = Engineer;