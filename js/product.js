var productArray = []
if (JSON.parse(localStorage.getItem('productsList'))) {
    productArray = JSON.parse(localStorage.getItem('productsList'));
} else {
    productArray = []
}

var categoryItem = document.querySelector('#category');

const createProduct = () => {
    const productName = document.querySelector('#productName');
    const productPrice = document.querySelector('#productPrice');
    const productImage = document.querySelector('#productPics');
    const productDescription = document.querySelector('#productDescription');
    const createBtn = document.querySelector('#create');

    createBtn.addEventListener('click', (e) => {
        e.preventDefault();

        var details = {
            id: productArray.length + 1,
            productname: productName.value,
            productprice: productPrice.value,
            productPics: productImage.src,
            productdescription: productDescription.value,
            productCategory: [],
        }

        let selectedValues = Array.from(categoryItem.selectedOptions)
            .map(option => option.value)

        details['productCategory'].push(selectedValues);

        productArray.push(details);
        localStorage.setItem("productsList", JSON.stringify(productArray));
        location.href = "/listProduct.html";
    })
}

var category = JSON.parse(localStorage.getItem('categoryList'));

for (let i = 0; i < category.length; i++) {
    var Category = ` <select id="category" multiple>
    <option value="${category[i].categoryname}">${category[i].categoryname}</option>
</select>`

    categoryItem.innerHTML += Category;
}


createProduct();