import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.tsx";
import "./index.css";
import { logger } from "./logger-client.ts";

logger.info("rhiz.om client started");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
        <BrowserRouter>
          <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            authorizationParams={{
              redirect_uri: globalThis.window.location.origin + "/space",
              audience: import.meta.env.VITE_API_AUDIENCE,
            }}
          >
            <App />
          </Auth0Provider>
        </BrowserRouter>
  </React.StrictMode>,
);
