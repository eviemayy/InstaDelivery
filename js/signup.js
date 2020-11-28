//-----------------CUSTOMERS------------------------------
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
        temp += `<td><button href="#" class="btn btn-primary" id="update-cust" style="margin: 5px;">Update</button></td>`;
        temp += `<td><button class="btn btn-danger" onclick="deleteCustomer(\'${customer.email}\',\'${customer.password}\')" style="margin: 5px;">Delete</button></td></tr>`;
      });
      document.getElementById("customer-data").innerHTML = temp;
    }
  });
});

//----------------- POST REQ ------------------------------

const myForm = document.getElementById('my-form');
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