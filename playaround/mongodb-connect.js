const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('can not connect to db');
    }
    console.log('connected');

    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Hieu Doan',
    //     status: false
    // }, (err, res) => {
    //     if (err)  return console.log('error when inserting a new one', err);
    //     console.log(JSON.stringify(res.ops, undefined, 2))
    // })

    // db.collection('User').insertOne({
    //     _id: 123,
    //     name: 'Hieu Doan',
    //     age: 26,
    //     location: 'Ho Chi Minh'
    // }, (err, res) => {
    //     if (err) {
    //         return console.log('Error when inserting new document', err);
    //     }
    //     console.log('new User', JSON.stringify(res.ops, undefined, 2));
    // })

    db.collection('User').find({name: 'Hieu'}).toArray().then((docs) => {
        console.log('document', JSON.stringify(docs, undefined, 2));
    }, err => {
        console.log('err', err)
    })

    db.collection('User').find().count().then((count) => {
        console.log('number document ', count);
    }, err => {
        console.log('err', err)
    })
    client.close();
})