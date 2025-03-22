# kids_sermon_notes
This project is about creating an extremely low maintenance way of creating a kids' sermon notes bulletin.

Goal:
A preacher submits a Google form with the service date, sermon text, and 24 words that will be used in the sermon.
A Google Sheet gets generated:
  The first page has the service date, passage, and sermon bingo.
  The second page is a static blank page for coloring.
  The third page has catechism questions which are automatically selected based on the date and a word search genertated from the sermon bingo words and a selection of words from the catechism questions.
  The fourth page is a set of static questions encouraging the kids to engage the sermon material.


High level workflow
1) Submit a Google Form response answering three questions
   a) What is the date of the sermon?
   b) What is the sermon text?
   c) Please enter 24 words for sermon bingo separated by commas. (e.g. "Jesus, cross, grace, ...")
2) The Google Form creates a Google Sheet entry that has an onFormSubmit trigger the trigger has 2 functions
   a) Duplicate of the template Sheet, rename it to the sermon date, and copy the responses from the Form into the new sheet
   b) Generate a Word Search in the Google sheet
3) The new sheet automatically fills dynamic data into the bulletin
   a) Get ESV text via API
   b) Select 4 catechism questions based on the date


Guide to set up
1) Set up the Google Sheet Template
2) Create Google Form


As a note, I started this project with a Google Sheet and was initially generating everything from within the sheet on the Data Entry tab and copy and pasting the word search from an external source. I then added the Google Form and updated the word search but haven't removed the features from the Data Entry tab, so you could run it without the Google Form if you want.
