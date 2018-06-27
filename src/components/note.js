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
    // const { x, y } = this.state.deltaPosition;
    // this.setState({
    //   deltaPosition: {
    //     x: x + ui.deltaX,
    //     y: y + ui.deltaY,
    //   },
    // });
    const { x, y } = this.position;
    this.position.x = x + ui.deltaX;
    this.position.y = y + ui.deltaY;
    console.log('hi we moving!');
    this.props.handlePosChange(this.props.id, this.position);
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
        <form onSubmit={this.handleSubmit} className="editnote">
          <textarea
            type="text"
            id="edittitle"
            name="editTitle"
            placeholder="Add a new note!"
            value={this.props.editingTitle}
            onChange={this.handleChange}
          />
          <textarea
            type="text"
            id="editcontent"
            name="editContent"
            placeholder="What do you need to do?"
            value={this.props.editingContent}
            onChange={this.handleChange}
          />
          <button className="save-button" type="submit" value="Submit">
            <i className="fas fa-save" />
          </button>
        </form>
      );
    } else {
      return (
        <Draggable
          grid={[25, 25]}
          defaulPosition={this.position}
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
