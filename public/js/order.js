const selectedItems = []
const cartBtn = document.getElementById('cart')
const confirmBtn = document.querySelector('.confirm')
const cart_items_container = document.querySelector('.cart_items_container') //store page
const totalPrice = document.querySelector('#total_price')

let totalItemPrice = 0

function addToOrder(event, name, price, imageurl, id) {  //properties of seedItem is registered
    event.disabled = true
    let item = { name, price, imageurl, id, quantity: 1 }
    selectedItems.push(item)
    printSelectedCount()
}

function printSelectedCount() {
    cartBtn.innerText = 'Cart: ' + selectedItems.length + " item(s)" //displays the number of items in cart adjacent to the Cart button
}

function renderCartItems() {         //renders the cart contents along with their price
    let itemsHTML = ''
    for (let item of selectedItems) {
        itemsHTML += `
        <div class="cart_item">
        <img src="${item.imageurl}" alt="">
        <p>${item.name}</p>
        <p>$${item.price}</p>
    </div>`
    }
    cart_items_container.innerHTML = itemsHTML //sets empty cart to list of cart items as user selects items for purchase
    printPrice()
}
/////////////////////////////////

cartBtn.addEventListener('click', () => {
    const cartItems = document.querySelector('.cart_items')  //renders cart items upon clicking the cart button on top left
    cartItems.classList.toggle('active');
    renderCartItems()
})

function printPrice() {
    let total = selectedItems.reduce((t, item) => {     //determines and displays price after ordered items have been rendered
        return t + (+item.price * item.quantity)             //item quantity will always be 1.
    }, 0)
    totalPrice.innerHTML = '$' + total
    totalItemPrice = total
}

async function createOrder() {
    const login = document.getElementById('login')      //ensures user is logged in prior to finalizing order.
    if (login) {
        alert('Login required')
        return
    }
    const response = await fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify({ items: selectedItems, totalPrice: totalItemPrice }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        const data = await response.json()
        alert(data.message)
        document.location.replace('/store');    //upon successful purchase, the user is redirected to the store page for more browsing.
    } else {
        alert(response.statusText);
    }
}

confirmBtn.addEventListener('click', createOrder)
