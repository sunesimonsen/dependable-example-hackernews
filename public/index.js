import "@dependable/vite";
import { render } from "@dependable/view";
import { html } from "@dependable/htm";
import { RootView } from "./components/RootView.js";
import { Router, Routing } from "@dependable/nano-router";
import { createBrowserHistory } from "@nano-router/history";
import { Api } from "./api.js";
import { routes } from "./routes.js";

const history = createBrowserHistory();

const router = new Router({ routes, history });

render(html`
  <${Routing} router=${router}>
    <Context api=${new Api()}>
      <${RootView} />
    <//>
  <//>
`);
