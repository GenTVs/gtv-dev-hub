/*
=========================
Sidebar Component
=========================
*/

function Sidebar({ currentPage, onNavigate }) {
	return (
		<aside className="sidebar">
			<h3 className="sidebar-title">Dashboard</h3>

			<ul className="sidebar-menu">
				<li>
					<a
						href="#"
						className={currentPage === "overview" ? "active" : ""}
						onClick={(e) => {
							e.preventDefault();
							onNavigate("overview");
						}}
					>
						Overview
					</a>
				</li>

				<li>
					<a
						href="#"
						className={currentPage === "projects" ? "active" : ""}
						onClick={(e) => {
							e.preventDefault();
							onNavigate("projects");
						}}
					>
						Projects
					</a>
				</li>

				<li>
					<a
						href="#"
						className={currentPage === "stars" ? "active" : ""}
						onClick={(e) => {
							e.preventDefault();
							onNavigate("stars");
						}}
					>
						Stars
					</a>
				</li>

				<li>
					<a
						href="#"
						className={currentPage === "settings" ? "active" : ""}
						onClick={(e) => {
							e.preventDefault();
							onNavigate("settings");
						}}
					>
						Settings
					</a>
				</li>
			</ul>
		</aside>
	);
}

export default Sidebar;