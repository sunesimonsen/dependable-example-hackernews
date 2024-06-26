import { html } from "@dependable/htm";
import { ReloadButton } from "./ReloadButton.js";
import { HomeLink } from "./HomeLink.js";
import { isHome } from "../state.js";

export class TopBar {
  render() {
    return html`
      <header>
        <${HomeLink} />
        ${isHome() && html`<${ReloadButton} />`}
      </header>
    `;
  }
}
