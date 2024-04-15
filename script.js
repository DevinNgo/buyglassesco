let listProductHTML = document.querySelector('.product-list');
let listProducts = [];

const addDataToHTML = () =>
{
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0)
    {
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('product');
            newProduct.innerHTML = `
            <figure class="figure">
                <button><img src="${product.image}" class="figure-img img-fluid rounded"></button>
                <figcaption class="figure-caption text-center"><div class="stock">STOCK: ${product.stock}</div><div class="price">$${product.price}</div></figcaption>
            </figure>
            `;
            listProductHTML.appendChild(newProduct);
        })
    }
}

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