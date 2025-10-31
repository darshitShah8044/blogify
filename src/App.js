import "./App.css";
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";

import Header from "./pages/Header";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AllBlogs from "./pages/AllBlogs";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateBlog from "./pages/CreateBlog";
import Explore from "./pages/Explore";
import Albums from "./components/Album";

// Layout component that wraps all pages with Header
const Layout = () => (
    <>
        <Header />
        <Outlet />
    </>
);

const router = createBrowserRouter([
    {
        element: <Layout />, // Header will always render for these child routes
        children: [
            {
                path: "/",
                element: <ProtectedRoute element={<Dashboard />} />,
            },
            {
                path: "/dashboard",
                element: <ProtectedRoute element={<Dashboard />} />,
            },
            {
                path: "/blogs",
                element: <ProtectedRoute element={<AllBlogs />} />,
            },
            {
                path: "/explore",
                element: <ProtectedRoute element={<Explore />} />,
            },
            {
                path: "/create",
                element: <ProtectedRoute element={<CreateBlog />} />,
            },
              {
                path: "/album",
                element: <ProtectedRoute element={<Albums />} />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
