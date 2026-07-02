/*
=========================
App State
=========================
*/

export const appState = {
    currentPage: "overview",
    projects: [],
    searchValue: "",
    statusFilter: "all",
};

/*
=========================
State Helpers
=========================
*/

export function setCurrentPage(page) {
    appState.currentPage = page;
}

export function setProjects(projectList) {
    appState.projects = projectList;
}

export function addProject(project) {
    appState.projects.unshift(project);
}

export function updateProject(projectId, updatedData) {
    appState.projects = appState.projects.map((project) => {
        if (project.id === projectId) {
            return {
                ...project,
                ...updatedData,
            };
        }
        
        return project;
    });
}

export function deleteProject(projectId) {
    appState.projects = appState.projects.filter((project) => {
        return project.id !== projectId;
    });
}

export function resetProjects(projectList) {
    appState.projects = [...projectList];
}