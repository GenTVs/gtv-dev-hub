/*
=========================
Default Project Factory
=========================
*/

export function createDefaultProject(name, description) {
    return {
        id: Date.now(),
        name: name,
        description: description,
        language: "JavaScript",
        status: "Planning",
        visibility: "Public",
        stars: 0,
        forks: 0,
        issues: 0,
        pullRequests: 0,
        commits: 0,
        updatedAt: "Updated just now",
        topics: ["new-project"],
        files: ["README.md"],
        readme: "No README has been written for this project yet.",
    };
}