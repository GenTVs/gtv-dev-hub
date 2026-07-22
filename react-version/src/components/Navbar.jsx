/*
=========================
Navbar Component
=========================
*/

function Navbar({
	currentPage,
	onNavigate,
	showSearch,
	searchValue,
	onSearchChange,
	onSearchSubmit,
}) {
	function handleKeyDown(e) {
		if (e.key === "Enter") {
			onSearchSubmit();
		}
	}

	return (
		<nav className="navbar">
			<div className="nav-left">
				<h2 className="logo">GTV Dev Hub</h2>
			</div>

			<div className="nav-center">
				{showSearch && (
					<input
						className="search-input"
						type="text"
						placeholder="Search projects..."
						value={searchValue}
						onChange={(e) => onSearchChange(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
				)}
			</div>

			<div className="nav-right">
				<a
					href="#"
					className={currentPage === "overview" ? "active" : ""}
					onClick={(e) => {
						e.preventDefault();
						onNavigate("overview");
					}}
				>
					Home
				</a>

				<a
					href="#"
					className={currentPage === "projects" ? "active" : ""}
					onClick={(e) => {
						e.preventDefault();
						onNavigate("projects");
					}}
				>
					Explore
				</a>

				<a
					href="#"
					className={currentPage === "profile" ? "active" : ""}
					onClick={(e) => {
						e.preventDefault();
						onNavigate("profile");
					}}
				>
					Profile
				</a>
			</div>
		</nav>
	);
}

export default Navbar;