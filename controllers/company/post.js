var MongoClient = require('mongodb').MongoClient;
var Promise = require('promise');



AddProject = function (req, res, next, config) {
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
        db = client.db("login");
        return new Promise((resolve, reject) => {
            return db.collection('project').insert(req.body,(err, data) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }).then((data) => {
        if (!data) data = [];
        if (client) client.close();
        let obj = {};
    if (data) {
      obj.data = data;
      obj.status = true;
    } else {
      obj.data = [];
      obj.status = false;
    }
    return res.send(obj);     
    }).catch((err) => {
        if (client) client.close();
        console.log(err);
        return Promise.reject(err);
    });


}



module.exports = {
    method: 'POST',
    type: 'company',
    url: '/project',
    handler: AddProject
};



