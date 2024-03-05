function createCartItem(cartItemData) {
  const { imgUrl, title, category, price, quantity } = cartItemData;

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  const cartItemLeft = document.createElement("div");
  cartItemLeft.classList.add("cart-item-left");

  const img = document.createElement("img");
  img.src = imgUrl;
  img.alt = "";

  const cartItemLeftActions = document.createElement("div");
  cartItemLeftActions.classList.add("cart-item-left-actions");

  const itemNameLink = document.createElement("a");
  itemNameLink.href = "#";
  itemNameLink.textContent = title + " - " + category;


  const cartItemAmount = document.createElement("div");
  cartItemAmount.classList.add("cart-item-amount");

  const trashButton = document.createElement("button");
  trashButton.innerHTML =
    cartItemData.quantity > 1
      ? '<ion-icon name="remove"></ion-icon>'
      : '<ion-icon name="trash-outline"></ion-icon>';
  trashButton.addEventListener("click", () => decreaseQuantity(cartItemData)) //удалить ету ушин керек

  const amountText = document.createElement("p");
  amountText.textContent = quantity;

  const addButton = document.createElement("button");
  addButton.innerHTML = '<ion-icon name="add-outline"></ion-icon>';
  addButton.addEventListener("click", () => increaseQuantity(cartItemData)) // косу ушин керек +1 зат

  cartItemAmount.appendChild(trashButton);
  cartItemAmount.appendChild(amountText);
  cartItemAmount.appendChild(addButton);

  cartItemLeftActions.appendChild(itemNameLink);
  cartItemLeftActions.appendChild(cartItemAmount);

  cartItemLeft.appendChild(img);
  cartItemLeft.appendChild(cartItemLeftActions);

  const cartItemRight = document.createElement("div");
  cartItemRight.classList.add("cart-item-right");

  const closeButton = document.createElement("button");
  closeButton.innerHTML = '<ion-icon name="close-outline"></ion-icon>';
  closeButton.addEventListener("click", () => removeProduct(cartItemData)) //аргумент ,массивтин сыртына ештенке койсвймыз, cartItemData да массивтин ишиндеги ар обьект


  const priceText = document.createElement("p");
  priceText.textContent = getPrice(price * quantity) + " ₸";

  cartItemRight.appendChild(closeButton);
  cartItemRight.appendChild(priceText);

  cartItem.appendChild(cartItemLeft);
  cartItem.appendChild(cartItemRight);

  return cartItem;
}





function getPrice(price) {
  let priceStr = String(price);
  if (priceStr.length > 4) {
    const priceSlices = [];
    for (let i = priceStr.length - 3; i >= 0; i -= 3) {
      priceSlices.unshift(priceStr.slice(i > 0 ? i : 0, i + 3));
      priceStr = priceStr.slice(0, i);
    }
    priceSlices.unshift(priceStr);
    priceStr = priceSlices.join(" ");
  }
  return priceStr;
}




function removeProduct(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((p) => p.id != product.id);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}









const cart = localStorage.getItem("cart");
const cartItems = JSON.parse(cart) || []; // [{}, {}, {}]
console.log(cartItems)
for (const item of cartItems) {
  const card = createCartItem(item);
  document.querySelector(".cart-items").appendChild(card);
}




//добавить штук
function increaseQuantity(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.map((p) =>
    p.id == product.id ? { ...p, quantity: p.quantity + 1 } : p
  );
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}




//удалить штук
function decreaseQuantity(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (product.quantity > 1) {
    cart = cart.map((p) =>
      p.id == product.id ? { ...p, quantity: p.quantity - 1 } : p
    );
  } else {
    cart = cart.filter((p) => p.id !== product.id);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}






//to get only products price
let product_price = document.querySelector('#products-price')
function calculateTotalPrice() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalPrice = 0;

  for (const item of cart) {
    totalPrice += item.price * item.quantity;
  }

  return totalPrice;
}
product_price.textContent = getPrice(calculateTotalPrice()) + '₸'






//to remove all of elements in cart
function clearCart() {
  localStorage.setItem("cart", JSON.stringify([]));
  window.location.reload();
}

document.getElementById('clear-cart').addEventListener('click', clearCart);




//for all prices
function getPrices() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length == 0) {
    return {
      productsPrice: 0,
      deliveryPrice: 0,
      totalPrice: 0
    };
  } else {
    const itemPrices = cart.map((p) => p.price * p.quantity);
    let productsPrice = 0;
    itemPrices.forEach((p) => (productsPrice += p));
    const deliveryPrice = productsPrice > 8000 ? 0 : 700;
    return {
      productsPrice: productsPrice,
      deliveryPrice: deliveryPrice,
      totalPrice: productsPrice + deliveryPrice,
    };
  }
}


const productsPriceBox = document.querySelector("#products-price");
const deliveryPriceBox = document.querySelector("#delivery-price");
const totalPriceTextBox = document.querySelector("#total-price");
console.log(getPrices());
const { productsPrice, deliveryPrice, totalPrice } = getPrices();

productsPriceBox.textContent = getPrice(productsPrice) + " ₸";
deliveryPriceBox.textContent = getPrice(deliveryPrice) + " ₸";
totalPriceTextBox.textContent = getPrice(totalPrice) + " ₸";




//скрыть /показать ету үшін

const displayCartBtn=document.querySelector('#display-cart button')

displayCartBtn.addEventListener('click',()=>{
  const cartItems=document.querySelector('.cart-items')
  cartItems.classList.toggle('hidden')    //toggle- бар юолса өшіреді ,жоқ болса қосады
  

  if(cartItems.classList.contains("hidden")){
    displayCartBtn.innerHTML='<ion-icon name="chevron-down-outline"></ion-icon>'

  }else{
    displayCartBtn.innerHTML='<ion-icon name="chevron-up-outline"></ion-icon>'
  }


})


//элементтер саны    call them


function getCartSize(){
  const cart=JSON.parse(localStorage.getItem('cart'))||[]
  return cart.length
}

const cartSize=document.querySelector('#cart-size')
cartSize.textContent=getCartSize()



