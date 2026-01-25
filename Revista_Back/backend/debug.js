const controller = require('./controllers/articleController');
const authUser = require('./Middleware/authenticateUser');
const authAdmin = require('./Middleware/authenticateAdmin');

console.log('--- DEBUG START ---');
console.log('Type of addComment:', typeof controller.addComment);
console.log('Type of authUser:', typeof authUser);
console.log('Type of authAdmin:', typeof authAdmin);
console.log('--- DEBUG END ---');
