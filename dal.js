const MongoClient = require("mongodb").MongoClient
const uri = process.env.MONGODB_STRING
let db = null

// connect to mongo
MongoClient.connect(uri, { useUnifiedTopology: true }, function (err, client) {
  console.log("Connected successfully to db server")
  
  //new line to check for error
  console.log(process.env.MONGODB_STRING) 
  if (err) console.log(err);

  // connect to myproject database
  db = client.db("bank_customers")

  // console.log(uri)
})

// create user account
function create(name, email, password) {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users")
    const doc = { name, email, password, balance: 0 }
    collection.insertOne(doc, { w: 1 }, function (err, result) {
      err ? reject(err) : resolve(doc)
    })
  })
}

// find user account
function find(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({ email: email })
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs)
      })
  })
}

// find user account
function findOne(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .findOne({ email: email })
      .then((doc) => resolve(doc))
      .catch((err) => reject(err))
  })
}

// update - deposit/withdraw amount
function update(email, amount) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .findOneAndUpdate(
        { email: email },
        { $inc: { balance: amount } },
        { returnOriginal: false },
        function (err, documents) {
          err ? reject(err) : resolve(documents)
        }
      )
  })
}

// all users
function all() {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({})
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs)
      })
  })
}

module.exports = { create, findOne, find, update, all }
