function generateWordSearch(targetSheet) {
  // Get the parent spreadsheet from targetSheet
  var ss = targetSheet.getParent();
  var dataEntrySheet = ss.getSheetByName("Data Entry");
  if (!dataEntrySheet) {
    Logger.log("Data Entry sheet not found.");
    return;
  }
  
  // Get the words from ranges G16:G29 and I16:I29
  var wordsRange1 = dataEntrySheet.getRange("G16:G29").getValues();
  var wordsRange2 = dataEntrySheet.getRange("I16:I29").getValues();
  
  var words = [];
  
  // Flatten and clean the first range, dropping entries with internal spaces or longer than 10 characters
  wordsRange1.forEach(function(row) {
    var word = row[0];
    if (word) {
      var trimmedWord = word.toString().trim();
      if (trimmedWord !== "" && trimmedWord.indexOf(" ") === -1 && trimmedWord.length <= 10) {
        words.push(trimmedWord.toUpperCase());
      }
    }
  });

  // Flatten and clean the second range, dropping entries with internal spaces or longer than 10 characters
  wordsRange2.forEach(function(row) {
    var word = row[0];
    if (word) {
      var trimmedWord = word.toString().trim();
      if (trimmedWord !== "" && trimmedWord.indexOf(" ") === -1 && trimmedWord.length <= 10) {
        words.push(trimmedWord.toUpperCase());
      }
    }
  });

  Logger.log(words)
  
  // Set grid dimensions (adjust as needed)
  var gridSize = 15;
  
  // Initialize grid as a 2D array filled with empty strings
  var grid = [];
  for (var row = 0; row < gridSize; row++) {
    grid[row] = [];
    for (var col = 0; col < gridSize; col++) {
      grid[row][col] = "";
    }
  }
  
  // Define all eight possible directions
  var directions = [
    {dx: 1, dy: 0},    // right
    {dx: -1, dy: 0},   // left
    {dx: 0, dy: 1},    // down
    {dx: 0, dy: -1},   // up
    {dx: 1, dy: 1},    // diagonal down-right
    {dx: -1, dy: 1},   // diagonal down-left
    {dx: 1, dy: -1},   // diagonal up-right
    {dx: -1, dy: -1}   // diagonal up-left
  ];
  
  // Array to store the words that were successfully placed
  var placedWords = [];
  
  // Place each word into the grid
  words.forEach(function(word) {
    var placed = false;
    var attempts = 0;
    while (!placed && attempts < 100) {
      attempts++;
      var dir = directions[Math.floor(Math.random() * directions.length)];
      var startCol = Math.floor(Math.random() * gridSize);
      var startRow = Math.floor(Math.random() * gridSize);
      var endCol = startCol + dir.dx * (word.length - 1);
      var endRow = startRow + dir.dy * (word.length - 1);
      
      // Check boundaries
      if (endCol < 0 || endCol >= gridSize || endRow < 0 || endRow >= gridSize) continue;
      
      // Check for conflicts (allow overlapping letters)
      var canPlace = true;
      for (var i = 0; i < word.length; i++) {
        var col = startCol + dir.dx * i;
        var row = startRow + dir.dy * i;
        if (grid[row][col] !== "" && grid[row][col] !== word[i]) {
          canPlace = false;
          break;
        }
      }
      if (!canPlace) continue;
      
      // Place the word letter by letter
      for (var i = 0; i < word.length; i++) {
        var col = startCol + dir.dx * i;
        var row = startRow + dir.dy * i;
        grid[row][col] = word[i];
      }
      placed = true;
      placedWords.push(word);
    }
    if (!placed) {
      Logger.log("Could not place word: " + word);
    }
  });
  
  // Fill empty cells with random letters
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var row = 0; row < gridSize; row++) {
    for (var col = 0; col < gridSize; col++) {
      if (grid[row][col] === "") {
        grid[row][col] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }
  
  // Write the grid to the target sheet (assumes grid starts at A1)
  targetSheet.clearContents();
  targetSheet.getRange(1, 1, gridSize, gridSize).setValues(grid);
  
  // Write the list of placed words below the grid
  var startRowForList = gridSize + 2; // one row gap after the grid
  var placedWords2D = placedWords.map(function(word) { return [word]; });
  targetSheet.getRange(startRowForList, 1, placedWords2D.length, 1).setValues(placedWords2D);
}
