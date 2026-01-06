import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterView from "./pages/RegisterView";
import AuthLayout from "./layouts/AuthLayout";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/auth/register" element={<RegisterView />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}