import { ElementParams } from "../types";

export default class ElementCreator {
  private element!: HTMLElement;
  constructor(params: ElementParams) {
    this.createElement(params["tag"]);
    this.addClasses(params["classNames"]);
    this.setTextContent(params["textContent"]);
    this.setClickHandler(params["callback"]);
  }

  createElement(tag: ElementParams["tag"] = "div") {
    this.element = document.createElement(tag);
  }

  addClasses(classNames: ElementParams["classNames"]) {
    if (classNames)
      classNames.forEach((className) => this.element.classList.add(className));
  }

  setTextContent(textContent: ElementParams["textContent"]) {
    if (textContent) this.element.textContent = textContent;
  }

  setClickHandler(callback: ElementParams["callback"]) {
    if (callback) this.element.addEventListener("click", callback);
  }

  getElement() {
    return this.element;
  }
}
