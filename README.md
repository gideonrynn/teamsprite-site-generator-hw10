# teamsprite-site-generator-hw10
This is a Git Hub repository for the NU Coding Bootcamp Homework for Week 10 team site generator.

![profile pdf screenshot](/assets/images/teamsprite.jpg)
![node js run gif](/assets/images/teamsprite.gif)

# Setup

Once logged in with [GitHub account](https://github.login/), clone the repo locally using link:

```sh
  git clone https://github.com/gideonrynn/teampacr-profile-generator-hw7.git
```

Also see: [Cloning a respository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository).


# Usage

The Team Sprite application allows a user to generate a github profile in PDF format based on prompts and stored user inputs using the command-line.

A project manager or developer lead can use the application to generate team profiles quickly for documentation that will go to stakeholders or department heads without having to navigate to external profiles provided by each team member. The user will also be able to choose a color that closest matches a project theme - developers may update generateHTML to update colors for company/department branding palette or additional tailoring.

When the command line prompts are complete, pdf will save to "profiles" folder with github username in filename.

The generated template will include:
- public repository name
- followers
- GitHub stars
- GitHub follow count
- location (link to Google maps)
- blog (link to website)
- GitHub Profile (link to website)

# Technologies

This project was built using:

  - [Inquirer 7.0.1](https://www.npmjs.com/package/inquirer)
  - [Jest 24.8.0](https://www.npmjs.com/package/jest)


# License

This project uses the MIT License. See the full details here: https://choosealicense.com/licenses/mit/ 
