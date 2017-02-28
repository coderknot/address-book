//Business logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}
function Address(street, city, state, addressType) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.addressType = addressType;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Address.prototype.fullAddress = function() {
  return this.addressType + ", " + this.street + ", " + this.city + ", " + this.state;
}

function resetFields() {
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
    $("input.new-address-type").val("");
}

function addFields() {
  $("#new-addresses").append('<div class="new-address added-address">' +
  '<div class="form-group">' +
    '<label for="new-address-type">Address Type</label>' +
    '<select class="form-control new-address-type">' +
    '<option value="" disabled selected>Select your option</option>' +
      '<option>Home</option>' +
      '<option>Mailing</option>' +
      '<option>Business</option>' +
      '<option>Temporary</option>' +
    '</select>' +
  '</div>' +
  '<div class="form-group">' +
  '<label for="new-street">Street</label>' +
  '<input type="text" class="form-control new-street">' +
  '</div>' +
  '<div class="form-group">' +
  '<label for="new-city">City</label>' +
  '<input type="text" class="form-control new-city">' +
  '</div>' +
  '<div class="form-group">' +
  '<label for="new-state">State</label>' +
  '<input type="text" class="form-control new-state">' +
  '</div>' +
  '</div>'
  // + '<span class="btn btn-primary" id="remove-address">Remove</span>'
);
}

//User interface logic
$(document).ready(function() {

  $("#add-address").click(function() {
    addFields();
  });

  // $("#remove-address").click(function() {
  //   $(".added-address").remove();
  // });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var inputtedAddressType = $(this).find("select.new-address-type").val();
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedAddressType);
      newContact.addresses.push(newAddress);
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
      $("ul#addresses").append('<li><span class="address-property">Type:</span> ' + address.addressType + ', <span class="address-property">Street:</span> ' + address.street + ', <span class="address-property">City:</span> ' + address.city + ', <span class="address-property">State:</span> ' + address.state + '</li>');
      });
    });

    resetFields();
    $(".added-address").remove();
  });
});
