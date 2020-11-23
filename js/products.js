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
                temp += `<p>${product.description}</p>`;
                temp += `<button class="btn btn-info shop-button">Add To Cart</button>`;
                temp += '</div>';
            });
            document.getElementById("boxes_1").innerHTML = temp;
        }
    });
});