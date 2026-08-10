document.addEventListener('DOMContentLoaded', () => {
    const syllabusContainer = document.getElementById('syllabus-container');
    
    if (!syllabusContainer || typeof syllabusData === 'undefined') {
        console.error("Syllabus container or data not found");
        return;
    }

    syllabusData.forEach((section, index) => {
        // Create subject board (card)
        const board = document.createElement('div');
        board.className = 'cafe-card subject-board';
        
        // Subject Header
        const header = document.createElement('h3');
        header.style.marginBottom = '5px';
        header.textContent = section.subject;
        board.appendChild(header);
        
        // Subject Note (Subtle Backbench flavor)
        if (section.note) {
            const note = document.createElement('p');
            note.className = 'space-mono';
            note.style.color = 'var(--c-orange)';
            note.style.fontSize = '0.85rem';
            note.style.marginBottom = '1.5rem';
            note.textContent = section.note;
            board.appendChild(note);
        }
        
        // Items list
        const itemList = document.createElement('ul');
        itemList.style.listStyle = 'none';
        itemList.style.padding = '0';
        
        section.items.forEach(item => {
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.style.alignItems = 'baseline';
            li.style.marginBottom = '12px';
            li.style.borderBottom = '1px dotted rgba(0,0,0,0.1)';
            li.style.paddingBottom = '4px';
            
            const nameSpan = document.createElement('span');
            nameSpan.style.fontFamily = 'var(--font-head)';
            nameSpan.style.fontSize = '1.05rem';
            nameSpan.style.fontWeight = '500';
            nameSpan.textContent = item.name;
            
            const priceSpan = document.createElement('span');
            priceSpan.className = 'space-mono';
            priceSpan.style.fontWeight = '700';
            priceSpan.style.color = 'var(--c-charcoal-light)';
            priceSpan.textContent = `₹${item.price}`;
            
            li.appendChild(nameSpan);
            li.appendChild(priceSpan);
            itemList.appendChild(li);
        });
        
        board.appendChild(itemList);
        
        // Add a random subtle doodle occasionally
        if (Math.random() > 0.7) {
            const doodle = document.createElement('div');
            doodle.className = 'doodle';
            doodle.textContent = ['Must try!', 'Bestseller', 'Chef\'s Pick'][Math.floor(Math.random() * 3)];
            doodle.style.position = 'absolute';
            doodle.style.right = '20px';
            doodle.style.top = '25px';
            doodle.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
            doodle.style.opacity = '0.8';
            board.appendChild(doodle);
        }
        
        syllabusContainer.appendChild(board);
    });
});
