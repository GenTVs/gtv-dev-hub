/*
=========================
Project Detail Renderer
=========================
*/

import { createProjectDetail } from "../components/projectDetail.js";

export function renderProjectDetail(content, project) {
    if (!project) return;

    content.innerHTML = createProjectDetail(project);
}