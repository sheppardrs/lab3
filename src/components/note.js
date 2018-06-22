import React from 'react';

const Note = (props) => {
  return (
    <div className="notes">
      <h4>{props.note.title}</h4>
      <p>{props.note.text}</p>
    </div>
  );
};

export default Note;
