const app = require("../app");
const request = require("supertest");
const seed = require("../prisma/seed");

beforeEach(() => seed());

describe("Get all users", () => {
  test("200 - Gets all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users).toHaveLength(3);
        users.forEach((user) => {
          expect(user).toMatchObject({
            id: expect.any(Number),
            first_name: expect.any(String),
            last_name: expect.any(String),
            email: expect.any(String),
            phone: expect.any(String),
            created_at: expect.any(String),
            updated_at: expect.any(String),
          });
        });
      });
  });
});

describe("Gets all users with names containing Jan", () => {
  test("200 - Gets all users needed", () => {
    return request(app)
      .get("/api/users/Jan")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users).toHaveLength(2);
        users.forEach((user) => {
          expect(user.first_name.includes("Jan")).toBe(true);
        });
      });
  });
  test("404 - No users found", () => {
    return request(app)
      .get("/api/users/Hon")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No users found");
      });
  });
});

describe("Creating a user", () => {
  test("201 - Creates a user", () => {
    const userData = {
      username: "scodia619",
      first_name: "William",
      last_name: "Price",
      email: "billyjoe2701@gmail.com",
      phone: "7951882145",
      password: "1234",
    };
    return request(app)
      .post("/api/users/create")
      .send(userData)
      .expect(201)
      .then(({ body: { users } }) => {
        expect(users).toMatchObject({
          id: 4,
          first_name: "William",
          last_name: "Price",
          email: "billyjoe2701@gmail.com",
          phone: "7951882145",
          password: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
        });
      });
  });
  test("400 - user already exists", () => {
    const userData = {
      username: "JPrince",
      first_name: "Janice",
      last_name: "Prince",
      email: "jhfhfhfh@example.com",
      phone: "9876543220",
      password: "1234",
    };
    return request(app)
      .post("/api/users/create")
      .send(userData)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Username already exists");
      });
  });
  test("400 - email already exists", () => {
    const userData = {
      username: "scodia619",
      first_name: "Janice",
      last_name: "Prince",
      email: "janice@example.com",
      phone: "9876543220",
      password: "1234",
    };
    return request(app)
      .post("/api/users/create")
      .send(userData)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Email already exists");
      });
  });
  test("400 - Missing Data", () => {
    const userData = {
      username: "Jpaddy",
      first_name: "Janice",
      last_name: "Prince",
      email: "janice@example.com",
      password: "1234",
    };
    return request(app)
      .post("/api/users/create")
      .send(userData)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Missing Data");
      });
  });
  test("400 - Wrong data type", () => {
    const userData = {
      username: 1,
      first_name: "Janice",
      last_name: "Prince",
      email: "janice@example.com",
      phone: "9876543220",
      password: "1234",
    };
    return request(app)
      .post("/api/users/create")
      .send(userData)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Incorrect Data Type");
      });
  });
});

describe("Logging in a user", () => {
  test("200 - Logs in a user", () => {
    const userData = {
      username: "JDoe",
      password: "1234",
    };
    return request(app)
      .post("/api/users/login")
      .send(userData)
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users).toMatchObject({
          username: "JDoe",
          password: "sha1$91a1f66d$1$917563ed687289a9329578ac9384246fd3da4226",
        });
      });
  });
  test("400 - Missing Data", () => {
    const userData = {
      username: "JDoe",
    };
    return request(app)
      .post("/api/users/login")
      .send(userData)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Missing Data");
      });
  });

  test("404 - No username", () => {
    const userData = {
      username: "scodia619",
      password: "1234",
    };
    return request(app)
      .post("/api/users/login")
      .send(userData)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No users found");
      });
  });

  test("400 - Invalid Password", () => {
    const userData = {
      username: "JDoe",
      password: "2134",
    };
    return request(app)
      .post("/api/users/login")
      .send(userData)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid Password");
      });
  });
});

