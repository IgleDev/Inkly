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
import AccountLayout from "./layouts/AccountLayout";
import Perfil from "./pages/account/Perfil";
import PerfilForm from "./pages/account/PerfilForm";
import InfoAppLayout from "./layouts/InfoAppLayout";
import Privacidad from "./pages/info/Privacidad";
import TeamInvitationPage from "./pages/TeamInvitationPage";

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
                    <Route path="/new/edit-blog/:id" element={<CreateBlogView />}></Route>
                </Route>
                <Route element={<BlogLayout />}>
                    <Route path="/blog/:id" element={<BlogView />}></Route>
                </Route>
                <Route element={<AccountLayout />}>
                    <Route path="/perfil/:id" element={<Perfil />}></Route>
                    <Route path="/perfil-account/:id" element={<PerfilForm />}></Route>
                </Route>
                <Route element={<InfoAppLayout />}>
                    <Route path="/privacidad" element={<Privacidad />}></Route>
                </Route>
                <Route path="/team/team-invitation/:token" element={<TeamInvitationPage />} />
            </Routes>
        </BrowserRouter>
    )
}