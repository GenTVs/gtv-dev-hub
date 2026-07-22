/*
=========================
Edit Project Modal Component
=========================
*/

import { useState } from "react";

function EditProjectModal({ project, onUpdateProject, onClose }) {
	const [projectName, setProjectName] = useState(project.name);
	const [projectDesc, setProjectDesc] = useState(project.description);

	function handleSubmit() {
		if (!projectName.trim() || !projectDesc.trim()) {
			alert("Please fill in project name and description.");
			return;
		}

		onUpdateProject({
			...project,
			name: projectName,
			description: projectDesc,
			updatedAt: "Updated just now",
		});

		onClose();
	}

	return (
		<div className="modal-overlay">
			<div className="modal">
				<h2>Edit Project</h2>

				<input
					type="text"
					value={projectName}
					onChange={(e) => setProjectName(e.target.value)}
				/>

				<textarea
					value={projectDesc}
					onChange={(e) => setProjectDesc(e.target.value)}
				/>

				<div className="modal-actions">
					<button className="primary-btn" onClick={handleSubmit}>
						Save Changes
					</button>

					<button className="secondary-btn" onClick={onClose}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}

export default EditProjectModal;