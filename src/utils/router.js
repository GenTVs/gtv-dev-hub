import { ROUTES } from "../constants/appConstants.js";

/*
=========================
Router Utilities
=========================
*/

export function getHashForPage(page) {
    if (page === ROUTES.OVERVIEW) {
        return "#/overview";
    }

    return `#/${page}`;
}

export function getRouteFromHash() {
    const hash = window.location.hash;

    if (!hash || hash === "#") {
        return { page: ROUTES.OVERVIEW };
    }

    if (hash.startsWith("#/project/")) {
        const projectId = Number(hash.replace("#/project/", ""));

        return {
            page: ROUTES.PROJECT,
            projectId: projectId,
        };
    }

    if (hash === "#/overview") return { page: ROUTES.OVERVIEW };
    if (hash === "#/projects") return { page: ROUTES.PROJECTS };
    if (hash === "#/profile") return { page: ROUTES.PROFILE };
    if (hash === "#/stars") return { page: ROUTES.STARS };
    if (hash === "#/settings") return { page: ROUTES.SETTINGS };

    return { page: ROUTES.NOT_FOUND };
}