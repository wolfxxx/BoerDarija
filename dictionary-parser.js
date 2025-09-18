// dictionary-parser.js

// --- Helper function ---
function shuffleArray(array) {
    if (!Array.isArray(array)) {
        console.error("shuffleArray received non-array:", array);
        return []; // Return empty array or handle error appropriately
    }
    // Fisher-Yates (aka Knuth) Shuffle
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

async function getDictionary() {
    try {
        const response = await fetch('dictionary.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching dictionary.json:", error);
        return null;
    }
}


// --- Function to Parse Vocabulary (from dictionary.json) ---
async function parseDictionaryForVocabularyQuiz() {
    console.log("Parsing dictionary for Vocabulary quiz...");
    const dictionary = await getDictionary();
    if (!dictionary) return [];

    const vocabularyQuestions = [];
    const allVocabularyItems = dictionary.categories.flatMap(c => c.words);

    console.log(`Found ${allVocabularyItems.length} valid vocabulary items.`);

    if (allVocabularyItems.length < 4) {
         console.warn("Not enough vocabulary items found (< 4).");
         if (allVocabularyItems.length === 0) return [];
    }

    // Question Type: What does "DarijaTerm" mean? -> English Meaning
    allVocabularyItems.forEach(correctItem => {
        let options = [correctItem.meaning]; // Correct answer is the meaning
        let distractors = allVocabularyItems.filter(item => item.meaning !== correctItem.meaning && item.meaning);
        shuffleArray(distractors);
        for (let i = 0; i < 3 && i < distractors.length; i++) options.push(distractors[i].meaning);

        options = [...new Set(options)];
        while (options.length > 0 && options.length < 4 && allVocabularyItems.length > options.length) {
             let extra = allVocabularyItems.find(item => item.meaning && !options.includes(item.meaning));
             if (extra) options.push(extra.meaning); else break;
        }
        while (options.length > 0 && options.length < 4) options.push(options[options.length - 1]);
        shuffleArray(options);

        vocabularyQuestions.push({
            question: `What does "${correctItem.term}" mean?`, // Correct question format
            category: "vocabulary",
            correctAnswer: correctItem.meaning, // Correct answer is meaning
            options: options,
            explanation: `"${correctItem.term}" (${correctItem.arabic || 'N/A'}) means "${correctItem.meaning}".`,
            arabicText: correctItem.arabic || null
        });
    });

    console.log(`Generated ${vocabularyQuestions.length} vocabulary questions.`);
    return vocabularyQuestions;
}

// --- Function to Parse Reading (from dictionary.json) ---
async function parseDictionaryForReadingQuiz() {
    console.log("Parsing dictionary for Reading quiz...");
    const dictionary = await getDictionary();
    if (!dictionary) return [];

    const readingQuestions = [];
    const allReadingItems = dictionary.categories.flatMap(c => c.words).filter(w => w.arabic);

    console.log(`Found ${allReadingItems.length} valid reading items with Arabic script.`);
    if (allReadingItems.length < 4) {
         console.warn("Not enough reading items found (< 4).");
         if (allReadingItems.length === 0) return [];
    }
    // Question Type: How do you read [Arabic Script]? -> Transliteration
    allReadingItems.forEach(correctItem => {
        let options = [correctItem.term]; // Correct answer is the term/transliteration
        let distractors = allReadingItems.filter(item => item.term !== correctItem.term && item.term);
        shuffleArray(distractors);
        for (let i = 0; i < 3 && i < distractors.length; i++) options.push(distractors[i].term);
        options = [...new Set(options)];
         while (options.length > 0 && options.length < 4 && allReadingItems.length > options.length) {
             let extra = allReadingItems.find(item => item.term && !options.includes(item.term));
             if (extra) options.push(extra.term); else break;
         }
         while (options.length > 0 && options.length < 4) options.push(options[options.length - 1]);
        shuffleArray(options);
        readingQuestions.push({
            question: `How do you read this word?`, category: "reading", correctAnswer: correctItem.term, options: options,
            explanation: `The word ${correctItem.arabic} is read as "${correctItem.term}"${correctItem.meaning ? ` and means "${correctItem.meaning}"` : ''}.`,
            arabicText: correctItem.arabic }); // Display the Arabic word
    });
    console.log(`Generated ${readingQuestions.length} reading questions.`);
    return readingQuestions;
}


// --- Function to Parse Numbers (from dictionary.json) ---
async function parseDictionaryForNumbersQuiz() {
    console.log("Parsing dictionary for Numbers quiz...");
    const dictionary = await getDictionary();
    if (!dictionary) return [];

    const numberQuestions = [];
    const numbersCategory = dictionary.categories.find(c => c.name.toLowerCase() === 'numbers');
    if (!numbersCategory) {
        console.warn("Could not find 'Numbers' category in dictionary.json");
        return [];
    }
    const allNumberItems = numbersCategory.words;

    console.log(`Found ${allNumberItems.length} valid number items.`);
    if (allNumberItems.length < 4) {
         console.warn("Not enough number items found (< 4).");
         if (allNumberItems.length === 0) return [];
    }
    // Question Type: What is Darija for "NumberMeaning"? -> DarijaTerm
    allNumberItems.forEach(correctItem => {
        let options = [correctItem.term]; // Correct answer is the Darija term
        let distractors = allNumberItems.filter(item => item.term !== correctItem.term);
        shuffleArray(distractors);
        for (let i = 0; i < 3 && i < distractors.length; i++) options.push(distractors[i].term);
        options = [...new Set(options)];
         while (options.length > 0 && options.length < 4 && allNumberItems.length > options.length) {
             let extra = allNumberItems.find(item => !options.includes(item.term));
             if (extra) options.push(extra.term); else break;
         }
         while (options.length > 0 && options.length < 4) options.push(options[options.length - 1]);
        shuffleArray(options);
        numberQuestions.push({
            question: `What is the Darija word for "${correctItem.meaning}"?`, category: "numbers", correctAnswer: correctItem.term, options: options,
            explanation: `The Darija word for "${correctItem.meaning}" is ${correctItem.term} (${correctItem.arabic || 'N/A'}).`,
            arabicText: correctItem.arabic || null }); // Optionally show Arabic script
    });
    console.log(`Generated ${numberQuestions.length} number questions.`);
    return numberQuestions;
}

// --- Function to Parse Alphabet Guide (from alphabet-guide.html) ---
async function parseAlphabetGuide() {
    console.log("Parsing alphabet guide for Letters quiz...");
    try {
        const response = await fetch('alphabet-guide.html');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const letterQuestions = [];
        const allLetterData = []; // Stores { name, sound, forms: {isolated, initial, medial, final} }

        const sections = doc.querySelectorAll('.section');
        let basicLettersSection = null;
        sections.forEach(section => {
            const title = section.querySelector('h2');
            if (title && title.textContent.trim().toLowerCase() === 'basic letters') {
                basicLettersSection = section;
            }
        });

        if (!basicLettersSection) {
            console.warn("Could not find 'Basic Letters' section in alphabet-guide.html");
            return [];
        }

        const letterCards = basicLettersSection.querySelectorAll('.letter-card');
        letterCards.forEach(card => {
            const nameElement = card.querySelector('.letter-name');
            const soundElement = card.querySelector('.letter-sound');
            const name = nameElement ? nameElement.textContent.trim() : null;
            const sound = soundElement ? soundElement.textContent.trim() : null;

            // Extract all forms using specific classes
            const forms = {
                isolated: card.querySelector('.letter-form.isolated')?.textContent.trim() || null,
                initial: card.querySelector('.letter-form.initial')?.textContent.trim() || null,
                medial: card.querySelector('.letter-form.medial')?.textContent.trim() || null,
                final: card.querySelector('.letter-form.final')?.textContent.trim() || null
            };

            // Basic validation: Need name and at least the isolated form
            if (name && forms.isolated) {
                allLetterData.push({ name, sound, forms });
            } else {
                console.warn(`Skipping letter card for ${name || 'unknown'} due to missing name or isolated form.`);
            }
        });

        console.log(`Found ${allLetterData.length} letters with forms in the guide.`);

        if (allLetterData.length < 4) {
             console.warn("Not enough letters found in guide (< 4). Cannot generate meaningful distractors.");
             if (allLetterData.length === 0) return [];
             // If few letters, may result in duplicate options, handled by Set below
        }

        // --- Generate questions for each form ---
        allLetterData.forEach(letterInfo => {
            // Pool of other letter names for distractors
            let nameDistractorPool = allLetterData.map(item => item.name).filter(n => n !== letterInfo.name);

            // Helper to create name options
            const getNameOptions = () => {
                let options = [letterInfo.name]; // Start with the correct name
                shuffleArray(nameDistractorPool); // Shuffle distractors
                for (let i = 0; i < 3 && i < nameDistractorPool.length; i++) {
                    options.push(nameDistractorPool[i]);
                }
                options = [...new Set(options)]; // Ensure unique
                 // Pad if fewer than 4 unique options available
                 while (options.length > 0 && options.length < 4 && allLetterData.length > options.length) {
                    let extra = allLetterData.find(item => item.name && !options.includes(item.name));
                    if(extra) options.push(extra.name); else break; // Find any other name not already included
                 }
                 while (options.length > 0 && options.length < 4) options.push(options[options.length - 1]); // Duplicate last if needed
                return shuffleArray(options); // Shuffle final options list
            };

            // 1. Isolated Form -> Name Question
            if (letterInfo.forms.isolated) {
                letterQuestions.push({
                    question: `What letter is this?`, category: "arabic-letters", correctAnswer: letterInfo.name, options: getNameOptions(),
                    explanation: `This is the isolated form of '${letterInfo.name}' (${letterInfo.forms.isolated}). ${letterInfo.sound ? `It represents the ${letterInfo.sound}.` : ''}`,
                    letter: letterInfo.forms.isolated });
            }

            // 2. Initial Form -> Name Question (only if distinct from isolated)
            if (letterInfo.forms.initial && letterInfo.forms.initial !== letterInfo.forms.isolated) {
                letterQuestions.push({
                    question: `What letter is this?`, category: "arabic-letters", correctAnswer: letterInfo.name, options: getNameOptions(),
                    explanation: `This is the initial form of '${letterInfo.name}' (${letterInfo.forms.initial}). ${letterInfo.sound ? `It represents the ${letterInfo.sound}.` : ''}`,
                    letter: letterInfo.forms.initial });
            }

            // 3. Medial Form -> Name Question (only if distinct from initial/isolated)
            if (letterInfo.forms.medial && letterInfo.forms.medial !== letterInfo.forms.initial && letterInfo.forms.medial !== letterInfo.forms.isolated) {
                letterQuestions.push({
                    question: `What letter is this?`, category: "arabic-letters", correctAnswer: letterInfo.name, options: getNameOptions(),
                    explanation: `This is the medial form of '${letterInfo.name}' (${letterInfo.forms.medial}). ${letterInfo.sound ? `It represents the ${letterInfo.sound}.` : ''}`,
                    letter: letterInfo.forms.medial });
            }

            // 4. Final Form -> Name Question (only if distinct from isolated)
            if (letterInfo.forms.final && letterInfo.forms.final !== letterInfo.forms.isolated) {
                letterQuestions.push({
                    question: `What letter is this?`, category: "arabic-letters", correctAnswer: letterInfo.name, options: getNameOptions(),
                    explanation: `This is the final form of '${letterInfo.name}' (${letterInfo.forms.final}). ${letterInfo.sound ? `It represents the ${letterInfo.sound}.` : ''}`,
                    letter: letterInfo.forms.final });
            }

             // 5. Name -> Isolated Letter Question
             // Pool of other isolated letter forms for distractors
             let letterDistractorPool = allLetterData.map(item => item.forms.isolated).filter(l => l && l !== letterInfo.forms.isolated);

             // Helper to create letter options
             const getLetterOptions = () => {
                let options = [letterInfo.forms.isolated]; // Start with correct isolated form
                shuffleArray(letterDistractorPool);
                 for (let i = 0; i < 3 && i < letterDistractorPool.length; i++) options.push(letterDistractorPool[i]);
                 options = [...new Set(options)];
                 while (options.length > 0 && options.length < 4 && allLetterData.length > options.length) {
                     let extra = allLetterData.find(item => item.forms.isolated && !options.includes(item.forms.isolated));
                     if(extra) options.push(extra.forms.isolated); else break;
                 }
                 while (options.length > 0 && options.length < 4) options.push(options[options.length - 1]);
                 return shuffleArray(options);
             };
            letterQuestions.push({
                question: `Which letter is called '${letterInfo.name}'?`, category: "arabic-letters", correctAnswer: letterInfo.forms.isolated, options: getLetterOptions(),
                explanation: `The letter called '${letterInfo.name}' is ${letterInfo.forms.isolated}. ${letterInfo.sound ? `It represents the ${letterInfo.sound}.` : ''}`,
                letter: null }); // No specific letter displayed below question

        }); // End forEach letterInfo

        console.log(`Generated ${letterQuestions.length} total letter questions including forms.`);
        return shuffleArray(letterQuestions); // Shuffle the final combined pool

    } catch (error) {
        console.error("Error parsing alphabet guide:", error);
        return [];
    }
}


// --- Fallback Question Generator for Letters (including forms) ---
function generateFallbackLetterQuestions() {
    console.log("Generating fallback letter questions including forms.");
    return shuffleArray([ // Shuffle fallbacks too
        // Isolated forms
        { question: "What letter is this?", category: "arabic-letters", correctAnswer: "Alif", options: ["Alif", "Lam", "Kaf", "Dal"], explanation: "This is the isolated form of 'Alif' (ا).", letter: "ا" },
        { question: "What letter is this?", category: "arabic-letters", correctAnswer: "Ba", options: ["Ba", "Ta", "Tha", "Noon"], explanation: "This is the isolated form of 'Ba' (ب).", letter: "ب" },
        { question: "What letter is this?", category: "arabic-letters", correctAnswer: "Meem", options: ["Meem", "Lam", "Noon", "Ha"], explanation: "This is the isolated form of 'Meem' (م).", letter: "م" },

        // Initial forms
        { question: "What letter is this?", category: "arabic-letters", correctAnswer: "Ba", options: ["Ba", "Noon", "Ya", "Ta"], explanation: "This is the initial form of 'Ba' (بـ).", letter: "بـ" },
        { question: "What letter is this?", category: "arabic-letters", correctAnswer: "Meem", options: ["Meem", "Fa", "Qaf", "Ha"], explanation: "This is the initial form of 'Meem' (مـ).", letter: "مـ" },
        { question: "What letter is this?", category: "arabic-letters", correctAnswer: "Seen", options: ["Seen", "Sheen", "Sad", "Fa"], explanation: "This is the initial form of 'Seen' (سـ).", letter: "سـ" },

        // Medial forms
        { question: "What letter is this?", category: "arabic-letters", correctAnswer: "Ba", options: ["Ba", "Noon", "Ta", "Ya"], explanation: "This is the medial form of 'Ba' (ـبـ).", letter: "ـبـ" },
        { question: "What letter is this?", category: "arabic-letters", correctAnswer: "Ha", options: ["Ha", "Jim", "Kha", "Ayn"], explanation: "This is the medial form of 'Ha' (ـهـ).", letter: "ـهـ" },
        { question: "What letter is this?", category: "arabic-letters", correctAnswer: "Lam", options: ["Lam", "Kaf", "Alif", "Ayn"], explanation: "This is the medial form of 'Lam' (ـلـ).", letter: "ـلـ" },


        // Final forms
        { question: "What letter is this?", category: "arabic-letters", correctAnswer: "Ba", options: ["Ba", "Noon", "Ta", "Ya"], explanation: "This is the final form of 'Ba' (ـب).", letter: "ـب" },
        { question: "What letter is this?", category: "arabic-letters", correctAnswer: "Kaf", options: ["Kaf", "Lam", "Qaf", "Fa"], explanation: "This is the final form of 'Kaf' (ـك).", letter: "ـك" },
        { question: "What letter is this?", category: "arabic-letters", correctAnswer: "Seen", options: ["Seen", "Sheen", "Sad", "Ya"], explanation: "This is the final form of 'Seen' (ـس).", letter: "ـس" },

        // Name to Letter
        { question: "Which letter is called 'Ta'?", category: "arabic-letters", correctAnswer: "ت", options: ["ب", "ت", "ث", "ن"], explanation: "The letter called 'Ta' is ت (isolated form shown).", letter: null },
        { question: "Which letter is called 'Seen'?", category: "arabic-letters", correctAnswer: "س", options: ["ش", "ص", "س", "ز"], explanation: "The letter called 'Seen' is س (isolated form shown).", letter: null },
        { question: "Which letter is called 'Ayn'?", category: "arabic-letters", correctAnswer: "ع", options: ["غ", "ح", "ع", "ه"], explanation: "The letter called 'Ayn' is ع (isolated form shown).", letter: null },
    ]);
}


// --- Fallback Generators (Vocabulary, Reading, Numbers - Unchanged) ---
function generateFallbackVocabularyQuestions() { console.log("Generating fallback vocabulary questions."); return [ { question: "What does 'Salam' mean?", category: "vocabulary", correctAnswer: "Hello", options: ["Hello", "Goodbye", "Thank you", "Please"], explanation: "'Salam' (سلام) is a common greeting meaning 'Hello' or 'Peace'." }, { question: "What does 'Shukran' mean?", category: "vocabulary", correctAnswer: "Thank you", options: ["Yes", "No", "Thank you", "Sorry"], explanation: "'Shukran' (شكرا) means 'Thank you'." }, { question: "What does 'Labas?' mean?", category: "vocabulary", correctAnswer: "How are you?", options: ["What?", "Where?", "How are you?", "Why?"], explanation: "'Labas?' (لاباس؟) is a common way to ask 'How are you?'." }, { question: "What does 'Bzzaf' mean?", category: "vocabulary", correctAnswer: "A lot / Very much", options: ["A little", "A lot / Very much", "Now", "Later"], explanation: "'Bzzaf' (بزاف) means 'A lot' or 'Very much'." } ]; }
function generateFallbackReadingQuestions() { console.log("Generating fallback reading questions."); return [ { question: "How do you read this word?", arabicText: "شكرا", category: "reading", correctAnswer: "Shukran", options: ["Salam", "Shukran", "Labas", "Afak"], explanation: "The word شكرا is read as 'Shukran' and means 'Thank you'." }, { question: "How do you read this word?", arabicText: "سلام", category: "reading", correctAnswer: "Salam", options: ["Salam", "Shukran", "Mzyan", "Bslama"], explanation: "The word سلام is read as 'Salam' and means 'Hello' or 'Peace'." }, { question: "How do you read this word?", arabicText: "مزيان", category: "reading", correctAnswer: "Mzyan", options: ["La", "Iyeh", "Mzyan", "Bzzaf"], explanation: "The word مزيان is read as 'Mzyan' and means 'Good' or 'Fine'." }, { question: "How do you read this word?", arabicText: "عفاك", category: "reading", correctAnswer: "Afak", options: ["Shukran", "Afak", "Labas", "Kayn"], explanation: "The word عفاك is read as 'Afak' and means 'Please'." } ]; }
function generateFallbackNumberQuestions() { console.log("Generating fallback number questions."); return [ { question: "What is the Darija word for \"1\"?", category: "numbers", correctAnswer: "Wahed", options: ["Wahed", "Juj", "Tlata", "Zero"], explanation: "The Darija word for \"1\" is Wahed (واحد)." }, { question: "What is the Darija word for \"2\"?", category: "numbers", correctAnswer: "Juj", options: ["Wahed", "Juj", "Tlata", "Rb3a"], explanation: "The Darija word for \"2\" is Juj (جوج)." }, { question: "What is the Darija word for \"3\"?", category: "numbers", correctAnswer: "Tlata", options: ["Juj", "Tlata", "Rb3a", "Khmsa"], explanation: "The Darija word for \"3\" is Tlata (تلاتة)." }, { question: "What is the Darija word for \"0\"?", category: "numbers", correctAnswer: "Zero", options: ["Zero", "Wahed", "Mya", "Alf"], explanation: "The Darija word for \"0\" is Zero (صفر)." } ]; }


// --- Wrappers for quiz-data.js ---
async function updateQuizData(currentQuizData) {
    const vocabularyQuestions = await parseDictionaryForVocabularyQuiz();
    if (!currentQuizData['vocabulary']) { currentQuizData['vocabulary'] = { name: 'Vocabulary', questionPool: [] }; }
    if (vocabularyQuestions && vocabularyQuestions.length > 0) {
        currentQuizData['vocabulary'].questionPool = vocabularyQuestions;
    } else {
        console.warn("No vocabulary questions parsed, using fallback.");
        currentQuizData['vocabulary'].questionPool = generateFallbackVocabularyQuestions();
    }
    return currentQuizData;
}

async function updateReadingQuizData(currentQuizData) {
    const readingQuestions = await parseDictionaryForReadingQuiz();
     if (!currentQuizData['reading']) { currentQuizData['reading'] = { name: 'Reading', questionPool: [] }; }
    if (readingQuestions && readingQuestions.length > 0) {
        currentQuizData['reading'].questionPool = readingQuestions;
    } else {
        console.warn("No reading questions parsed, using fallback.");
        currentQuizData['reading'].questionPool = generateFallbackReadingQuestions();
    }
    return currentQuizData;
}

// --- Exports ---
export {
    // Export the main update functions called by quiz-data.js
    updateQuizData,
    updateReadingQuizData,
    // Export the specific parsers and fallbacks needed by quiz-data.js
    parseDictionaryForNumbersQuiz,
    parseAlphabetGuide, // Export the updated alphabet parser
    generateFallbackVocabularyQuestions,
    generateFallbackReadingQuestions,
    generateFallbackNumberQuestions,
    generateFallbackLetterQuestions // Export the updated letter fallback
};
