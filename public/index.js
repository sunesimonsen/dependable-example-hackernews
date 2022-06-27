import { html, render } from "@dependable/view";
import { RootView } from "./components/RootView.js";
import { Router, Routing } from "@dependable/nano-router";
import { createBrowserHistory } from "@nano-router/history";
import { routes } from "./routes.js";

const history = createBrowserHistory();

const router = new Router({ routes, history });

render(html`
  <${Routing} router=${router}>
    <${RootView} />
  <//>
`);
