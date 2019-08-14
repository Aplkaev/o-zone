//checkbox

//end - checkbox

//car

let car = document.getElementById('cart'),
modelCar = document.querySelector('.cart'),
closeModelCar = document.querySelector('.cart-close'),
carts = document.querySelectorAll('.goods .card'),
checkbox = document.getElementById('discount-checkbox');
var cartWrapper = document.querySelector('.cart-wrapper'),
cartEmpty = document.getElementById('cart-empty'),
counter = document.querySelector('.counter');
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
        counter.textContent++
    });
})
checkbox.addEventListener('change', function(){
    if(this.checked)
    {
        this.nextElementSibling.classList.add('checked');
    }
    else
    {
        this.nextElementSibling.classList.remove('checked');
    }
})
//end - car