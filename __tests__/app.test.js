const app = require("../app");
const request = require("supertest");

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