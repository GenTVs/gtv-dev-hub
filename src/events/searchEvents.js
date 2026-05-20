/*
=========================
Search Events
=========================
*/

import { appState } from "../state/appState.js";
import { renderProjectCards } from "../render/renderProjects.js";

export function attachSearchHandler() {
    const searchInput = document.querySelector(".search-input");
    const projectGrid = document.querySelector(".project-grid");

    if (!searchInput || !projectGrid) return;

    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.toLowerCase();

        const filteredProjects = appState.projects.filter((project) => {
            return (
                project.name.toLowerCase().includes(searchValue) ||
                project.description.toLowerCase().includes(searchValue) ||
                project.language.toLowerCase().includes(searchValue)
            );
        });

        projectGrid.innerHTML = renderProjectCards(filteredProjects);
    });
}