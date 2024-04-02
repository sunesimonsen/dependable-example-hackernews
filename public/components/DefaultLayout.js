import { html } from "@dependable/htm";
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