describe("Get all posts", () => {
  test("200 - gets all the posts", () => {
    return request(app)
      .get("/api/posts")
      .expect(200)
      .then(({ body: { posts } }) => {
        expect(posts).toHaveLength(2);
        posts.forEach((post) => {
          expect(post).toMatchObject({
            post_id: expect.any(Number),
            user_id: expect.any(Number),
            is_private: expect.any(Boolean),
            title: expect.any(String),
            content: expect.any(String),
            created_at: expect.any(String),
          });
        });
      });
  });
});

describe("Get all topics", () => {
  test("200 - gets all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body: { topics } }) => {
        expect(topics).toHaveLength(3);
        expect(topics[0].topic_name).toBe("Technology");
        expect(topics[1].topic_name).toBe("Science");
        expect(topics[2].topic_name).toBe("Self Harm");
      });
  });
});

describe("Gets all post from a certain topic", () => {
  test("200 - Get all posts from technology Topic", () => {
    return request(app)
      .get("/api/posts/Technology")
      .expect(200)
      .then(({ body: { posts } }) => {
        expect(posts).toHaveLength(1);
        posts.forEach(({ post }) => {
          expect(post).toMatchObject({
            post_id: 1,
            user_id: 1,
            is_private: false,
            title: "Introduction to Prisma",
            content: "Prisma is a modern database toolkit...",
            created_at: expect.any(String),
          });
        });
      });
  });
  test("404 - No topic found", () => {
    return request(app)
      .get("/api/posts/gifgaf")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No topics found");
      });
  });

  test("400 - Incorrect Data type", () => {
    return request(app)
      .get("/api/posts/1")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Incorrect Data Type");
      });
  });
});

describe("Get topic by name", () => {
  test("200 - gets the topic", () => {
    return request(app)
      .get("/api/topics/Science")
      .expect(200)
      .then(({ body: { topics } }) => {
        expect(topics.topic_name).toBe("Science");
      });
  });
  test("400 - Incorrect Data Type", () => {
    return request(app)
      .get("/api/topics/1")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Incorrect Data Type");
      });
  });
  test("404 - No Topic found", () => {
    return request(app)
      .get("/api/topics/banana")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No topics found");
      });
  });
});

describe("Gets all posts based on whether a topical post is private or not", () => {
  test("200 - gets the post associated with is private and topic of science", () => {
    return request(app)
      .get("/api/posts/Science?private=true")
      .expect(200)
      .then(({ body: { posts } }) => {
        expect(posts).toHaveLength(1);
        posts.forEach(({ post }) => {
          expect(post).toMatchObject({
            post_id: 2,
            user_id: 2,
            is_private: true,
            title: "Exploring Quantum Physics",
            content: "Quantum physics is the study of...",
            created_at: expect.any(String),
          });
        });
      });
  });
  test("200 - gets a post if its not private", () => {
    return request(app)
      .get("/api/posts/Technology?private=false")
      .expect(200)
      .then(({ body: { posts } }) => {
        expect(posts).toHaveLength(1);
        posts.forEach(({ post }) => {
          expect(post).toMatchObject({
            post_id: 1,
            user_id: 1,
            is_private: false,
            title: "Introduction to Prisma",
            content: "Prisma is a modern database toolkit...",
            created_at: expect.any(String),
          });
        });
      });
  });
  test("400 - Incorrect Data Type", () => {
    return request(app)
      .get("/api/posts/Technology?private=1")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Incorrect Data Type");
      });
  });
});

describe("Gets all posts with a query of is_private", () => {
  test("200 - Gets all posts with a query of false", () => {
    return request(app)
      .get("/api/posts?private=false")
      .expect(200)
      .then(({ body: { posts } }) => {
        expect(posts).toHaveLength(1);
        posts.forEach((post) => {
          expect(post).toMatchObject({
            post_id: 1,
            user_id: 1,
            is_private: false,
            title: "Introduction to Prisma",
            content: "Prisma is a modern database toolkit...",
            created_at: expect.any(String),
          });
        });
      });
  });
});

