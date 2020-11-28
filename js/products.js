fetch("https://database-api-2.herokuapp.com/products").then((res) => {
    res.text().then((data) => {
        let productData = JSON.parse(data);
        console.log(productData);
        if (productData.length > 0) {
            let temp = "";
            productData.forEach((product) => {
                temp += '<div class="box">';
                temp += `<h3 class="shop-title">${product.name}</h3>`;
                temp += `<span class="price">$${product.price}</span>`;
                temp += `<p class="description">${product.description}</p>`;
                temp += `<button style="margin-bottom: 5px;" class="btn btn-info shop-button">Add To Cart</button>`;
                temp += `<button class="btn btn-danger" onclick="deleteProduct(\'${product.productID}\')">Delete Product</button>`;
                temp += '</div>';
            });
            document.getElementById("boxes_1").innerHTML = temp;
        }
    });
});

//----------------- DELETE ------------------------------

function deleteProduct(id) {

    console.log(id);

    fetch("https://database-api-2.herokuapp.com/products", {
        method: "DELETE",
        body: JSON.stringify({ productID: id }),
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

