"""
Update audio mappings to use separate files for masculine and feminine
"""
import re
from bs4 import BeautifulSoup

# Read the HTML file
with open('lesson6.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, 'html.parser')

# NEW CORRECT mapping with separate files
audio_mappings = {
    # Gender agreement adjectives - MASCULINE (separate files)
    'كبير': 'kbir.mp3',
    'صغير': 'sghir.mp3',
    'جديد': 'jdid.mp3',
    'قديم': 'qdim.mp3',
    'فرحان': 'fr7an.mp3',
    'زوين / مزيان': 'zwin_mzyan.mp3',  # Special combined masculine
    
    # Gender agreement adjectives - FEMININE (separate files)
    'كبيرة': 'kbira.mp3',
    'صغيرة': 'sghira.mp3',
    'جديدة': 'jdida.mp3',
    'قديمة': 'qdima.mp3',
    'فرحانة': 'fr7ana.mp3',
    'زوينة / مزيانة': 'zwin_mzyan.mp3',  # Use same as masculine for now
    
    # Plural forms
    'كبار': 'kbar.mp3',
    'صغار': 'sghar.mp3',
    'جداد': 'jdad.mp3',
    'فرحانين': 'fr7anin.mp3',
    'زوينين': 'zwinin.mp3',
    
    # Colors - MASCULINE (separate files)
    'كحل': 'k7el.mp3',
    'بيض': 'byed.mp3',
    'حمر': '7mer.mp3',
    'خضر': 'khder.mp3',
    'زرق': 'zreq.mp3',
    'صفر': 'sfer.mp3',
    'ليموني': 'limuni.mp3',
    
    # Colors - FEMININE (separate files)
    'كحلة': 'k7la.mp3',
    'بيضة': 'bida.mp3',
   'حمرا': '7mra.mp3',
    'خضرا': 'khdra.mp3',
    'زرقا': 'zerqa.mp3',
    'صفرا': 'sfra.mp3',
    
    # Example phrases (combined noun + adjective)
    'كتاب كبير': 'ktab_kbir.mp3',
    'طموبيل كبيرة': 'ttomobil_kbira.mp3',
    'دار جديدة': 'dar_jdida.mp3',
    'ولد فرحان': 'weld_fr7an.mp3',
    
    # Individual nouns
    'كتاب': 'ktab_kbir.mp3',
    'طموبيل': 'ttomobil_kbira.mp3',
    'دار': 'dar_jdida.mp3',
    'ولد': 'weld_fr7an.mp3',
    'ولاد': 'fr7anin.mp3',
    'طموبيلات': 'jdad.mp3',
}

# Update all darija-script elements with correct audio files
count = 0
for element in soup.find_all(class_='darija-script'):
    text = element.get_text().strip()
    if text in audio_mappings:
        element['data-audio'] = f'audio/lessons/{audio_mappings[text]}'
        if not element.get('style') or 'cursor' not in element.get('style', ''):
            element['style'] = 'cursor: pointer;'
        count += 1
        print(f"Updated: {text} -> {audio_mappings[text]}")

# Write the modified HTML back
with open('lesson6.html', 'w', encoding='utf-8') as f:
    f.write(str(soup.prettify()))

print(f"\n✅ Successfully updated {count} audio mappings to use separate files!")
