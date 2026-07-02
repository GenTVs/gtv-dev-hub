/*
=========================
Filter Events
=========================
*/

import { appState } from "../state/appState.js";

export function attachFilterEvents({ renderApp }) {
    document.addEventListener("click", function (e) {
        const filterButton = e.target.closest("[data-status-filter]");

        if (!filterButton) return;

        appState.statusFilter = filterButton.dataset.statusFilter;

        renderApp("projects");
    });
}