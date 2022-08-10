import { html } from "@dependable/view";
import { ReloadButton } from "./ReloadButton.js";
import { HomeLink } from "./HomeLink.js";
import { isHome } from "../model.js";

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
