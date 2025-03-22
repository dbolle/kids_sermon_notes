afunction onFormSubmit(e) {
  Logger.log("Execution Started")
  Logger.log(e);
  Logger.log(JSON.stringify(e));
  // Extract responses by question title
  var namedValues = e.namedValues;
  var sermonDate = namedValues["What is the date of the sermon?"][0];
  var sermonText = namedValues["What is the sermon text?"][0];
  var bingoWords = namedValues["Please enter 24 words for sermon bingo separated by commas. (e.g. \"Jesus, cross, grace, ...\")"][0];

  // Define the template file name
  var templateName = "Autosubmit Kids Sermon Notes Template - Word Search";

  // Find the template file in Drive (ensure the name is unique)
  var files = DriveApp.getFilesByName(templateName);
  if (!files.hasNext()) {
    Logger.log("Template file not found.");
    return;
  }
  var templateFile = files.next();

  // Make a copy of the template, naming it with the sermon date
  var newFileName = sermonDate;  // Consider formatting the date if needed
  var newFile = templateFile.makeCopy(newFileName);

  // Open the new spreadsheet
  var newSs = SpreadsheetApp.open(newFile);

  // Get the tab "Pushed Data Entry" from the new spreadsheet
  var pushedSheet = newSs.getSheetByName("Pushed Data Entry");
  if (!pushedSheet) {
    Logger.log("Pushed Data Entry sheet not found in the new file.");
    return;
  }

  // Copy the responses into designated cells (customize cell locations as needed)
  pushedSheet.getRange("A2").setValue(sermonDate);
  pushedSheet.getRange("B2").setValue(sermonText);
  pushedSheet.getRange("C2").setValue(bingoWords);

  //Prepare the targetSheet variable for the WordSearch function.
  var targetSheet = newSs.getSheetByName("WordSearch");
  generateWordSearch(targetSheet);

  // Now call your function to generate the word search.
  generateWordSearch(targetSheet);
}
