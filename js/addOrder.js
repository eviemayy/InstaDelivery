//-----------------DELIVERERS------------------------------
fetch("https://database-api-2.herokuapp.com/customers").then((res) => {
    res.text().then((data) => {
        let customers = JSON.parse(data);
        if (customers.length > 0) {
            let temp = "";
            customers.forEach((customer) => {
                temp += "<option id=\"cust\" value=" + customer.customerID + ">" + customer.lastName + "</option>";
            });
            document.getElementById("customer_id_options").innerHTML = temp;
        }
    });
});

fetch("https://database-api-2.herokuapp.com/deliverers").then((res) => {
    res.text().then((data) => {
        let deliverers = JSON.parse(data);
        if (deliverers.length > 0) {
            let temp = "";
            deliverers.forEach((deliverer) => {
                temp += "<option id=\"prod\" value=" + deliverer.delivererID + ">" + deliverer.lastName + "</option>";
            });
            temp += "<option id=\"prod\"  value=\"NULL\" >NULL</option>";
            document.getElementById("deliverer_id_options").innerHTML = temp;
        }
    });
});


//----------------- PRODUCT POST REQ ------------------------------

const myForm = document.getElementById('my-form');
myForm.addEventListener('submit', function (e) {

    e.preventDefault();
    let data = {
        customerID: document.getElementById('customer_id_options').value,
        delivererID: document.getElementById('deliverer_id_options').value,
        dateOrdered: document.getElementById('date').value,
        deliveryStatus: document.getElementById('status').value,
        departureTime: document.getElementById('dTime').value,
        arrivalTime: document.getElementById('aTime').value
    }

    console.log(data);
    alert("New order has been added!");

    fetch("https://database-api-2.herokuapp.com/orders", {
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