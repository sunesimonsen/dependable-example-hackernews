import { html } from "@dependable/htm";

export class Html {
  constructor() {
    this.setRef = (ref) => {
      this.ref = ref;
    };
  }

  setHtml() {
    this.ref.innerHTML = this.props.children;
  }

  didMount() {
    this.setHtml();
  }

  didUpdate() {
    this.setHtml();
  }

  render() {
    return html`<span ref=${this.setRef} />`;
  }
}
