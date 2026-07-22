/*
=========================
Activity Panel Component
=========================
*/

function ActivityPanel() {
	return (
		<aside className="activity-panel">
			<h3 className="activity-title">Latest Activity</h3>

			<div className="activity-list">
				<div className="activity-item">
					<strong>gtv-dev-hub</strong>
					<span>React version initialized</span>
				</div>

				<div className="activity-item">
					<strong>phase-3</strong>
					<span>Component structure started</span>
				</div>

				<div className="activity-item">
					<strong>learning</strong>
					<span>React rebuild in progress</span>
				</div>
			</div>
		</aside>
	);
}

export default ActivityPanel;