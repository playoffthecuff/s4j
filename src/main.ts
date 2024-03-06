import "./style.scss";

let links = document.querySelectorAll(".menu-link");
links.forEach((elem) => elem.addEventListener('click', (event) => {
  links.forEach((elem) => elem.classList.remove("active"));
  event.currentTarget.classList.add("active");
  }),
);

let currentLanguage = "EN";

function changeLanguage(event) {
  if (currentLanguage === "EN") {
    currentLanguage = "RU";
  } else {
    currentLanguage = "EN";
  }
  event.currentTarget.lastElementChild.textContent = currentLanguage;
};

let langChanger = document.getElementById("lang-changer");

langChanger?.addEventListener('click', changeLanguage);


// const param1: ElementParams = {
//   tag: "div",
//   textContent: "Hey Joe!",
//   classNames: ["class1", "button"],
//   callback: () => console.log("you click me bastard!"),
// };

// const test = new ElementCreator(param1);
// document.body.append(test.element);
