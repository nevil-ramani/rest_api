npm install express cors mongoose bcrypt jsonwebtoken pino pino-pretty dayjs lodash nanoid zod config


npm install -D @types/body-parser @types/config @types/cors @types/express @types/node @types/pino @types/bcrypt @types/jsonwebtoken @types/lodash @types/nanoid nodemon typescript










# zod

```jsx
//https://www.imadatyat.me/guides/schema-validation-with-zod-and-expressjs

const express = require("express");
const { z } = require("zod");

const app = express();

app.use(express.json());

const LoginSchema = z.object({
  // In this example we will only validate the request body.
  body: z.object({
    // email should be valid and non-empty
    email: z.string().email(),
    // password should be at least 6 characters
    password: z.string().min(6),
  }),
});

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (err) {
    return res.status(400).send(err.errors);
  }
};

app.post("/login", validate(LoginSchema), (req, res) => {
  return res.json({ ...req.body });
});

app.listen(1337, () => console.log(`> Ready on http://localhost:${1337}`));
```

Certainly! Let's go through an example to understand how the `schema.parse` method works with request data.

Assume we have the following Zod schema for validating a user registration request:

```jsx
const RegistrationSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6),
  }),
  query: z.object({
    lang: z.string().optional(),
  }),
});

```

Now, let's say we have an Express.js route that handles user registration:

```jsx
app.post("/register", validate(RegistrationSchema), (req, res) => {
  // Route handler logic for user registration
});

```

When a POST request is made to the "/register" endpoint, the `validate` middleware is invoked. Let's assume the request contains the following data:

```json
{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "p@ssw0rd"
}

```

The `schema.parse` method in the middleware will receive the request data as follows:

```json
{
  body: {
    username: "john_doe",
    email: "john.doe@example.com",
    password: "p@ssw0rd"
  },
  query: {},
  params: {}
}

```

The `schema.parse` method then applies the defined validation rules from the `RegistrationSchema` to the respective data. In this case, it checks if the `username` has a minimum length of 3 characters, if the `email` is a valid email address, and if the `password` has a minimum length of 6 characters.

If the data passes the validation, the middleware calls `next()` to proceed to the route handler. Otherwise, if any of the validation rules fail, an error is thrown. The `catch` block in the middleware catches the error and sends a 400 response with the error messages.

For example, if the request data has an invalid email address and the username is too short, the error messages might be:

```json
{
  "email": ["Invalid email address."],
  "username": ["Username must have a minimum length of 3 characters."]
}

```

These error messages would be sent as the response body with a 400 status code.

By using the `schema.parse` method, the middleware ensures that the incoming request data conforms to the specified schema before allowing further processing.