document.addEventListener("click", function (e) {
    if (!e.target.classList.contains("reset-data-btn")) return;

    const confirmed = confirm("Reset projects back to demo data?");

    if (!confirmed) return;

    resetProjects(initialProjects);
    saveProjects();
    renderApp(appState.currentPage);
});