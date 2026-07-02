/*
=========================
Navbar Component
=========================
*/

export function createNavbar({ showSearch = false, searchValue = "" } = {}) {
    return `
        <nav class="navbar">
        
            <div class="nav-left">
                <h2 class="logo">GTV Dev Hub</h2>
            </div>
            
            <div class="nav-center">
                ${
                    showSearch
                        ? `
                            <input
                                class="search-input"
                                type="text"
                                placeholder="Search projects..."
                                value="${searchValue}"
                            />
                        `
                    : ""
                }
            </div>
            
            <div class="nav-right">
                <a href="#" data-page="overview">Home</a>
                <a href="#" data-page="projects">Explore</a>
                <a href="#" data-page="profile">Profile</a>
            </div>
            
        </nav>
    `;
}