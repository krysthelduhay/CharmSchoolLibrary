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

// Function that returns today's date as "YYYY-MM-DD" (same format as the date input)
function getTodayString() {
  // Get the current date and time
  const today = new Date();
  // Get the year (e.g. 2026)
  const year = today.getFullYear();
  // Get the month (0-11, so add 1) and pad it to 2 digits (e.g. "03")
  const month = String(today.getMonth() + 1).padStart(2, "0");
  // Get the day of the month and pad it to 2 digits
  const day = String(today.getDate()).padStart(2, "0");
  // Combine them into one string like "2026-10-08"
  return `${year}-${month}-${day}`;
} // End of getTodayString

// List of the form field ids that can show an error message
const fieldIds = [
  "studentName", // Student name input
  "studentId", // Student ID input
  "bookTitle", // Book title input
  "bookCategory", // Category dropdown
  "borrowDate", // Borrow date input
]; // End of the field ids list

// Function that shows a red error under one field
function showFieldError(fieldId, message) {
  // Get the input/select element
  const field = document.getElementById(fieldId);
  // Get the small text element under it (its id is the field id + "Error")
  const errorText = document.getElementById(`${fieldId}Error`);
  // Put the error message in the text element
  errorText.textContent = message;
  // Add the "invalid" class so the field gets a red outline
  field.classList.add("invalid");
} // End of showFieldError

// Function that removes the red error from one field
function clearFieldError(fieldId) {
  // Get the input/select element
  const field = document.getElementById(fieldId);
  // Get the small text element under it
  const errorText = document.getElementById(`${fieldId}Error`);
  // Empty the error message
  errorText.textContent = "";
  // Remove the red outline
  field.classList.remove("invalid");
} // End of clearFieldError

// Function that shows a message under the Add button ("error" or "success" style)
function showFormMessage(message, type) {
  // Get the message element under the button
  const formMessage = document.getElementById("formMessage");
  // Set the message text
  formMessage.textContent = message;
  // Set the style class (error = red, success = green)
  formMessage.className = `form-message ${type}`;
} // End of showFormMessage

// Function that clears every field error and the message under the button
function clearFormErrors() {
  // Clear the error of each field one by one
  fieldIds.forEach(clearFieldError);
  // Get the message element under the button
  const formMessage = document.getElementById("formMessage");
  // Empty the message
  formMessage.textContent = "";
  // Reset its class
  formMessage.className = "form-message";
} // End of clearFormErrors

