import React from "react"
import ReactDOM from "react-dom/client"

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom"

import store from "./store.ts"
import { Provider } from "react-redux"

import CssBaseline from "@mui/material/CssBaseline/CssBaseline"
import App from "./App.tsx"
import PrivateRoute from "./components/PrivateRoute.tsx"
import HomePage from "./pages/HomePage.tsx"
import LoginPage from "./pages/LoginPage.tsx"
import SignupPage from "./pages/SignupPage.tsx"
import ProfilePage from "./pages/ProfilePage.tsx"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Private Routes */}
            <Route path="" element={<PrivateRoute />}>
                <Route path="/perfil" element={<ProfilePage />} />
            </Route>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <CssBaseline />
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)
