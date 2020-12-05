import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { IntlProvider } from "react-intl";
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";
import Pokemons from "./components/Pokemons";

ReactDOM.render(
  <IntlProvider locale={language()} messages={messages()}>
    <Pokemons />
  </IntlProvider>,
  document.getElementById("root"),
  serviceWorkerRegistration.register()
);

function language() {
  if ((navigator.language || navigator.userLanguage).includes("es")) {
    return "es";
  } else if ((navigator.language || navigator.userLanguage).includes("en")) {
    return "en";
  }
}

function messages() {
  if (language() === "es") {
    return localeEsMessages;
  } else if (language() === "en") {
    return localeEnMessages;
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA


