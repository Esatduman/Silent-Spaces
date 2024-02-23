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

export function SpaceList() {
    return (<>
    <div class="space-list">
        <div class="space-list-left">
        <ul>
            <li>Space</li>
            <li>Space</li>
        </ul>
        </div>
        <div class="space-list-right">
        Image
        </div>
    </div>
    </>);
}