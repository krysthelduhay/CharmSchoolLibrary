// Array that stores every borrowing record as a text string
let records = [
  "Blair Willows - The Secret Garden", // Record at index 0
  "Chloe Summers - Harry Potter", // Record at index 1
  "Ella Rose - The Little Prince", // Record at index 2
  "Sofia Grace - Mystery Island", // Record at index 3
  "Lily Parker - Basic Mathematics", // Record at index 4
]; // End of the starting records array

// Function that redraws the list of records on the page
function displayRecords() {
  // Get the <ul> element where records are shown
  const recordList = document.getElementById("recordList");
  // Get the element that shows the total number of records
  const recordLength = document.getElementById("recordLength");

  // Clear the list so old items are not duplicated
  recordList.innerHTML = "";

  // Loop through every record, getting the record and its index
  records.forEach(function (record, index) {
    // Create a new <li> element for this record
    const listItem = document.createElement("li");
    // Set the text to "index: record" (e.g. "0: Blair Willows - ...")
    listItem.textContent = `${index}: ${record}`;
    // Add the <li> to the <ul> so it appears on the page
    recordList.appendChild(listItem);
  }); // End of the loop

  // Update the total count using the array's length
  recordLength.textContent = records.length;
} // End of displayRecords

// Function that shows a message in the Library Results box
function displayResult(message) {
  // Get the results box element
  const result = document.getElementById("result");
  // Replace its content with the new message inside a <p>
  result.innerHTML = `<p>${message}</p>`;
} // End of displayResult

// Function that smoothly scrolls the page to the Library Results section
function scrollToResults() {
  // Get the whole results card using its id
  const resultsSection = document.getElementById("resultsSection");
  // Scroll it into view, smoothly, aligned to the middle of the screen
  resultsSection.scrollIntoView({ behavior: "smooth", block: "center" });
} // End of scrollToResults

// Function that adds a new record to the array
function addRecord(record) {
  // Check if the record is empty after removing extra spaces
  if (record.trim() === "") {
    // Show an error message in the results box
    displayResult("Please enter a student name and book title.");
    // Stop the function here
    return;
  } // End of the empty check

  // Add the new record to the end of the array
  records.push(record);
  // Redraw the list so the new record shows
  displayRecords();

  // Show a success message with the added record in bold
  displayResult(`Record added successfully: <strong>${record}</strong>`);
} // End of addRecord

// Function that removes the last record from the array
function removeLastRecord() {
  // Check if the array is empty
  if (records.length === 0) {
    // Tell the user there is nothing to remove
    displayResult("There are no records to remove.");
    // Stop the function here
    return;
  } // End of the empty check

  // Remove the last item from the array and save it
  const removedRecord = records.pop();
  // Redraw the list so the removed record disappears
  displayRecords();

  // Show which record was removed
  displayResult(`Removed last record: <strong>${removedRecord}</strong>`);
} // End of removeLastRecord

// Function that finds a record using its index number
function findRecordByIndex(index) {
  // Check if the input is empty or not a number
  if (index === "" || isNaN(index)) {
    // Ask the user for a valid index
    displayResult("Please enter a valid index number.");
    // Stop the function here
    return;
  } // End of the validity check

  // Convert the input (a string) into a real number
  index = Number(index);

  // Check if the index is outside the array's range
  if (index < 0 || index >= records.length) {
    // Tell the user the valid range of indexes
    displayResult(
      `Invalid index. Please enter an index from 0 to ${records.length - 1}.`,
    );
    // Stop the function here
    return;
  } // End of the range check

  // Get the record at that index using .at()
  const foundRecord = records.at(index);

  // Show the record that was found
  displayResult(`Record at index <strong>${index}</strong>: ${foundRecord}`);
} // End of findRecordByIndex

// Function that joins all records into one string using a separator
function joinRecords(separator) {
  // Combine every record, placing the separator between each one
  const joinedRecords = records.join(separator);

  // Show the joined string in the results box
  displayResult(`<strong>Joined Records:</strong><br>${joinedRecords}`);
} // End of joinRecords

// Function that converts the array to a comma-separated string
function convertRecordsToString() {
  // Convert the array into a string using toString()
  const stringRecords = records.toString();

  // Show the converted string in the results box
  displayResult(
    `<strong>Array converted to String:</strong><br>${stringRecords}`,
  );
} // End of convertRecordsToString

// Run this code when the "Add Borrowing Record" button is clicked
document.getElementById("addButton").addEventListener("click", function () {
  // Read the student name and remove extra spaces
  const studentName = document.getElementById("studentName").value.trim();
  // Read the book title and remove extra spaces
  const bookTitle = document.getElementById("bookTitle").value.trim();

  // Check if either field is empty
  if (studentName === "" || bookTitle === "") {
    // Show an error message
    displayResult("Please enter both the student name and book title.");
    // Stop here so nothing is added
    return;
  } // End of the empty check

  // Combine the name and title into one record string
  const newRecord = `${studentName} - ${bookTitle}`;

  // Add the record to the array and update the page
  addRecord(newRecord);

  // Clear the student name input
  document.getElementById("studentName").value = "";
  // Clear the student ID input
  document.getElementById("studentId").value = "";
  // Clear the book title input
  document.getElementById("bookTitle").value = "";
  // Reset the category dropdown
  document.getElementById("bookCategory").value = "";
  // Clear the borrow date input
  document.getElementById("borrowDate").value = "";
}); // End of the add button listener

// Run this code when the "Remove Last" button is clicked
document.getElementById("removeButton").addEventListener("click", function () {
  // Remove the last record
  removeLastRecord();
  // Scroll up to the Library Results section
  scrollToResults();
}); // End of the remove button listener

// Run this code when the "Find" button is clicked
document.getElementById("findButton").addEventListener("click", function () {
  // Read the index typed by the user
  const index = document.getElementById("indexInput").value;
  // Look up the record at that index
  findRecordByIndex(index);
  // Scroll up to the Library Results section
  scrollToResults();
}); // End of the find button listener

// Run this code when the "Join Records" button is clicked
document.getElementById("joinButton").addEventListener("click", function () {
  // Join the records using " | " as the separator
  joinRecords(" | ");
  // Scroll up to the Library Results section
  scrollToResults();
}); // End of the join button listener

// Run this code when the "Convert to String" button is clicked
document.getElementById("stringButton").addEventListener("click", function () {
  // Convert the array to a string and show it
  convertRecordsToString();
  // Scroll up to the Library Results section
  scrollToResults();
}); // End of the string button listener

// Show the starting records on the page as soon as it loads
displayRecords();
