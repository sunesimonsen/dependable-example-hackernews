import { html } from "@dependable/view";
import { ReloadButton } from "./ReloadButton.js";
import { HomeLink } from "./HomeLink.js";

export class TopBar {
  render() {
    return html`
      <header>
        <${HomeLink} />
        <${ReloadButton} />
      </header>
    `;
  }
}
