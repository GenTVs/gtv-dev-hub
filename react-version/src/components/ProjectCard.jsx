/*
=========================
Project Card Component
=========================
*/

function ProjectCard({ project, onDeleteProject, onSelectProject }) {
	return (
		<div className="project-card" onClick={() => onSelectProject(project)}>
			<div className="project-header">
				<h3 className="project-title">{project.name}</h3>

				<span className={`project-visibility ${project.visibility.toLowerCase()}`}>
					{project.visibility}
				</span>
			</div>

			<p className="project-desc">{project.description}</p>

			<div className="project-status">
				<span className={`status-badge ${project.status.toLowerCase()}`}>
					{project.status}
				</span>

				<span className="updated-text">{project.updatedAt}</span>
			</div>

			<div className="project-meta">
				<span>{project.language}</span>
				<span>⭐ {project.stars}</span>
				<span>🍴 {project.forks}</span>
			</div>

			<button
				className="delete-project-btn"
				onClick={(e) => {
					e.stopPropagation();
					onDeleteProject(project.id);
				}}
			>
				Delete
			</button>
		</div>
	);
}

export default ProjectCard;