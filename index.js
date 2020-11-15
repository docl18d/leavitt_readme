const prompt = require('inquirer').createPromptModule()
const fs = require('fs')
const api = require('./api.js')
const generateMarkdown = require('./generateMarkdown.js')
const writeToFile = (README, data) => {
  fs.writeFile(README+ '.md', data, error => error ? console.error(error) : console.log(`${README + '.md'} generated!`))
}
// Name and repository user input
const init = async _ => {
    let object = {}
    do {
      const { user, repo } = await prompt([
        {
          type: 'input',
          name: 'user',
          message: 'What is your GitHub user name?'
        },
        {
          type: 'input',
          name: 'repo',
          message: 'What is your repository name?'
        }
      ])
      object = await api.getUser(user, repo)
      if (!object) {
        console.error('Repo not found!')
      } else {
        console.log(`${object.fullName} found!`)
      }
    } while (!object)

    // const ghApi = await api.getUser(user)
  Object.assign(object, await prompt([
    
    {
      type: 'input',
      name: 'inst',
      message: 'What are the installation instructions?'
    },
    {
      type: 'input',
      name: 'use',
      message: 'What is the usage description?'
    },
   
    {
      type: 'input',
      name: 'con',
      message: 'Who are the contributors?'
    },
    {
      type: 'input',
      name: 'test',
      message: 'What are the tests?'
    },
    {
      type: 'input',
      name: 'qs',
      message: 'Any questions?'
    }
  ]))
  writeToFile(object.title, await generateMarkdown(object))
}

init()