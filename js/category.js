var categoryArray = []
if (JSON.parse(localStorage.getItem('categoryList'))) {
    categoryArray = JSON.parse(localStorage.getItem('categoryList'));
} else {
    categoryArray = []
}

const createCategory = () => {
    const categoryName = document.querySelector('#categoryName');
    const submitBtn = document.querySelector('#submit');

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        var details = {
            id: categoryArray.length + 1,
            categoryname: categoryName.value,
        }

        categoryArray.push(details);
        localStorage.setItem("categoryList", JSON.stringify(categoryArray));
    })
}


createCategory();