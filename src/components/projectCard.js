/*
=========================
Project Card Component
=========================
*/

// Function to generate ONE project card
export function createProjectCard(project) {
    return `
        <!--
        =========================
        Project Card
        =========================
        -->
        <div class="project-card" data-id="${project.id}">
        
            <!-- Header -->
            <div class="project-header">
                <h3 class="project-title">${project.name}</h3>
                <span class="project-visibility ${project.visibility.toLowerCase()}">
                    ${project.visibility}
                </span>
            </div>
            
            <!-- Description -->
            <p class="project-desc">${project.description}</p>

            <!-- Status -->
            <div class="project-status">
                <span class="status-badge ${project.status.toLowerCase()}">
                    ${project.status}
                </span>
                <span class="updated-text">${project.updatedAt}</span>
            </div>
            
            <!-- Footer -->
            <div class="project-meta">
                <span>${project.language}</span>
                <span>⭐ ${project.stars}</span>
                <span>🍴 ${project.forks}</span>
            </div>

            <!-- Delete Button -->
            <button class="delete-project-btn" data-delete-id="${project.id}">
                Delete
            </button>
            
        </div>
    `;
}