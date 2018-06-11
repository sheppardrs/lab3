# Note Pad
## CS52 Lab 3
## Sheppard Somers
This assignment is based on the direction found on the (CS52 website)[http://cs52.me/assignments/lab/react-notes/]

## Functionality
Notes App:
* Add a note:
  * can either be a single title input + create button
  * or a modal if you prefer with all fields
* Delete a note
* Move a note in x, y
  * optionally in z (zIndex)
* Edit a note:
  * title, content
* Notes:
  * have title and content
  * display with some formatting
* Persists all changes to Firebase in realtime
* Updates based on Firebase events
* is at least as stylish as these mockups

## Overall Structure

### Page
Wraps up all the other components of the page, places all the notes on the page.

### Notes 
Component that stores the content, title, delete, edit button of each note. The component should also store it's own location.

### Add Note
Component for creating the notes with an input box and an add button.
