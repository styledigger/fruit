const express = require('express')
const bodyParser = require('body-parser')
const app = express()

var fruits = [
  { name:"apple",
    color:"red"
  },
  { name:"pear",
    color:"green"
  }
]

fruits.push({name:"lemon", color:"yellow"})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req,res) => {
  res.send('Hello')
})

// list of fruits
app.get('/api/fruits', (req,res) => {
  res.setHeader('content-type', 'application/json')
  res.send(JSON.stringify(fruits))
})

// find fruit
app.get('/api/fruits/:fruitName', (req,res) => {
  var fruit = fruits.find(function(element) {
    return element.name == req.params.fruitName
  });
  res.setHeader('content-type', 'application/json')
  res.send(fruit)
})

// add new fruit
app.post('/api/fruits', (req,res) => {
  fruits.push(req.body)
  console.log('Added: '+JSON.stringify(req.body))
  res.status(201).end()
})

// delete fruit
app.delete('/api/fruits/:fruitName', (req,res) => {
  var toDelete = fruits.findIndex(function(element) {
    return element.name == req.params.fruitName
  });
  console.log('deleted: '+fruits.splice(toDelete,1).toString())
  res.send("deleted")
})

// listen on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000')
})
