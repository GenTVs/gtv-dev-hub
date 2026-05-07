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
import { createProjectCard } from "./components/projectCard.js";
import { createActivityPanel } from "./components/activityPanel.js";
import { createProjectDetail } from "./components/projectDetail.js";

import { projects as initialProjects } from "./data/projects.js";

/*
=========================
Local Storage Setup
=========================
*/

const STORAGE_KEY = "gtv-dev-hub-projects";

/*
=========================
Load Projects
=========================
*/

function loadProjects() {
    const savedProjects = localStorage.getItem(STORAGE_KEY);

    if (!savedProjects) {
        return [...initialProjects];
    }

    try {
        return JSON.parse(savedProjects);
    } catch (error) {
        console.error("Failed to load saved projects:", error);
        return [...initialProjects];
    }
}

/*
=========================
Save Projects
=========================
*/

function saveProjects() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

/*
=========================
Projects State
=========================
*/

let projects = loadProjects();

/*
=========================
Select App Container
=========================
*/

// Get the main app div from index.html
const app = document.querySelector("#app");

/*
=========================
App State
=========================
*/

let currentPage = "overview";

/*
=========================
Route Helpers
=========================
*/

function getHashForPage(page) {
    if (page === "overview") {
        return "#/overview";
    }

    return `#/${page}`;
}

/*
=========================
Render Current Route
=========================
*/

function renderCurrentRoute() {
    const route = getRouteFromHash();

    renderPage(route.page, route.projectId);
    setActiveSidebar();
}

/*
=========================
Route Parser
=========================
*/

function getRouteFromHash() {
    const hash = window.location.hash;

    if (hash.startsWith("#/project/")) {
        const projectId = Number(hash.replace("#/project/", ""));

        return {
            page: "project",
            projectId: projectId,
        };
    }

    if (hash === "#/projects") return { page: "projects" };
    if (hash === "#/profile") return { page: "profile" };
    if (hash === "#/stars") return { page: "stars" };
    if (hash === "#/settings") return { page: "settings" };

    return { page: "overview" };
}

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
        renderPage(page);
        setActiveSidebar();
        return;
    }

    window.location.hash = newHash;
}

/*
=========================
Render Project Cards
=========================
*/

// Convert every project object into a project card HTML string
function renderProjectCards(projectList) {
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

/*
=========================
Render Full Page
=========================
*/

// Put all UI parts into the app container
function renderDashboard() {
    app.innerHTML = `
    ${createNavbar()}
    
    <main class="main-layout">
        ${createSidebar()}
        
        <section class="content">
            <div class="hero">
                <h1>Build. Share. Grow.</h1>
                <p>A developer hub for GTV Community projects, bots, tools, and experiments.</p>
            </div>
            
            <div class="section-header">
                <h2>Featured Projects</h2>
                <button class="primary-btn new-project-btn">New Project</button>
            </div>
            
            <div class="project-grid">
                ${renderProjectCards(projects)}
            </div>
        </section>

        ${createActivityPanel()}
    </main>
`;

setActiveSidebar();
attachSearchHandler(); // re-attach after re-render
}

/*
=========================
Initial Render
=========================
*/

renderCurrentRoute();

/*
=========================
Search Feature
=========================
*/

function attachSearchHandler() {
    const searchInput = document.querySelector(".search-input");
    const projectGrid = document.querySelector(".project-grid");

    if (!searchInput || !projectGrid) return;

    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.toLowerCase();

        const filteredProjects = projects.filter((project) => {
            return (
                project.name.toLowerCase().includes(searchValue) ||
                project.description.toLowerCase().includes(searchValue) ||
                project.language.toLowerCase().includes(searchValue)
            );
        });

        projectGrid.innerHTML = renderProjectCards(filteredProjects);
    });
}

/*
=========================
Project Click Handler
=========================
*/

document.addEventListener("click", function (e) {
    // If user clicked delete button, do not open project detail
    if (e.target.closest(".delete-project-btn")) return;
    
    const card = e.target.closest(".project-card");

    if (!card) return;

    const projectId = Number(card.dataset.id);

    navigateToProject(projectId);
});

/*
=========================
Back Button Handler
=========================
*/

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("back-btn")) {
        navigateTo("Projects");
    }
});

