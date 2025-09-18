class VocabularyGame {
    constructor() {
        this.dictionary = null;
        this.selectedCategories = new Set();
        this.currentQuestion = null;
        this.score = 0;
        this.totalQuestions = 0;
        this.questionsAnswered = 0;
        this.availableWords = [];

        // DOM Elements
        this.categoryList = document.getElementById('categoryList');
        this.startGameBtn = document.getElementById('startGame');
        this.gameArea = document.getElementById('gameArea');
        this.questionEl = document.getElementById('question');
        this.arabicTextEl = document.getElementById('arabicText');
        this.optionsEl = document.getElementById('options');
        this.scoreEl = document.getElementById('score');
        this.nextQuestionBtn = document.getElementById('nextQuestion');
        this.endGameBtn = document.getElementById('endGame');

        // Bind event listeners
        this.startGameBtn.addEventListener('click', () => this.startGame());
        this.nextQuestionBtn.addEventListener('click', () => this.nextQuestion());
        this.endGameBtn.addEventListener('click', () => this.endGame());

        // Add category control buttons
        document.getElementById('selectAll').addEventListener('click', () => this.selectAllCategories());
        document.getElementById('deselectAll').addEventListener('click', () => this.deselectAllCategories());

        // Load dictionary
        this.loadDictionary();
    }

    sanitizeArabic(text) {
        if (!text) return '';
        try {
            const cleaned = text.replace(/\uFFFD/g, '').trim();
            return cleaned || text.trim();
        } catch (e) {
            return text || '';
        }
    }

    async loadDictionary() {
        try {
            const response = await fetch('dictionary.json');
            this.dictionary = await response.json();
            this.populateCategories();
        } catch (error) {
            console.error('Error loading dictionary:', error);
            alert('Error loading dictionary. Please try again later.');
        }
    }

    populateCategories() {
        this.dictionary.categories.forEach(category => {
            const categoryEl = document.createElement('div');
            categoryEl.className = 'category-item';
            categoryEl.textContent = category.name;
            categoryEl.addEventListener('click', () => this.toggleCategory(category.name, categoryEl));
            this.categoryList.appendChild(categoryEl);
        });
    }

    toggleCategory(categoryName, element) {
        if (this.selectedCategories.has(categoryName)) {
            this.selectedCategories.delete(categoryName);
            element.classList.remove('selected');
        } else {
            this.selectedCategories.add(categoryName);
            element.classList.add('selected');
        }
        this.startGameBtn.disabled = this.selectedCategories.size === 0;
    }

    selectAllCategories() {
        const categoryElements = this.categoryList.querySelectorAll('.category-item');
        categoryElements.forEach(element => {
            const categoryName = element.textContent;
            this.selectedCategories.add(categoryName);
            element.classList.add('selected');
        });
        this.startGameBtn.disabled = false;
    }

    deselectAllCategories() {
        const categoryElements = this.categoryList.querySelectorAll('.category-item');
        categoryElements.forEach(element => {
            element.classList.remove('selected');
        });
        this.selectedCategories.clear();
        this.startGameBtn.disabled = true;
    }

    startGame() {
        // Collect all words from selected categories
        this.availableWords = [];
        this.dictionary.categories.forEach(category => {
            if (this.selectedCategories.has(category.name)) {
                this.availableWords.push(...category.words);
            }
        });

        if (this.availableWords.length < 4) {
            alert('Not enough words in selected categories. Please select more categories.');
            return;
        }

        // Reset game state
        this.score = 0;
        this.questionsAnswered = 0;
        this.originalWords = [...this.availableWords]; // Keep a copy for reshuffling

        // Show game area
        this.gameArea.style.display = 'block';
        this.startGameBtn.style.display = 'none';
        this.categoryList.style.display = 'none';

        // Start with first question
        this.nextQuestion();
    }

    nextQuestion() {
        // If we've used all available words, reshuffle them to continue
        if (this.availableWords.length === 0) {
            this.reshuffleWords();
        }

        // Clear previous question
        this.questionEl.textContent = '';
        this.arabicTextEl.textContent = '';
        this.optionsEl.innerHTML = '';
        this.nextQuestionBtn.style.display = 'none';

        // Select random word
        const randomIndex = Math.floor(Math.random() * this.availableWords.length);
        this.currentQuestion = this.availableWords[randomIndex];
        this.availableWords.splice(randomIndex, 1);

        // Generate question type (randomly choose between term->meaning or meaning->term)
        const questionType = Math.random() < 0.5 ? 'term' : 'meaning';
        
        if (questionType === 'term') {
            this.questionEl.textContent = `What does "${this.currentQuestion.term}" mean?`;
            this.arabicTextEl.textContent = this.sanitizeArabic(this.currentQuestion.arabic);
        } else {
            this.questionEl.textContent = `What is the Darija word for "${this.currentQuestion.meaning}"?`;
        }

        // Generate options
        let allWords = this.dictionary.categories.flatMap(c => c.words);
        let correctAnswer;
        let options = [];

        if (questionType === 'term') {
            // Asking for meaning: options in English
            correctAnswer = this.currentQuestion.meaning;
            const wrongMeanings = allWords
                .filter(w => w.meaning && w.meaning !== correctAnswer)
                .map(w => w.meaning);
            options = [correctAnswer];
            while (options.length < 4 && wrongMeanings.length > 0) {
                const ri = Math.floor(Math.random() * wrongMeanings.length);
                const wrong = wrongMeanings.splice(ri, 1)[0];
                if (!options.includes(wrong)) options.push(wrong);
            }

            // Shuffle and render (strings)
            this.shuffleArray(options);
            options.forEach(opt => {
                const optionEl = document.createElement('div');
                optionEl.className = 'option';
                optionEl.textContent = opt;
                optionEl.dataset.value = opt; // for robust comparison
                optionEl.addEventListener('click', () => this.checkAnswer(opt, correctAnswer));
                this.optionsEl.appendChild(optionEl);
            });

        } else {
            // Asking for Darija word: show transliteration + Arabic script
            correctAnswer = this.currentQuestion.term;
            const correctArabic = this.sanitizeArabic(this.currentQuestion.arabic || '');

            // Build candidate pool excluding the correct term
            const pool = allWords.filter(w => w.term && w.term !== correctAnswer);
            this.shuffleArray(pool);
            const distractors = pool.slice(0, 3);

            // Compose options as objects with term + arabic
            const optionObjs = [
                { term: correctAnswer, arabic: correctArabic }
            ].concat(distractors.map(w => ({ term: w.term, arabic: this.sanitizeArabic(w.arabic || '') })));

            // Deduplicate by term in case of overlaps
            const seen = new Set();
            const uniqueOptionObjs = [];
            optionObjs.forEach(o => {
                if (!seen.has(o.term)) { seen.add(o.term); uniqueOptionObjs.push(o); }
            });

            // Ensure exactly 4 options if possible
            while (uniqueOptionObjs.length < 4) {
                const extra = allWords.find(w => w.term && !seen.has(w.term));
                if (!extra) break;
                seen.add(extra.term);
                uniqueOptionObjs.push({ term: extra.term, arabic: extra.arabic || '' });
            }

            this.shuffleArray(uniqueOptionObjs);

            // Render both transliteration and Arabic
            uniqueOptionObjs.forEach(opt => {
                const optionEl = document.createElement('div');
                optionEl.className = 'option';
                optionEl.dataset.value = opt.term; // compare using term value
                const arabicSpan = opt.arabic
                    ? " <span class=\"arabic\" style=\"font-family:'Amiri', serif; color:#99ff99; margin-left:8px;\">" + opt.arabic + "</span>"
                    : '';
                optionEl.innerHTML = opt.term + arabicSpan;
                optionEl.addEventListener('click', () => this.checkAnswer(opt.term, correctAnswer));
                this.optionsEl.appendChild(optionEl);
            });
        }

        // Do not count as answered until the user selects an option
        this.updateScore();
    }

    checkAnswer(selectedAnswer, correctAnswer) {
        const options = this.optionsEl.children;
        for (let option of options) {
            option.style.pointerEvents = 'none';
            const value = option.dataset.value || option.textContent;
            if (value === correctAnswer) {
                option.classList.add('correct');
            } else if (value === selectedAnswer && selectedAnswer !== correctAnswer) {
                option.classList.add('incorrect');
            }
        }

        // Increment answered count only after a selection
        this.questionsAnswered++;

        if (selectedAnswer === correctAnswer) {
            this.score++;
        }

        this.updateScore();
        this.nextQuestionBtn.style.display = 'block';
        this.endGameBtn.style.display = 'block';
    }

    updateScore() {
        this.scoreEl.textContent = `Score: ${this.score}/${this.questionsAnswered} (${this.questionsAnswered > 0 ? Math.round((this.score / this.questionsAnswered) * 100) : 0}%)`;
    }

    endGame() {
        const percentage = this.questionsAnswered > 0 ? (this.score / this.questionsAnswered) * 100 : 0;
        alert(`Game Ended!\nYour final score: ${this.score}/${this.questionsAnswered} (${percentage.toFixed(1)}%)`);
        
        // Reset UI
        this.gameArea.style.display = 'none';
        this.startGameBtn.style.display = 'block';
        this.categoryList.style.display = 'grid';
        this.nextQuestionBtn.style.display = 'none';
        this.endGameBtn.style.display = 'none';
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    reshuffleWords() {
        // Reset available words to original list and shuffle
        this.availableWords = [...this.originalWords];
        this.shuffleArray(this.availableWords);
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    new VocabularyGame();
}); 
