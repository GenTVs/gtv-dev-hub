/*
=========================
404 Renderer
=========================
*/

export function renderNotFound(content) {
    content.innerHTML = `
        <div class="simple-page">
            <h1>404</h1>
            
            <p>
                The page you are looking for does not exist.
            </p>
            
            <button class="primary-btn back-home-btn">
                Back Home
            </button>
        </div>
    `;
}