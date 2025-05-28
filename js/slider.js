// Testimonial slider functionality
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  
  // Initialize slider
  const initSlider = () => {
    slides[0].classList.add('active');
    setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
  };
  
  // Go to specific slide
  const goToSlide = (index) => {
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Update current slide
    currentSlide = index;
    
    // Add active class to new slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  };
  
  // Next slide function
  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % slides.length;
    goToSlide(newIndex);
  };
  
  // Add click event to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });
  
  // Initialize slider if elements exist
  if (slides.length > 0 && dots.length > 0) {
    initSlider();
  }
});