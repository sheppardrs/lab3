import React, { Component } from 'react';

class AddNote extends Component {
  onInputEnter(event) {
    console.log(event.target.value);
  }

  render() {
    return (
      <input onChange={this.onInputEnter} />
    );
  }
}

export default AddNote;
