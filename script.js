const slides = Array.from(document.querySelectorAll(".slide"));
const slideList = document.getElementById("slideList");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const slideCounter = document.getElementById("slideCounter");

let currentSlide = 0;

function buildSlideList() {
  slides.forEach((slide, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${index + 1}. ${slide.dataset.title || `Slide ${index + 1}`}`;
    button.addEventListener("click", () => goToSlide(index));
    li.appendChild(button);
    slideList.appendChild(li);
  });
}

function updateUI() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide);
  });

  const navButtons = slideList.querySelectorAll("button");
  navButtons.forEach((btn, index) => {
    btn.classList.toggle("active", index === currentSlide);
  });

  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;

  const percent = ((currentSlide + 1) / slides.length) * 100;
  progressBar.style.width = `${percent}%`;
  slideCounter.textContent = `${currentSlide + 1} / ${slides.length}`;
}

function goToSlide(index) {
  const clamped = Math.max(0, Math.min(index, slides.length - 1));
  currentSlide = clamped;
  updateUI();
}

prevBtn.addEventListener("click", () => goToSlide(currentSlide - 1));
nextBtn.addEventListener("click", () => goToSlide(currentSlide + 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === " ") {
    goToSlide(currentSlide + 1);
  }
  if (event.key === "ArrowLeft") {
    goToSlide(currentSlide - 1);
  }
});

const projectSteps = [
  {
    title: "Step 1: App Opens",
    content: "Battle Bots app launches. UI becomes ready for data.",
    code: "Battle Bots App Opens"
  },
  {
    title: "Step 2: API Request",
    content: "Application requests robot data.",
    code: "api.getRobots();"
  },
  {
    title: "Step 3: JSON Response",
    content: "Server returns structured JSON data.",
    code: '[{ "name":"Minotaur", "wins":18 }]'
  },
  {
    title: "Step 4: Parse to Objects",
    content: "JSON is mapped into Java model classes.",
    code: "Robot robot;\nList<Robot> robots;"
  },
  {
    title: "Step 5: Render UI",
    content: "The app displays parsed values to users.",
    code: "Robot Name: Minotaur\nWins: 18"
  }
];

function setupProjectTabs() {
  const tabWrap = document.getElementById("projectTabs");
  const content = document.getElementById("projectStepContent");
  if (!tabWrap || !content) {
    return;
  }

  function renderStep(stepIndex) {
    const step = projectSteps[stepIndex];
    content.innerHTML = `<h3>${step.title}</h3><p>${step.content}</p><div class="code"><pre>${step.code}</pre></div>`;

    tabWrap.querySelectorAll(".tab").forEach((tab) => {
      tab.classList.toggle("active", Number(tab.dataset.step) === stepIndex);
    });
  }

  tabWrap.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (!target.classList.contains("tab")) {
      return;
    }

    const stepIndex = Number(target.dataset.step);
    if (!Number.isNaN(stepIndex)) {
      renderStep(stepIndex);
    }
  });

  renderStep(0);
}

function setupSimulator() {
  const endpointSelect = document.getElementById("endpointSelect");
  const simulateBtn = document.getElementById("simulateBtn");
  const simOutput = document.getElementById("simOutput");

  if (!endpointSelect || !simulateBtn || !simOutput) {
    return;
  }

  const fakeResponses = {
    robots: [
      { name: "Minotaur", wins: 18 },
      { name: "Witch Doctor", wins: 15 }
    ],
    teams: [
      { team: "Hardcore Robotics", captain: "Ray Billings" },
      { team: "RioBotz", captain: "Marco Meggiolaro" }
    ],
    rankings: [
      { rank: 1, robot: "Tombstone" },
      { rank: 2, robot: "Minotaur" }
    ]
  };

  simulateBtn.addEventListener("click", () => {
    const key = endpointSelect.value;
    simOutput.textContent = "Sending request...";

    window.setTimeout(() => {
      const payload = fakeResponses[key] || [];
      simOutput.textContent = `GET /api/${key}\n200 OK\n\n${JSON.stringify(payload, null, 2)}`;
    }, 550);
  });
}

function setupQuiz() {
  const quiz = document.getElementById("errorQuiz");
  const feedback = document.getElementById("quizFeedback");
  if (!quiz || !feedback) {
    return;
  }

  quiz.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.tagName !== "BUTTON") {
      return;
    }

    const answer = target.dataset.answer;
    if (answer === "correct") {
      feedback.textContent = "Correct: 401 means Unauthorized (often invalid credentials/API key).";
      feedback.style.color = "#22c55e";
    } else {
      feedback.textContent = "Not quite. 404 means Not Found. 401 is Unauthorized.";
      feedback.style.color = "#f59e0b";
    }
  });
}

buildSlideList();
setupProjectTabs();
setupSimulator();
setupQuiz();
updateUI();