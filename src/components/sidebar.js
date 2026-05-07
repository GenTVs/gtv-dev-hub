/*
=========================
Sidebar Component
=========================
*/

// Function to generate Sidebar
export function createSidebar() {
    return `
        <!--
        =========================
        Sidebar
        =========================
        -->
        <aside class="sidebar">
        
            <!-- Section Title -->
            <h3 class="sidebar-title">Dashboard</h3>
            
            <!-- Navigation Links -->
            <ul class="sidebar-menu">
                <li><a href="#" data-page="overview">Overview</a></li>
                <li><a href="#" data-page="projects">Projects</a></li>
                <li><a href="#" data-page="stars">Stars</a></li>
                <li><a href="#" data-page="settings">Settings</a></li>
            </ul>
            
        </aside>
    `;
}