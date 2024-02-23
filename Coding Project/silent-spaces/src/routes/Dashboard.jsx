import { useOutlet } from "react-router-dom";

export function Dashboard() {
    const outlet = useOutlet();

    return (
    <>
    <div>
        <h1>Dashboard.</h1>
        <div>
            {outlet || <>Error: Unknown dashboard page.</>}
        </div>
    </div>
    </>
    );
}
