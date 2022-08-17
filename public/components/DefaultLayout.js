import { html } from "@dependable/view";
import { TopBar } from "./TopBar.js";

export class DefaultLayout {
  render({ children }) {
    return html`
      <main>
        <${TopBar} />
        <section className="content">${children}</section>
      </main>
    `;
  }
}
