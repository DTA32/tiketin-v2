import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Step1 from "./pages/Step1";
import NotFound from "./pages/NotFound";
import Step2 from "./pages/Step2";
import Step3 from "./pages/Step3";
import Step4 from "./pages/Step4";
import Step5 from "./pages/Step5";
import ChoosePayment from "./components/step5/ChoosePayment";
import CreditCard from "./components/step5/CreditCard";
import VirtualAccount from "./components/step5/VirtualAccount";
import QRIS from "./components/step5/QRIS";
import Order from "./pages/Order";
import History from "./pages/History";
import HistoryDetail from "./pages/HistoryDetail";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ETicket from "./pages/ETicket";
import Admin from "./pages/Admin";
import Dashboard from "./components/admin/Dashboard";
import Bandara from "./components/admin/Bandara";
import Penerbangan from "./components/admin/Penerbangan";
import Pemesanan from "./components/admin/Pemesanan";
import Users from "./components/admin/Users";
import NewsAdmin from "./components/admin/NewsAdmin";
import KelasPenerbangan from "./components/admin/KelasPenerbangan";
import Support from "./pages/Support";
import Form from "./components/support/Form";
import Success from "./components/support/Success";

const router = createBrowserRouter([
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Home /> },
    { path: "/search", element: <Step1 /> },
    {
        path: "/order",
        element: <Order />,
        children: [
            { path: "form", element: <Step2 /> },
            { path: "seat", element: <Step3 /> },
            { path: "review", element: <Step4 /> },
            {
                path: "pay/:id",
                element: <Step5 />,
                children: [
                    { path: "", element: <ChoosePayment /> },
                    { path: "1", element: <CreditCard /> },
                    { path: "2", element: <VirtualAccount /> },
                    { path: "3", element: <QRIS /> },
                ],
            },
        ],
    },
    { path: "/history", element: <History /> },
    { path: "/history/:id", element: <HistoryDetail /> },
    { path: "/history/:id/eticket", element: <ETicket /> },
    { path: "/news", element: <News /> },
    { path: "/news/:id", element: <NewsDetail /> },
    { path: "/settings", element: <Settings /> },
    { path: "/about", element: <About /> },
    { path: "/profile", element: <Profile /> },
    {
        path: "/auth",
        element: <Auth />,
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
        ],
    },
    {
        path: "/admin",
        element: <Admin />,
        children: [
            { path: "", element: <Dashboard /> },
            { path: "bandara", element: <Bandara /> },
            { path: "penerbangan", element: <Penerbangan /> },
            { path: "penerbangan/kelas/:id", element: <KelasPenerbangan /> },
            { path: "pemesanan", element: <Pemesanan /> },
            { path: "news", element: <NewsAdmin /> },
            { path: "user", element: <Users /> },
        ],
    },
    {
        path: "/support",
        element: <Support />,
        children: [
            { path: "", element: <Form /> },
            { path: "success", element: <Success /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
