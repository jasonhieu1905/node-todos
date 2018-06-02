const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('can not connect to db');
    }
    console.log('connected');

    const db = client.db('TodoApp');

    db.collection('User').deleteMany({name: 'Hieu'}).then(res => {
        console.log('delete success', res)
    }, err => {
        console.log('error when deleting ', err)
    })
  
    client.close();
})