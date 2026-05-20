/*
=========================
Simple Page Renderer
=========================
*/

import { ROUTES } from "../constants/appConstants.js";
import { renderProjectCards } from "./renderProjects.js";
import { attachSearchHandler } from "../events/searchEvents.js";

export function renderSimplePage(content, pageName, projects) {
    if (pageName === ROUTES.PROJECTS) {
        content.innerHTML = `
            <div class="section-header">
                <h2>All Projects</h2>
            </div>
            
            <div class="project-grid">
                ${renderProjectCards(projects)}
            </div>
        `;

        attachSearchHandler();

        return;
    }

    const pageTitles = {
        stars: "Starred Projects",
        settings: "Settings",
        profile: "Profile",
    };

    const title = pageTitles[pageName] || "Page";

    content.innerHTML = `
        <div class="simple-page">
            <h1>${title}</h1>
            <p>This section will be developed in a later phase.</p>
        </div>
    `;
}