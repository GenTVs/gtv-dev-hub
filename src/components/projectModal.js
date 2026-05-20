/*
=========================
Project Modal Component
=========================
*/

export function createProjectModal() {
    return `
        <div class="modal">
        
            <h2>Create New Project</h2>
            
            <input class="project-name-input" type="text" placeholder="Project name" />
            <textarea class="project-desc-input" placeholder="Description"></textarea>
            
            <div class="modal-actions">
                <button class="primary-btn create-btn">Create</button>
                <button class="secondary-btn close-btn">Cancel</button>
            </div>
            
        </div>
    `;
}

export function createEditProjectModal(project) {
    return `
        <div class="modal">
        
            <h2>Edit Project</h2>
            
            <input
                class="edit-project-name-input"
                type="text"
                value="${project.name}"
            />
            
            <textarea class="edit-project-desc-input">${project.description}</textarea>
            
            <div class="modal-actions">
                <button class="primary-btn save-edit-btn" data-save-id="${project.id}">
                    Save Changes
                </button>
                
                <button class="secondary-btn close-btn">
                    Cancel
                </button>
            </div>
            
        </div>
    `;
}