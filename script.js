// Kitchen Life Vibes Channel Logic
const getStartedBtn = document.getElementById("getStartedBtn");
const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const subtitleText = document.getElementById("subtitleText");

// Render Welcome Message Matching Gerard's exact wording
function renderWelcome(name) {
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

  getStartedBtn.textContent = "PROCEED TO HOMEPAGE";
  getStartedBtn.style.display = "inline-block";

  getStartedBtn.onclick = () => {
    alert("Navigating to homepage...");
  };
}

// On page load: Check if returning user already completed onboarding
window.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem("klv_user_name");
  if (savedName) {
    renderWelcome(savedName);
  }
});

// Click "GET STARTED" button
getStartedBtn.addEventListener("click", () => {
  const savedName = localStorage.getItem("klv_user_name");
  // Only show modal if user hasn't completed onboarding yet
  if (!savedName) {
    loginModal.classList.add("active");
  }
});

// Form Submission (Onboarding Process)
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userName = document.getElementById("userName").value.trim();
  
  // Experience level
  const experienceInput = document.querySelector('input[name="experience"]:checked');
  const experience = experienceInput ? experienceInput.value : "";

  // Help preferences
  const selectedHelp = Array.from(document.querySelectorAll('input[name="help"]:checked'))
                           .map(cb => cb.value);

  // Save onboarding details so returning users skip onboarding
  localStorage.setItem("klv_user_name", userName);
  localStorage.setItem("klv_user_experience", experience);
  localStorage.setItem("klv_user_help", JSON.stringify(selectedHelp));

  // Render welcome screen and close modal
  renderWelcome(userName);
  loginModal.classList.remove("active");
});
