export function SpaceCard({space}) {
    return (<>
    <div className="space-card">
        @{space.owner}:{space.name}
    </div>
    </>);
}