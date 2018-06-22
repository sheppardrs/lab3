import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
// import $ from 'jquery';
import './style.scss';
// const $ = require('jquery');
import AddNote from './components/add_note';
import Note from './components/note';

// import NoteList from './components/note_list';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: Immutable.Map(),
      newTitle: '',
      newContent: '',
    };
    this.id = 0;

    this.handleNoteSubmit = this.handleNoteSubmit.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
  }

  handleNoteChange(event) {
    const input = event.target.name;
    if (input === 'newTitle') {
      this.setState({ [input]: event.target.value });
    } else if (input === 'newContent') {
      this.setState({ [input]: event.target.value });
    }
    // console.log('Doing the changing');
    // event.preventDefault(event);
  }

  handleNoteSubmit(event) {
    console.log('doing the submitting!');
    console.log(`Submitted: ${this.state.newTitle} ${this.state.newContent}`);
    const newNote = {
      title: this.state.newTitle,
      text: this.state.newContent,
      x: 0,
      y: 0,
      zIndex: 0,
    };

    this.setState({
      notes: this.state.notes.set(this.id, newNote),
    });
    this.id += 1;
    this.setState({ newTitle: '', newContent: '' });
    event.preventDefault();
  }

  render() {
    return (
      <div id="page">
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
            return (
              <div key={id}>
                <Note key={id}
                  id={id}
                  note={note}
                />
              </div>);
          })}
        </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));


// console.log('starting up!');
