/*
=========================
Router Utilities
=========================
*/

export function getHashForPage(page) {
    if (page === "overview") {
        return "#/overview";
    }

    return `#/${page}`;
}

export function getRouteFromHash() {
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