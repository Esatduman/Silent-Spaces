import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./routes/Home";
import { Signup } from "./routes/Signup";
import { Login } from "./routes/Login";
import { AuthContext, Context } from "./components/AuthContext";
import { Protected } from "./routes/Protected";
import { Dashboard } from "./routes/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
    },
    {
        path: "/home",
        element: <Home></Home>,
    },
    {
        path: "/login",
        element: <Login></Login>,
    },
    {
        path: "/signup",
        element: <Signup></Signup>,
    },
    {
        path: '/dashboard',
        element: <Protected><Dashboard></Dashboard></Protected>
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
