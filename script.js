let iconCart = document.querySelector('.icon-cart');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let listProductHTML = document.querySelector('.product-list');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span')

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

if(document.body.classList.contains('home')) {
    listProductHTML.addEventListener('click', (event) => 
    {
        let positionClick = event.target;
        if(positionClick.classList.contains('figure-img')){
            let product_id = positionClick.parentElement.parentElement.dataset.id;
            addToCart(product_id);
            body.classList.toggle('showCart');
        }
    })
    iconCart.addEventListener('click', () => {
        body.classList.toggle('showCart');
    })
    closeCart.addEventListener('click', () => {
        body.classList.toggle('showCart');
    })
}

const addToCart = (product_id) => 
{
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0){
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    }
    else if(positionThisProductInCart < 0)
    {
        carts.push({
            product_id: product_id,
            quantity: 1
        })
    }
    else
    {
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

const addCartToHTML = () => 
{
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(carts.length > 0)
    {
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('product');
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = `
                <div class="product-image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">
                    ${info.price}
                </div>
                <div class="quantity">
                    <span class="minus"><i class="bi bi-dash-circle-fill"></i></span>
                    <span>${cart.quantity}</span>
                    <span class="plus"><i class="bi bi-plus-circle-fill"></i></span>
                </div>
                `;
            listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

const initApp = () =>
{
    fetch('products.json')
    .then(response => response.json())
    .then(data => 
        {
            listProducts = data;
            if(document.body.classList.contains('home')) {
                addDataToHTML();
            }
            // get cart from memory
            if (localStorage.getItem('cart'))
            {
                carts = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        }
    )
}
initApp();