describe("Post a new topic", () => {
  test("201 - posts new topic", () => {
    const topicData = { topic_name: "Depression" };
    return request(app)
      .post("/api/topics")
      .send(topicData)
      .expect(201)
      .then(({ body: { topics } }) => {
        expect(topics).toMatchObject({
          id: 4,
          created_at: expect.any(String),
          topic_name: "Depression",
        });
      });
  });
  test("400 - Missing Data", () => {
    const topicData = {};
    return request(app)
      .post("/api/topics")
      .send(topicData)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Missing Data");
      });
  });
  test("400 - Incorrect Data Type", () => {
    const topicData = { topic_name: 1 };
    return request(app)
      .post("/api/topics")
      .send(topicData)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Incorrect Data Type");
      });
  });
  test("400 - Topic exists", () => {
    const topicData = { topic_name: "Science" };
    return request(app)
      .post("/api/topics")
      .send(topicData)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Topic already exists");
      });
  });
});

describe("Posting a new post", () => {
  test("201 - Creates a new Post", () => {
    const postData = {
      username: 'JDoe',
      is_private: 'false',
      title: "I want to kill myself",
      topic: "Self Harm",
      content: "I have thought about killing myself",
    };
    return request(app)
      .post("/api/posts")
      .send(postData)
      .expect(201)
      .then(({ body: { posts } }) => {
        expect(posts).toMatchObject({
          post_id: 3,
          user_id: 1,
          is_private: false,
          title: "I want to kill myself",
          content: "I have thought about killing myself",
          created_at: expect.any(String)
        });
      });
  });
  test('400 - Missing Data', ()=>{
    const postData = {
        username: 'JDoe',
        is_private: false,
        title: "I want to kill myself",
        content: "I have thought about killing myself",
      };
      return request(app)
      .post('/api/posts')
      .send(postData)
      .expect(400)
      .then(({body})=>{
        expect(body.msg).toBe('Missing Data')
      })
  })
  test('400 - Incorrect Data Type', ()=> {
    const postData = {
        username: 1, // Sending a number for username
        is_private: "false", // Sending a string for is_private instead of a boolean
        title: "I want to kill myself",
        topic: "Self Harm",
        content: "I have thought about killing myself",
    };
      return request(app)
      .post('/api/posts')
      .send(postData)
      .expect(400)
      .then(({body})=>{
        expect(body.msg).toBe('Incorrect Data Type')
      })
  })
  test('404 - User doesnt exist', ()=>{
    const postData = {
        username: 'scodia619',
        is_private: 'false',
        title: "I want to kill myself",
        topic: "Self Harm",
        content: "I have thought about killing myself",
      };
      return request(app)
      .post('/api/posts')
      .send(postData)
      .expect(404)
      .then(({body})=>{
        expect(body.msg).toBe('No users found')
      })
  })
  test('404 - Topic doesnt exist', ()=>{
    const postData = {
        username: 'JDoe',
        is_private: 'false',
        title: "I want to kill myself",
        topic: "Gif Gaf",
        content: "I have thought about killing myself",
      };
      return request(app)
      .post('/api/posts')
      .send(postData)
      .expect(404)
      .then(({body})=>{
        expect(body.msg).toBe('No topics found')
      })
  })
});

describe('Gets all posts by user', ()=>{
    test('200 - gets all posts by JDoe', ()=>{
        return request(app)
        .get('/api/posts?username=JDoe')
        .expect(200)
        .then(({body: {posts}})=>{
            expect(posts).toHaveLength(1)
            expect(posts[0]).toMatchObject({
                post_id: 1,
                user_id: 1,
                is_private: false,
                title: "Introduction to Prisma",
                content: "Prisma is a modern database toolkit...",
                created_at: expect.any(String),
            })
        })
    })
    test('400 - Incorrect Data Type', ()=>{
        return request(app)
        .get('/api/posts?username=1')
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe('Incorrect Data Type')
        })
    })
    test('404 - No Users', ()=>{
        return request(app)
        .get('/api/posts?username=scodia619')
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe('No users found')
        })
    })
})