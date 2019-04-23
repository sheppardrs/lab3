import React from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: 0 };
    // this.state = { deltaPosition: { x: 0, y: 0 } };
    this.position = { x: [props.note.x], y: [props.note.y] };
    this.handleDrag = this.handleDrag.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDrag(e, ui) {
    const newPos = { x: this.props.note.x + ui.deltaX, y: this.props.note.y + ui.deltaY };
    console.log('hi we moving!', newPos, this.props.id);
    this.props.handlePosChange(this.props.id, newPos);
  }

  handleDelete() {
    this.props.handleNoteDelete(this.props.id);
  }

  handleEdit() {
    this.setState({ isEditing: 1 });
    this.props.handleEdit(this.props.id);
  }

  handleChange(e) {
    this.props.handleNoteChange(e);
  }

  handleSubmit(e) {
    console.log('note is calling submit.');
    this.props.handleNoteSubmit(this.props.id, e);
    this.setState({ isEditing: 0 });
  }

  renderNote() {
    if (this.state.isEditing) {
      return (
        // <Draggable
        //   grid={[25, 25]}
        //   defaultPosition={{ x: this.props.note.x, y: this.props.note.y }}
        //   onDrag={this.handleDrag}
        // >
        <form onSubmit={this.handleSubmit}>
          <div className="note">
            <div className="note-header">
              <textarea
                type="text"
                id="edittitle"
                name="editTitle"
                placeholder="Add a new note!"
                value={this.props.editingTitle}
                onChange={this.handleChange}
              />
              <button className="save-button" type="submit" value="Submit">
                <i className="fas fa-save" />
              </button>
            </div>
            <div className="noteBody">
              <textarea
                type="text"
                id="editcontent"
                name="editContent"
                placeholder="What do you need to do?"
                value={this.props.editingContent}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </form>
        // </Draggable>
      );
    } else {
      return (
        <Draggable
          grid={[25, 25]}
          defaultPosition={{ x: this.props.note.x, y: this.props.note.y }}
          onDrag={this.handleDrag}
        >
          <div className="note">
            <div className="note-header">
              <h4>{this.props.note.title}</h4>
              <i
                onClick={this.handleDelete}
                tabIndex={-1}
                className="fas fa-trash"
                role="button"
              />
              <i
                onClick={this.handleEdit}
                tabIndex={-1}
                className="fas fa-edit"
                role="button"
              />
            </div>
            {/* <p>{this.props.note.text}</p> */}
            <div
              className="noteBody"
              dangerouslySetInnerHTML={{
              __html: marked(this.props.note.text || ''),
            }}
            />
          </div>
        </Draggable>
      );
    }
  }

  render() {
    return (
      this.renderNote()
    );
  }
}

export default Note;
