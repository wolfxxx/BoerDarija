"""
Script to convert lesson6.html to use hover-based audio playback
- Removes audio button columns
- Adds data-audio attributes to Arabic text
- Implements JavaScript hover handler with delay
"""
import re
from bs4 import BeautifulSoup

# Read the HTML file
with open('lesson6.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, 'html.parser')

# Mapping of Arabic text to audio files
audio_mappings = {
    # Gender agreement adjectives (masculine forms)
    'كبير': 'kbir_kbira.mp3',
    'صغير': 'sghir_sghira.mp3',
    'جديد': 'jdid_jdida.mp3',
    'قديم': 'qdim_qdima.mp3',
    'فرحان': 'fr7an_fr7ana.mp3',
    'زوين / مزيان': 'zwin_mzyan.mp3',
    
    # Plural forms
    'كبار': 'kbar.mp3',
    'صغار': 'sghar.mp3',
    'جداد': 'jdad.mp3',
    'فرحانين': 'fr7anin.mp3',
    'زوينين': 'zwinin.mp3',
    
    # Colors
    'كحل': 'k7el_k7la.mp3',
    'بيض': 'byed_bida.mp3',
    'حمر': '7mer_7mra.mp3',
    'خضر': 'khder_khdra.mp3',
    'زرق': 'zreq_zerqa.mp3',
    'صفر': 'sfer_sfra.mp3',
    'ليموني': 'limuni.mp3',
    
    # Example phrases (noun + adjective)
    'كتاب كبير': 'ktab_kbir.mp3',
    'طموبيل كبيرة': 'ttomobil_kbira.mp3',
    'دار جديدة': 'dar_jdida.mp3',
    'ولد فرحان': 'weld_fr7an.mp3',
}

# Find all darija-script elements and add data-audio attributes
for element in soup.find_all(class_='darija-script'):
    text = element.get_text().strip()
    if text in audio_mappings:
        element['data-audio'] = f'audio/lessons/{audio_mappings[text]}'
        element['style'] = 'cursor: pointer;'

# Remove all audio button columns
# Find and remove <th> headers for audio columns
for th in soup.find_all('th'):
    if 'Audio' in th.get_text():
        th.decompose()

# Remove <td> cells containing audio elements
for td in soup.find_all('td'):
    if td.find('audio') or td.find('span', class_='play-button'):
        td.decompose()

# Add JavaScript for hover functionality at the end of body
hover_script = soup.new_tag('script')
hover_script.string = '''
// Hover-to-play audio system
let hoverTimeout = null;
let currentAudio = null;

// Create a global audio element
const audioPlayer = new Audio();

document.addEventListener('DOMContentLoaded', function() {
    const audioElements = document.querySelectorAll('.darija-script[data-audio]');
    
    audioElements.forEach(element => {
        let timeout = null;
        
        element.addEventListener('mouseenter', function() {
            // Clear any existing timeout
            if (timeout) clearTimeout(timeout);
            
            // Set 500ms delay before playing
            timeout = setTimeout(() => {
                const audioSrc = element.getAttribute('data-audio');
                if (audioSrc) {
                    // Stop current audio if playing
                    if (currentAudio) {
                        currentAudio.pause();
                        currentAudio.currentTime = 0;
                    }
                    
                    // Play new audio
                    audioPlayer.src = audioSrc;
                    audioPlayer.play().catch(err => console.log('Audio play failed:', err));
                    currentAudio = audioPlayer;
                    
                    // Add visual feedback
                    element.style.opacity = '0.7';
                }
            }, 500);
            
            // Store timeout on element for cleanup
            element._hoverTimeout = timeout;
        });
        
        element.addEventListener('mouseleave', function() {
            // Clear timeout if mouse leaves before delay completes
            if (element._hoverTimeout) {
                clearTimeout(element._hoverTimeout);
                element._hoverTimeout = null;
            }
            
            // Reset opacity
            element.style.opacity = '1';
            
            // Stop audio when mouse leaves
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
        });
    });
});
'''

# Find the body tag and append the script
body = soup.find('body')
if body:
    body.append(hover_script)

# Write the modified HTML back
with open('lesson6.html', 'w', encoding='utf-8') as f:
    f.write(str(soup.prettify()))

print("Successfully converted lesson6.html to hover-based audio!")
print("Changes made:")
print("- Removed all audio button columns")
print("- Added data-audio attributes to Arabic text")
print("- Added hover JavaScript with 500ms delay")
print("- Audio stops when mouse leaves")
