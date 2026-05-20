/*
=========================
Navigation Events
=========================
*/

export function attachNavigationEvents({
    navigateTo,
    renderCurrentRoute,
}) {
    document.addEventListener("click", function (e) {
        const link = e.target.closest("[data-page]");

        if (!link) return;

        e.preventDefault();

        navigateTo(link.dataset.page);
    });

    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("back-btn")) {
            navigateTo("projects");
        }
    });

    window.addEventListener("hashchange", function () {
        renderCurrentRoute();
    });
}