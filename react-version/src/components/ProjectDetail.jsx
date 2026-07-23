/*
=========================
Project Detail Component
=========================
*/

function ProjectDetail({ project, onBack, onEdit }) {
	return (
		<div className="project-detail">
			<h1>{project.name}</h1>

			<p>{project.description}</p>

			<div className="project-status">
				<span className={`status-badge ${project.status.toLowerCase()}`}>
					{project.status}
				</span>

				<span>{project.visibility}</span>
			</div>

			<div className="project-meta">
				<span>{project.language}</span>
				<span>⭐ {project.stars}</span>
				<span>🍴 {project.forks}</span>
			</div>

			<div className="detail-actions">
				<button className="primary-btn" onClick={onEdit}>
					Edit Project
				</button>

				<button className="secondary-btn back-btn" onClick={onBack}>
					Back to Projects
				</button>
			</div>
		</div>
	);
}

export default ProjectDetail;