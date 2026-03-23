import os
import re

def replace_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Define replacements
    # Keeping case and format
    replacements = [
        (re.compile(r'Phase 4', re.MULTILINE), 'Phase 5'),
        (re.compile(r'Phase IV', re.MULTILINE), 'Phase V'),
        (re.compile(r'phase 4', re.MULTILINE), 'phase 5'),
        (re.compile(r'phase iv', re.MULTILINE), 'phase v'),
        (re.compile(r'PHASE 4', re.MULTILINE), 'PHASE 5'),
        (re.compile(r'PHASE IV', re.MULTILINE), 'PHASE V'),
    ]

    new_content = content
    for pattern, replacement in replacements:
        new_content = pattern.sub(replacement, new_content)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    target_files = []
    
    # All markdown files
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                # Normalize path
                file_path = os.path.normpath(file_path)
                if 'requirement-of-teacher.md' in file_path:
                    continue
                target_files.append(file_path)
    
    # Specific file
    target_files.append(os.path.normpath('frontend/app/page.tsx'))
    
    # README.md and architecture.md are already in target_files if they are in root
    
    modified_count = 0
    for file_path in target_files:
        if os.path.exists(file_path):
            if replace_in_file(file_path):
                print(f"Modified: {file_path}")
                modified_count += 1
    
    print(f"Total files modified: {modified_count}")

if __name__ == '__main__':
    main()
