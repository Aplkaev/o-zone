let car = document.getElementById('cart'),
modelCar = document.querySelector('.cart'),
closeModelCar = document.querySelector('.cart-close'),
carts = document.querySelectorAll('.goods .card'),
checkbox = document.getElementById('discount-checkbox');
var cartWrapper = document.querySelector('.cart-wrapper'),
cartEmpty = document.getElementById('cart-empty'),
counter = document.querySelector('.counter'),
sumPrice = 0,
max = document.getElementById('max'),
min = document.getElementById('min'),
searchBtn = document.querySelector('.search-btn'),
searchText = document.querySelector('.search-wrapper_input');

car.addEventListener('click', function(){
    modelCar.style.display = 'block';
    document.body.style.overflow = 'hidden';
})
closeModelCar.addEventListener('click', function(){
    modelCar.style.display = 'none';
    document.body.style.overflow = '';
})
carts.forEach((cart) => {
    let btn = cart.querySelector('button');
    btn.addEventListener('click', function(){
        let cartClone = cart.cloneNode(true);
        cartEmpty.style.display = 'none';
        cartWrapper.appendChild(cartClone);
        let btnRemove = cartClone.querySelector('.btn');
        btnRemove.textContent = 'Удалить';
        btnRemove.addEventListener('click', () => {
            cartClone.remove();
            counter.textContent--;
            showData();
        })
        counter.textContent++;
        showData();
    });
})
checkbox.addEventListener('change', function(){
    if(this.checked)
    {
        this.nextElementSibling.classList.add('checked');
        actionPage(true);
    }
    else
    {
        this.nextElementSibling.classList.remove('checked');
        actionPage(false);
    }
})
function showData()
{
    sumPrice = 0;
    let cardsCart = cartWrapper.querySelector('.card'),
    cardsPrice = cartWrapper.querySelectorAll('.card-price'),
    cardTotal = document.querySelector('.cart-total span');
    cardsPrice.forEach((elem) => {
        sumPrice += parseFloat(elem.textContent);
    });
    if(counter.textContent == 0)
    {
        cartEmpty.style.display = 'block';
    }
    cardTotal.textContent = sumPrice;
} 

function actionPage(display_cheked)
{
    let goods = document.querySelector('.goods');
    carts.forEach((card) =>{
        if(display_cheked){
            if(!card.querySelector('.card-sale'))
            {
                card.parentNode.remove();
            }
        }
        else{
            goods.appendChild(card.parentNode);
        }
    });
}

function filterPrce()
{
    let goods = document.querySelector('.goods');
    carts.forEach((card) =>{
        let cardPrice = card.querySelector('.card-price'),
        price = parseFloat(cardPrice.textContent);
        if((max.value && price > max.value) || (min.value && price < min.value))
        {
            card.parentNode.remove();
        }
        else{
            goods.appendChild(card.parentNode)
        }
    })
}

function searchPrice()
{
    let goods = document.querySelector('.goods');
    let text = new RegExp(searchText.value.trim() , 'i');
    carts.forEach((card) => {
        let title = card.querySelector('.card-title');
        if(!text.test(title.textContent))
        {
            card.parentNode.remove();
        }
        else
        {
            goods.appendChild(card.parentNode);
        }
    })
}

searchBtn.addEventListener('click', ()=>{
    searchPrice();
})
max.addEventListener('change', filterPrce);
min.addEventListener('change', filterPrce);
