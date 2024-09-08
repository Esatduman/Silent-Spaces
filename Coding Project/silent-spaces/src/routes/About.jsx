import "./About.scss";

export function About() {
    const PEOPLE = [
        {
            name: "Esat Duman",
            email: "eduman2@uic.edu",
        },
        {
            name: "Jonathan Juarez",
            email: "jjuar2@uic.edu",
        },
        {
            name: "Kent Lizardo",
            email: "kliza2@uic.edu",
        },
        {
            name: "Jose Tejeda",
            email: "jtejed4@uic.edu"
        }
    ];

    return (
        <>
            <div className="title-div">
                <h1 className="header">Meet the Team</h1>
            </div>

            <div className="names-div">
                {PEOPLE.map((person, index) => (
                    <div className="person-div" key={index}>
                        <h3>{person.name}</h3>
                        <p>{person.email}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
