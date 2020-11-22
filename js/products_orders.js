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
        temp += `<button class="btn btn-danger">Delete</button></div></div>`;
      });
      document.getElementById("products-orders").innerHTML = temp;
    }
  });
});