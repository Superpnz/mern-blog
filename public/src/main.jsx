import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MessageContextProvider } from "./context/MessageContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <MessageContextProvider>
    <App />
  </MessageContextProvider>,
);
