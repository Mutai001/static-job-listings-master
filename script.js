document.addEventListener('DOMContentLoaded', () => {
            const jobListings = document.getElementById('jobListings');
            const filterTags = document.getElementById('filterTags');
            const clearBtn = document.getElementById('clearBtn');

            let jobs = [];
            let filters = [];

            // Fetch job data from local JSON file
            fetch('jobs.json')
                .then(response => response.json())
                .then(data => {
                    jobs = data;
                    displayJobs(jobs);
                })
                .catch(error => console.error('Error fetching job data:', error));

            function displayJobs(jobs) {
                jobListings.innerHTML = '';
                jobs.forEach(job => {
                            const jobElement = document.createElement('div');
                            jobElement.className = `job-listing ${job.featured ? 'featured' : ''}`;

                            jobElement.innerHTML = `
                <div class="image-job">
                    <img src="${job.logo}" alt="${job.company} logo">
                </div>
                <div class="job-content">
                    <div class="job-header">
                        <div class="company">
                            ${job.company} ${job.new ? '<span class="new">NEW!</span>' : ''} ${job.featured ? '<span class="featured">FEATURED</span>' : ''}
                        </div>
                        <div class="job-title">${job.position}</div>
                    </div>
                    <div class="job-info">${job.postedAt} • ${job.contract} • ${job.location}</div>
                    <div class="job-tags">
                        <span>${job.role}</span>
                        <span>${job.level}</span>
                        ${job.languages.map(lang => `<span>${lang}</span>`).join('')}
                        ${job.tools.map(tool => `<span>${tool}</span>`).join('')}
                    </div>
                </div>
            `;

            jobElement.querySelectorAll('.job-tags span').forEach(tag => {
                tag.addEventListener('click', () => {
                    if (!filters.includes(tag.textContent)) {
                        filters.push(tag.textContent);
                        updateFilters();
                        filterJobs();
                    }
                });
            });

            jobListings.appendChild(jobElement);
        });
    }

    function updateFilters() {
        filterTags.innerHTML = '';
        filters.forEach(filter => {
            const filterTag = document.createElement('div');
            filterTag.className = 'tag';
            filterTag.innerHTML = `<span>${filter}</span><button class="remove-tag">&times;</button>`;

            filterTag.querySelector('.remove-tag').addEventListener('click', () => {
                filters = filters.filter(f => f !== filter);
                updateFilters();
                filterJobs();
            });

            filterTags.appendChild(filterTag);
        });
        clearBtn.style.display = filters.length > 0 ? 'block' : 'none';
    }

    function filterJobs() {
        if (filters.length === 0) {
            displayJobs(jobs);
            return;
        }

        const filteredJobs = jobs.filter(job => {
            const tags = [

            });