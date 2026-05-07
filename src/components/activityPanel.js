/*
=========================
Activity Panel Component
=========================
*/

export function createActivityPanel() {
    return `
        <!--
        =========================
        Activity Panel
        =========================
        -->
        <aside class="activity-panel">
        
            <h3 class="activity-title">Latest Activity</h3>
            
            <div class="activity-list">
                <div class="activity-item">
                    <strong>gtv-dev-hub</strong>
                    <span>Frontend structure initialized</span>
                </div>
                
                <div class="activity-item">
                    <strong>mia-bot</strong>
                    <span>Memory system planned</span>
                </div>
                
                <div class="activity-item">
                    <strong>tina-support</strong>
                    <span>Ticket module documented</span>
                </div>
            </div>
            
        </aside>
    `;
}