/*
=========================
Project Modal Component
=========================
*/

import { useState } from "react";

function ProjectModal({ onCreateProject, onClose }) {
	const [projectName, setProjectName] = useState("");
	const [projectDesc, setProjectDesc] = useState("");

	function handleSubmit() {
		if (!projectName.trim() || !projectDesc.trim()) {
			alert("Please fill in project name and description.");
			return;
		}

		onCreateProject({
			id: Date.now(),
			name: projectName,
			description: projectDesc,
			language: "JavaScript",
			status: "Planning",
			visibility: "Public",
			stars: 0,
			forks: 0,
			updatedAt: "Updated just now",
		});

		onClose();
	}

	return (
		<div className="modal-overlay">
			<div className="modal">
				<h2>Create New Project</h2>

				<input
					type="text"
					placeholder="Project name"
					value={projectName}
					onChange={(e) => setProjectName(e.target.value)}
				/>

				<textarea
					placeholder="Description"
					value={projectDesc}
					onChange={(e) => setProjectDesc(e.target.value)}
				/>

				<div className="modal-actions">
					<button className="primary-btn" onClick={handleSubmit}>
						Create
					</button>

					<button className="secondary-btn" onClick={onClose}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProjectModal;