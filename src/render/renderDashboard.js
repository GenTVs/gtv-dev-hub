/*
=========================
Dashboard Renderer
=========================
*/

import { createNavbar } from "../components/navbar.js";
import { createSidebar } from "../components/sidebar.js";
import { createActivityPanel } from "../components/activityPanel.js";

import { renderProjectCards } from "./renderProjects.js";

export function renderDashboard(app, projects, options = {}) {
    const { showSearch = false, searchValue = "" } = options;
    
    app.innerHTML = `
        ${createNavbar({ showSearch, searchValue })}
        
        <main class="main-layout">
            ${createSidebar()}
            
            <section class="content">
                <div class="hero">
                    <h1>Build. Share. Grow.</h1>
                    <p>
                        A developer hub for GTV Community projects,
                        bots, tools, and experiments.
                    </p>
                </div>
                
                <div class="section-header">
                    <h2>Featured Projects</h2>
                    
                    <div class="section-actions">
                        <button class="secondary-btn reset-data-btn">
                            Reset Demo Data
                        </button>

                        <button class="primary-btn new-project-btn">
                            New Project
                        </button>
                    </div>
                </div>
                
                <div class="project-grid">
                    ${renderProjectCards(projects)}
                </div>
            </section>
            
            ${createActivityPanel()}
        </main>
    `;
}