var Contact = function(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
}



var contacts = [];
contacts.push(new Contact("Petter", "Petter@gmail.com", "472 489 01"));
contacts.push(new Contact("Thomas", "Thomas@gmail.com", "472 489 02"));


var listContacts = function() {
    document.getElementById('displayContacts').innerHTML = " ";
    for (var i = 0; i < contacts.length; i++) {
        document.getElementById('displayContacts').innerHTML += '<tr><td id="name' + i + '">' + contacts[i].name + '</td><td id="email' + i + '"><a href="mailto:' + contacts[i].email + '">' + contacts[i].email + '</a></td><td id="phone' + i + '">' + contacts[i].phone + '</td><td><button onclick=editContact(' + i + ')>Edit</button></div><button onclick=deleteContact(' + i + ')>Delete</button></td></tr>';
    }
}

var addNewContact = function() {
    var name = document.getElementById('inputName').value;
    var email = document.getElementById('inputEmail').value;
    var phone = document.getElementById('inputPhone').value;
    var validateionPatternEmail = /^[^ ]+@[^ ]+.[a-z]{2,3}$/;
    var validateionPatternTel = /^[0-9 ()+-]+$/;

    if (!(name == "") && email.match(validateionPatternEmail) || phone.match(validateionPatternTel)) {

        var contact = new Contact(name, email, phone);
        contacts.push(contact);
        listContacts();

    } else if (name == "") {
        window.alert("Input name")
    } else if (!(email.match(validateionPatternEmail)) && (!(email == ""))) {
        window.alert("Input valid email")

    } else if (!(phone.match(validateionPatternTel)) && (!(phone == ""))) {
        window.alert("Input valid phonenumber")
    } else {
        window.alert("Input either email or phone number")
    }
}

var deleteContact = function(i) {
    if (confirm("Are you sure you want to delete?") == true) {
        contacts.splice(i, 1);
        listContacts();
    }
}

var editContact = function(i) {
    contactId = i;
    document.getElementById("inputName").value = contacts[i].name;
    document.getElementById("inputEmail").value = contacts[i].email;
    document.getElementById("inputPhone").value = contacts[i].phone;
    document.getElementById("submitButtons").innerHTML = '<button id="updateButton" onclick=submitEditedContact(contactId)>Submit</button>';

}

var submitEditedContact = function(i) {
    contacts[i].name = document.getElementById("inputName").value;
    contacts[i].email = document.getElementById("inputEmail").value;
    contacts[i].phone = document.getElementById("inputPhone").value;

    document.getElementById("inputName").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputPhone").value = "";

    listContacts();
}

function inputValidation() {

    var name = document.getElementById('inputName').value;
    var email = document.getElementById('inputEmail').value;
    var phone = document.getElementById('inputPhone').value;
    var validateionPatternEmail = /^[^ ]+@[^ ]+.[a-z]{2,3}$/;
    var validateionPatternTel = /^[0-9 ()+-]+$/;

    if (!(name == "") && email.match(validateionPatternEmail) || phone.match(validateionPatternTel)) {

    }
}


function searchFun() {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("displayContacts");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        } else {
            tr[i].style.display = "none";
        }
    }
}


listContacts();