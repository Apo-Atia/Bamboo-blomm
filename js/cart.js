// Cart functionality

document.addEventListener('DOMContentLoaded', () => {
  // Cart elements
  const cartBtn = document.getElementById('cart-btn');
  const cartSidebar = document.getElementById('cart-sidebar');
  const closeCartBtn = document.getElementById('close-cart');
  const overlay = document.getElementById('overlay');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCountElement = document.getElementById('cart-count');
  const cartTotalAmount = document.getElementById('cart-total-amount');
  const checkoutBtn = document.getElementById('checkout-btn');
  
  // Get cart from localStorage or initialize empty cart
  let cart = JSON.parse(localStorage.getItem('bambooBloomCart')) || [];
  
  // Update cart count
  const updateCartCount = () => {
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = itemCount;
    
    // Show/hide count based on whether there are items
    if (itemCount > 0) {
      cartCountElement.style.display = 'flex';
    } else {
      cartCountElement.style.display = 'none';
    }
  };
  
  // Render cart items
  const renderCart = () => {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart">
          <p>Your cart is empty</p>
          <a href="products.html" class="btn btn-outline">Shop Now</a>
        </div>
      `;
      cartTotalAmount.textContent = '$0.00';
      return;
    }
    
    let cartHTML = '';
    let total = 0;
    
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      
      cartHTML += `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
            <div class="cart-item-price">$${item.price}</div>
            <div class="cart-item-quantity">
              <button class="quantity-btn decrease" data-id="${item.id}">-</button>
              <span>${item.quantity}</span>
              <button class="quantity-btn increase" data-id="${item.id}">+</button>
              <button class="cart-remove" data-id="${item.id}">Remove</button>
            </div>
          </div>
        </div>
      `;
    });
    
    cartItemsContainer.innerHTML = cartHTML;
    cartTotalAmount.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners to cart item buttons
    document.querySelectorAll('.increase').forEach(btn => {
      btn.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.decrease').forEach(btn => {
      btn.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.cart-remove').forEach(btn => {
      btn.addEventListener('click', removeItem);
    });
  };
  
  // Increase item quantity
  const increaseQuantity = (e) => {
    const id = e.currentTarget.dataset.id;
    const item = cart.find(item => item.id === id);
    
    if (item) {
      item.quantity++;
      saveCart();
      renderCart();
      updateCartCount();
    }
  };
  
  // Decrease item quantity
  const decreaseQuantity = (e) => {
    const id = e.currentTarget.dataset.id;
    const item = cart.find(item => item.id === id);
    
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart = cart.filter(cartItem => cartItem.id !== id);
      }
      
      saveCart();
      renderCart();
      updateCartCount();
    }
  };
  
  // Remove item from cart
  const removeItem = (e) => {
    const id = e.currentTarget.dataset.id;
    cart = cart.filter(item => item.id !== id);
    
    saveCart();
    renderCart();
    updateCartCount();
  };
  
  // Add to cart functionality
  const addToCart = (e) => {
    const button = e.currentTarget;
    const id = button.dataset.id;
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    
    // Check if item is already in cart
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
      // Item exists, increase quantity
      cart[existingItemIndex].quantity++;
    } else {
      // Add new item
      cart.push({
        id,
        name,
        price,
        quantity: 1
      });
    }
    
    // Save cart to localStorage
    saveCart();
    
    // Update cart UI
    updateCartCount();
    
    // Show cart
    showCart();
    
    // Visual feedback
    button.textContent = 'Added!';
    button.classList.add('added');
    
    setTimeout(() => {
      button.textContent = 'Add to Cart';
      button.classList.remove('added');
    }, 1500);
  };
  
  // Save cart to localStorage
  const saveCart = () => {
    localStorage.setItem('bambooBloomCart', JSON.stringify(cart));
  };
  
  // Show cart sidebar
  const showCart = () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderCart();
  };
  
  // Hide cart sidebar
  const hideCart = () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  // Event Listeners
  cartBtn.addEventListener('click', showCart);
  closeCartBtn.addEventListener('click', hideCart);
  overlay.addEventListener('click', hideCart);
  
  // Add event listeners to all "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
  });
  
  // Checkout button
  checkoutBtn.addEventListener('click', () => {
    alert('Thank you for your purchase! In a real store, you would be redirected to the payment page.');
    cart = [];
    saveCart();
    renderCart();
    updateCartCount();
    hideCart();
  });
  
  // Initialize cart
  updateCartCount();
});