// Required Console Output Script
console.log("=== WELCOME MESSAGE ===");
console.log("Hi everyone! Welcome to Kitchen Life Vibes Channel!");
console.log("");
console.log("=== AUDIENCE GREETING ===");
console.log("So happy to have you join us - let's make cooking fun and simple together!");
console.log("SO HAPPY TO HAVE YOU JOIN US - LET'S MAKE COOKING FUN AND SIMPLE TOGETHER!");
console.log("");
console.log("=== PROJECT INTRO ===");
console.log("This channel shares quick, affordable, and simple recipes - perfect for anyone just starting to cook.");

function initApp() {
  const getStartedBtn = document.getElementById("getStartedBtn");
  const loginModal = document.getElementById("loginModal");
  const loginForm = document.getElementById("loginForm");
  const subtitleText = document.getElementById("subtitleText");
  const topbar = document.getElementById("topbar");
  const generatorGreetingMsg = document.getElementById("generatorGreetingMsg");

  function goToHomepage(name) {
    if (generatorGreetingMsg) {
      generatorGreetingMsg.textContent = `Hello ${name}! What skill do you want to learn?`;
    }
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const homePage = document.getElementById("home");
    if (homePage) homePage.classList.add('active');
    if (topbar) topbar.style.display = "flex";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderWelcome(name) {
    if (subtitleText) {
      subtitleText.innerHTML = `
        Hi <strong>${name}</strong>, I'm your go-to virtual kitchen friend!
        <br><br>
        We make cooking <strong>easy, fun, and affordable</strong>.
        <br>• <strong>Learn</strong> simple cooking skills and pro tips.
        <br>• <strong>Shop smart</strong> and spend less on groceries.
        <br>• <strong>Turn basic ingredients</strong> into delicious meals.
        <br>• <strong>Cook creative dishes</strong> without wasting food.
        <br><br>
        Build your confidence in the kitchen and enjoy healthy food every day!
        <br><br>
        <strong>BUDGET COOKING, HEALTHY LIVING</strong>
      `;
    }

    if (getStartedBtn) {
      getStartedBtn.textContent = "PROCEED TO HOMEPAGE";
      getStartedBtn.style.display = "inline-block";
      getStartedBtn.onclick = () => {
        goToHomepage(name);
      };
    }
  }

  const savedName = localStorage.getItem("klv_user_name");
  if (savedName) {
    goToHomepage(savedName);
  } else {
    const landingPage = document.getElementById("landing");
    if (landingPage) landingPage.classList.add("active");
    if (topbar) topbar.style.display = "none";
    if (subtitleText) subtitleText.innerHTML = "";
  }

  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", () => {
      const nameCheck = localStorage.getItem("klv_user_name");
      if (!nameCheck && loginModal) {
        loginModal.classList.add("active");
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const userNameInput = document.getElementById("userName");
      const userName = userNameInput ? userNameInput.value.trim() : "Visitor";
      
      const experienceInput = document.querySelector('input[name="experience"]:checked');
      const experience = experienceInput ? experienceInput.value : "";

      const selectedHelp = Array.from(document.querySelectorAll('input[name="help"]:checked'))
                                 .map(cb => cb.value);

      localStorage.setItem("klv_user_name", userName);
      localStorage.setItem("klv_user_experience", experience);
      localStorage.setItem("klv_user_help", JSON.stringify(selectedHelp));

      renderWelcome(userName);
      if (loginModal) loginModal.classList.remove("active");
    });
  }

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const foldersToggle = document.getElementById('foldersToggle');
  const foldersItem = document.getElementById('foldersItem');

  function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('current'));

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
      const targetNavLink = document.querySelector(`.nav-item-${pageId}`);
      if (targetNavLink) targetNavLink.classList.add('current');

      if (pageId === 'landing') {
        if (topbar) topbar.style.display = "none";
      } else {
        if (topbar) topbar.style.display = "flex";
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (navLinks) navLinks.classList.remove('open');
  }

  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('data-page');
      switchPage(pageId);
    });
  });

  document.querySelectorAll('.dropdown a').forEach(link => {
    link.addEventListener('click', () => {
      switchPage('home');
      const targetId = link.getAttribute('href').substring(1);
      const targetAccordion = document.getElementById(targetId);
      if (targetAccordion) {
        targetAccordion.classList.add('active');
        targetAccordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if (menuToggle) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  }
  if (foldersToggle) {
    foldersToggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        foldersItem.classList.toggle('open');
      }
    });
  }

  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('active');
    });
  });

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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
