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
        //actionPage(true);
    }
    else
    {
        this.nextElementSibling.classList.remove('checked');
        //actionPage(false);
    }
    filter();
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
    let goods = document.querySelector('.goods'),
    cards = document.querySelectorAll('.goods .card');
    cards.forEach((card) =>{
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
    let goods = document.querySelector('.goods'),
    cards = document.querySelectorAll('.goods .card'),
    text = new RegExp(searchText.value.trim() , 'i');
    cards.forEach((card) => {
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

function filter()
{
    let checked = document.getElementById('discount-checkbox');
    if(checked.checked)
    {
        actionPage(true);
    }
    else
    {
        actionPage(false);
    }
    filterPrce();
}

function getData()
{
    let goodsWrapper = document.querySelector('.goods');
    fetch('../db/db.json')
        .then((response) =>{
            if(response.ok)
            {
                return response.json();
            }
            else
            {
                throw new Error ('Данные не были получены, ошибка: ' + response.status);
            }
        })
            .then(data => renderCards(data))
            .catch(err => {
                console.log(err);
                goodsWrapper.innerHTML = '<div stile="color:red; font-silze:30px">Упс, что-то пошло не так!</div>'
            })
}
function renderCatalog(cards){
    let catalog = new Set(),
    catalogList = document.querySelector('.catalog-list'),
    catalogBtn = document.querySelector('.catalog-button'),
    cardss = document.querySelectorAll('.goods .card'),
    catalogWrapper = document.querySelector('.catalog');
    cards.goods.forEach((card)=>{
        catalog.add(card.category);
    });

    catalog.forEach((item) =>{
        let li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });
    catalogBtn.addEventListener('click', (event) =>{
        if(catalogWrapper.style.display)
        {
            catalogWrapper.style.display = '';
        }
        else
        {
            catalogWrapper.style.display = 'block';
        }

        if(event.target.tagName === 'LI')
        {
            cardss.forEach((card) => {
                if(card.dataset.category === event.target.textContent){
                    card.parentNode.style.display = '';
                }
                else{
                    card.parentNode.style.display = 'none';
                }
            })
        }
    })
}

function renderCards(data)
{
    let goodsWrapper = document.querySelector('.goods');
    data.goods.forEach((good) =>{
        let card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `
            <div class="card" data-category="${good.category}">
                ${good.sale? '<div class="card-sale">🔥Hot Sale🔥</div>': ''}
                <div class="card-img-wrapper">
                    <div class="card-img-top" style="background-image:url('${good.img}')"></div>
                </div>
                <div class="card-body justify-content-between">
                    <div class="card-price" style="${good.sale ? 'color:red': ''}">${good.price}</div>
                    <h5 class="card-title">${good.title}</h5>
                    <button class="btn btn-primary">В корзину</button>
                </div>
                    
            </div>
        `;
        goodsWrapper.appendChild(card);
    })
    renderCatalog(data);
}
getData();
searchBtn.addEventListener('click', ()=>{
    searchPrice();
})
max.addEventListener('change', filter);
min.addEventListener('change', filter);

