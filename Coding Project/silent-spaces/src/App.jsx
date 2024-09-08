import "./App.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Home } from "./routes/Home";
import { Signup } from "./routes/Signup";
import { Login } from "./routes/Login";
import { AuthContext, Context } from "./components/AuthContext";
import { Protected } from "./components/Protected";
import { Dashboard } from "./routes/Dashboard";
import { About } from "./routes/About";
import { Body } from "./components/Body";
import { FindASpace } from "./routes/dashboard/FindASpace";
import { CreateASpace } from "./routes/dashboard/CreateASpace";
import { CreateGuideProfile } from "./routes/dashboard/CreateGuideProfile";
import { SpaceView } from "./routes/dashboard/SpaceView";

const router = createBrowserRouter([
    {
        
        path: '/',
        element: <Body />,
        errorElement: <About />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/home",
                element: <Navigate to="/" />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: '/dashboard',
                element: <Protected children={<Dashboard />} />,
                children: [{
                    // path: 'find-a-space',
                    index: true,
                    element: <FindASpace />,
                },
                {
                    path: 'create-a-space',
                    element: <CreateASpace />
                },
                {
                    path: 'create-a-space/:spaceId',
                    element: <CreateASpace />
                },
                {
                    path: 'spaceview/:spaceId',
                    element: <SpaceView />
                },
                {
                    path: 'spaceview',
                    element: <SpaceView />
                },
                {
                    path: 'create-guide',
                    element: <CreateGuideProfile />
                }]
            },
            {
                path: '/about',
                element: <About />
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
