import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterView from "./pages/auth/RegisterView";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import LoginView from "./pages/auth/LoginView";
import Home from "./pages/Home";
import RegView from "./pages/RegView";
import CreateBlogView from "./pages/blog/CreateBlogView";
import BlogLayout from "./layouts/BlogLayout";
import BlogView from "./pages/blog/BlogView";

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
                    <Route path="/select-region" element={<RegView />}></Route>
                    <Route path="/new/create-blog" element={<CreateBlogView />}></Route>
                </Route>
                <Route element={<BlogLayout />}>
                    <Route path="/blog/:id" element={<BlogView />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}