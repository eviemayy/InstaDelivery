//-----------------CUSTOMERS GET REQ------------------------------
fetch("https://database-api-2.herokuapp.com/customers").then((res) => {
  res.text().then((data) => {
    let customerData = JSON.parse(data);
    if (customerData.length > 0) {
      let temp = "";
      customerData.forEach((customer) => {
        temp += "<tr>";
        temp += `<th scope=\"row\">${customer.customerID}</th>`;
        temp += "<td>" + customer.firstName + "</td>";
        temp += "<td>" + customer.lastName + "</td>";
        temp += "<td>" + customer.email + "</td>";
        temp += "<td>" + customer.password + "</td>";
        temp += "<td>" + customer.address + "</td>";
        temp += `<td><button class="btn btn-primary" id="update-cust" onclick=\"editCustomer(${customer.customerID})\" style="margin: 5px;">Edit</button></td>`;
        temp += `<td><button class="btn btn-danger" onclick="deleteCustomer(\'${customer.email}\',\'${customer.password}\')" style="margin: 5px;">Delete</button></td></tr>`;
      });
      document.getElementById("customer-data").innerHTML = temp;
    }
  });
});

//----------------- POST REQ ------------------------------

const myForm = document.getElementById('my-form-customers');
myForm.addEventListener('submit', function (e) {

  e.preventDefault();

  let data = {
    firstName: document.getElementById('fname').value,
    lastName: document.getElementById('lname').value,
    email: document.getElementById('email').value,
    password: document.getElementById('psswrd').value,
    address: document.getElementById('address').value
  }

  console.log(data);

  fetch("https://database-api-2.herokuapp.com/customers", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (response) {
    response.status
    response.statusText
    response.headers
    response.url

    location.reload();
    return response.text()
  }, function (error) {
    console.log(error);
  })
});


//----------------- DELETE ------------------------------

function deleteCustomer(eml, pswd) {

  let data = {
    email: eml,
    password: pswd
  }

  console.log(data);

  fetch("https://database-api-2.herokuapp.com/customers", {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (response) {
    response.status
    response.statusText
    response.headers
    response.url

    location.reload();
    return response.text()
  }, function (error) {
    console.log(error);
  });
}


//---------------PUT REQ------------------------

function updatePayment(){
  if(document.getElementById("customer-id").value == ""){
    alert("Customer ID Needed! Press an \"Edit\" button to populate fields.")
    return;
  }

  let data = {
    customerID: document.getElementById("customer-id").value,
    firstName: document.getElementById("fname").value,
    lastName: document.getElementById("lname").value,
    email: document.getElementById("email").value,
    password: document.getElementById("psswrd").value,
    address: document.getElementById("address").value
  }

  fetch("https://database-api-2.herokuapp.com/customers", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function(response) {
    response.status     //=> number 100–599
    response.statusText //=> String
    response.headers    //=> Headers
    response.url        //=> String

    location.reload();
    return response.text()
  }, function(error) {
    console.log(error);
  })
}


function editCustomer(id) {
  

  console.log("Update", id);

  let table = document.getElementById("customer-table");
  for (var i = 1, row; (row = table.rows[i]); i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    for (var j = 0, col; (col = row.cells[j]); j++) {
      let currentRow = row;
      
      //iterate through columns
      //columns would be accessed using the "col" variable assigned in the for loop
      if (col.innerHTML == id) {
        console.log(currentRow);
        console.log("Password", currentRow.cells[4].innerHTML);
        console.log("Checking", col.innerHTML);
        
        document.getElementById('psswrd').value = row.cells[4].innerHTML;
        document.getElementById('lname').value = row.cells[2].innerHTML;
        document.getElementById('address').value = row.cells[5].innerHTML;
        document.getElementById('fname').value = row.cells[1].innerHTML;
        document.getElementById('email').value = row.cells[3].innerHTML;
        let customerID = document.getElementById('customer-id');
        customerID.setAttribute("style", "display:inline");
        customerID.setAttribute("readonly", "readonly");
        customerID.value = id;
      }
    }
  }
}