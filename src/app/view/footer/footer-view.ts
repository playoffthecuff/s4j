import ElementCreator from "../../../util/element-creator";
import { ElementParams } from "../../../types";
import "./footer.scss";

const cssClasses = ["footer"];

const TEXT = "Julia Ribetki";

export default class FootView {
  private view: ElementCreator;
  constructor() {
    this.view = this.createView();
  }

  createView() {
    const elementParams: ElementParams = {
      tag: "footer",
      textContent: TEXT,
      classNames: cssClasses,
    };
    const element = new ElementCreator(elementParams);
    return element;
  }

  getHTMLElement() {
    return this.view.getElement();
  }
}
