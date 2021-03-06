
const expect = require('expect');
const request = require('supertest');
var { Todo } = require('./../models/todo');
var {app} = require('./../server');

beforeEach((done) => {
    Todo.remove({}).then(() => {
        done()
    })
})

describe('test server', () => {
    it('should create todo model', (done) => {
        var text = 'Json Hieu';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then(res => {
                    expect(res.length).toBe(1);
                    expect(res[0].text).toBe(text);
                    done();
                }).catch((e) => {
                    console.log('err', e)
                })
            })
    })
})
