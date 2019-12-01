;(function() {

  "use strict";

  //
  // Variables
  //

  var data = localStorage.getItem("data");
  var form = document.querySelector("form");


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
      document.querySelector("[name='" + field + "']").value = data[field];
    }
  }

  /**
   * Add an item to a JSON object in local storage
   * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
   */
  function addToLocalStorageObject(name, key, value) {
    // Get the existing data
    var existing = localStorage.getItem(name);

    // If no existing data, create an object literal
    // Otherwise, convert the localStorage string into an object literal
    existing = existing ? JSON.parse(existing) : {};

    // Add new data to localStorage object
    existing[key] = value;

    // Save back to localStorage
    localStorage.setItem(name, JSON.stringify(existing));
  }

  /**
   * Save a form field's value to local storage
   */
  function saveData(event) {
    // Get the current field's name attribute
    var fieldName = event.target.getAttribute("name");

    // Bail if the field's name attribute is falsy
    if (!fieldName) return;

    // Save the field's value to local storage
    addToLocalStorageObject("data", fieldName, event.target.value);
  }

  /**
   * Remove the `data` key from local storage
   */
  function clearData(event) {
    localStorage.removeItem("data");
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

})();
