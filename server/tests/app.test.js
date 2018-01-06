const expect = require('expect');
const request = require('supertest');

const {app} = require('./../app');
const {Todo} = require('./../models/todo');

beforeEach( done => {
    Todo.remove({}).then(() => {
        done();
    });
});

describe('POST /todos', () => {
    it('should create new todo item', done => {
        let text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                //if error -> end test 
                if (err) {
                    done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                })
                .catch( e => done(e));

            });
    });
});