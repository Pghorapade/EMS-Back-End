var MongoClient = require('mongodb').MongoClient;
var Promise = require('promise');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


posted = function (req, res, next, config) {
     let email = req.body.Email
    let password = req.body.password
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
            return db.collection('customers').find({}).toArray((err, data) => {
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
        jwt.sign({data}, `${config.secret}`,
            function (err, token) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                if(data[0].email == email && data[0].password == password){
                    return res.send({
                        status: true
                      });
                }else{
                    return res.send({
                        status: false
                      });
                }
                


            });
       
    }).catch((err) => {
        if (client) client.close();
        console.log(err);
        return Promise.reject(err);
    });


}



module.exports = {
    method: 'POST',
    type: 'cases',
    url: '/login',
    handler: posted
};



