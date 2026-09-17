import { Hono } from "hono";

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>();

app.get("/message", (c) => {
  return c.text("Hello Hono!");
});

app.get("/users", async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM users LIMIT 5'
  ).all()

  return c.json(results)
});

app.post("/add", async (c) => {
  const body = await c.req.json()
  const { username, email, password } = body
  try {
    const res = await c.env.DB.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)')
      .bind(username, email, password)
      .all()
    return c.json(res)
  } catch (error) {
    return c.json({ error: 'Invalid request body' }, 400)
  }
});

export default app;
