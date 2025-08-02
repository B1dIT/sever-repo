// import controller
const VocabController = require("../controllers/vocabController")

const isAdmin = require('../middlewares/roleMiddle'); 
const auth = require('../middlewares/authMiddleware');  

//declare endpoint with API  method & controller function
const VocabRoute = (app) => {
   

    app.route("/vocabs/search")
    .get(VocabController.searchVocab) 


 //group all API without :"id"
    app.route("/vocabs")
    .get(VocabController.viewAllvocabs)
    .post(auth,isAdmin,VocabController.createVocab)
    .delete(auth,isAdmin,VocabController.deleteAllVocabs)
    
    

    //group all API with"id"
    app.route("/vocabs/:id")
    .get(VocabController.viewByVocabById)
    .put(auth,isAdmin,VocabController.updateVocab)
    .delete(auth,isAdmin,VocabController.deleteVocab)

    
    
}
module.exports = VocabRoute