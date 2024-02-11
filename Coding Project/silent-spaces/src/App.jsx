import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./routes/Home";
import { Signup } from "./routes/Signup";
import { Login } from "./routes/Login";
import { AuthContext } from "./components/AuthContext";
import { Protected } from "./routes/Protected";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Home></Home></Protected>,
    },
    {
        path: "/home",
        element: <Protected><Home></Home></Protected>,
    },
    {
        path: "/login",
        element: <Login></Login>,
    },
    {
        path: "/signup",
        element: <Signup></Signup>,
    },
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
