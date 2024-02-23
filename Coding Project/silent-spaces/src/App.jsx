import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./routes/Home";
import { Signup } from "./routes/Signup";
import { Login } from "./routes/Login";
import { AuthContext, Context } from "./components/AuthContext";
import { Protected } from "./components/Protected";
import { Dashboard } from "./routes/Dashboard";
import { About } from "./routes/About";
import { Body } from "./components/Body";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Body><Home></Home></Body>,
    },
    {
        path: "/home",
        element: <Body><Home></Home></Body>,
    },
    {
        path: "/login",
        element: <Body><Login></Login></Body>,
    },
    {
        path: "/signup",
        element: <Body><Signup></Signup></Body>,
    },
    {
        path: '/dashboard',
        element: <Protected><Body><Dashboard></Dashboard></Body></Protected>
    },
    {
        path: '/about',
        element: <Body><About></About></Body>
    }
]);

function App() {
    return (
        <>
        <AuthContext>
            <RouterProvider router={router}></RouterProvider>
        </AuthContext>
        </>
    );
}

export default App;
