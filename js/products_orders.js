fetch("https://database-api-2.herokuapp.com/products_orders").then((res) => {
  res.text().then((data) => {
    let product_orderData = JSON.parse(data);
    console.log(product_orderData);
    if (product_orderData.length > 0) {
      let temp = "";
      product_orderData.forEach((product_order) => {
        temp += '<div class="card" style="margin-top: 20px;">';
        temp += `<h5 class="card-header">Order ${product_order.orderID}</h5>`;
        temp += `<div class="card-body">`;
        temp += `<p><b>Order ID:</b> ${product_order.orderID}</p>`;
        temp += `<p><b>Product ID:</b> ${product_order.productID}</p>`;
        temp += `<button href="#" class="btn btn-primary" style="margin: 5px;">Edit Order</button>`;
        temp += `<button class="btn btn-danger" onclick="deleteProdOrd(\'${product_order.orderID}\',\'${product_order.productID}\')">Delete</button></div></div>`;
      });
      document.getElementById("products-orders").innerHTML = temp;
    }
  });
});

//----------------- DELETE ------------------------------

function deleteProdOrd(order, prod) {

  let data = {
    orderID: order,
    productID: prod
  }

  console.log(data);

  fetch("https://database-api-2.herokuapp.com/products_orders", {
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