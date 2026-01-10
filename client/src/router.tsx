import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterView from "./pages/auth/RegisterView";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import LoginView from "./pages/auth/LoginView";
import Home from "./pages/Home";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginView />}></Route>
                    <Route path="/auth/register" element={<RegisterView />}></Route>
                </Route>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} index></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}