// Function that checks the form values and returns an object of errors (empty object = all valid)
function validateRecordInputs(values) {
  // Object that will store the error message for each invalid field
  const errors = {};

  // Check the student name
  if (values.studentName === "") {
    // Name is empty
    errors.studentName = "Student name is required.";
  } else if (!/^[A-Za-z\s.'-]+$/.test(values.studentName)) {
    // Name has numbers or special symbols
    errors.studentName =
      "Invalid name. Use letters only (no numbers or symbols).";
  } else if (values.studentName.length < 2) {
    // Name is too short
    errors.studentName = "Invalid name. It must be at least 2 characters.";
  } // End of the name check

  // Check the student ID
  if (values.studentId === "") {
    // ID is empty
    errors.studentId = "Student ID is required.";
  } else if (!/^[A-Za-z]+-\d+$/.test(values.studentId)) {
    // ID does not match the PCS-001 format
    errors.studentId = "Invalid ID. Use the format PCS-001.";
  } // End of the ID check

  // Check the book title
  if (values.bookTitle === "") {
    // Title is empty
    errors.bookTitle = "Book title is required.";
  } else if (!/[A-Za-z0-9]/.test(values.bookTitle)) {
    // Title has no letters or numbers
    errors.bookTitle = "Invalid title. Use at least one letter or number.";
  } // End of the title check

  // Check the category
  if (values.bookCategory === "") {
    // No category was chosen
    errors.bookCategory = "Please select a category.";
  } // End of the category check

  // Check the borrow date
  if (values.borrowDate === "") {
    // Date is empty
    errors.borrowDate = "Borrow date is required.";
  } else if (values.borrowDate > getTodayString()) {
    // Date is later than today
    errors.borrowDate = "Invalid date. It cannot be in the future.";
  } // End of the date check

  // Return all the errors found (could be empty)
  return errors;
} // End of validateRecordInputs

// Function that adds a new record to the array
function addRecord(record) {
  // Add the new record to the end of the array
  records.push(record);
  // Redraw the list so the new record shows
  displayRecords();
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
  // Check if there are no records to search
  if (records.length === 0) {
    // Tell the user the list is empty
    displayResult("There are no records to find.");
    // Stop the function here
    return;
  } // End of the empty array check

  // Remove extra spaces from the typed value
  index = String(index).trim();

  // Check if the input is empty
  if (index === "") {
    // Ask the user to type an index
    displayResult("Please enter an index number.");
    // Stop the function here
    return;
  } // End of the empty input check

  // Check if the input is not a number at all (e.g. letters)
  if (isNaN(index)) {
    // Tell the user to enter numbers only
    displayResult(
      "Invalid input. Please enter a number, not letters or symbols.",
    );
    // Stop the function here
    return;
  } // End of the number check

  // Convert the input (a string) into a real number
  index = Number(index);

  // Check if the number has a decimal (e.g. 1.5)
  if (!Number.isInteger(index)) {
    // Tell the user to use whole numbers only
    displayResult("Invalid index. Please enter a whole number (no decimals).");
    // Stop the function here
    return;
  } // End of the whole number check

  // Check if the index is negative
  if (index < 0) {
    // Tell the user indexes start at 0
    displayResult("Invalid index. The index cannot be negative.");
    // Stop the function here
    return;
  } // End of the negative check

  // Check if the index is beyond the last record
  if (index >= records.length) {
    // Tell the user the valid range of indexes
    displayResult(
      `Out of range. Please enter an index from 0 to ${records.length - 1}.`,
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
  // Check if there are no records to join
  if (records.length === 0) {
    // Tell the user the list is empty
    displayResult("There are no records to join.");
    // Stop the function here
    return;
  } // End of the empty array check

  // Combine every record, placing the separator between each one
  const joinedRecords = records.join(separator);

  // Show the joined string in the results box
  displayResult(`<strong>Joined Records:</strong><br>${joinedRecords}`);
} // End of joinRecords

// Function that converts the array to a comma-separated string
function convertRecordsToString() {
  // Check if there are no records to convert
  if (records.length === 0) {
    // Tell the user the list is empty
    displayResult("There are no records to convert.");
    // Stop the function here
    return;
  } // End of the empty array check

  // Convert the array into a string using toString()
  const stringRecords = records.toString();

  // Show the converted string in the results box
  displayResult(
    `<strong>Array converted to String:</strong><br>${stringRecords}`,
  );
} // End of convertRecordsToString

// Run this code when the "Add Borrowing Record" button is clicked
document.getElementById("addButton").addEventListener("click", function () {
  // Collect all the form values (trimmed) into one object
  const values = {
    studentName: document.getElementById("studentName").value.trim(), // Student name
    studentId: document.getElementById("studentId").value.trim(), // Student ID
    bookTitle: document.getElementById("bookTitle").value.trim(), // Book title
    bookCategory: document.getElementById("bookCategory").value, // Selected category
    borrowDate: document.getElementById("borrowDate").value, // Borrow date
  }; // End of the values object

  // Remove old errors before checking again
  clearFormErrors();

  // Check all the inputs and get the errors (if any)
  const errors = validateRecordInputs(values);
  // Get the list of fields that have errors
  const invalidFields = Object.keys(errors);

  // Check if at least one field is invalid
  if (invalidFields.length > 0) {
    // Show the error under each invalid field
    invalidFields.forEach(function (fieldId) {
      showFieldError(fieldId, errors[fieldId]);
    }); // End of the loop
    // Show a general "invalid" message under the button
    showFormMessage(
      "Invalid input. Please fix the highlighted fields.",
      "error",
    );
    // Put the cursor in the first invalid field (no scrolling to the results)
    document.getElementById(invalidFields[0]).focus();
    // Stop here so nothing is added
    return;
  } // End of the error check

  // Combine the name and title into one record string
  const newRecord = `${values.studentName} - ${values.bookTitle}`;

  // Add the record to the array and update the page
  addRecord(newRecord);

  // Show a success message under the button
  showFormMessage(`Record added successfully: ${newRecord}`, "success");

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

// Remove a field's error as soon as the user starts fixing it
fieldIds.forEach(function (fieldId) {
  // Get the field element
  const field = document.getElementById(fieldId);
  // Clear its error when the user types
  field.addEventListener("input", function () {
    clearFieldError(fieldId);
  }); // End of the input listener
  // Clear its error when the user picks a dropdown option or date
  field.addEventListener("change", function () {
    clearFieldError(fieldId);
  }); // End of the change listener
}); // End of the loop

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
