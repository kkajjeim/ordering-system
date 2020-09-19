import request from 'supertest';
import {Express} from "express";
import { main }  from '../index';
import {Order, Statistic, User} from "../model";

const dummyProducts = [
    {name: 'taco', price: 3800, quantity: 5},
    {name: 'burrito', price: 7500, quantity: 1},
    {name: 'quesadilla', price: 7500, quantity: 1}
];

describe('order API TEST', () => {
    let app: Express;
    let accessToken: string;

    beforeAll(async () => {
        process.env.NODE_ENV = 'test';
        app = await main();
        await Order.deleteMany({});
        await Statistic.deleteMany({});
    });

    afterAll(() =>
        setTimeout(() => process.exit(), 1000)
    );

    test('should test that true === true', () => {
        expect(true).toBe(true)
    });

    test('get access token', async (done) => {
        request(app)
            .post('/login')
            .send({email: 'test@gmail.com', password: '12345'})
            .expect(200)
            .end((err, res) => {
                if(res.body) {}
                    accessToken = res.body.accessToken;
                return done();
            })
    });

    test('post order : should not allow order of unauthorized user', async (done) => {
        request(app)
            .post('/order')
            .send({
                products: dummyProducts,
                total: 35000,
                subtotal: 34000,
                fees: 1000
            })
            .set('x-access-token', '')
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    test('post order : should not allow incorrect order', async (done) => {
        request(app)
            .post('/order')
            .send({
                products: dummyProducts,
                total: 31000,
                subtotal: 30000,
                fees: 1000
            })
            .set('x-access-token', accessToken)
            .expect(406)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    test('post order : should create a new order', async (done) => {
        request(app)
            .post('/order')
            .send({
                products: dummyProducts,
                total: 35000,
                subtotal: 34000,
                fees: 1000
            })
            .set('x-access-token', accessToken)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    test('get orders : should not allow invalid header', async (done) => {
        request(app)
            .get('/orders')
            .set('access', '')
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    test('get orders : should get order history of user', async (done) => {
        request(app)
            .get('/orders')
            .set('x-access-token', accessToken)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    test('order event : should update statistic', async (done) => {
        const user = await User.findOne({email: 'test@gmail.com'}).exec();
        if (!user) return;

        const before = await Statistic.findOne({user: user._id}).exec();
        if (!before) return;

        request(app)
            .post('/order')
            .send({
                products: dummyProducts,
                total: 35000,
                subtotal: 34000,
                fees: 1000
            })
            .set('x-access-token', accessToken)
            .end((err, res) => {
                setTimeout(async () => {
                    const after = await Statistic.findOne({user: user._id}).exec();
                    expect(after?.totalPaid).toBeGreaterThan(before?.totalPaid);
                    done();
                }, 2000);
            });
    });
});