/*
=========================
Project Detail View
=========================
*/

function showProjectDetail(project) {
    const content = document.querySelector(".content");

    if (!project) return;

    content.innerHTML = createProjectDetail(project);
}

/*
=========================
Navigation Handler
=========================
*/

document.addEventListener("click", function (e) {
    const link = e.target.closest("[data-page]");

    if (!link) return;

    e.preventDefault();

    navigateTo(link.dataset.page);
    setActiveSidebar();
});

/*
=========================
Simple Page Renderer
=========================
*/

function renderSimplePage(pageName) {
    const content = document.querySelector(".content");

    if (pageName === "projects") {
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

/*
=========================
Active Sidebar State
=========================
*/

function setActiveSidebar() {
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
Open Modal
=========================
*/

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("new-project-btn")) {
        openProjectModal();
    }
});

/*
=========================
Modal Renderer
=========================
*/

function openProjectModal() {
    const modal = document.createElement("div");

    modal.className = "modal-overlay";
    
    modal.innerHTML = `
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

    modal.innerHTML = `
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
Create Project
=========================
*/

document.addEventListener("click", function (e) {
    if (!e.target.classList.contains("create-btn")) return;

    const nameInput = document.querySelector(".project-name-input");
    const descInput = document.querySelector(".project-desc-input");

    const projectName = nameInput.value.trim();
    const projectDesc = descInput.value.trim();

    if (!projectName || !projectDesc) {
        alert("Please fill in project name and description.");
        return;
    }

    const newProject = {
        id: Date.now(),
        name: projectName,
        description: projectDesc,
        language: "JavaScript",
        status: "Planning",
        visibility: "Public",
        stars: 0,
        forks: 0,
        updatedAt: "Updated just now",
    };

    projects.unshift(newProject);
    saveProjects();

    document.querySelector(".modal-overlay")?.remove();

    navigateTo("projects");
});

/*
=========================
Main Router
=========================
*/

function renderPage(page, projectId = null) {
    currentPage = page === "project" ? "projects" : page;

    if (page === "overview") {
        renderDashboard();
        return;
    }

    if (page === "project") {
        renderDashboard();

        const project = projects.find((p) => p.id === projectId);
        
        if (!project) {
            renderSimplePage("projects");
            return;
        }

        showProjectDetail(project);
        setActiveSidebar();
        return;
    }

    renderSimplePage(page);
}

/*
=========================
Delete Project
=========================
*/

document.addEventListener("click", function (e) {
    const deleteButton = e.target.closest(".delete-project-btn");

    if (!deleteButton) return;

    // Stop card click from opening project detail
    e.stopPropagation();

    const projectId = Number(deleteButton.dataset.deleteId);

    const confirmed = confirm("Are you sure you want to delete this project?");

    if (!confirmed) return;

    projects = projects.filter((project) => project.id !== projectId);

    saveProjects();

    renderPage(currentPage);
    setActiveSidebar();
});

/*
=========================
Hash Change Listener
=========================
*/

window.addEventListener("hashchange", function () {
    renderCurrentRoute();
});

/*
=========================
Open Edit Modal
=========================
*/

document.addEventListener("click", function (e) {
    const editButton = e.target.closest(".edit-project-btn");

    if (!editButton) return;

    const projectId = Number(editButton.dataset.editId);
    const project = projects.find((p) => p.id === projectId);

    if (!project) return;

    openEditProjectModal(project);
});

/*
=========================
Save Edited Project
=========================
*/

document.addEventListener("click", function (e) {
    const saveButton = e.target.closest(".save-edit-btn");

    if (!saveButton) return;

    const projectId = Number(saveButton.dataset.saveId);

    const nameInput = document.querySelector(".edit-project-name-input");
    const descInput = document.querySelector(".edit-project-desc-input");

    const newName = nameInput.value.trim();
    const newDescription = descInput.value.trim();

    if (!newName || !newDescription) {
        alert("Please fill in project name and description.");
        return;
    }

    projects = projects.map((project) => {
        if (project.id === projectId) {
            return {
                ...project,
                name: newName,
                description: newDescription,
                updatedAt: "Updated just now",
            };
        }

        return project;
    });

    saveProjects();

    document.querySelector(".modal-overlay")?.remove();

    navigateToProject(projectId);
});