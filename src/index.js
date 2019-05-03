import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { edit } from '@fortawesome/free-solid-svg-icons';

// import $ from 'jquery';
import './style.scss';
// const $ = require('jquery');
import AddNote from './components/add_note';
import Note from './components/note';
import * as db from './services/datastore';

// import NoteList from './components/note_list';

function Logo() {
  return (
    <div className="logo">
      <i id="logo_bird" className="fab fa-phoenix-framework fa-4x" />
      <div className="logo-text">
        <p className="logo-life">LIFE</p>
        <p className="logo-slogan">Make It</p>
      </div>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: Immutable.Map(),
      newTitle: '',
      newContent: '',
      editTitle: '',
      editContent: '',
      board: 1,
    };
    this.id = 0;

    this.handleNoteSubmit = this.handleNoteSubmit.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.setNote = this.setNote.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    //    this.handleNoteEdit = this.handleNoteEdit.bind(this);
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      this.setState({ notes: Immutable.Map(notes) });
    });
  }

  // set the note with the id and state
  // use the edit state if edit = 1 which updates
  // use the normal state otherwise, which adds new note
  setNote(id, event, edit) {
    console.log(`edit is ${edit}`);
    if (edit === 1) {
      db.updateNote(id, this.state.editTitle, this.state.editContent);
      this.setState({ editTitle: '', editContent: '' });
    } else {
      const newNote = {
        title: this.state.newTitle,
        text: this.state.newContent,
        x: 0,
        y: 0,
        zIndex: 0,
      };
      this.setState({ newTitle: '', newContent: '' });
      db.addNote(newNote);
    }
    // replaced with firebase stuff
    // this.setState({
    //   notes: this.state.notes.set(id, newNote),
    // });
    event.preventDefault();
  }

  handlePosChange(id, pos) {
    this.setState({
      notes: this.state.notes.update(id, (n) => {
        return Object.assign({}, n, { x: pos.x, y: pos.y });
      }),
    });
  }

  handleNoteChange(event) {
    const input = event.target.name;
    if (input === 'newTitle') {
      this.setState({ [input]: event.target.value });
    } else if (input === 'newContent') {
      this.setState({ [input]: event.target.value });
    } else if (input === 'editTitle') {
      this.setState({ [input]: event.target.value });
    } else if (input === 'editContent') {
      this.setState({ [input]: event.target.value });
    }
    // console.log('Doing the changing');
    // event.preventDefault(event);
  }

  handleNoteSubmit(event) {
    console.log('doing the submitting!');
    console.log(`Submitted: ${this.state.newTitle} ${this.state.newContent}`);
    this.setNote(this.id, event, 0);
    this.id += 1;
    // const newNote = {
    //   title: this.state.newTitle,
    //   text: this.state.newContent,
    //   x: 0,
    //   y: 0,
    //   zIndex: 0,
    // };
    //
    // this.setState({
    //   notes: this.state.notes.set(this.id, newNote),
    // });
    // this.id += 1;
    // this.setState({ newTitle: '', newContent: '' });
    // event.preventDefault();
  }

  // handleNoteEdit(event) {
  //   const input = event.target.name;
  //   if (input === 'editTitle') {
  //     this.setState({ [input]: event.target.value });
  //   } else if (input === 'editContent') {
  //     this.setState({ [input]: event.target.value });
  //   }
  // }

  saveNote(id, event) {
    this.setNote(id, event, 1);
  }

  deleteNote(id) {
    db.deleteNote(id);
    // this.setState({
    //   notes: this.state.notes.delete(id),
    // });
  }

  handleEdit(id) {
    this.setState({
      editTitle: this.state.notes.get(id).title,
      editContent: this.state.notes.get(id).text,
    });
  }

  render() {
    return (
      <div id="page">
        <Logo />
        <div id="addnote">
          <AddNote
            title={this.state.newTitle}
            content={this.state.newContent}
            handleChange={this.handleNoteChange}
            handleSubmit={this.handleNoteSubmit}
          />
        </div>
        <div id="notes-section">
          {this.state.notes.entrySeq().map(([id, note]) => {
            if (this.state.board === note.board) {
              return (
                <div key={id}>
                  <Note key={id}
                    id={id}
                    note={note}
                    handlePosChange={db.updateNoteLoc}
                    handleNoteDelete={this.deleteNote}
                    handleNoteChange={this.handleNoteChange}
                    handleNoteSubmit={this.saveNote}
                    handleEdit={this.handleEdit}
                    editingTitle={this.state.editTitle}
                    editingContent={this.state.editContent}
                  />
                </div>);
            } else { console.log('wrong board'); return (''); }
          })}
        </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));


// console.log('starting up!');
