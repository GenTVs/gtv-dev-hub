/*
=========================
Project Filter Utility
=========================
*/

export function getVisibleProjects(projects, searchValue, statusFilter) {
    let visibleProjects = [...projects];

    /*
    =========================
    Search Filter
    =========================
    */

    if (searchValue) {
        const normalizedSearch = searchValue.toLowerCase();

        visibleProjects = visibleProjects.filter((project) => {
            return (
                project.name.toLowerCase().includes(normalizedSearch) ||
                project.description.toLowerCase().includes(normalizedSearch) ||
                project.language.toLowerCase().includes(normalizedSearch)
            );
        });
    }

    /*
    =========================
    Status Filter
    =========================
    */

    if (statusFilter !== "all") {
        visibleProjects = visibleProjects.filter((project) => {
            return project.status === statusFilter;
        });
    }

    return visibleProjects;
}