import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import "./index.css";

console.log("[main.tsx] Script loaded");

const rootElement = document.getElementById("root");
console.log("[main.tsx] Root element found:", rootElement);

if (!rootElement) {
  console.error("[main.tsx] FATAL: root element not found!");
  document.body.innerHTML =
    "<div style='color: red; padding: 20px; font-family: monospace;'>FATAL ERROR: root element not found</div>";
} else {
  try {
    console.log("[main.tsx] Creating React root...");
    const root = createRoot(rootElement);
    console.log("[main.tsx] React root created, rendering App...");
    root.render(<App />);
    console.log("[main.tsx] App rendered successfully");
  } catch (error) {
    console.error("[main.tsx] ERROR during render:", error);
    document.body.innerHTML = `<div style='color: red; padding: 20px; font-family: monospace;'>ERROR: ${String(
      error
    )}</div>`;
  }
}
