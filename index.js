//for login 

document.addEventListener("DOMContentLoaded", function () {
  const iconSpan = document.querySelector("#login");

  iconSpan.addEventListener("click", function () {
    window.location.assign("login.html");
  });

});


//for cart 
document.addEventListener("DOMContentLoaded", function () {
  const iconSpan = document.querySelector("#carts");

  iconSpan.addEventListener("click", function () {
    window.location.assign("cart.html");    //Метод assign() загружает новый документ.
  });

});



//for menu
function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('menu-open');   //toggle-Он используется для добавления или удаления класса у элемента в зависимости от его наличия.
}



//for slide


let slideIndex = 0;
showSlides();

function showSlides() {      //showSlides-функция аты
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");  //replace-выполняет внутри строки поиск с использованием регулярного выражения
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

//for slide






const clothes = [ ];

// console.log(JSON.stringify(clothes)) 

function createCard(product) {
  const { id, imgUrl, imgs, price, title, category } = product;

  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = imgUrl;
  img.alt = "";

  if (imgs) {
    card.addEventListener('mouseenter', () => {
      img.src = imgs
    })
    card.addEventListener('mouseleave', () => {
      img.src = imgUrl
    })
  }

  const priceHeading = document.createElement("h3");
  priceHeading.textContent = getPrice(price) + " ₸";

  const titleText = document.createElement("p");
  titleText.textContent = title;

  const descriptionPara = document.createElement("p");
  descriptionPara.textContent = category;

  const button = document.createElement("button");
  if (isAddedToCart(product)) {
    button.textContent = "Added to cart";
    button.enabled = false; //егер заттарды корзинага косу керек болса  осыны басканда added to cart деп шыгады
  } else {
    button.textContent = "Add to cart";
    button.addEventListener("click", () => {
      addToCart(product);
    });
  }

  card.appendChild(img);  //appendChild- ең соңынан қосады
  card.appendChild(priceHeading);
  card.appendChild(titleText);
  card.appendChild(descriptionPara);
  card.appendChild(button);

  return card;
}

let care = document.querySelector(".cards")
clothes.forEach((product) => {
    care.appendChild(createCard(product));
});



const urll = "https://65dee0faff5e305f32a0bf37.mockapi.io/clothes"
fetch(urll)       //fetch- mockAPI -ге запрос жібереді 
  .then((response) => response.json())    //  response- mockAPi-ден келген данныйларды js-ке айналдырады
  .then((data) => {              //data-  mockAPi-дегі объект аты
    console.log(data)
    data.forEach((product) => {
      care.appendChild(createCard(product));
    });

  })


//for popular collection
const popularCardData = [ ];


let star = document.querySelector(".popular_cards_container")
popularCardData.forEach((product) => {   //forEach- массивтердің методы әрбәр элементті алып,карточка құрады
});


const url = "https://65dee0faff5e305f32a0bf37.mockapi.io/popular"
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    data.forEach((product) => {
      star.appendChild(createCard(product));
    });
  })





function getPrice(price) {
  let price_popular = String(price);
  if (price_popular.length > 4) {
    const priceSlices = [];
    for (let i = price_popular.length - 3; i >= 0; i -= 3) {
      priceSlices.unshift(price_popular.slice(i > 0 ? i : 0, i + 3));  //слайс -сумманы бөледі     //unshift-добавляет элементов в начало массива 
      price_popular = price_popular.slice(0, i);
    }
    priceSlices.unshift(price_popular);
    price_popular = priceSlices.join(" ")      //join-объединяет все элементы массива в одну строку
  }
  return price_popular;
}
console.log()


function addToCart(popular) {
  const cart = localStorage.getItem("cart");  //localStorage- локальный хранилище ,данныйларды клиент(fronted)сақтай аламыз
  const cartItems = JSON.parse(cart) || [];   //parse-   js  -->JSON айналдырады
  if (cartItems.find(item => item.id == popular.id)) {    //find-условияға сәйкес бір ғана элементті шығарады
    return;
  }
  cartItems.push({ ...popular }) //push қосу
  localStorage.setItem("cart", JSON.stringify(cartItems));   //stringify-   js --> JSON
  window.location.reload() //страница автоматический обновляется
}

function isAddedToCart(popular) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.find((p) => p.id == popular.id) != null;
}





//for best collection
const best_collection = document.querySelector('.best_collection');

best_collection.addEventListener('mouseenter', () => {
  best_collection.classList.add('zoomed');
});

best_collection.addEventListener('mouseleave', () => {
  best_collection.classList.remove('zoomed');
});






