var MongoClient = require('mongodb').MongoClient;
var Promise = require('promise');
var ObjectId = require('mongodb').ObjectID;

const update = (req, res, next, config) => {
    console.log(req.body)
  return new Promise((resolve, reject) => {
      MongoClient.connect(`${config.dbPath}`, (err, dbclient) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        return resolve(dbclient);
      });
  })
  .then((database) => {
    client = database;
    db = client.db('login')
    req.body.updatedAt = new Date();
    return db.collection('project').update({
      _id: ObjectId( req.body.id)
    }, {
      $set:{ 
        name : req.body.name,
        leader : req.body.leader,
        Description : req.body.Description,
                                }
    },
    {multi: true});
  })
  .then((data) => {
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
  method: 'PUT',
  type: 'company',
  url: '/project',
  handler: update
};