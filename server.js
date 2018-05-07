const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000

let app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  })
  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'SITE MAINTENANCE',
//     welcomeMessage: 'Site under maintenance - please be patient while we work this out :)'
//   })
// })

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('fetchYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/', (req, res) => {
  // res.send(`<h1>You shouldn't be here<h1>`)
  res.render('home.hbs', {
    pageTitle: 'Welcome to Some Website',
    welcomeMessage: 'Welcome to this useless site! Now yo can leave...'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  })
})

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fulfill this request'
  })
})

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
})
