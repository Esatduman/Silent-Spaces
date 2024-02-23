import { SpaceCard } from "./SpaceCard";

const dummySpaceViewData = {
    spaces: [
        {
            owner: 'john-bell',
            name: 'lcc3',
            displayName: 'Classroom',
            rating: 4,
        },
        {
            owner: 'uic',
            name: 'sce-inner-circle',
            displayName: 'Student Center East - Inner Circle',
            rating: 3,
        }
    ]
}

export function SpaceList({spaceViewData}) {
    const viewData = dummySpaceViewData;
    return (<>
    <div className="space-list">
        <div className="space-list-left">
        <ul>
        {viewData.spaces.map((space) => <li><SpaceCard space={space}></SpaceCard></li>)}
        </ul>
        </div>
        <div className="space-list-right">
        Image
        </div>
    </div>
    </>);
}