document.addEventListener('DOMContentLoaded',()=>{
    const products = [
        { id: 1, name: "Product 1", price: 20},
        {id: 2, name: "Product 2", price: 20},
        {id: 3, name: "Product 3", price:25}
    ];

    const cart = [];
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMsg = document.getElementById("empty-cart");
    const cartTotal = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");

    products.forEach(product=>{
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML=`
        <span>${product.name} - $${product.price}</span>
        <button data-id="${product.id}">add to cart</button>
        `
        productList.appendChild(productDiv);
    });

    productList.addEventListener("click", ()=>{
        if(event.target.tagName === "BUTTON"){
            const productID = parseInt(event.target.getAttribute("data-id"));
            const product = products.find(p => p.id === productID);
            addToCart(product);
        }
    });

    function addToCart(product){
        cart.push(product);
        renderCart(cart);
    }

    function renderCart(cart) {
        let totalPrice = 0;
        cartItems.innerText = "";
      
        if (cart.length > 0) {
          emptyCartMsg.classList.add("hidden");
          cartTotal.classList.remove("hidden");
      
          cart.forEach((item, index) => {
            totalPrice += item.price;
      
            const cartItem = document.createElement("div");
            cartItem.innerHTML = `
              ${item.name} - ${item.price}
              <button class="removeProduct" data-index="${index}">Remove</button>
            `;
      
            cartItems.appendChild(cartItem);
          });
      
          totalPriceDisplay.innerText = `${totalPrice}`;
        } else {
          emptyCartMsg.classList.remove("hidden");
          cartTotal.classList.add("hidden");
          totalPriceDisplay.innerText = "0";
        }
      
        // ✅ Attach remove listeners
        const removeButtons = document.querySelectorAll(".removeProduct");
        removeButtons.forEach((btn) => {
          btn.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            cart.splice(index, 1);   // remove item
            renderCart(cart);        // re-render cart → total recalculated
          });
        });
      }
      
      

});