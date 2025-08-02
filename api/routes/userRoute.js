const UserController = require('../controllers/userController'); 
const auth = require('../middlewares/authMiddleware');       // check token
const isAdmin = require('../middlewares/roleMiddle');    

const UserRoute = (app) => {
  // User
  app.route('/api/auth/register')
    .post(UserController.registerUser);

  app.route('/api/auth/login')
    .post(UserController.loginUser);

 



  // For admin
  app.route('/api/users')
    .get(auth, isAdmin, UserController.getAllUsers);
    

  app.route('/api/users/:id')
    .get(auth, isAdmin, UserController.getUserById)   
    .put(auth, isAdmin, UserController.updateUser)
    .delete(auth, isAdmin, UserController.deleteUser);
};
module.exports = UserRoute;
