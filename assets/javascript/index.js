var about = {
  name: "Julien Shim",
  jobTitle: "full-stack developer",
  location: "San Francisco Bay Area",
  recentWork: [],
  targets: {
    introduction: document.querySelector("#typedIntroduction"),
    recentWork: document.querySelector("#recent-work"),
    skills: document.querySelector("#skillsBubbleDiagram"),
    ahref: document.querySelectorAll('a[href^="#"]')
  },
  generateSkills: function() {
    var disciplines = [];

  about.recentWork.forEach(function(project) {
    project.disciplines.forEach(function(discipline) {
      if (
        !disciplines.some(disciplineObject =>
          disciplineObject.tagName.includes(discipline)
        )
      ) {
        var newDisciplineObject = {
          tagName: discipline,
          count: 1,
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
   console.log(disciplines);
    this.targets.skills.innerHTML = `
        ${disciplines
          .map(
            discipline => `
            <dt class="soft-skill-${discipline.count >= 5 ? 5 : discipline.count + 1}">${discipline.tagName}</dt>
            <dd>${discipline.count}</dd>
        `
          )
          .join("")}
    `;
  },
  generateRecentWork: function() {
    this.targets.recentWork.innerHTML = `
        ${about.recentWork.slice(0, 3)
          .map(
            works => `
            <div class="project-container" onclick="void(0)">
                <div class="project-content">
                    <div class="project-image-container">
                        <img src="${
                          works.image
                        }" class="project-image" title="${works.title}" />
                        <div class="overlay">
                            <div class="text">
                                <ul>
                                    ${works.disciplines
                                      .map(
                                        discipline =>
                                          `<li class="filter-tags" data-filter="${discipline}">${discipline}</li>`
                                      )
                                      .join("")}
                                </ul>
                            </div>
                            <div class="year-overlay">
                                <p>${works.year}</p>
                             </div>
                            <div class="external-links-overlay">
                                <p><a href="${
                                  works.githubRepo
                                }" target="_blank">Github</a>${works.deployedURL &&
              ` <a href="${works.deployedURL}" target="_blank">Live</a>`}</p>
                            </div>
                        </div>
                    </div>
                    <p class="project-title">${works.title}</p>
                    <p class="disciplines">${works.roles.join(", ")}</p>
                    <p class="summary mb-12">${works.summary}</p>
                </div>
            </div>
        `
          )
          .join("")}
    `;
    clickTags();
  },
  smoothScrolling: function() {
    this.targets.ahref.forEach(anchor => {
      anchor.addEventListener("click", function(event) {
        event.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth"
        });
      });
    });
  },
  init: function() {
    this.generateRecentWork();
    this.generateSkills();
    this.smoothScrolling();
  }
};

// Introduction - Note: Object Literals

var introduction = `<h1 class='introduction-header mb-12'>Hi, my name is <span>${about.name}</span>.</h1> <h1 class='introduction-header mb-48'>I am a user-focused <span>${about.jobTitle}</span> based in the <span>${about.location}</span>.</h1><p>I love designing and building full-stack web applications.</p>`,
  i = 0,
  isTag,
  text;

function clickTags() {
  document.querySelectorAll(".filter-tags").forEach(function(filterTag) {
    filterTag.addEventListener("click", function(event) {
      var filter = event.target.dataset.filter;
      event.preventDefault();
      sessionStorage.setItem("filter", filter);
      // var portfolio = '/portfolio.html'
      window.location.href = "portfolio.html";
    });
  });
}

function screenType() {
  character = introduction.slice(0, i++);
  if (character === introduction) return;

  about.targets.introduction.innerHTML =
    character + '<span class="caret blink" aria-hidden="true"></span>';

  var currentCharacter = character.slice(-1);
  if (currentCharacter === "<") isTag = true;
  if (currentCharacter === ">") isTag = false;

  if (isTag) return screenType();

  if ((currentCharacter === ".") | (currentCharacter === "?")) {
    setTimeout(screenType, 500);
  } else {
    setTimeout(screenType, 25);
  }
}


var xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://raw.githubusercontent.com/julienshim/Portfolio-Playground/master/data-test.json"
);
xhr.onload = function() {
  if (this.status === 200) {
    try {
      const resObj = JSON.parse(this.responseText);
      about.recentWork = resObj.projects;
      console.log(about.recentWork);
      console.log("Projects Loaded.");
      screenType();
      about.init();
    } catch (error) {
      console.warn("There was an error in the JSON. Could not parse!", error);
    }
  } else {
    console.warn("Did not receive 200 OK for response!");
  }
};
xhr.send();
