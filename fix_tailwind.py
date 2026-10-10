import glob
import re

files = glob.glob('src/pages/*.tsx') + glob.glob('src/components/**/*.tsx', recursive=True)

replacements = {
    r'w-\[500px\]': 'w-125',
    r'h-\[500px\]': 'h-125',
    r'min-h-\[300px\]': 'min-h-75',
    r'flex-shrink-0': 'shrink-0',
    r'bg-gradient-to-r': 'bg-linear-to-r',
}

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    changed = False
    for old, new in replacements.items():
        if re.search(old, content):
            content = re.sub(old, new, content)
            changed = True
            
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print("Tailwind warnings fixed.")
