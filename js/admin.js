const productBtn = document.querySelector('#createProductBtn');
const categoryBtn = document.querySelector('#createCategoryBtn');


productBtn.addEventListener('click', () => {
    location.href = '/createProduct.html';
})

categoryBtn.addEventListener('click', () => {
    location.href = '/createCategory.html';
})