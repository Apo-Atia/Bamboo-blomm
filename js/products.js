// Products page functionality
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const sortSelect = document.getElementById('sort-select');
  const productsContainer = document.getElementById('products-container');
  const productCards = document.querySelectorAll('.product-card');
  
  // Filter products
  const filterProducts = (category) => {
    productCards.forEach(card => {
      const cardCategory = card.dataset.category;
      
      if (category === 'all' || cardCategory === category) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
    
    // Reset animations
    productCards.forEach(card => {
      card.style.opacity = '0';
      card.style.animation = 'none';
    });
    
    setTimeout(() => {
      let delay = 0.1;
      productCards.forEach(card => {
        if (card.style.display !== 'none') {
          card.style.animation = `fadeIn 0.5s ease forwards ${delay}s`;
          delay += 0.05;
        }
      });
    }, 10);
  };
  
  // Sort products
  const sortProducts = (sortBy) => {
    const products = Array.from(productCards);
    
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
        break;
      case 'price-high':
        products.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
        break;
      case 'name':
        products.sort((a, b) => {
          const aName = a.querySelector('h3').textContent;
          const bName = b.querySelector('h3').textContent;
          return aName.localeCompare(bName);
        });
        break;
      default: // featured - default order
        products.sort((a, b) => {
          return parseInt(a.dataset.id) - parseInt(b.dataset.id);
        });
    }
    
    // Remove all products from container
    productsContainer.innerHTML = '';
    
    // Add sorted products back to container
    products.forEach(product => {
      productsContainer.appendChild(product);
    });
    
    // Reset animations
    let delay = 0.1;
    productCards.forEach(card => {
      if (card.style.display !== 'none') {
        card.style.opacity = '0';
        card.style.animation = `fadeIn 0.5s ease forwards ${delay}s`;
        delay += 0.05;
      }
    });
  };
  
  // Filter button click handler
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Filter products
      filterProducts(button.dataset.filter);
    });
  });
  
  // Sort select change handler
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      sortProducts(sortSelect.value);
    });
  }
});