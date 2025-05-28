// Contact page functionality
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const formValues = Object.fromEntries(formData);
      
      // Here you would normally send this to your backend
      // For demo purposes, we'll just show an alert
      alert(`Thank you for your message, ${formValues.name}! We'll get back to you as soon as possible.`);
      
      contactForm.reset();
    });
  }
  
  // FAQ toggle functionality
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqId = question.dataset.faq;
      const answer = document.getElementById(`faq-${faqId}`);
      
      // Toggle active class on question
      question.classList.toggle('active');
      
      // Toggle active class on answer
      answer.classList.toggle('active');
      
      // Change toggle icon
      const toggle = question.querySelector('.faq-toggle');
      if (answer.classList.contains('active')) {
        toggle.textContent = '−';
      } else {
        toggle.textContent = '+';
      }
    });
  });
});