//----------------- PRODUCT POST REQ ------------------------------

const myForm = document.getElementById('my-form');
myForm.addEventListener('submit', function (e) {

    if(document.getElementById('name').value == "" || document.getElementById('description').value == ""){
        alert("Cannot have empty Name or Description");
        return;
    }

    e.preventDefault();

    let data = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        quantity: document.getElementById('quantity').value
    }

    console.log(data);
    alert("The new product has been added!");

    fetch("https://database-api-2.herokuapp.com/products", {
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
        location.href = "cart.html";
        return response.text()
    }, function (error) {
        console.log(error);
    })
});
