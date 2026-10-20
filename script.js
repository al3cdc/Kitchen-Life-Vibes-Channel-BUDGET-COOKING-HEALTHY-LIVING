// Kitchen Life Vibes Channel Logic
const getStartedBtn = document.getElementById("getStartedBtn");
const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const subtitleText = document.getElementById("subtitleText");

// Open Modal when "GET STARTED" is clicked
getStartedBtn.addEventListener("click", () => {
  loginModal.classList.add("active");
});

// Form Submit Event Handler
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let userName = document.getElementById("userName").value;
  let cleanName = userName.trim().toUpperCase();

  // Formatted HTML content that populates the card after submission
  const dynamicContent = `
    Welcome to <strong>KITCHEN LIFE VIBES CHANNEL</strong> — ${cleanName}, your go-to virtual kitchen friend!
    <br><br>
    We make cooking <strong>easy, fun, and affordable</strong>. With us, you will:
    <br>&nbsp;&nbsp;• Learn simple cooking skills and pro tips.
    <br>&nbsp;&nbsp;• Shop smart and spend less on groceries.
    <br>&nbsp;&nbsp;• Turn basic ingredients into delicious meals.
    <br>&nbsp;&nbsp;• Cook creative dishes without wasting food.
    <br><br>
    Build your confidence in the kitchen and enjoy healthy food every day!
    <br><br>
    <strong>BUDGET COOKING, HEALTHY LIVING</strong>
  `;

  // Update the card subtitle section directly with the welcome text
  subtitleText.innerHTML = dynamicContent;

  // Change the button text to "PROCEED TO HOMEPAGE" and make sure it stays visible
  getStartedBtn.textContent = "PROCEED TO HOMEPAGE";
  getStartedBtn.style.display = "inline-block";

  // Optional action when clicking the transformed button
  getStartedBtn.onclick = () => {
    alert("Navigating to homepage...");
  };

  // Close Modal smoothly
  loginModal.classList.remove("active");
});
