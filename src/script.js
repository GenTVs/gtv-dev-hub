/*
=========================
Main App Script
=========================
*/

/*
=========================
Imports
=========================
*/

import { createNavbar } from "./components/navbar.js";
import { createSidebar } from "./components/sidebar.js";
import { createActivityPanel } from "./components/activityPanel.js";
import {
    createProjectModal,
    createEditProjectModal,
} from "./components/projectModal.js";

import { projects as initialProjects } from "./data/projects.js";

import { loadFromStorage, saveToStorage } from "./utils/storage.js";
import {
    getHashForPage,
    getRouteFromHash,
} from "./utils/router.js";

import {
    appState,
    addProject,
    updateProject,
    deleteProject,
    resetProjects,
} from "./state/appState.js";

import { STORAGE_KEY, ROUTES } from "./constants/appConstants.js";

import { renderProjectCards } from "./render/renderProjects.js";
import { renderDashboard } from "./render/renderDashboard.js";
import { renderSimplePage } from "./render/renderSimplePage.js";
import { renderProjectDetail } from "./render/renderProjectDetail.js";
import { renderNotFound } from "./render/renderNotFound.js";

import { attachSearchHandler } from "./events/searchEvents.js";
import { attachProjectEvents } from "./events/projectEvents.js";
import { attachNavigationEvents } from "./events/navigationEvents.js";
import { attachFilterEvents } from "./events/filterEvents.js";

/*
=========================
Load Projects
=========================
*/

function loadProjects() {
    return loadFromStorage(STORAGE_KEY, [...initialProjects]);
}

/*
=========================
Save Projects
=========================
*/

function saveProjects() {
    saveToStorage(STORAGE_KEY, appState.projects);
}

/*
=========================
Select App Container
=========================
*/

// Get the main app div from index.html
const app = document.querySelector("#app");

/*
=========================
Initialize State
=========================
*/

appState.projects = loadProjects();

/*
=========================
Render Current Route
=========================
*/

function renderCurrentRoute() {
    const route = getRouteFromHash();

    renderApp(route.page, route.projectId);
}

/*
=========================
Route Parser
=========================
*/

function navigateToProject(projectId) {
    const newHash = `#/project/${projectId}`;

    if (window.location.hash === newHash) {
        renderCurrentRoute();
        return;
    }

    window.location.hash = newHash;
}

function navigateTo(page) {
    const newHash = getHashForPage(page);

    if (window.location.hash === newHash) {
        renderApp(page);
        return;
    }

    window.location.hash = newHash;
}

attachProjectEvents({
    appState,
    addProject,
    updateProject,
    deleteProject,
    saveProjects,
    navigateTo,
    navigateToProject,
    renderApp,
    openProjectModal,
    openEditProjectModal,
    resetProjects,
    initialProjects,
});

attachNavigationEvents({
    navigateTo,
    renderCurrentRoute,
});

attachFilterEvents({
    renderApp,
});

/*
=========================
Initial Render
=========================
*/

const initialRoute = getRouteFromHash();

renderApp(initialRoute.page, initialRoute.projectId);

/*
=========================
Active Sidebar State
=========================
*/

function setActiveSidebar() {
    const route = getRouteFromHash();

    const currentPage =
        route.page === ROUTES.PROJECT
            ? ROUTES.PROJECTS
            : route.page;

    const links = document.querySelectorAll("[data-page]");

    links.forEach((link) => {
        if (link.dataset.page === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

/*
=========================
Modal Renderer
=========================
*/

function openProjectModal() {
    const modal = document.createElement("div");

    modal.className = "modal-overlay";
    modal.innerHTML = createProjectModal();

    document.body.appendChild(modal);
}

/*
=========================
Edit Modal Renderer
=========================
*/

function openEditProjectModal(project) {
    const modal = document.createElement("div");

    modal.className = "modal-overlay";
    modal.innerHTML = createEditProjectModal(project);

    document.body.appendChild(modal);
}

/*
=========================
Close Modal
=========================
*/

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("close-btn")) {
        document.querySelector(".modal-overlay")?.remove();
    }
});

/*
=========================
Main Router
=========================
*/

function renderPage(page, projectId = null) {
    const showSearch = page === ROUTES.PROJECTS;

    /*
    =========================
    Overview Page
    =========================
    */

    if (page === ROUTES.OVERVIEW) {
        renderDashboard(app, appState.projects, {
            showSearch: false,
            searchValue: appState.searchValue,
        });

        return;
    }

    /*
    =========================
    Project Detail Page
    =========================
    */

    if (page === ROUTES.PROJECT) {
        renderDashboard(app, appState.projects, {
            showSearch: false,
            searchValue: appState.searchValue,
        });

        const project = appState.projects.find((p) => p.id === projectId);

        if (!project) {
            renderSimplePage(
                document.querySelector(".content"),
                ROUTES.PROJECTS,
                appState.projects
            );

            return;
        }

        renderProjectDetail(document.querySelector(".content"), project);
        return;
    }

    /*
    =========================
    Not Found Page
    =========================
    */

    if (page === ROUTES.NOT_FOUND) {
        renderDashboard(app, appState.projects, {
            showSearch: false,
            searchValue: appState.searchValue,
        });

        renderNotFound(document.querySelector(".content"));
        return;
    }

    /*
    =========================
    Other Pages
    =========================
    */

    renderDashboard(app, appState.projects, {
        showSearch: showSearch,
        searchValue: appState.searchValue,
    });

    renderSimplePage(
        document.querySelector(".content"),
        page,
        appState.projects
    );
}

/*
=========================
Render App
=========================
*/

function renderApp(page = appState.currentPage, projectId = null) {
    renderPage(page, projectId);
    setActiveSidebar();
    attachSearchHandler({
        renderApp,
    });
}