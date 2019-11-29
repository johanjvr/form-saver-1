;(function(d) {

  "use strict";

  //
  // Variables
  //

  var form = d.querySelector("form");
  var fields = Array.prototype.slice.call(form.elements);
  var data = {};


  //
  // Functions
  //

  /**
   * Add a form field to the global data object as a property
   */
  function addPropertyToData(field) {
    if (!field || !field.hasAttribute("name")) return;
    data[field.getAttribute("name")] = field.value;
  }

  // function setData() {}

  //
  // Init
  //

  // Add each form field to the global data object as a property
  fields.forEach(addPropertyToData);

  // form.addEventListener("input", function(event) {}, false);
  // form.addEventListener("submit", function(event) {}, false);

  console.log(data);

})(document);
