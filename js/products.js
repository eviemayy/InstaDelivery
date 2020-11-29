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
                // temp += `<button style="margin-bottom: 5px;" class="btn btn-info shop-button">Add To Cart</button>`;
                temp += `<button style="margin-bottom: 5px;" class="btn btn-primary" onclick="editProduct(${product.productID})">Edit Product</button>`;
                temp += `<button class="btn btn-danger" onclick="deleteProduct(\'${product.productID}\')">Delete Product</button>`;
                temp += `<span style="display:none;">Product ID: </span><input type="text" id="id" name="id" placeholder="Product ID" style="display:none;" value="${product.productID}" readonly="readonly">`;
                temp += `<span style="display:none;">Name: </span><input type="text" id="item-name" name="item-name" placeholder="Name" style="display:none;" value="${product.name}">`;
                temp += `<span style="display:none;">Description: </span><input type="text" id="item-name" name="item-name" placeholder="Name" style="display:none;" value="${product.description}">`;
                temp += `<span style="display:none;">Price: </span><input type="text" id="item-name" name="item-name" placeholder="Name" style="display:none;" value="${product.price}">`;
                temp += `<span style="display:none;">Quantity: </span><input type="text" id="item-name" name="item-name" placeholder="Name" style="display:none;" value="${product.quantity}">`;
                temp += `<button class="btn btn-primary" style="display:none;">Update Product</button>`;
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

//---------------EDIT------------------------------------
function editProduct(productID){

    let boxes = document.getElementsByClassName(`box`);
    for (var i = 0; i < boxes.length; i++) {
        console.log("Checking: ", boxes[i].childNodes);
        let inputProductID = boxes[i].childNodes[6].value;
        //console.log(inputProductID);
        if (inputProductID == productID) {
            boxes[i].childNodes[0].setAttribute("style", "display:none;");
            boxes[i].childNodes[1].setAttribute("style", "display:none;");
            boxes[i].childNodes[2].setAttribute("style", "display:none;");
            boxes[i].childNodes[3].setAttribute("style", "display:none;");
            boxes[i].childNodes[4].setAttribute("style", "display:none;");
            boxes[i].childNodes[5].setAttribute("style", "display:inline;"); // start of span tags
            boxes[i].childNodes[6].setAttribute("style", "display:inline-block;");
            boxes[i].childNodes[7].setAttribute("style", "display:inline;"); 
            boxes[i].childNodes[8].setAttribute("style", "display:inline-block;");
            boxes[i].childNodes[9].setAttribute("style", "display:inline;"); 
            boxes[i].childNodes[10].setAttribute("style", "display:inline-block;");
            boxes[i].childNodes[11].setAttribute("style", "display:inline;"); 
            boxes[i].childNodes[12].setAttribute("style", "display:inline-block;");
            boxes[i].childNodes[13].setAttribute("style", "display:inline;"); 
            boxes[i].childNodes[14].setAttribute("style", "display:inline-block;");
            boxes[i].childNodes[15].setAttribute("style", "display:inline-block;");
            boxes[i].childNodes[15].setAttribute("style", "margin-top:5px;");

            //For data population for PUT request
            let dataProductID = boxes[i].childNodes[6];
            let dataName = boxes[i].childNodes[8];
            let dataDescription = boxes[i].childNodes[10];
            let dataPrice = boxes[i].childNodes[12];
            let dataQuantity = boxes[i].childNodes[14];

            boxes[i].childNodes[15].addEventListener("click", function () {

                let data = {
                    productID: productID,
                    name: dataName.value,
                    description: dataDescription.value,
                    price: Number(dataPrice.value),
                    quantity:  Number(dataQuantity.value)
            
                  }

                console.log("Testing:",data);
                fetch("https://database-api-2.herokuapp.com/products", {
                method: "PUT",
                body: JSON.stringify(data),
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