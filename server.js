// SERVER SERVES DOCUMENTS
const express = require('express') //loads the module
const app = express() //executes the module, starts express
const bodyParser = require('body-parser') //loads the module
const MongoClient = require('mongodb').MongoClient //loads the module

let db, collection; //empty variables that will be defined later

const url = 'mongodb+srv://GabrielleHoyte:Password0@cluster0.ioxl7.mongodb.net/phrases?retryWrites=true&w=majority'
const dbName = "palindrome-phrases";

app.listen(8000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true
    }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        collection = db.collection('phrases')
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true})) //middle-ware setup
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => { //requesting from the server to render the index.ejs
  collection.find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {phrases: result}) //returns whatever phrases are already stored in the db
  })
})

app.get('/check/:phrases', (req, res) => { //set up a handler to handle get requests to /phrases
  collection.insertOne({name: req.params.phrases}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')

    function checkPalindrome(str) {
      let wordArray = str.replace(" ", "").split("");
      console.log(wordArray);
      wordArray.reverse(); // The reverse method only works on arrays and not strings 
      console.log(wordArray);
      let reversedWord = wordArray.join("");// when you're inside the object, make sure to utilize "this.property"
      if (reversedWord.toLowerCase() === str.replace(" ", "").toLowerCase()) { //we're re-assigning the result to the response string/message
        return "Ding, ding, ding! It's a palindrome!";
      } else {
        return "Sorry fam, try again next time!";
      }
    }
    res.send({result:checkPalindrome(req.params.phrases)})
  })
})
