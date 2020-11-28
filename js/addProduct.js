//----------------- PRODUCT POST REQ ------------------------------

const myForm = document.getElementById('my-form');
myForm.addEventListener('submit', function (e) {

    e.preventDefault();

    name, description, price, quantity
    let data = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        quantity: document.getElementById('quantity').value
    }

    console.log(data);

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
        return response.text()
    }, function (error) {
        console.log(error);
    })
});
