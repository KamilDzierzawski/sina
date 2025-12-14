import { createInstance } from "@module-federation/runtime";
import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";

const isStandaloneCart =
  typeof window !== "undefined" &&
  window.location.hostname === "localhost" &&
  window.location.port === "3002";

let app = null;
if (isStandaloneCart) {
  app = mount(App, {
    target: document.getElementById("app"),
  });
}

export default app;
