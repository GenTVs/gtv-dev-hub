/*
=========================
Simple Page Renderer
=========================
*/

import { ROUTES } from "../constants/appConstants.js";
import { renderProjectCards } from "./renderProjects.js";
import { appState } from "../state/appState.js";
import { getVisibleProjects } from "../utils/filterProjects.js";

export function renderSimplePage(content, pageName, projects) {
    if (pageName === ROUTES.PROJECTS) {
        const visibleProjects = getVisibleProjects(
            projects,
            appState.searchValue,
            appState.statusFilter
        );

		const pageTitle = appState.searchValue
			? `Results for "${appState.searchValue}"`
			: "All Projects";
        
        content.innerHTML = `
            <div class="section-header">
                <h2>${pageTitle}</h2>

				${
					appState.searchValue
						? `<button class="secondary-btn clear-search-btn">Clear Search</button>`
						: ""
				}
            </div>

            <div class="filter-bar">
                <button class="filter-btn ${appState.statusFilter === "all" ? "active" : ""}" data-status-filter="all">
                    All
                </button>

                <button class="filter-btn ${appState.statusFilter === "Active" ? "active" : ""}" data-status-filter="Active">
                    Active
                </button>

                <button class="filter-btn ${appState.statusFilter === "Beta" ? "active" : ""}" data-status-filter="Beta">
                    Beta
                </button>

                <button class="filter-btn ${appState.statusFilter === "Planning" ? "active" : ""}" data-status-filter="Planning">
                    Planning
                </button>
            </div>

            <div class="project-grid">
                ${renderProjectCards(visibleProjects)}
            </div>
        `;

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