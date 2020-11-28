//-----------------ORDERS------------------------------
fetch("https://database-api-2.herokuapp.com/orders").then((res) => {
  res.text().then((data) => {
    let orderData = JSON.parse(data);
    console.log(orderData);
    if (orderData.length > 0) {
      let temp = "";
      orderData.forEach((order) => {
        temp += '<div class="card" style="margin-top: 20px;">';
        temp += `<h5 class="card-header">Order ${order.orderID}</h5>`;
        temp += `<div class="card-body">`;
        temp += `<p><b>Customer ID:</b> ${order.customerID}</p>`;
        temp += `<p><b>Deliverer ID:</b> ${order.delivererID}</p>`;
        temp += `<p><b>Date Ordered:</b> ${order.dateOrdered}</p>`;
        temp += `<p><b>Delivery Status:</b> ${order.deliveryStatus}</p>`;
        temp += `<p><b>Departure Time:</b> ${order.departureTime}</p>`;
        temp += `<p><b>Arrival Time:</b> ${order.arrivalTime}</p>`;
        temp += `<button class="btn btn-danger">Delete</button></div></div>`;
      });
      document.getElementById("all-orders").innerHTML = temp;
    }
  });
});

//-----------------DELIVERERS------------------------------
fetch("https://database-api-2.herokuapp.com/deliverers").then((res) => {
  res.text().then((data) => {
    let delivererData = JSON.parse(data);
    if (delivererData.length > 0) {
      let temp = "";
      delivererData.forEach((deliverer) => {
        temp += "<tr>";
        temp += `<th scope=\"row\">${deliverer.delivererID}</th>`;
        temp += "<td>" + deliverer.firstName + "</td>";
        temp += "<td>" + deliverer.lastName + "</td>";
        temp += `<td><button href="#" class="btn btn-primary" style="margin: 5px;">Update</button></td></tr>`;
      });
      document.getElementById("deliverer-data").innerHTML = temp;
    }
  });
});

//----------------- POST REQ ------------------------------

const myForm = document.getElementById('my-form');
myForm.addEventListener('submit', function (e) {

  e.preventDefault();

  let data = {
    firstName: document.getElementById('fname').value,
    lastName: document.getElementById('lname').value
  }

  console.log(data);

  fetch("https://database-api-2.herokuapp.com/deliverers", {
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
    return response.text()
  }, function (error) {
    console.log(error);
  })
});