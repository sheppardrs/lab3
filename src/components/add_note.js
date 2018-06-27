import React, { Component } from 'react';


class AddNote extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log('calling handle change');
    this.props.handleChange(event);
  }

  handleSubmit(event) {
    this.props.handleSubmit(event);
  }

  render() {
    return (
      <div className="addnote-for-border">
        <form onSubmit={this.handleSubmit} className="addnote">
          <div>Title:</div>
          <textarea
            type="text"
            id="titleinput"
            name="newTitle"
            placeholder="Add a new note!"
            value={this.props.title}
            onChange={this.handleChange}
          />
          <div>Note:</div>
          <textarea
            type="text"
            id="noteinput"
            name="newContent"
            placeholder="What do you need to do?"
            value={this.props.content}
            onChange={this.handleChange}
          />
          <button className="save-button" type="submit" value="Submit">
            <i className="fas fa-save" />
          </button>
        </form>
      </div>
    );
  }
}

export default AddNote;
