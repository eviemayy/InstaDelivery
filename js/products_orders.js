//--------------GET PRODUCTS_ORDERS-----------------------
fetch("https://database-api-2.herokuapp.com/products_orders").then((res) => {
  res.text().then((data) => {
    let product_orderData = JSON.parse(data);
    console.log(product_orderData);
    if (product_orderData.length > 0) {
      let temp = "";
      product_orderData.forEach((product_order) => {
        let random = Math.floor(Math.random() * 10000000);
        temp += '<div class="card" style="margin-top: 20px;">';
        temp += `<h5 class="card-header">Order ${product_order.orderID}</h5>`;
        temp += `<div class="card-body">`;
        temp += `<p><b>Order ID:</b> ${product_order.orderID}</p>`;
        temp += `<p><b>Product ID:</b> ${product_order.productID}</p>`;
        temp += `<input type="number" id="order-id" name="order-id" placeholder="Order ID" style="display:none;">`;
        // temp += `<input type="number" id="product-id" name="product-id" placeholder="Product ID" style="display:none;"><br style="display:none;">`;
        temp += `<select id="prod_id_options_${product_order.orderID}_${product_order.productID}_${random}" name="product-id-2" style="display:none;"></select><br style="display:none;">`;
        temp += `<button class="btn btn-primary" onclick=\"editOrder(${product_order.orderID},${product_order.productID}, ${random})\" style="margin: 5px;">Edit Order</button>`;
        temp += `<button class="btn btn-danger" onclick="deleteProdOrd(\'${product_order.orderID}\',\'${product_order.productID}\')">Delete</button>`;
        temp += `<button class="btn btn-primary" style="margin: 5px; display:none;">Update</button>`;
        // temp += `<select id="prod_id_options_${product_order.orderID}_${product_order.productID}_${random}" name="product-id-2"></select><br style="display:none;">`;
        temp += `</div></div>`;
        // temp += `<button class="btn btn-danger" onclick="deleteProdOrd(\'${product_order.orderID}\',\'${product_order.productID}\')">Delete</button></div></div>`;
      });
      document.getElementById("products-orders").innerHTML = temp;
    }
  });
});

//-----------UPDATE--------------------------------------
function editOrder(orderID, productID, random) {

  console.log("Random:", random);
  //-------GET PRODUCT IDS FOR DROPDOWN----------------------------
  fetch("https://database-api-2.herokuapp.com/products").then((res) => {
    res.text().then((data) => {
        let productData = JSON.parse(data);
        if (productData.length > 0) {
            let temp = "";
            productData.forEach((product) => {
                temp += "<option id=\"prod\" value=" + product.productID + ">" + product.productID + "</option>";
            });
            document.getElementById(`prod_id_options_${orderID}_${productID}_${random}`).innerHTML = temp;
        }
    });
});

  //-------------------------------------------------


  let cards = document.getElementsByClassName(`card-body`);
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
      cards[i].childNodes[5].setAttribute("style", "display:none;"); //Edit button
      cards[i].childNodes[6].setAttribute("style", "display:none;"); //Delete button
      cards[i].childNodes[7].setAttribute("style", "display:inline-block;"); //Update button
      cards[i].childNodes[2].setAttribute("style", "display:inline-block;"); //orderID input
      cards[i].childNodes[2].value = cardOrderID;
      cards[i].childNodes[2].setAttribute("readonly", "readonly");
      cards[i].childNodes[2].setAttribute("style", "color:#A52A2A;");
      cards[i].childNodes[3].setAttribute("style", "display:inline-block;"); //productID dropdown
      let product = cards[i].childNodes[3];
      //cards[i].childNodes[3].value = cardProductID;
      setTimeout(function(){ product.value = cardProductID; }, 300); // wait to put value in dropdown
      cards[i].childNodes[4].setAttribute("style", "display:inline-block;"); //br tag

      // Update button to actually update values
      cards[i].childNodes[7].addEventListener("click", function () {
        console.log("CHECKING");
        console.log("ProductID: ", product.value);
        console.log("OrderID: ", cardOrderID);
        fetch("https://database-api-2.herokuapp.com/products_orders", {
          method: "PUT",
          body: JSON.stringify({
            newProductID: product.value,
            productID: productID,
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
