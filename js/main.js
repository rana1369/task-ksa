(function() {
  'use strict';
  
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
  
  function updateThemeIcon(theme) {
    if (themeToggle) {
      const icon = themeToggle.querySelector('i, svg, img');
      if (icon) {
        icon.setAttribute('aria-label', theme === 'dark' ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن');
      }
    }
  }
})();

(function() {
  'use strict';
  
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm(form)) {
        showFormSuccess(form);
        form.reset();
        form.querySelectorAll('.error').forEach(el => {
          el.classList.remove('error');
        });
        form.querySelectorAll('.error-message').forEach(el => {
          el.remove();
        });
      }
    });
    
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(input);
      });
      
      input.addEventListener('input', function() {
        if (input.classList.contains('error')) {
          validateField(input);
        }
      });
    });
  });
  
  function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const fieldName = field.name || field.id;
    let isValid = true;
    let errorMessage = '';
    
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    field.classList.remove('error', 'success');
    
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'هذا الحقل مطلوب';
    }
    
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
      }
    }
    
    if (type === 'tel' && value) {
      const phoneRegex = /^[0-9+\-\s()]+$/;
      if (!phoneRegex.test(value) || value.length < 10) {
        isValid = false;
        errorMessage = 'يرجى إدخال رقم هاتف صحيح';
      }
    }
    
    if (field.hasAttribute('minlength')) {
      const minLength = parseInt(field.getAttribute('minlength'));
      if (value.length < minLength) {
        isValid = false;
        errorMessage = `يجب أن يكون النص على الأقل ${minLength} أحرف`;
      }
    }
    
    if (!isValid) {
      field.classList.add('error');
      const errorDiv = document.createElement('span');
      errorDiv.className = 'error-message';
      errorDiv.textContent = errorMessage;
      errorDiv.setAttribute('role', 'alert');
      errorDiv.setAttribute('aria-live', 'polite');
      field.parentElement.appendChild(errorDiv);
    } else if (value) {
      field.classList.add('success');
    }
    
    return isValid;
  }
  
  function showFormSuccess(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success';
    successMessage.setAttribute('role', 'alert');
    successMessage.setAttribute('aria-live', 'polite');
    successMessage.innerHTML = '<strong>تم الإرسال بنجاح!</strong> شكراً لتواصلك معنا.';
    successMessage.style.cssText = 'padding: 16px; background-color: #d4edda; color: #155724; border-radius: 8px; margin-bottom: 24px;';
    
    form.insertBefore(successMessage, form.firstChild);
    
    setTimeout(() => {
      successMessage.style.transition = 'opacity 0.3s';
      successMessage.style.opacity = '0';
      setTimeout(() => successMessage.remove(), 300);
    }, 3000);
  }
})();

(function() {
  'use strict';
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
})();

(function() {
  'use strict';
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
})();

(function() {
  'use strict';
  
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.contains('show');
      mobileMenu.classList.toggle('show');
      menuToggle.setAttribute('aria-expanded', !isOpen);
      menuToggle.setAttribute('aria-label', isOpen ? 'فتح القائمة' : 'إغلاق القائمة');
    });
    
    document.addEventListener('click', function(e) {
      if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileMenu.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();

(function() {
  'use strict';
  
  document.querySelectorAll('details.faq-item').forEach(details => {
    const summary = details.querySelector('summary');
    if (summary) {
      summary.addEventListener('click', function(e) {
        details.classList.add('opening');
        setTimeout(() => {
          details.classList.remove('opening');
        }, 300);
      });
    }
  });
})();

(function() {
  'use strict';
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
          }
          observer.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
})();

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

(function() {
  'use strict';
  
  const scrollTopBtn = document.getElementById('scroll-top');
  
  if (scrollTopBtn) {
    window.addEventListener('scroll', debounce(function() {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    }, 100));
    
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
})();

