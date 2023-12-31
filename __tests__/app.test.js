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