/*
=========================
Navbar Component
=========================
*/

// Function to generate Navbar
export function createNavbar() {
    return `
        <!--
        =========================
        Navbar
        =========================
        -->
        <nav class="navbar">
        
            <!-- Left Section -->
            <div class="nav-left">
                <h2 class="logo">GTV Dev Hub</h2>
            </div>

            <!-- Center Section -->
            <div class="nav-center">
                <input
                    class="search-input"
                    type="text"
                    placeholder="Search projects..."
                />
            </div>
            
            <!-- Right Section -->
            <div class="nav-right">
                <a href="#" data-page="overview">Home</a>
                <a href="#" data-page="projects">Explore</a>
                <a href="#" data-page="profile">Profile</a>
            </div>
            
        </nav>
    `;
}