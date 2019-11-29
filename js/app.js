;(function(d) {

  "use strict";

  //
  // Variables
  //

  var data = localStorage.getItem("data");
  var form = d.querySelector("form");


  //
  // Functions
  //

  /**
   * Populate the form with existing values
   */
  function populateForm(data) {
    // Bail if the data doesn't exist
    if (!data) return;

    // Parse the JSON data
    data = JSON.parse(data);

    // Add each value to the DOM
    for (var field in data) {
      d.querySelector("[name='" + field + "']").value = data[field];
    }
  }

  /**
   * Add an item to a Storage object
   * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
   */
  function addToLocalStorageObject(name, key, value) {
    // Get the existing data
    var existing = localStorage.getItem(name);

    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    existing = existing ? JSON.parse(existing) : {};

    // Add new data to localStorage Array
    existing[key] = value;

    // Save back to localStorage
    localStorage.setItem(name, JSON.stringify(existing));
  }

  /**
   * Save a form field's value to local storage
   */
  function saveData(event) {
    // Get the current field and its name attribute
    var field = event.target;
    var fieldName = field.getAttribute("name");

    // Bail if the field's name attribute is falsy
    if (!fieldName) return;

    // Save the field's value to local storage
    addToLocalStorageObject("data", fieldName, field.value)
  }

  /**
   * Remove the `data` key from local storage
   */
  function clearData(event) {
    // Stop the form from submitting
    event.preventDefault();

    // Remove the `data` key from local storage
    localStorage.removeItem("data");

    // Submit the form
    this.submit();
  }


  //
  // Init
  //

  // Populate the form with existing values
  populateForm(data);

  // Save form values when input event fires
  form.addEventListener("input", saveData, false);

  // Clear saved values when user submits form
  form.addEventListener("submit", clearData, false);

})(document);
