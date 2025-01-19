document.addEventListener('DOMContentLoaded', () => {
    loadExhibitionData();
});



function showSection(section) {
    const sections = ['biography', 'tables', 'exhibitions', 'links', 'management'];
    sections.forEach(sec => {
        document.getElementById(sec).classList.add('hidden');
        document.getElementById(sec + '-menu').classList.add('hidden');
    });
    document.getElementById(section).classList.remove('hidden');
    document.getElementById(section + '-menu').classList.remove('hidden');

    if (section === 'tables') {
        loadExhibitionData();
    }
}

function toggleSubMenu(submenuId) {
    const submenu = document.getElementById(submenuId);
    if (submenu.classList.contains('hidden')) {
        submenu.classList.remove('hidden');
    } else {
        submenu.classList.add('hidden');
    }
}

function showSubmenuContent(sectionId) {
    const sections = document.querySelectorAll('[id$="-content"]');
    sections.forEach(section => {
        if (section.id === `${sectionId}-content`) {
            if (!section.classList.contains('hidden')) {
                section.classList.add('hidden');
            } else {
                section.classList.remove('hidden');
            }
        } else {
            section.classList.add('hidden');
        }
    });
}

function loadExhibitionData() {
    console.log('Loading exhibition data...');
    fetch('exhibitions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched:', data);
            const tableBody = document.querySelector('#exhibition-table tbody');
            tableBody.innerHTML = '';

            data.forEach(exhibition => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${exhibition.title}</td>
                    <td>${exhibition.location}</td>
                    <td>${exhibition.year}</td>
                    <td>${exhibition.description}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}