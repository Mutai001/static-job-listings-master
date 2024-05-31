document.addEventListener('DOMContentLoaded', () => {
    const filterTagsContainer = document.querySelector('.filter-tags');
    const jobListingsContainer = document.querySelector('.job-listings');
    const clearButton = document.querySelector('.clear');

    // Function to filter job listings based on selected tags
    const filterJobListings = () => {
        const selectedTags = Array.from(filterTagsContainer.querySelectorAll('.tag span')).map(tag => tag.textContent);
        const jobListings = jobListingsContainer.querySelectorAll('.job-listing');

        jobListings.forEach(listing => {
            const jobTags = Array.from(listing.querySelectorAll('.job-tags span')).map(tag => tag.textContent);
            const isMatch = selectedTags.every(tag => jobTags.includes(tag));
            listing.style.display = isMatch ? 'flex' : 'none';
        });
    };

    // Function to add a filter tag
    const addFilterTag = (tagText) => {
        if (!Array.from(filterTagsContainer.querySelectorAll('.tag span')).some(tag => tag.textContent === tagText)) {
            const tagElement = document.createElement('div');
            tagElement.className = 'tag';
            tagElement.innerHTML = `<span>${tagText}</span><button>&times;</button>`;
            filterTagsContainer.appendChild(tagElement);
            filterJobListings();
        }
    };

    // Function to remove a filter tag
    filterTagsContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            e.target.parentElement.remove();
            filterJobListings();
        }
    });

    // Add tag on click
    jobListingsContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN' && e.target.closest('.job-tags')) {
            addFilterTag(e.target.textContent);
        }
    });
    // Event listener for clearing all filter tags
    clearButton.addEventListener('click', () => {
        filterTagsContainer.innerHTML = '';
        filterJobListings();
    });
    // Clear all filter tags
    clearButton.addEventListener('click', () => {
        filterTagsContainer.innerHTML = '';
        filterJobListings();
    });
});