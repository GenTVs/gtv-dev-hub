import { createDefaultProject } from "../config/defaultProject.js";

/*
=========================
Project Events
=========================
*/

export function attachProjectEvents({
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
    saveRoute,
    resetProjects,
    initialProjects,
}) {
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("new-project-btn")) {
            openProjectModal();
        }
    });

    document.addEventListener("click", function (e) {
        const deleteButton = e.target.closest(".delete-project-btn");

        if (!deleteButton) return;
        
        e.stopPropagation();

        const projectId = Number(deleteButton.dataset.deleteId);
        const confirmed = confirm("Are you sure you want to delete this project?");

        if (!confirmed) return;

        deleteProject(projectId);
        
        saveProjects();

        renderApp(appState.currentPage);
    });

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

        const newProject = createDefaultProject(projectName, projectDesc);

        addProject(newProject);

        saveProjects();

        document.querySelector(".modal-overlay")?.remove();

        navigateTo("projects");
    });

    document.addEventListener("click", function (e) {
        const editButton = e.target.closest(".edit-project-btn");

        if (!editButton) return;

        const projectId = Number(editButton.dataset.editId);
        const project = appState.projects.find((p) => p.id === projectId);

        if (!project) return;

        openEditProjectModal(project);
    });

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

        updateProject(projectId, {
            name: newName,
            description: newDescription,
            updatedAt: "Updated just now",
        });

        saveProjects();

        document.querySelector(".modal-overlay")?.remove();

        navigateToProject(projectId);
    });

    document.addEventListener("click", function (e) {
        // If user clicked delete button, do not open project detail
        if (e.target.closest(".delete-project-btn")) return;

        const card = e.target.closest(".project-card");

        if (!card) return;

        const projectId = Number(card.dataset.id);

        navigateToProject(projectId);
    });

    document.addEventListener("click", function (e) {
        if (!e.target.classList.contains("reset-data-btn")) return;

        const confirmed = confirm("Reset projects back to demo data?");

        if (!confirmed) return;

        resetProjects(initialProjects);
        saveProjects();
        renderApp(appState.currentPage);
    });
}