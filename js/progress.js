/**
 * Progress Tracking System for BOERDARIJA
 * Handles saving/loading lesson progress and UI updates.
 */

const ProgressSystem = {
    // Key for localStorage
    STORAGE_KEY: 'boerdarija_progress',

    // Get all progress data
    getData() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : { completed: [], lastVisited: null };
    },

    // Save progress data
    saveData(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        // Dispatch event for other components to listen
        window.dispatchEvent(new CustomEvent('progressUpdated', { detail: data }));
    },

    // Mark a lesson as complete/incomplete
    toggleLesson(lessonId) {
        const data = this.getData();
        const index = data.completed.indexOf(lessonId);

        let isComplete = false;
        if (index === -1) {
            data.completed.push(lessonId);
            isComplete = true;
            this.showToast('Lesson Completed! 🎉');
        } else {
            data.completed.splice(index, 1);
            isComplete = false;
        }

        data.lastVisited = lessonId;
        this.saveData(data);
        return isComplete;
    },

    // Check if a lesson is complete
    isComplete(lessonId) {
        const data = this.getData();
        return data.completed.includes(lessonId);
    },

    // Calculate total stats
    getStats() {
        const data = this.getData();
        return {
            count: data.completed.length,
            lastVisited: data.lastVisited
        };
    },

    // Helper: Determine the next lesson URL
    getNextLesson(lessonId) {
        // A1 Course: lesson0 ... lesson18
        // Format: lessonX
        if (lessonId.match(/^lesson\d+$/)) {
            const num = parseInt(lessonId.replace('lesson', ''));
            if (num < 18) return `lesson${num + 1}.html`;
            return 'lesson-a2-1.html'; // Transition to A2
        }

        // A2/B1 Courses: lesson-level-number
        // Format: lesson-a2-1
        const parts = lessonId.split('-');
        if (parts.length === 3) {
            const level = parts[1]; // a2 or b1
            const num = parseInt(parts[2]);

            if (level === 'a2') {
                if (num < 18) return `lesson-a2-${num + 1}.html`;
                return 'lesson-b1-1.html'; // Transition to B1
            } else if (level === 'b1') {
                if (num < 18) return `lesson-b1-${num + 1}.html`;
                return 'courses.html'; // End of content
            }
        }

        return null;
    },

    // UI: Create and inject the "Mark Complete" button
    injectControls(lessonId) {
        const container = document.querySelector('.container');
        if (!container) return;

        const isComplete = this.isComplete(lessonId);

        const wrapper = document.createElement('div');
        wrapper.className = 'progress-controls';
        wrapper.style.marginTop = '40px';
        wrapper.style.textAlign = 'center';
        wrapper.style.padding = '20px';
        wrapper.style.borderTop = '1px solid var(--glass-border)';
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'center';
        wrapper.style.gap = '15px';
        wrapper.style.flexWrap = 'wrap';

        // 1. Mark Complete Button
        const btnComplete = document.createElement('button');
        btnComplete.className = isComplete ? 'btn btn-primary completed' : 'btn btn-secondary';
        btnComplete.innerHTML = isComplete ? '✓ Completed' : 'Mark as Complete';
        btnComplete.style.minWidth = '200px';

        if (isComplete) {
            btnComplete.style.background = 'linear-gradient(45deg, #00b09b, #96c93d)';
            btnComplete.style.borderColor = 'transparent';
        }

        btnComplete.onclick = () => {
            const newState = this.toggleLesson(lessonId);
            if (newState) {
                btnComplete.className = 'btn btn-primary completed';
                btnComplete.innerHTML = '✓ Completed';
                btnComplete.style.background = 'linear-gradient(45deg, #00b09b, #96c93d)';
                btnComplete.style.borderColor = 'transparent';
                this.triggerConfetti();
            } else {
                btnComplete.className = 'btn btn-secondary';
                btnComplete.innerHTML = 'Mark as Complete';
                btnComplete.style.background = '';
                btnComplete.style.borderColor = '';
            }
        };

        wrapper.appendChild(btnComplete);

        // 2. Next Lesson Button
        const nextUrl = this.getNextLesson(lessonId);
        if (nextUrl) {
            const btnNext = document.createElement('a');
            btnNext.href = nextUrl;
            btnNext.className = 'btn btn-secondary';
            btnNext.innerHTML = 'Next Lesson →';
            btnNext.style.minWidth = '200px';
            btnNext.style.textDecoration = 'none';
            btnNext.style.display = 'inline-flex';
            btnNext.style.alignItems = 'center';
            btnNext.style.justifyContent = 'center';

            wrapper.appendChild(btnNext);
        }

        container.appendChild(wrapper);
    },

    // UI: Show a toast notification
    showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '30px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        toast.style.background = 'rgba(15, 32, 39, 0.95)';
        toast.style.color = '#fff';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '50px';
        toast.style.border = '1px solid var(--primary-color)';
        toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        toast.style.zIndex = '2000';
        toast.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        toast.style.fontFamily = 'var(--font-main)';
        toast.style.fontWeight = '600';

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);

        // Animate out
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    },

    // Fun: Simple confetti effect
    triggerConfetti() {
        const colors = ['#ff0066', '#99ff99', '#00d2ff', '#ffffff'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = '50%';
            confetti.style.top = '50%';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';

            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const velocity = 5 + Math.random() * 10;
            const tx = Math.cos(angle) * 200;
            const ty = Math.sin(angle) * 200;
            const rot = Math.random() * 360;

            confetti.style.transition = 'all 1s ease-out';

            document.body.appendChild(confetti);

            requestAnimationFrame(() => {
                confetti.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
                confetti.style.opacity = '0';
            });

            setTimeout(() => confetti.remove(), 1000);
        }
    }
};

// Auto-initialize if ID is present
document.addEventListener('DOMContentLoaded', () => {
    // Extract lesson ID from filename (e.g., lesson-a2-1.html -> lesson-a2-1)
    const path = window.location.pathname;
    const filename = path.split('/').pop();

    if (filename.includes('lesson')) {
        const lessonId = filename.replace('.html', '');
        ProgressSystem.injectControls(lessonId);
    }
});
