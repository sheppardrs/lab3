// import React from 'react';
import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBcl2opqeDJ_sxc0zpAxS3DnSm62bnVSec',
  authDomain: 'cs52-lab3-333.firebaseapp.com',
  databaseURL: 'https://cs52-lab3-333.firebaseio.com',
  projectId: 'cs52-lab3-333',
  storageBucket: 'cs52-lab3-333.appspot.com',
  messagingSenderId: '866280343986',
};
firebase.initializeApp(config);

const db = firebase.database();
// const dbRef = db.ref().child('notes');

export function fetchNotes(callback) {
  db.ref('notes').on('value', (snapshot) => {
    const newNotesState = snapshot.val();
    callback(newNotesState);
  });
}

export function addNote(newNote) {
  db.ref('notes').push(newNote);
}

export function deleteNote(id) {
  db.ref('notes').child(id).remove();
}

export function updateNote(id, newTitle, newContent) {
  db.ref('notes').child(id).update({ title: newTitle, text: newContent });
}

export function updateNoteLoc(id, pos) {
  db.ref('notes').child(id).update({ x: pos.x, y: pos.y });
}
