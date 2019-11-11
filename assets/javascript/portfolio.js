var portfolio = {
  projects: [],
  targets: {
    slider: document.querySelector("#slider"),
    filter: document.querySelector(".filter"),
    portfolio: document.querySelector("#portfolio"),
    currentFilterSelected: document.querySelector("#currentFilterSelected"),
    filterTags: document.querySelectorAll(".filter-tags")
  },
  sessionStorage: {
    filter: sessionStorage.getItem("filter")
  }
};

// Generate Projects - Note: Object Literals

function generateProjects(filteredProjects) {
  portfolio.targets.portfolio.innerHTML = `
        ${filteredProjects
          .map(
            project => `
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
                                      .join("")}
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
                    <p class="disciplines">${project.roles.join(", ")}</p>
                    <p class="summary">${project.summary}</p>
                </div>
            </div>
        `
          )
          .join("")}
    `;
  clickTags();
}

// Filter Projects - Note: Object Literals

function generateFilterTags(textHighlight = "") {
  var disciplines = [];

  portfolio.projects.forEach(function(project) {
    project.disciplines.forEach(function(discipline) {
      if (
        !disciplines.some(disciplineObject =>
          disciplineObject.tagName.includes(discipline)
        )
      ) {
        var newDisciplineObject = {
          tagName: discipline,
          count: 1,
          isHighlighted: discipline === textHighlight ? true : false
        };

        disciplines.push(newDisciplineObject);
      } else {
        disciplines.forEach(function(disciplineObject) {
          if (disciplineObject.tagName === discipline) {
            disciplineObject.count++;
          }
        });
      }
    });
  });

  disciplines
    .sort(function(a, b) {
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
        tagName: "All",
        count: portfolio.projects.length,
        isHighlighted: textHighlight === "All" ? true : false
      },
      "Technologies"
    );

  portfolio.targets.filter.innerHTML = `
        ${disciplines
          .map(discipline =>
            discipline === "Technologies"
              ? `<li class="filter-header">${discipline}</a></li>`
              : `<li><a href="#" class="filter-tags isHighlighted-${discipline.isHighlighted}" data-filter="${discipline.tagName}">${discipline.tagName}</a> <span class="tag-count">(${discipline.count})</span></li>`
          )
          .join("")}
    `;
  clickTags();
}

function clickTags() {
  // var filterTags = document.querySelectorAll(".filter-tags");
  document.querySelectorAll(".filter-tags").forEach(function(filterTag) {
    filterTag.addEventListener("click", function(event) {
      var filter = event.target.dataset.filter;
      event.preventDefault();
      sessionStorage.setItem("filter", filter);
      if (filter === "All") {
        generateFilterTags("All");
        generateProjects(portfolio.projects);
        // portfolio.targets.slider;
        if (portfolio.targets.slider.classList.contains("slidedown")) {
          portfolio.targets.slider.classList.toggle("slideup");
          portfolio.targets.slider.classList.toggle("slidedown");
        }
        portfolio.targets.currentFilterSelected.innerHTML = "";
      } else {
        generateFilterTags(filter);
        filterProjects(filter);
        if (portfolio.targets.slider.classList.contains("slidedown")) {
          portfolio.targets.slider.classList.toggle("slideup");
          portfolio.targets.slider.classList.toggle("slidedown");
        }
        portfolio.targets.currentFilterSelected.innerHTML = `
                    <span class="filter-id" id="filterId"><a href="#">${filter} <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg></a></span>`;
      }
    });
  });

  if (portfolio.targets.currentFilterSelected) {
    // if (portfolio.targets.currentFilterSelected && portfolio.targets.currentFilterSelected.innerHTML.trim() !== "") {
    portfolio.targets.currentFilterSelected.addEventListener("click", function(
      event
    ) {
      event.preventDefault();
      sessionStorage.setItem("filter", "All");
      portfolio.targets.currentFilterSelected.innerHTML = "";
      generateFilterTags("All");
      if (portfolio.targets.slider.classList.contains("slidedown")) {
        portfolio.targets.slider.classList.toggle("slideup");
        portfolio.targets.slider.classList.toggle("slidedown");
      }
      generateProjects(portfolio.projects);
    });
  }
}

function filterProjects(keyword) {
  var filteredProjects = [];

  portfolio.projects.forEach(function(project) {
    if (project.disciplines.includes(keyword)) {
      filteredProjects.push(project);
    }
  });

  generateProjects(filteredProjects);
}

function init() {
  if (!portfolio.sessionStorage.filter) {
    sessionStorage.setItem("filter", "All");
    generateFilterTags("All");
    generateProjects(portfolio.projects);
    portfolio.targets.currentFilterSelected.innerHTML = "";
  } else if (portfolio.sessionStorage.filter === "All") {
    sessionStorage.setItem("filter", "All");
    generateFilterTags(portfolio.sessionStorage.filter);
    generateProjects(portfolio.projects);
    portfolio.targets.currentFilterSelected.innerHTML = "";
  } else {
    generateFilterTags(portfolio.sessionStorage.filter);
    filterProjects(portfolio.sessionStorage.filter);
    portfolio.targets.currentFilterSelected.innerHTML = `
        <span class="filter-id" id="filterId"><a href="#">${portfolio.sessionStorage.filter} <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg></a></span>`;
  }
}

// init();

var xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://raw.githubusercontent.com/julienshim/Portfolio-Playground/master/data-test.json"
);
xhr.onload = function() {
  if (this.status === 200) {
    try {
      const resObj = JSON.parse(this.responseText);
      portfolio.projects = resObj.projects;
      init();
    } catch (error) {
      console.warn("There was an error in the JSON. Could not parse!");
    }
  } else {
    console.warn("Did not receive 200 OK for response!");
  }
};
xhr.send();
