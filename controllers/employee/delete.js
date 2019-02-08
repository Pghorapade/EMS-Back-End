var MongoClient = require('mongodb').MongoClient;
var Promise = require('promise');
var ObjectId = require('mongodb').ObjectID;


const del = (req, res, next, config) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(`${config.dbPath}`, (err, dbclient) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        return resolve(dbclient);
      });
  }).then((database) => {
    client = database;
    let db = client.db("login")
      return db.collection('employee').removeOne({
      _id:  ObjectId(req.query.id)
    });
  }).then((data) => {
    if (client) client.close();
    return res.send({
      data: data,
      status: true
    });
  }).catch((err) => {
    if (client) client.close();
    console.log(err);
    return Promise.reject(err);
  });
}


module.exports = {
  method: 'DELETE',
  type: 'company',
  url: '/Delete_employee',
  handler: del
};