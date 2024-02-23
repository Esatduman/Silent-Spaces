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

export function SpaceView() {
    return (<>
    <div class="space-view">
        <div class="list">
        <ul>
            <li>Space</li>
            <li>Space</li>
        </ul>
        </div>
        <div class="image">
        Image
        </div>
    </div>
    </>);
}