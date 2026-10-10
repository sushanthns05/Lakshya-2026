import glob

files = glob.glob('src/pages/*.tsx')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    changed = False
    
    # Fix literal \n
    if r'\n      <div className="absolute inset-0 z-0 pointer-events-none">' in content:
        content = content.replace(r'\n      <div className="absolute inset-0 z-0 pointer-events-none">', '\n      <div className="absolute inset-0 z-0 pointer-events-none">')
        changed = True

    # Fix literal \1 relative z-10">
    # Looking at Schedule.tsx:
    # \1 relative z-10 relative z-10">
    if r'\1 relative z-10' in content:
        # Just replace the whole weird line with the correct div.
        # What should the div be? <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        import re
        content = re.sub(r'\\1 relative z-10.*?>', '<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">', content)
        changed = True
        
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
            
print("Fixes applied.")
