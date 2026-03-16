import { render } from "preact";
import "./index.css";
import { App } from "./app";

const root = document.getElementById("app");

if (!root) {
  throw new Error("No se encontró el elemento root con id 'app'");
}

render(<App />, root);
