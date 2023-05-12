"use strict";

///////////////////////////////////////
// NAV
const nav = document.querySelector(".nav_links");

// feature: fade when mouse moving in
const handleHover = function (e) {
  if (e.target.classList.contains("nav_link")) {
    const target = e.target;
    const siblings = target.closest(".nav_links").querySelectorAll(".nav_link");
    siblings.forEach((el) => {
      if (el !== target) el.style.opacity = this;
    });
  }
};
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
// feature: click to move to the desired loc
nav.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav_link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// fearture: change meau color as the same as section
const sections = document.querySelectorAll(".section");
function navColorTracker(e) {
  console.log(e[0].target.id);
  if (!e[0].isIntersecting) return;
  switch (e[0].target.id) {
    case "section-1":
      nav.style.color = "white";
      break;
    case "section-2":
      nav.style.color = "#ea41b7";
      break;
    case "section-3":
      nav.style.color = "#04a5d3";
      initSkills();
      const s = new Slide("skill", "slider_btn-left", "slider_btn-right");
      break;
    case "section-4":
      nav.style.color = "#27bfc8";
      break;
    default:
      nav.style.color = "white";
  }
}
const options = {
  root: null,
  threshold: 0.8,
};
sections.forEach((element) =>
  new IntersectionObserver(navColorTracker, options).observe(element)
);
///////////////////////////////////////
// SECTION-2: ABOUT
document.querySelector(".aboutme_tabs").addEventListener("click", function (e) {
  if (!e.target.classList.contains("about_tab")) return;
  console.log(e.target);
  document
    .querySelectorAll(".about_tab")
    .forEach((t) => t.classList.remove("about_tab-active"));
  e.target.classList.add("about_tab-active");
  document
    .querySelectorAll(".about_content")
    .forEach((c) => c.classList.remove("about_content-active"));
  document
    .querySelector(`.about_content-${e.target.dataset.tab}`)
    .classList.add("about_content-active");
});

///////////////////////////////////////
// SECTION-3: SKILLS

//CLASS: draw dynamic circle progress bar
class ProcessCircle {
  process = 0.0000000001;
  radius = 40;
  lineWidth = 10;
  fontSize = 50;
  constructor(canvas, percent) {
    //this.canvas = document.querySelector(canvas);
    this.ctx = canvas.getContext("2d");
    this.circleX = canvas.width / 2;
    this.circleY = canvas.height / 2;
    this.percent = percent;
    this.circleLoading();
  }
  _circleUnder() {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = "rgb(146, 135, 135)";
    this.ctx.arc(this.circleX, this.circleY, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
  _circleProgress(endPosition) {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = "#04a5d3";
    this.ctx.lineCap = "round";
    this.ctx.arc(
      this.circleX,
      this.circleY,
      this.radius,
      Math.PI * 0.5,
      endPosition
    );
    this.ctx.stroke();
  }
  drawCircle(percentage) {
    const pos = Math.PI * ((((2 * percentage) / 100) % 2) + 0.5);
    this._circleUnder();
    this._circleProgress(pos);
  }
  circleLoading() {
    function _loadingCircle() {
      if (this.process >= this.percent) {
        this.drawCircle(this.percent);
        window.clearInterval(circleLoading);
      } else {
        this.process += 0.1 * this.percent;
        this.drawCircle(this.process);
      }
    }
    const circleLoading = window.setInterval(_loadingCircle.bind(this), 50);
  }
}
// LOADING SKILLS
const skillsName = [
  "JavaScript",
  "HTML",
  "CSS",
  "MongoDB",
  "SQL",
  "GIT",
  "Python",
  "R",
  "Matlab",
  "Java",
];
const skillsPercent = [85, 85, 85, 85, 60, 60, 90, 60, 50, 50, 70];
const containerSlide = document.querySelector(".slide");
function initSkills() {
  containerSlide.innerHTML = "";
  skillsName.forEach((item, i) => {
    containerSlide.insertAdjacentHTML(
      "beforeend",
      `
            <div class="skill">
                <div class="progress">
                <canvas class="progress_arc"></canvas>
                <div class="progress_percentage" data-percent=${skillsPercent[i]}>${skillsPercent[i]}%</div>
                <div class="progress_name">${skillsName[i]}</div>
           </div>
       `
    );
  });
  document.querySelectorAll(".progress_arc").forEach((element) => {
    const percent = Number.parseInt(element.nextElementSibling.dataset.percent);
    const c = new ProcessCircle(element, percent);
  });
}

// CLASS: make slides moving left and right
class Slide {
  curSlide = 0;
  constructor(slides, btnLeft, btnRight) {
    this.slides = document.querySelectorAll(`.${slides}`);
    this.btnLeft = document.querySelector(`.${btnLeft}`);
    this.btnRight = document.querySelector(`.${btnRight}`);
    this._goToSlide(this.curSlide);
    this.btnRight.addEventListener("click", this._nextSlide.bind(this));
    this.btnLeft.addEventListener("click", this._prevSlide.bind(this));
  }
  get maxSlide() {
    return this.slides.length;
  }
  _goToSlide(pos) {
    this.slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - pos)}%)`)
    );
  }
  _nextSlide() {
    this.curSlide === this.maxSlide - 1 ? (this.curSlide = 0) : this.curSlide++;
    this._goToSlide(this.curSlide);
  }
  _prevSlide() {
    this.curSlide === 0 ? (this.curSlide = this.maxSlide - 1) : this.curSlide--;
    this._goToSlide(this.curSlide);
  }
}

///////////////////////////////////////
// SECTION-4: PROJECTS
