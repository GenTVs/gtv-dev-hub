/*
=========================
GTV Dev Hub - React App
=========================
*/

import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ActivityPanel from "./components/ActivityPanel";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import ProjectDetail from "./components/ProjectDetail";
import EditProjectModal from "./components/EditProjectModal";

import { projects as initialProjects } from "./data/projects";

const STORAGE_KEY = "gtv-dev-hub-react-projects";

/*
=========================
Load Projects
=========================
*/

function loadProjects() {
	const savedProjects = localStorage.getItem(STORAGE_KEY);

	if (!savedProjects) {
		return initialProjects;
	}

	try {
		return JSON.parse(savedProjects);
	} catch (error) {
		console.error("Failed to load projects:", error);
		return initialProjects;
	}
}

function App() {
	const [projects, setProjects] = useState(loadProjects);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingProject, setEditingProject] = useState(null);
	const [selectedProject, setSelectedProject] = useState(null);

	const [currentPage, setCurrentPage] = useState("overview");

	const [searchInput, setSearchInput] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	/*
	=========================
	Save Projects
	=========================
	*/

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
	}, [projects]);

	/*
	=========================
	Navigation
	=========================
	*/

	function handleNavigate(page) {
		setCurrentPage(page);
		setSelectedProject(null);
	}

	/*
	=========================
	Project Actions
	=========================
	*/

	function handleCreateProject(newProject) {
		setProjects((currentProjects) => {
			return [newProject, ...currentProjects];
		});
	}

	function handleDeleteProject(projectId) {
		const confirmed = window.confirm("Are you sure you want to delete this project?");

		if (!confirmed) return;

		setProjects((currentProjects) => {
			return currentProjects.filter((project) => project.id !== projectId);
		});
	}

	function handleUpdateProject(updatedProject) {
		setProjects((currentProjects) => {
			return currentProjects.map((project) => {
				if (project.id === updatedProject.id) {
					return updatedProject;
				}

				return project;
			});
		});

		setSelectedProject(updatedProject);
	}

	function handleSelectProject(project) {
		setCurrentPage("projects");
		setSelectedProject(project);
	}

	/*
	=========================
	Search and Filter
	=========================
	*/

	function handleSearchSubmit() {
		setSearchQuery(searchInput.trim());
		setCurrentPage("projects");
		setSelectedProject(null);
	}

	const visibleProjects = projects.filter((project) => {
		const matchesSearch =
			searchQuery === "" ||
			project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			project.language.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesStatus =
			statusFilter === "all" || project.status === statusFilter;

		return matchesSearch && matchesStatus;
	});

	const sectionTitle = searchQuery
		? `Results for "${searchQuery}"`
		: "All Projects";

	const showSearch = currentPage === "projects" && !selectedProject;
	
	/*
	=========================
	Render Helpers
	=========================
	*/

	function renderProjectGrid(projectList) {
		if (projectList.length === 0) {
			return (
				<div className="empty-state">
					<h3>No projects found.</h3>
					<p>Try another search keyword or status filter.</p>
				</div>
			);
		}

		return (
			<div className="project-grid">
				{projectList.map((project) => {
					return (
						<ProjectCard
							key={project.id}
							project={project}
							onDeleteProject={handleDeleteProject}
							onSelectProject={handleSelectProject}
						/>
					);
				})}
			</div>
		);
	}

	function renderSimplePage(title) {
		return (
			<div className="simple-page">
				<h1>{title}</h1>
				<p>This section will be developed in a later phase.</p>
			</div>
		);
	}

	function renderOverviewPage() {
		return (
			<>
				<div className="hero">
					<h1>Build. Share. Grow.</h1>
					<p>
						A developer hub for GTV Community projects, bots, tools,
						and experiments.
					</p>
				</div>

				<div className="section-header">
					<h2>Featured Projects</h2>

					<button
						className="primary-btn"
						onClick={() => setIsModalOpen(true)}
					>
						New Project
					</button>
				</div>

				{renderProjectGrid(projects)}
			</>
		);
	}

	function renderProjectsPage() {
		return (
			<>
				<div className="section-header">
					<h2>{sectionTitle}</h2>

					<div className="section-actions">
						{searchQuery && (
							<button
								className="secondary-btn"
								onClick={() => {
									setSearchInput("");
									setSearchQuery("");
								}}
							>
								Clear Search
							</button>
						)}

						<button
							className="primary-btn"
							onClick={() => setIsModalOpen(true)}
						>
							New Project
						</button>
					</div>
				</div>

				<div className="filter-bar">
					<button
						className={`filter-btn ${statusFilter === "all" ? "active" : ""}`}
						onClick={() => setStatusFilter("all")}
					>
						All
					</button>

					<button
						className={`filter-btn ${statusFilter === "Active" ? "active" : ""}`}
						onClick={() => setStatusFilter("Active")}
					>
						Active
					</button>

					<button
						className={`filter-btn ${statusFilter === "Beta" ? "active" : ""}`}
						onClick={() => setStatusFilter("Beta")}
					>
						Beta
					</button>

					<button
						className={`filter-btn ${
							statusFilter === "Planning" ? "active" : ""
						}`}
						onClick={() => setStatusFilter("Planning")}
					>
						Planning
					</button>
				</div>

				{renderProjectGrid(visibleProjects)}
			</>
		);
	}

	function renderContent() {
		if (selectedProject) {
			return (
				<ProjectDetail
					project={selectedProject}
					onBack={() => setSelectedProject(null)}
					onEdit={() => setEditingProject(selectedProject)}
				/>
			);
		}

		if (currentPage === "overview") {
			return renderOverviewPage();
		}

		if (currentPage === "projects") {
			return renderProjectsPage();
		}

		if (currentPage === "stars") {
			return renderSimplePage("Starred Projects");
		}

		if (currentPage === "settings") {
			return renderSimplePage("Settings");
		}

		if (currentPage === "profile") {
			return renderSimplePage("Profile");
		}

		return renderSimplePage("404");
	}

	return (
		<div className="app">
			<Navbar
				currentPage={currentPage}
				onNavigate={handleNavigate}
				showSearch={showSearch}
				searchValue={searchInput}
				onSearchChange={setSearchInput}
				onSearchSubmit={handleSearchSubmit}
			/>

			<main className="main-layout">
				<Sidebar currentPage={currentPage} onNavigate={handleNavigate} />

				<section className="content">{renderContent()}</section>

				<ActivityPanel />
			</main>

			{isModalOpen && (
				<ProjectModal
					onCreateProject={handleCreateProject}
					onClose={() => setIsModalOpen(false)}
				/>
			)}

			{editingProject && (
				<EditProjectModal
					project={editingProject}
					onUpdateProject={handleUpdateProject}
					onClose={() => setEditingProject(null)}
				/>
			)}
		</div>
	);
}

export default App;