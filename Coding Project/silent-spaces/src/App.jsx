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
        path: '/',
        element: <Body></Body>,
        errorElement: <About></About>,
        children: [
            {
                index: true,
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
            },
            {
                path: '/about',
                element: <About></About>
            }
        ]
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
