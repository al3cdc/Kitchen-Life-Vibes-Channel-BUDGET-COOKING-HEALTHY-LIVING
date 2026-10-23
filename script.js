document.addEventListener('DOMContentLoaded', () => {
  // Required Console Output Script from Project Specification
  console.log("=== WELCOME MESSAGE ===");
  console.log("Hi everyone! Welcome to Kitchen Life Vibes Channel!");
  console.log("");
  console.log("=== AUDIENCE GREETING ===");
  console.log("So happy to have you join us - let's make cooking fun and simple together!");
  console.log("SO HAPPY TO HAVE YOU JOIN US - LET'S MAKE COOKING FUN AND SIMPLE TOGETHER!");
  console.log("");
  console.log("=== PROJECT INTRO ===");
  console.log("This channel shares quick, affordable, and simple recipes - perfect for anyone just starting to cook.");

  const modal = document.getElementById('loginModal');
  const loginForm = document.getElementById('loginForm');
  const greetingMessage = document.getElementById('greetingMessage');
  const aboutUsBtn = document.getElementById('aboutUsBtn');
  
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const foldersToggle = document.getElementById('foldersToggle');
  const foldersItem = document.getElementById('foldersItem');

  // Load User Name
  function updateUserName() {
    const savedUser = localStorage.getItem('kitchen_vibes_user');
    let userName = "Chef";
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      if (userData.name) {
        userName = userData.name;
      }
    }
    if (greetingMessage) {
      greetingMessage.textContent = `Hello ${userName}! What Skill do you want to learn?`;
    }
  }

  updateUserName();

  // "About Us" button opens modal
  if (aboutUsBtn) {
    aboutUsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  }

  // Handle Onboarding Form Submission
  if (loginForm) {
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
    });
  }

  // Dropdown smooth scrolling to accordions
  document.querySelectorAll('.dropdown a').forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.getAttribute('href').substring(1);
      const targetAccordion = document.getElementById(targetId);
      
      if (targetAccordion) {
        targetAccordion.classList.add('active');
        targetAccordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      navLinks.classList.remove('open');
    });
  });

  // Mobile menu toggles
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
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

  // Recipe Carousel Logic
  const track = document.getElementById('recipeTrack');
  const cards = track ? track.querySelectorAll('.recipe-card') : [];
  const prevBtn = document.getElementById('prevRecipeBtn');
  const nextBtn = document.getElementById('nextRecipeBtn');
  const dots = document.querySelectorAll('.indicator-dot');
  let currentIndex = 0;

  function updateCarousel(index) {
    if (!track) return;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === index));
  }

  if (nextBtn && prevBtn && track) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % cards.length;
      updateCarousel(currentIndex);
    });
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateCarousel(currentIndex);
    });
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        currentIndex = idx;
        updateCarousel(currentIndex);
      });
    });
  }

  // Kitchen Skills Generator Logic
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
      if (skill === "knife") tip = "Always use a cutting board and keep your fingers away from the blade.";
      else if (skill === "hygiene") tip = "Wash your hands and clean your workspace before preparing food.";
      else if (skill === "measure") tip = "Use measuring cups and spoons to measure ingredients accurately.";
      else if (skill === "cooking") tip = "Start with simple cooking methods such as boiling, frying, and sautéing.";

      message.textContent = "Kitchen Tip: " + tip;
    });
  }
});
