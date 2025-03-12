import jsonServer from 'json-server';
import jsonServerAuth from 'json-server-auth';
import path from 'path';

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../db/db.json')); // Path to mock data
const middlewares = jsonServer.defaults();
const auth = jsonServerAuth;

server.use(middlewares);

// Set up auth rules
const rules = auth.rewriter({
  users: 600, // Permissions for 'users' resource
});

server.use(rules);
server.use(auth);

// Set up the mock database (db.json)
server.use(router);

// Start the server on port 5000
server.listen(5000, () => {
  console.log('Backend server is running at http://localhost:5000');
});
