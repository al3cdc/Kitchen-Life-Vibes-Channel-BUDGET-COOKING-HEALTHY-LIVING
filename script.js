document.addEventListener('DOMContentLoaded', () => {
  const greetingSection = document.getElementById('greeting');
  const homeSection = document.getElementById('home');
  const startCard = document.getElementById('startCard');
  const welcomeCard = document.getElementById('welcomeCard');
  const displayName = document.getElementById('displayName');
  const greetingMessage = document.getElementById('greetingMessage');
  
  const getStartedBtn = document.getElementById('getStartedBtn');
  const proceedHomeBtn = document.getElementById('proceedHomeBtn');
  const modal = document.getElementById('loginModal');
  const loginForm = document.getElementById('loginForm');
  
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const foldersToggle = document.getElementById('foldersToggle');
  const foldersItem = document.getElementById('foldersItem');

  // Function to load and update user's name across the page
  function updateUserName() {
    const savedUser = localStorage.getItem('kitchen_vibes_user');
    let userName = "Chef";
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      if (userData.name) {
        userName = userData.name;
      }
    }
    displayName.textContent = userName;
    if (greetingMessage) {
      greetingMessage.textContent = `Hello ${userName}! What Skill do you want to learn?`;
    }
  }

  // Check if user has already signed up previously stored in localStorage
  const savedUser = localStorage.getItem('kitchen_vibes_user');

  if (savedUser) {
    updateUserName();
    document.body.classList.remove('on-greeting');
    greetingSection.classList.remove('active');
    homeSection.classList.add('active');
  } else {
    document.body.classList.add('on-greeting');
    greetingSection.classList.add('active');
    homeSection.classList.remove('active');
    startCard.classList.remove('hidden');
    welcomeCard.classList.add('hidden');
  }

  // Get Started Button -> Open Onboarding Modal
  getStartedBtn.addEventListener('click', () => {
    modal.classList.add('active');
  });

  // Handle Onboarding Form Submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('userName').value.trim();
    const experience = document.querySelector('input[name="experience"]:checked')?.value || 'Beginner';
    
    const helpArray = [];
    document.querySelectorAll('input[name="help"]:checked').forEach(cb => {
      helpArray.push(cb.value);
    });

    const userObj = { name, experience, help: helpArray };
    localStorage.setItem('kitchen_vibes_user', JSON.stringify(userObj));

    modal.classList.remove('active');
    updateUserName();
    startCard.classList.add('hidden');
    welcomeCard.classList.remove('hidden');
  });

  // Proceed to Homepage Button
  proceedHomeBtn.addEventListener('click', () => {
    greetingSection.classList.remove('active');
    document.body.classList.remove('on-greeting');
    homeSection.classList.add('active');
    window.scrollTo(0, 0);
  });

  // Navigation page switching
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const pageName = el.getAttribute('data-page');
      
      if (pageName === 'home') {
        homeSection.classList.add('active');
        greetingSection.classList.remove('active');
        document.body.classList.remove('on-greeting');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (pageName === 'greeting') {
        greetingSection.classList.add('active');
        homeSection.classList.remove('active');
        document.body.classList.add('on-greeting');
        
        updateUserName();
        const currentSaved = localStorage.getItem('kitchen_vibes_user');
        if (currentSaved) {
          startCard.classList.add('hidden');
          welcomeCard.classList.remove('hidden');
        } else {
          startCard.classList.remove('hidden');
          welcomeCard.classList.add('hidden');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      navLinks.classList.remove('open');
    });
  });

  // Dropdown link clicks -> auto open the specific accordion and scroll to it
  document.querySelectorAll('.dropdown a').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').substring(1);
      const targetAccordion = document.getElementById(targetId);
      
      if (targetAccordion) {
        homeSection.classList.add('active');
        greetingSection.classList.remove('active');
        document.body.classList.remove('on-greeting');
        
        targetAccordion.classList.add('active');
        targetAccordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      navLinks.classList.remove('open');
    });
  });

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Folders dropdown toggle on mobile
  foldersToggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      foldersItem.classList.toggle('open');
    }
  });

  // Accordion Toggle Logic
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('active');
    });
  });

  // ================= RECIPE CAROUSEL LOGIC =================
  const track = document.getElementById('recipeTrack');
  const cards = track ? track.querySelectorAll('.recipe-card') : [];
  const prevBtn = document.getElementById('prevRecipeBtn');
  const nextBtn = document.getElementById('nextRecipeBtn');
  const dots = document.querySelectorAll('.indicator-dot');
  
  let currentIndex = 0;
  const totalCards = cards.length;

  function updateCarousel(index) {
    if (!track) return;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    // Update dots
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });
  }

  if (nextBtn && prevBtn && track) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalCards;
      updateCarousel(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalCards) % totalCards;
      updateCarousel(currentIndex);
    });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        currentIndex = idx;
        updateCarousel(currentIndex);
      });
    });
  }

  // ================= INTERACTIVE KITCHEN BASICS GENERATOR LOGIC =================
  const learnBtn = document.getElementById("learn");
  if (learnBtn) {
    learnBtn.addEventListener("click", function() {
      let skill = document.getElementById("skill").value;
      let message = document.getElementById("message");

      if (skill === "") {
        message.textContent = "Please choose a skill first!";
        return;
      }

      let tip = "";

      if (skill === "knife") {
        tip = "Always use a cutting board and keep your fingers away from the blade.";
      } 
      else if (skill === "hygiene") {
        tip = "Wash your hands and clean your workspace before preparing food.";
      } 
      else if (skill === "measure") {
        tip = "Use measuring cups and spoons to measure ingredients accurately.";
      } 
      else if (skill === "cooking") {
        tip = "Start with simple cooking methods such as boiling, frying, and sautéing.";
      }

      message.textContent = "Kitchen Tip: " + tip;
    });
  }
});
