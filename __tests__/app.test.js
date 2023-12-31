const app = require("../app");
const request = require("supertest");
const seed = require("../prisma/seed");

beforeEach(() => seed());

describe('Get all users', ()=>{
    test('200 - Gets all users', ()=>{
        return request(app)
        .get('/api/users')
        .expect(200)
        .then(({body: {users}})=>{
            expect(users).toHaveLength(3)
            users.forEach(user=>{
                expect(user).toMatchObject({
                    id: expect.any(Number),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    email: expect.any(String),
                    phone: expect.any(String),
                    created_at: expect.any(String),
                    updated_at: expect.any(String)
                })
            })
        })
    })
})

describe('Gets all users with names containing Jan', ()=>{
    test('200 - Gets all users needed', ()=>{
        return request(app)
        .get('/api/users/Jan')
        .expect(200)
        .then(({body: {users}}) => {
            expect(users).toHaveLength(2)
            users.forEach(user => {
                expect(user.first_name.includes('Jan')).toBe(true)
            })
        })
    })
    test('404 - No users found', ()=>{
        return request(app)
        .get('/api/users/Hon')
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe('No users found')
        })
    })
})

describe('Creating a user', ()=>{
    test('201 - Creates a user', ()=>{
        const userData = {
            username: 'scodia619',
            first_name: 'William',
            last_name: 'Price',
            email: 'billyjoe2701@gmail.com',
            phone: '7951882145'
        }
        return request(app)
        .post('/api/users/create')
        .send(userData)
        .expect(201)
        .then(({body: {users}})=>{
            expect(users).toMatchObject({
                id: 4,
                first_name: 'William',
                last_name: 'Price',
                email: 'billyjoe2701@gmail.com',
                phone: '7951882145',
                created_at: expect.any(String),
                updated_at: expect.any(String)
            })
        })
    })
    test('400 - user already exists', ()=>{
        const userData = {
            username: 'JPrince',
            first_name: 'Janice',
            last_name: 'Prince',
            email: 'jhfhfhfh@example.com',
            phone: '9876543220'
        }
        return request(app)
        .post('/api/users/create')
        .send(userData)
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe('Username already exists')
        })
    })
    test('400 - email already exists', ()=>{
        const userData = {
            username: 'scodia619',
            first_name: 'Janice',
            last_name: 'Prince',
            email: 'janice@example.com',
            phone: '9876543220'
        }
        return request(app)
        .post('/api/users/create')
        .send(userData)
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe('Email already exists')
        })
    })
    test('400 - Missing Data', ()=>{
        const userData = {
            username: 'Jpaddy',
            first_name: 'Janice',
            last_name: 'Prince',
            email: 'janice@example.com',
        }
        return request(app)
        .post('/api/users/create')
        .send(userData)
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe('Missing Data')
        })
    })
    test('400 - Wrong data type', ()=>{
        const userData = {
            username: 1,
            first_name: 'Janice',
            last_name: 'Prince',
            email: 'janice@example.com',
            phone: '9876543220'
        }
        return request(app)
        .post('/api/users/create')
        .send(userData)
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe('Incorrect Data Type')
        })
    })
})