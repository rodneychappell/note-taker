const noteData = require('../db/store');
const router = require('express').Router();


router.get("/notes", (req, res) => {
    noteData
        .getNotes()
        .then((notes) => {
            return res.json(notes)
        })
        .catch((err) => res.status(500).json(err))
});


router.post("/notes", (req, res) => {
    noteData
        .addNotes(req.body)
        .then((notes) => {
            return res.json(notes)
        })
        .catch((err) => res.status(500).json(err))
   

})

router.delete("/notes/:id", (req, res) => {
    noteData
        .deleteNotes(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch((err) => res.status(500).json(err))
})

module.exports = router;

