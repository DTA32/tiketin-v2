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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
