import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>

        <Toaster
            position="top-right"
            toastOptions={{
                duration: 3000,
            }}
        />

    </StrictMode>
);