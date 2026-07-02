/*
=========================
Search Events
=========================
*/

import { appState } from "../state/appState.js";
import { ROUTES } from "../constants/appConstants.js";

export function attachSearchHandler({ renderApp }) {
	const searchInput = document.querySelector(".search-input");

	if (searchInput) {
		searchInput.value = appState.searchValue;

		searchInput.addEventListener("keydown", function (e) {
			if (e.key !== "Enter") return;

			appState.searchValue = searchInput.value.trim();

			renderApp(ROUTES.PROJECTS);
		});
	}

	const clearSearchButton = document.querySelector(".clear-search-btn");
	
	if (clearSearchButton) {
		clearSearchButton.addEventListener("click", function () {
			appState.searchValue = "";

			renderApp(ROUTES.PROJECTS);
		});
	}
}