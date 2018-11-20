var portfolio = {
  projects: [
    {
      title: "Odin's Ravens",
      summary:
        "Web application clone of the strategic card game Odin's Ravens.",
      image: "assets/images/projects/odins-ravens.png",
      disciplines: [
        "ReactJS",
        "Firebase",
        "JavaScript",
        "CSS",
        "Bootstrap",
        "jQuery",
        "OAuth"
      ],
      githubRepo: "https://github.com/Laethaka/OdinsWorld",
      deployedURL: "https://odins-ravens.herokuapp.com/",
      roles: ["Front-End Engineer", "QA Engineer"],
      year: 2018
    },
    {
      title: "Meishi",
      summary:
        "Social networking business card app for iOS and Android devices.",
      image: "assets/images/projects/meishi.png",
      disciplines: [
        "Expo",
        "JavaScript",
        "Firebase",
        "React-Native",
        "Redux",
        "OAuth"
      ],
      githubRepo: "https://github.com/cliffpham/meishi-mvp",
      deployedURL: "https://expo.io/@cliffpham/expo-sanbox",
      roles: ["Database Developer", "QA Engineer"],
      year: 2018
    },
    {
      title: "Jumpstart",
      summary: "Job search web application tool.",
      image: "assets/images/projects/jumpstart.png",
      disciplines: [
        "JavaScript",
        "EJS",
        "jQuery",
        "Bootstrap",
        "HTML",
        "CSS",
        "NodeJS",
        "Express",
        "MySQL",
        "OAuth"
      ],
      githubRepo: "https://github.com/julienshim/jumpstart",
      deployedURL: "https://obscure-beach-77511.herokuapp.com/",
      roles: ["Database Developer", "Project Manager", "QA Engineer"],
      year: 2018
    },
    {
      title: "Marvel Me",
      summary:
        "Facial recognition web application to match users to the Marvel Cinematic Universe character they most resemble.",
      image: "assets/images/projects/marvel-me.png",
      disciplines: [
        "jQuery",
        "HTML",
        "CSS",
        "Bootstrap",
        "Facial Recognition",
        "Firebase"
      ],
      githubRepo: "https://github.com/tomkim825/Project1-FaceAPI",
      deployedURL: "https://tomkim825.github.io/Project1-FaceAPI/",
      roles: ["Front-End Engineer", "UX/UI", "Design", "Project Manager"],
      year: 2018
    },
    {
      title: "Star Wars Clicky Game",
      summary: "Stormtrooper themed memory game built with React.",
      image: "assets/images/projects/star-wars.png",
      disciplines: ["ReactJS", "CSS", "JavaScript", "JSON"],
      githubRepo: "https://github.com/julienshim/clicky-game",
      deployedURL: "https://julienshim.github.io/clicky-game/",
      roles: ["Author"],
      year: 2018
    },
    {
      title: "Zelda Rupee Game",
      summary:
        "Legend of Zelda themed 'Crystals Collector'-type game dynamically updated via jQuery.",
      image: "assets/images/projects/zelda.png",
      disciplines: ["HTML", "CSS", "JavaScript", "jQuery"],
      githubRepo: "https://github.com/julienshim/unit-4-game",
      deployedURL: "https://julienshim.github.io/unit-4-game/",
      roles: ["Author"],
      year: 2018
    },
    {
      title: "90s Cartoon Gifs",
      summary:
        "90s Cartoon Gifs is a dyanmic GIPHY API-based GIF search app using JavaScript and jQuery to change the HTML.",
      image: "assets/images/projects/giftastic.png",
      disciplines: ["API", "HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"],
      githubRepo: "https://github.com/julienshim/GifTastic",
      deployedURL: "https://julienshim.github.io/GifTastic/",
      roles: ["Author"],
      year: 2018
    },
    {
      title: "Flinders Street Station Train Schedule",
      summary:
        "Flinders Street Station Train Schedule incorporates Firebase to host up arrival data, which is manipulated with Moment.js",
      image: "assets/images/projects/train-scheduler.png",
      disciplines: [
        "Moment",
        "Firebase",
        "JavaScript",
        "Bootstrap",
        "HTML",
        "CSS"
      ],
      githubRepo: "https://github.com/julienshim/Train-Scheduler",
      deployedURL: "https://julienshim.github.io/Train-Scheduler/",
      roles: ["Author"],
      year: 2018
    },
    {
      title: "5th Grade Trivia",
      summary:
        "5th Grade Trivia is a 10 question, timed trivia game using JavaScript for the logic and jQuery to manipulate HTML",
      image: "assets/images/projects/trivia-game.png",
      disciplines: ["JavaScript", "jQuery", "CSS", "HTML"],
      githubRepo: "https://github.com/julienshim/TriviaGame",
      deployedURL: "https://julienshim.github.io/TriviaGame/",
      roles: ["Author"],
      year: 2018
    }
  ],
  targets: {
    slider: document.querySelector("#slider"),
    filter: document.querySelector(".filter"),
    portfolio: document.querySelector("#portfolio"),
    currentFilterSelected: document.querySelector("#currentFilterSelected")
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
                                        discipline => `<li>${discipline}</li>`
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
                                }" target="_blank">Github</a> <a href="${
              project.deployedURL
            }" target="_blank">Live</a></p>
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
              : `<li><a href="#" class="filter-tags isHighlighted-${
                  discipline.isHighlighted
                }" data-filter="${discipline.tagName}">${
                  discipline.tagName
                }</a> <span class="tag-count">(${discipline.count})</span></li>`
          )
          .join("")}
    `;

  var filterTags = document.querySelectorAll(".filter-tags");
  filterTags.forEach(function(filterTag) {
    filterTag.addEventListener("click", function(event) {
      var filter = event.target.dataset.filter;
      event.preventDefault();
      sessionStorage.setItem("filter", filter);
      if (filter === "All") {
        generateFilterTags("All");
        generateProjects(portfolio.projects);
        portfolio.targets.slider;
        portfolio.targets.slider.classList.toggle("slideup");
        portfolio.targets.slider.classList.toggle("slidedown");
        currentFilterSelected.innerHTML = "";
      } else {
        generateFilterTags(filter);
        filterProjects(filter);
        portfolio.targets.slider.classList.toggle("slideup");
        portfolio.targets.slider.classList.toggle("slidedown");
        currentFilterSelected.innerHTML = `
                    <span class="filter-id" id="filterId"><a href="#">${filter} <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg></a></span>`;
      }
    });
  });

  if (currentFilterSelected && currentFilterSelected.innerHTML.trim() !== "") {
    currentFilterSelected.addEventListener("click", function(event) {
      event.preventDefault();
      sessionStorage.setItem("filter", "All");
      currentFilterSelected.innerHTML = "";
      generateFilterTags("All");
      if (slider.classList.contains("slidedown")) {
        slider.classList.toggle("slideup");
        slider.classList.toggle("slidedown");
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
        <span class="filter-id" id="filterId"><a href="#">${
          portfolio.sessionStorage.filter
        } <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg></a></span>`;
  }
}

init();
