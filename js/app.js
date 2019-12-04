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
   * Set the value of a field to its saved value from local storage
   */
  function setValue(field, data) {
    // Get the field's name attribute
    var name = field.getAttribute("name");

    // Set the field's value to its saved value
    if (field.type === "checkbox") {
      field.checked = (data[name] === "on") ? true : false;
    } else if (field.type === "radio") {
      field.checked = (data[name] === field.value) ? true : false;
    } else {
      field.value = data[name];
    }
  }

  /**
   * Populate the form with existing values
   */
  function populateForm(data, form) {
    // Bail if the data doesn't exist
    if (!data) return;

    // Parse the JSON data
    data = JSON.parse(data);

    // Get the form fields
    var fields = Array.from(form.querySelectorAll("[data-save]"));

    // Add each value to its field
    fields.forEach(function(field) {
      setValue(field, data);
    });
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

    // Create a variable for storing the value of the current field
    var value;

    // Bail if the field's name attribute is falsy
    if (!fieldName) return;

    // If the fields is a checkbox, use on/off values
    // Otherwise, just use the normal value
    if (event.target.type === "checkbox") {
      value = (event.target.checked) ? "on" : "off";
    } else {
      value = event.target.value;
    }

    // Save the field's value to local storage
    addToLocalStorageObject("data", fieldName, value);
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
  populateForm(data, form);

  // Save form values when input event fires
  form.addEventListener("input", saveData, false);

  // Clear saved values when user submits form
  form.addEventListener("submit", clearData, false);

})();
