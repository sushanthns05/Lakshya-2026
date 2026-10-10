import glob
import re

files = glob.glob('src/pages/*.tsx')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # The previous script broke the HTML by replacing correctly but somehow it output `\1 relative z-10">` literally?
    # Let's see what was in the file: `      \1 relative z-10">`
    # Let's just fix it by replacing that line with the correct div.
    # The original was `<div className="max-w-[a-zA-Z0-9-]+ mx-auto px-4 sm:px-6 lg:px-8">`
    # Since I don't know the exact max-w, I'll just restore it to `max-w-4xl` for About.tsx, and `max-w-7xl` for Contact, etc.
    # Actually, let's just use regex to fix it based on the file.
    
    if r'\1 relative z-10">' in content:
        # we can just replace that literal string.
        # But wait, what was the max-w?
        if 'About.tsx' in filepath or 'Rules.tsx' in filepath or 'FAQ.tsx' in filepath or 'Prizes.tsx' in filepath or 'Sponsors.tsx' in filepath:
            correct = '<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">'
        else:
            correct = '<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">'
            
        content = content.replace(r'\1 relative z-10">', correct)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
