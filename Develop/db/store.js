const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid')

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync("db/db.json", "utf8")
    }

    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }

    getNotes() {
        return this.read()
            .then((note) => {
                let information;
                try {  
                    information = [].concat(JSON.parse(note))

                } catch (err) {
                    
                    information = []

                }
                return information
        })
    }

    addNotes(note) {
        console.log(note)
        let noteTitle = note.title;
        let noteText = note.text;

        if (!noteTitle || !noteText) {
            throw new err("Need more information.")
        }

        const noteId = uuidv4();

        const newNote = {
            title: noteTitle,
            text: noteText,
            id: noteId
        }
        
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((newNotes) => this.write(newNotes))
            .then (() => newNote)
    }

    deleteNotes(id) {
        return this.getNotes()
            .then((note) => note.filter((notes) => notes.id !== id))
            .then((filteredNote) => this.write(filteredNote))
    }
}

module.exports = new Store();