document.addEventListener('DOMContentLoaded', () => {
    const syllabusContainer = document.getElementById('syllabus-container');
    const openBtn = document.getElementById('open-syllabus-btn');
    const notebookModal = document.getElementById('syllabus-notebook-modal');
    const closeBtn = document.getElementById('close-syllabus-btn');
    const syllabusNavLinks = document.querySelectorAll('a[href="#syllabus"]');
    
    if (!syllabusContainer || typeof syllabusData === 'undefined') {
        console.error("Syllabus container or data not found");
        return;
    }

    // Build the ONE SINGLE NOTEBOOK experience
    const notebook = document.createElement('div');
    notebook.className = 'single-notebook-paper';
    
    // Notebook Header
    const nbHeader = document.createElement('div');
    nbHeader.className = 'notebook-header';
    nbHeader.innerHTML = `
        <div class="notebook-holes"><span></span><span></span><span></span></div>
        <div class="notebook-title-wrap">
            <span class="space-mono notebook-tag">SUBJECT: FOOD & DRINKS</span>
            <h2 class="kalam-title">The Back Bench Syllabus 📖</h2>
            <p class="notebook-subtitle">Official Canteen Guide & Munchies Menu</p>
        </div>
        <div class="notebook-annotation">No boring periods allowed! ✏️</div>
    `;
    notebook.appendChild(nbHeader);

    // Notebook Body (Content)
    const nbBody = document.createElement('div');
    nbBody.className = 'notebook-body';

    syllabusData.forEach((section, index) => {
        const catBlock = document.createElement('div');
        catBlock.className = 'notebook-category';
        
        // Category Header
        const catHeader = document.createElement('div');
        catHeader.className = 'category-header';
        
        const catTitle = document.createElement('h3');
        catTitle.className = 'kalam-category-title';
        catTitle.innerHTML = `<span class="cat-num">0${index + 1}.</span> ${section.subject}`;
        
        const catTag = document.createElement('span');
        catTag.className = 'space-mono category-tag';
        catTag.textContent = section.tag || '';
        
        catHeader.appendChild(catTitle);
        if (section.tag) catHeader.appendChild(catTag);
        catBlock.appendChild(catHeader);

        if (section.note) {
            const catNote = document.createElement('p');
            catNote.className = 'notebook-note';
            catNote.textContent = `/* ${section.note} */`;
            catBlock.appendChild(catNote);
        }

        // Category Items List
        const itemList = document.createElement('ul');
        itemList.className = 'notebook-item-list';
        
        section.items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'notebook-item';
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'item-name';
            nameSpan.textContent = item.name;
            
            const leaderDots = document.createElement('span');
            leaderDots.className = 'item-dots';
            
            const priceSpan = document.createElement('span');
            priceSpan.className = 'space-mono item-price';
            priceSpan.textContent = `₹${item.price}`;
            
            li.appendChild(nameSpan);
            li.appendChild(leaderDots);
            li.appendChild(priceSpan);
            itemList.appendChild(li);
        });
        
        catBlock.appendChild(itemList);

        if (index < syllabusData.length - 1) {
            const divider = document.createElement('div');
            divider.className = 'notebook-divider';
            catBlock.appendChild(divider);
        }
        
        nbBody.appendChild(catBlock);
    });

    notebook.appendChild(nbBody);

    // Notebook Footer inside modal
    const nbFooter = document.createElement('div');
    nbFooter.className = 'notebook-footer';
    nbFooter.innerHTML = `
        <p class="space-mono">* All taxes included. Extra cheese on request.</p>
        <button id="close-notebook-inner" class="btn btn-secondary btn-sm">Close Notebook ✖</button>
    `;
    notebook.appendChild(nbFooter);

    syllabusContainer.appendChild(notebook);

    // Toggle Modal Functions
    function openNotebook() {
        if (notebookModal) {
            notebookModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeNotebook() {
        if (notebookModal) {
            notebookModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openNotebook();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeNotebook);
    }

    const closeInnerBtn = document.getElementById('close-notebook-inner');
    if (closeInnerBtn) {
        closeInnerBtn.addEventListener('click', closeNotebook);
    }

    if (notebookModal) {
        notebookModal.addEventListener('click', (e) => {
            if (e.target === notebookModal) {
                closeNotebook();
            }
        });
    }

    // Auto-open notebook when clicking Syllabus nav links if user chooses
    syllabusNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Give smooth scroll a moment then open notebook if wanted
            setTimeout(() => {
                openNotebook();
            }, 300);
        });
    });
});
