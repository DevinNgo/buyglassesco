let listProductHTML = document.querySelector('.product-list');

let listProducts = [];
let carts = [];

const addDataToHTML = () =>
{
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0)
    {
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('product');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <figure class="figure">
                <img src="${product.image}" class="figure-img img-fluid rounded">
                <figcaption class="figure-caption text-center"><div class="stock">STOCK: ${product.stock}</div><div class="price">$${product.price}</div></figcaption>
            </figure>
            `;
            listProductHTML.appendChild(newProduct);
        })
    }
}
listProductHTML.addEventListener('click', (event) => 
{
    let positionClick = event.target;
    if(positionClick.classList.contains('figure-img')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        console.log(product_id);
    }
})


const initApp = () =>
{
    fetch('products.json')
    .then(response => response.json())
    .then(data => 
        {
            listProducts = data;
            addDataToHTML();
        }
    )
}
initApp();