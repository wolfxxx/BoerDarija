# BOERDARIJA - Complete Site Map

**Last Updated:** 2025  
**Project:** Moroccan Arabic (Darija) Learning Platform

---

## 📋 Table of Contents

1. [Site Overview](#site-overview)
2. [Navigation Flow](#navigation-flow)
3. [Page Structure](#page-structure)
4. [File Organization](#file-organization)
5. [Features & Functionality](#features--functionality)
6. [Technical Stack](#technical-stack)

---

## 🏠 Site Overview

BOERDARIJA is an interactive web-based learning platform for Moroccan Arabic (Darija). The site provides structured courses from beginner (A1) to intermediate (B1) levels, an interactive vocabulary game, and a comprehensive dictionary.

**Total Pages:** 60+ HTML pages  
**Course Levels:** 3 (A1, A2, B1)  
**Total Lessons:** 55 lessons across all levels

---

## 🗺️ Navigation Flow

```
index.html (Homepage)
│
├──→ courses.html (Course Selection)
│   │
│   ├──→ courses-a1.html (A1 Module List)
│   │   ├──→ lesson0.html (Module 0: Sounds & Transcription)
│   │   ├──→ lesson1.html (Module 1: Greetings)
│   │   ├──→ lesson2.html (Module 2: Verb 'To Be')
│   │   ├──→ lesson3.html (Module 3: 'To Have')
│   │   ├──→ lesson4.html (Module 4: Numbers)
│   │   ├──→ lesson5.html (Module 5: Demonstratives)
│   │   ├──→ lesson6.html (Module 6: Adjectives & Colors)
│   │   ├──→ lesson7.html (Module 7: 'To Want', Food)
│   │   ├──→ lesson8.html (Module 8: Present Tense)
│   │   ├──→ lesson9.html (Module 9: Questions)
│   │   ├──→ lesson10.html (Module 10: Time)
│   │   ├──→ lesson11.html (Module 11: Family)
│   │   ├──→ lesson12.html (Module 12: Prepositions)
│   │   ├──→ lesson13.html (Module 13: Negation)
│   │   ├──→ lesson14.html (Module 14: Imperatives)
│   │   ├──→ lesson15.html (Module 15: Shopping)
│   │   ├──→ lesson16.html (Module 16: Locations)
│   │   ├──→ lesson17.html (Module 17: Likes/Dislikes)
│   │   └──→ lesson18.html (Module 18: A1 Review)
│   │
│   ├──→ courses-a2.html (A2 Module List)
│   │   ├──→ lesson-a2-1.html through lesson-a2-18.html
│   │   └──→ (18 A2 lessons)
│   │
│   └──→ courses-b1.html (B1 Module List)
│       ├──→ lesson-b1-1.html through lesson-b1-18.html
│       └──→ (18 B1 lessons)
│
├──→ vocabulary-game.html (Interactive Vocabulary Game)
│   └──→ vocabulary-game.js (Game Logic)
│
└──→ dictionary.html (Interactive Dictionary)
    └──→ dictionary.json (Dictionary Data - 5000+ entries)
```

---

## 📄 Page Structure

### **Main Pages**

| File | Title | Purpose | Links To |
|------|-------|---------|----------|
| `index.html` | Homepage | Landing page with features overview | `courses.html`, `vocabulary-game.html` |
| `courses.html` | Course Selection | Lists all available course levels | `courses-a1.html`, `courses-a2.html`, `courses-b1.html` |
| `vocabulary-game.html` | Vocabulary Game | Interactive quiz game | Uses `dictionary.json` |
| `dictionary.html` | Dictionary | Searchable word dictionary | Uses `dictionary.json` |

### **Course Level Pages**

| File | Title | Lessons | Description |
|------|-------|---------|-------------|
| `courses-a1.html` | A1 Beginner | 19 lessons (0-18) | Foundation course for absolute beginners |
| `courses-a2.html` | A2 Elementary | 18 lessons (1-18) | Builds on A1, past/future tenses |
| `courses-b1.html` | B1 Intermediate | 18 lessons (1-18) | Advanced grammar and complex structures |

### **A1 Course Lessons** (19 lessons)

| Lesson | File | Module Title | Key Topics |
|--------|------|--------------|------------|
| 0 | `lesson0.html` | Sounds & Transcription | Darija alphabet, transcription system |
| 1 | `lesson1.html` | Greetings & Introductions | Basic greetings, polite phrases, pronouns |
| 2 | `lesson2.html` | Verb 'To Be' & Gender | Zero copula, noun gender, definite article |
| 3 | `lesson3.html` | 'To Have' & Possession | `3ndi`, possessive suffixes, `dyal` |
| 4 | `lesson4.html` | Numbers & Age | Numbers 1-100, telling age |
| 5 | `lesson5.html` | Demonstratives | This/that, these/those, common objects |
| 6 | `lesson6.html` | Adjectives & Colors | Adjective agreement, color vocabulary |
| 7 | `lesson7.html` | 'To Want' & Food | `bghit`, food and drink vocabulary |
| 8 | `lesson8.html` | Present Tense | `ka-` prefix, habitual actions |
| 9 | `lesson9.html` | Questions | Yes/No questions, question words |
| 10 | `lesson10.html` | Time | Days, months, telling time |
| 11 | `lesson11.html` | Family | Family member vocabulary |
| 12 | `lesson12.html` | Prepositions | Location prepositions, conjunctions |
| 13 | `lesson13.html` | Negation | `ma-...-sh`, `mashi`, `ma 3ndish` |
| 14 | `lesson14.html` | Imperatives | Commands (positive and negative) |
| 15 | `lesson15.html` | Shopping | Shopping vocabulary, bargaining |
| 16 | `lesson16.html` | Locations | Places, asking for directions |
| 17 | `lesson17.html` | Likes/Dislikes | `kay3jbni...` structure |
| 18 | `lesson18.html` | A1 Review | Comprehensive review and consolidation |

### **A2 Course Lessons** (18 lessons)

| Pattern | Files | Description |
|---------|-------|-------------|
| `lesson-a2-1.html` through `lesson-a2-18.html` | 18 files | Elementary level lessons covering past/future tenses, expanded vocabulary, complex conversations |

### **B1 Course Lessons** (18 lessons)

| Pattern | Files | Description |
|---------|-------|-------------|
| `lesson-b1-1.html` through `lesson-b1-18.html` | 18 files | Intermediate level lessons covering advanced grammar, complex structures, fluency development |

---

## 📁 File Organization

### **Root Directory Structure**

```
DARIJA GEMINI/
│
├── 📄 Core Pages
│   ├── index.html                    # Homepage
│   ├── courses.html                   # Course selection page
│   ├── courses-a1.html               # A1 course modules
│   ├── courses-a2.html               # A2 course modules
│   ├── courses-b1.html               # B1 course modules
│   ├── vocabulary-game.html           # Vocabulary quiz game
│   ├── dictionary.html                # Interactive dictionary
│   └── nav.html                       # Navigation component
│
├── 📚 Lesson Files (55 total)
│   ├── lesson0.html through lesson18.html        # A1 lessons (19)
│   ├── lesson-a2-1.html through lesson-a2-18.html  # A2 lessons (18)
│   └── lesson-b1-1.html through lesson-b1-18.html  # B1 lessons (18)
│
├── 🎨 Styling
│   └── css/
│       ├── style.css                  # Main stylesheet
│       └── style_backup.css          # Backup stylesheet
│
├── 💻 JavaScript
│   └── js/
│       ├── navigation.js              # Navigation system
│       └── progress.js                # Progress tracking system
│
├── 🔊 Audio Files
│   └── audio/
│       └── lessons/                   # 1359+ MP3 audio files
│           └── [audio files for pronunciation]
│
├── 📊 Data Files
│   ├── dictionary.json                # Dictionary data (5000+ entries)
│   ├── darija_adjectives.csv          # Adjective vocabulary
│   ├── body-parts.csv                 # Body parts vocabulary
│   └── tmp_dict.json                  # Temporary dictionary source
│
├── 🛠️ Utility Scripts (Python)
│   ├── generate_audio.py             # Audio generation (ElevenLabs API)
│   ├── generate_lesson_audio.py       # Lesson-specific audio generation
│   ├── force_generate_audio.py        # Force regenerate specific audio
│   ├── fix_audio_*.py                 # Various audio fixing scripts
│   └── [other maintenance scripts]
│
└── 📖 Documentation
    ├── README.md                      # Project documentation
    └── SITE_MAP.md                    # This file
```

---

## ⚙️ Features & Functionality

### **1. Progress Tracking System**
- **File:** `js/progress.js`
- **Storage:** Browser localStorage
- **Features:**
  - Mark lessons as complete/incomplete
  - Track last visited lesson
  - Display completion stats on homepage
  - Automatic "Next Lesson" button navigation
  - Confetti animation on completion

### **2. Interactive Audio System**
- **Implementation:** Hover-to-play audio on Arabic text
- **Features:**
  - 500ms delay before playing (prevents accidental triggers)
  - Visual feedback (opacity change)
  - Automatic audio stopping on mouse leave
  - 1359+ audio files in `audio/lessons/` directory

### **3. Vocabulary Game**
- **File:** `vocabulary-game.html` + `vocabulary-game.js`
- **Features:**
  - Multiple-choice quiz
  - Category selection
  - Score tracking
  - Uses `dictionary.json` as data source

### **4. Dictionary**
- **File:** `dictionary.html` + `dictionary.json`
- **Features:**
  - 5000+ word entries
  - Categorized vocabulary
  - Arabic script + transcription + English meaning
  - Audio pronunciation for each entry

### **5. Navigation System**
- **File:** `js/navigation.js`
- **Features:**
  - Dynamic navigation bar
  - Breadcrumb navigation
  - Consistent across all pages

### **6. Responsive Design**
- **File:** `css/style.css`
- **Features:**
  - Mobile-friendly layout
  - Glassmorphism UI effects
  - Modern, clean design
  - Arabic font support (Amiri)

---

## 🔧 Technical Stack

### **Frontend**
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with glassmorphism effects
- **JavaScript (Vanilla)** - No frameworks, pure JS
- **Fonts:**
  - Montserrat (main text)
  - Oswald (headings)
  - Amiri (Arabic script)

### **Backend/Data**
- **JSON** - Dictionary and data storage
- **CSV** - Vocabulary lists
- **localStorage** - Progress tracking

### **Audio Generation**
- **API:** ElevenLabs Text-to-Speech
- **Voice ID:** OfGMGmhShO8iL9jCkXy8
- **Model:** eleven_multilingual_v2
- **Format:** MP3

### **Development Tools**
- **Python Scripts** - Audio generation and maintenance
- **BeautifulSoup** - HTML parsing (for some scripts)
- **Requests** - API calls for audio generation

---

## 🔗 Key Relationships

### **Script Dependencies**

```
All Lesson Pages:
├── js/navigation.js (required)
├── js/progress.js (required for progress tracking)
└── css/style.css (required)

Vocabulary Game:
├── vocabulary-game.js (required)
├── dictionary.json (data source)
└── js/navigation.js (required)

Dictionary:
├── dictionary.json (data source)
├── dictionary-parser.js (if used)
└── js/navigation.js (required)
```

### **Data Flow**

```
dictionary.json
    ├──→ dictionary.html (displays entries)
    └──→ vocabulary-game.html (quiz questions)

Progress System:
    localStorage ← js/progress.js ← All lesson pages

Audio System:
    audio/lessons/*.mp3 ← HTML data-audio attributes ← Hover script
```

---

## 📝 Lesson File Structure

Each lesson file typically contains:

1. **Header Section**
   - Navigation placeholder
   - Breadcrumb navigation
   - Page title and description

2. **Content Sections**
   - Lesson sections with tables
   - Vocabulary tables with Arabic script
   - Examples and practice exercises

3. **Scripts Section**
   - `js/navigation.js` - Navigation system
   - `js/progress.js` - Progress tracking
   - Custom hover audio script (if applicable)

4. **Footer**
   - Copyright information

---

## 🎯 Quick Reference

### **Total Counts**
- **HTML Pages:** 60+
- **Lesson Pages:** 55 (19 A1 + 18 A2 + 18 B1)
- **Audio Files:** 1359+ MP3 files
- **Dictionary Entries:** 5000+ words
- **Course Levels:** 3 (A1, A2, B1)
- **JavaScript Files:** 3 (navigation.js, progress.js, vocabulary-game.js)

### **Entry Points**
1. **Homepage:** `index.html`
2. **Start Learning:** `courses.html` → `courses-a1.html` → `lesson0.html`
3. **Play Game:** `vocabulary-game.html`
4. **Browse Dictionary:** `dictionary.html`

---

## 🔄 Update History

- **2025:** Initial site map creation
- Progress tracking system implemented
- Hover audio system implemented
- 55 lessons across 3 levels completed

---

**Note:** This site map is a living document. Update it as the site evolves.







