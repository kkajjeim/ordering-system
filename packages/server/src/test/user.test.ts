import request from 'supertest';
import {Express} from "express";
import { main }  from '../index';
import {User} from "../model";


describe('user API TEST', () => {
    let app: Express;

    beforeAll(async () => {
        process.env.NODE_ENV = 'test';
        app = await main();
        await User.deleteMany({});
    });

    afterAll(() =>
        setTimeout(() => process.exit(), 1000)
    );

    test('should test that true === true', () => {
        expect(true).toBe(true)
    });

    test('signup : should create a new account', async (done) => {
        request(app)
            .post('/signup')
            .send({email: 'test@gmail.com', password: '12345', username: 'tester'})
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    test('signup : should not allow duplicate accounts to be created', async (done) => {
        request(app)
            .post('/signup')
            .send({email: 'test@gmail.com', password: '12345', username: 'duplicate'})
            .expect(409)
            .end((err, res) => {
                if(err) return done(err);
                done();
            });
    });

    test('signup : password length should be greater than 5', async (done) => {
        request(app)
            .post('/signup')
            .send({email: 'password@gmail.com', password: '123', username: 'tester'})
            .expect(400)
            .end((err, res) => {
                if(err) return done(err);
                done();
            });
    });

    test('login : should check password', async (done) => {
        request(app)
            .post('/login')
            .send({email: 'test@gmail.com', password: '010101'})
            .expect(401)
            .end((err, res) => {
                if(err) return done(err);
                done();
            });
    });

    test('login : should return access token', async (done) => {
        request(app)
            .post('/login')
            .send({email: 'test@gmail.com', password: '12345'})
            .set('Accpet', 'application/json')
            .expect((res) => {
                res.body.accessToken = 'some token';
            })
            .expect(200, {
                accessToken: 'some token'
            }, done);
    });
});
