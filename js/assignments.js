const requestURL = "http://flip2.engr.oregonstate.edu:3892/orders";
fetch("http://localhost:3892/orders").then((res) => {
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