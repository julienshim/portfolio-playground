const portfolio = {
  projects: [],
  targets: {
    slider: document.querySelector('#slider'),
    filter: document.querySelector('.filter'),
    portfolio: document.querySelector('#portfolio'),
    currentFilterSelected: document.querySelector('#currentFilterSelected'),
    filterTags: document.querySelectorAll('.filter-tags')
  },
  sessionStorage: {
    filter: sessionStorage.getItem('filter')
  }
};

function slide() {
  if (portfolio.targets.slider.classList.contains('slidedown')) {
    portfolio.targets.slider.classList.toggle('slideup');
    portfolio.targets.slider.classList.toggle('slidedown');
  }
}

// Generate Projects - Note: Object Literals

function generateProjects(filteredProjects) {
  portfolio.targets.portfolio.innerHTML = `
        ${filteredProjects
          .map(project => {
            return `
              <div class="project-container" onclick="void(0)">
                  <div class="project-content mb-12p">
                      <div class="project-image-container">
                          <img src="${
                            project.image
                          }" class="project-image" title="${project.title}" />
                          <div class="overlay">
                              <div class="text">
                                  <ul>
                                      ${project.disciplines
                                        .map(
                                          discipline =>
                                            `<li class="filter-tags" data-filter="${discipline}">${discipline}</li>`
                                        )
                                        .join('')}
                                  </ul>
                              </div>
                              <div class="year-overlay">
                                  <p>${project.year}</p>
                              </div>
                              <div class="external-links-overlay">
                                  <p><a href="${
                                    project.githubRepo
                                  }" target="_blank">Github</a>${project.deployedURL &&
              ` <a href="${project.deployedURL}" target="_blank">Live</a>`}</p>
                              </div>
                          </div>
                      </div>
                      <p class="project-title">${project.title}</p>
                      <p class="disciplines">${project.roles.join(', ')}</p>
                      <p class="summary">${project.summary}</p>
                  </div>
              </div>
          `;
          })
          .join('')}
    `;
}

// Filter Projects - Note: Object Literals

const generateFilterTags = (textHighlight = '') => {
  const disciplines = [];

  portfolio.projects.forEach(project => {
    project.disciplines.forEach(discipline => {
      if (
        !disciplines.some(disciplineObject =>
          disciplineObject.tagName.includes(discipline)
        )
      ) {
        const newDisciplineObject = {
          tagName: discipline,
          count: 1,
          isHighlighted: discipline === textHighlight
        };

        disciplines.push(newDisciplineObject);
      } else {
        disciplines.forEach(disciplineObject => {
          if (disciplineObject.tagName === discipline) {
            // eslint-disable-next-line no-param-reassign
            disciplineObject.count += 1;
          }
        });
      }
    });
  });

  disciplines
    .sort((a, b) => {
      if (a.tagName < b.tagName) {
        return -1;
      }
      if (a.tagName < b.tagNAme) {
        return 1;
      }
      return 0;
    })
    .unshift(
      {
        tagName: 'All',
        count: portfolio.projects.length,
        isHighlighted: textHighlight === 'All'
      },
      'Technologies'
    );

  portfolio.targets.filter.innerHTML = `
        ${disciplines
          .map(discipline =>
            discipline === 'Technologies'
              ? `<li class="filter-header">${discipline}</a></li>`
              : `<li><a href="#" class="filter-tags isHighlighted-${discipline.isHighlighted}" data-filter="${discipline.tagName}">${discipline.tagName}</a> <span class="tag-count">(${discipline.count})</span></li>`
          )
          .join('')}
    `;
};

function filterProjects(keyword) {
  const filteredProjects = [];

  portfolio.projects.forEach(project => {
    if (project.disciplines.includes(keyword)) {
      filteredProjects.push(project);
    }
  });

  generateProjects(filteredProjects);
}

const clickTags = () => {
  document.querySelectorAll('.filter-tags').forEach(filterTag => {
    filterTag.addEventListener('click', event => {
      const { filter } = event.target.dataset;
      event.preventDefault();
      sessionStorage.setItem('filter', filter);
      if (filter === 'All') {
        generateFilterTags('All');
        generateProjects(portfolio.projects);
        clickTags();
        slide();
        portfolio.targets.currentFilterSelected.innerHTML = '';
      } else {
        generateFilterTags(filter);
        filterProjects(filter);
        clickTags();
        slide();
        portfolio.targets.currentFilterSelected.innerHTML = `
                    <span class="filter-id" id="filterId"><a href="#">${filter} <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg></a></span>`;
      }
    });
  });

  if (portfolio.targets.currentFilterSelected) {
    portfolio.targets.currentFilterSelected.addEventListener('click', event => {
      event.preventDefault();
      sessionStorage.setItem('filter', 'All');
      portfolio.targets.currentFilterSelected.innerHTML = '';
      generateFilterTags('All');
      slide();
      generateProjects(portfolio.projects);
      clickTags();
    });
  }
};

function init() {
  if (!portfolio.sessionStorage.filter) {
    sessionStorage.setItem('filter', 'All');
    generateFilterTags('All');
    generateProjects(portfolio.projects);
    clickTags();
    portfolio.targets.currentFilterSelected.innerHTML = '';
  } else if (portfolio.sessionStorage.filter === 'All') {
    sessionStorage.setItem('filter', 'All');
    generateFilterTags(portfolio.sessionStorage.filter);
    generateProjects(portfolio.projects);
    clickTags();
    portfolio.targets.currentFilterSelected.innerHTML = '';
  } else {
    generateFilterTags(portfolio.sessionStorage.filter);
    filterProjects(portfolio.sessionStorage.filter);
    clickTags();
    portfolio.targets.currentFilterSelected.innerHTML = `
        <span class="filter-id" id="filterId"><a href="#">${portfolio.sessionStorage.filter} <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg></a></span>`;
  }
}

const xhr = new XMLHttpRequest();
xhr.open(
  'GET',
  '/data.json'
);
xhr.onload = () => {
  if (xhr.status === 200) {
    try {
      const resObj = JSON.parse(xhr.responseText);
      portfolio.projects = resObj.projects;
      init();
      // eslint-disable-next-line no-console
      console.log('Projects Loaded.');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('There was an error in the JSON. Could not parse!');
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn('Did not receive 200 OK for response!');
  }
};
xhr.send();
