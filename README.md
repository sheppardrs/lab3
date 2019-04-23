# Lab 3 React Notes 
## CS52 with Tim Tregubov
###Sheppard Somers
April 2019

# Goal
Create a simple note taking website using react and firebase. Additionally, add some functionality with react-draggable and immutable.js. 

# Product
The website displays an add note section at the top with notes below it. Notes can be deleted or edited or dragged around the page. Any changes to the notes persist as the notes are stored in firebase. The notes support markdown syntax in the content section (not the title section). 

## Missteps
I had some trouble updating the position of each note in firebase. Somewhere in reading it from firebase and using it locally, it was being read as a string when I added the change in position to it, making it a useless and very long string that was stored in firebase. I got around this by simplifying the number of steps used in passing the position from firebase to the app to the note and back from the note to firebase to be read by the app again. 
There were also some difficulties with styling the textareas and making the editing happen in place. 

## What worked
Setting up state and various components worked well.

# Setup, Test, Deploy
## Setup 
run ```yarn```
## Test 
```yarn start```
## Deploy 
Check what url you are deploying to in ```package.json``` under ```scripts``` ```deploy```. Then run 
```yarn deploy``` 
to publish to surge. 

# Sources 
I mainly relied on the class assignment for this, but also the documentation of the libraries added like immutable js and react-draggable. I did do most of this assignment before on my own repo, so the classroom one only has the recent commits. I also consulted with Regina Yan on the assignment generalities. Naturally, the standard stackoverflow, w3schools, and so on were used. 