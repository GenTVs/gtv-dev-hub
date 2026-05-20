/*
=========================
Project Render Helpers
=========================
*/

import { createProjectCard } from "../components/projectCard.js";

export function renderProjectCards(projectList) {
    if (projectList.length === 0) {
        return `
            <div class="empty-state">
                <h3>No projects found.</h3>
                <p>Try searching for another project name, language, or keyword.</p>
            </div>
        `;
    }

    return projectList.map((project) => createProjectCard(project)).join("");
}