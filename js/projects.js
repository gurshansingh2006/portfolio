const githubUsername = "gurshansingh2006";
const projectsContainer = document.querySelector('#projects-grid');
const projectsSection = document.querySelector('#projects');
let projectsLoaded = false;

const createCard = (repo) => {
  const card = document.createElement('article');
  card.className = 'project-card reveal fade';
  card.innerHTML = `
    <div class="project-meta">
      <h4>${repo.name}</h4>
      <p>${repo.description ?? 'No description provided.'}</p>
      <div class="project-stats">
        <span class="tag">${repo.language ?? 'N/A'}</span>
        <span class="stat">★ ${repo.stargazers_count ?? 0}</span>
      </div>
    </div>
    <a class="btn ghost" href="${repo.html_url}" target="_blank" rel="noopener">View on GitHub</a>
  `;
  return card;
};

const loadGitHubProjects = async () => {
  if (!projectsContainer) return;
  projectsLoaded = true;
  projectsContainer.innerHTML = '<p class="muted">Loading GitHub projects...</p>';

  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const repos = await response.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      projectsContainer.innerHTML = '<p class="muted">No repositories found.</p>';
      return;
    }

    projectsContainer.innerHTML = '';
    repos.forEach((repo) => {
      const card = createCard(repo);
      projectsContainer.appendChild(card);
    });

    if (typeof window.observeReveals === 'function') {
      window.observeReveals(projectsContainer);
    }
  } catch (err) {
    console.error('Failed to load GitHub repos', err);
    projectsContainer.innerHTML = '<p class="muted">Unable to load projects right now.</p>';
  }
};

if (projectsSection && projectsContainer) {
  const projectObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !projectsLoaded) {
          loadGitHubProjects();
          projectObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  projectObserver.observe(projectsSection);
}
