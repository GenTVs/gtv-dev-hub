/*
=========================
Project Detail Component
=========================
*/

// Function to generate project detail page
export function createProjectDetail(project) {
    const topics = project.topics || ["community", "development"];
    const files = project.files || ["README.md", "src/", "index.html"];
    const readme = project.readme || "No README has been written for this project yet.";

    return `
        <!--
        =========================
        Project Detail View
        =========================
        -->
        <div class="repo-detail">
        
            <!-- Repo Header -->
            <div class="repo-header">
                <div>
                    <h1>${project.name}</h1>
                    <p>${project.description}</p>
                </div>
                
                <span class="project-visibility ${project.visibility.toLowerCase()}">
                    ${project.visibility}
                </span>
            </div>
            
            <!-- Repo Tabs -->
            <div class="repo-tabs">
                <button class="repo-tab active">Code</button>
                <button class="repo-tab">Issues ${project.issues || 0}</button>
                <button class="repo-tab">Pull Requests ${project.pullRequests || 0}</button>
                <button class="repo-tab">Actions</button>
            </div>

            <!-- Repo Body -->
            <div class="repo-body">
            
                <!-- Main Repo Content -->
                <div class="repo-main">
                
                    <!-- File List -->
                    <div class="file-list">
                        <div class="file-list-header">
                            <strong>Files</strong>
                            <span>${project.updatedAt}</span>
                        </div>
                        
                        ${files
                            .map((file) => {
                                return `
                                    <div class="file-row">
                                        <span>📄 ${file}</span>
                                        <span>Updated recently</span>
                                    </div>
                                `;
                            })
                            .join("")}
                    </div>
                    
                    <!-- README -->
                    <div class="readme-card">
                        <h2>README.md</h2>
                        <p>${readme}</p>
                    </div>
                    
                </div>
                
                <!-- Repo Sidebar -->
                <aside class="repo-sidebar">
                
                    <div class="repo-info-card">
                        <h3>About</h3>
                        <p>${project.description}</p>
                    </div>
                    
                    <div class="repo-info-card">
                        <h3>Topics</h3>
                        
                        <div class="topic-list">
                            ${topics
                                .map((topic) => {
                                    return `<span class="topic-badge">${topic}</span>`;
                                })
                                .join("")}
                        </div>
                    </div>
                    
                    <div class="repo-info-card">
                        <h3>Stats</h3>
                        
                        <div class="repo-stats">
                            <span>⭐ ${project.stars} stars</span>
                            <span>🍴 ${project.forks} forks</span>
                            <span>🕒 ${project.commits || 0} commits</span>
                        </div>
                    </div>
                    
                </aside>
                
            </div>

            <div class="repo-actions">
                <button class="primary-btn edit-project-btn" data-edit-id="${project.id}">
                    Edit Project
                </button>
            
                <!-- Back Button -->
                <button class="secondary-btn back-btn">
                    Back to Projects
                </button>
            </div>
            
        </div>
    `;
}