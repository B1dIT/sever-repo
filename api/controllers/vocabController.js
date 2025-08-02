//import model
const Vocab = require('../models/vocabModel')

//declare
const viewAllvocabs = async (req, res) => {
    try {
        const vocabs = await Vocab.find({})
        res.status(200).json(vocabs)

    } catch (err) {
        res.status(500).send(err)
    }
}
const createVocab = async (req, res) => {
    try {
        const newVocab = req.body
        await Vocab.create(newVocab);
        //option 1: show new vocab value
        res.status(201).json(newVocab);
        //option 2: show success message
        //   res.status(201).json({'message': 'success'})



    } catch (err) {
        res.status(400).send(err)
    }
}
const deleteAllVocabs = async (req, res) => {
    try {
        await Vocab.deleteMany()
        res.json({ 'message': 'delete all vocabs success!' })

    } catch (err) {
        res.status(500).send(err)
    }
}
const deleteVocab = async (req, res) => {
    try {
        await Vocab.findByIdAndDelete(req.params.id)
        res.json({ 'message': 'delete vocab success!' })

    } catch (err) {
        res.status(500).send(err)
    }
}
const updateVocab = async (req, res) => {
    try {
        const id = req.params.id
        const updatedVocab = req.body
        await Vocab.findByIdAndUpdate(id, updatedVocab)
        res.json({ 'message': 'update success!' })

    } catch (err) {
        res.status(400).send(err)
    }
}
const viewByVocabById = async (req, res) => {
    try {
        const vocab = await Vocab.findById(req.params.id)
        if (vocab != null) {
            res.status(200).json(vocab)
        }
        else {
            res.status(404).json({ 'message': 'Not found' })
        }

    } catch (err) {
        res.status(500).send(err)
    }
}


const searchVocab = async (req, res) => {
  const query = req.query.keyword;
  
  
  try {
    const results = await Vocab.find({
      $or: [
        { english: { $regex: query, $options: 'i' } },
        { german: { $regex: query, $options: 'i' } },
        { vietnamese: { $regex: query, $options: 'i' } }
      ]
    });

    res.status(200).json(results);
    
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Error searching vocab' });
  }
}


//
module.exports = {
    //create
    createVocab,
    //Read
    viewAllvocabs,
    viewByVocabById,
    //UPDATE
    updateVocab,
    //Delete
    deleteVocab,
    deleteAllVocabs,
    searchVocab

}