//-----------------DELIVERERS------------------------------
fetch("https://database-api-2.herokuapp.com/orders").then((res) => {
    res.text().then((data) => {
        let orderData = JSON.parse(data);
        if (orderData.length > 0) {
            let temp = "";
            orderData.forEach((order) => {
                temp += "<option id=\"prod\" value=" + order.orderID + ">" + order.orderID + "</option>";
            });
            document.getElementById("order_id_options").innerHTML = temp;
        }
    });
});

fetch("https://database-api-2.herokuapp.com/products").then((res) => {
    res.text().then((data) => {
        let productData = JSON.parse(data);
        if (productData.length > 0) {
            let temp = "";
            productData.forEach((product) => {
                temp += "<option id=\"prod\" value=" + product.productID + ">" + product.name + "</option>";
            });
            document.getElementById("product_id_options").innerHTML = temp;
        }
    });
});


//----------------- PRODUCT POST REQ ------------------------------

const myForm = document.getElementById('my-form');
myForm.addEventListener('submit', function (e) {

    e.preventDefault();

    let data = {
        productID: document.getElementById('product_id_options').value,
        orderID: document.getElementById('order_id_options').value,
    }

    console.log(data);
    alert("product has been added to order!");

    fetch("https://database-api-2.herokuapp.com/products_orders", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        response.status; //=> number 100–599
        response.statusText; //=> String
        response.headers; //=> Headers
        response.url; //=> String

        return response.text();
    }, function (error) {
        console.log(error);
    })
});