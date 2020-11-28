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
        temp += `<input type="text" id="order-id" name="order-id" placeholder="Order ID" style="display:none;">`;
        temp += `<input type="text" id="product-id" name="product-id" placeholder="Product ID" style="display:none;"><br style="display:none;">`;
        temp += `<button class="btn btn-primary" onclick=\"editOrder(${product_order.orderID},${product_order.productID})\" style="margin: 5px;">Edit Order</button>`;
        temp += `<button class="btn btn-danger">Delete</button>`;
        temp += `<button class="btn btn-primary" style="margin: 5px; display:none;">Update</button></div></div>`;
      });
      document.getElementById("products-orders").innerHTML = temp;
    }
  });
});

function editOrder(orderID, productID) {
  let cards = document.getElementsByClassName("card-body");
  for (var i = 0; i < cards.length; i++) {
    console.log("Checking: ", cards[i].childNodes);
    let textOrderID = cards[i].childNodes[0].innerText.split(" ");
    let cardOrderID = textOrderID[textOrderID.length - 1];
    let textProductID = cards[i].childNodes[1].innerText.split(" ");
    let cardProductID = textProductID[textProductID.length - 1];

    //Hide the text
    if (cardOrderID == orderID && cardProductID == productID) {
      cards[i].childNodes[0].setAttribute("style", "display:none;");
      cards[i].childNodes[1].setAttribute("style", "display:none;");
      cards[i].childNodes[5].setAttribute("style", "display:none;");
      cards[i].childNodes[6].setAttribute("style", "display:none;");
      cards[i].childNodes[7].setAttribute("style", "display:inline-block;");
      cards[i].childNodes[2].setAttribute("style", "display:inline-block;");
      cards[i].childNodes[2].value = cardOrderID;
      cards[i].childNodes[2].setAttribute("readonly", "readonly");
      cards[i].childNodes[3].setAttribute("style", "display:inline-block;");
      let product = cards[i].childNodes[3];
      cards[i].childNodes[3].value = cardProductID;
      cards[i].childNodes[4].setAttribute("style", "display:inline-block;");

      // Update button to actually update values
      cards[i].childNodes[7].addEventListener("click", function () {
        console.log("CHECKING");
        console.log("ProductID: ", product.value);
        console.log("OrderID: ", cardOrderID);
        fetch("https://database-api-2.herokuapp.com/products_orders", {
          method: "PUT",
          body: JSON.stringify({
            productID: product.value,
            orderID: cardOrderID
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(
          function (response) {
            response.status; //=> number 100–599
            response.statusText; //=> String
            response.headers; //=> Headers
            response.url; //=> String

            location.reload();
            return response.text();
          },
          function (error) {
            console.log(error);
          }
        );
      });
    }
  }
}
