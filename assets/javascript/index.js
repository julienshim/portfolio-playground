const about = {
  name: "Julien Shim",
  jobTitle: "full-stack developer",
  location: "San Francisco Bay Area",
  interests: ["websites", "web applications", "UX/UI", "mobile applications"],
  recentWork: [],
  targets: {
    introduction: document.querySelector("#typedIntroduction"),
    recentWork: document.querySelector("#recent-work"),
    skills: document.querySelector("#skillsBubbleDiagram"),
    ahref: document.querySelectorAll('a[href^="#"]'),
    seeAll: document.querySelector("a.see-all")
  },
  generateSkills() {
    const disciplines = [];

    about.recentWork.forEach(project => {
      project.disciplines.forEach(discipline => {
        if (
          !disciplines.some(disciplineObject =>
            disciplineObject.tagName.includes(discipline)
          )
        ) {
          const newDisciplineObject = {
            tagName: discipline,
            count: 1
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
    this.targets.skills.innerHTML = `
        ${disciplines
          .sort((a, b) => {
            const aTag = a.tagName.toLowerCase();
            const bTag = b.tagName.toLowerCase();
            if (aTag < bTag) {
              return -1;
            }
            if (aTag > bTag) {
              return 1;
            }
            return 0;
          })
          .map(discipline => {
            const isTwo = discipline.tagName.split(" ").length === 2;
            return `
              <dt class="filter-tags hard-skill-${
                discipline.count >= 4 ? 5 : discipline.count + 2
              }${isTwo ? "-alt" : ""}" data-filter="${discipline.tagName}">${
              isTwo
                ? discipline.tagName.split(" ").join(`<br>`)
                : discipline.tagName
            }</dt>
              <dd>${discipline.count}</dd>
          `;
          })
          .join("")}
    `;
  },
  generateRecentWork() {
    this.targets.recentWork.innerHTML = `
        ${about.recentWork
          .slice(0, 3)
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
  },
  smoothScrolling() {
    this.targets.ahref.forEach(anchor => {
      anchor.addEventListener("click", event => {
        event.preventDefault();
        document.querySelector(anchor.getAttribute("href")).scrollIntoView({
          behavior: "smooth"
        });
      });
    });
  }
};

// Introduction - Note: Object Literals

let i = 0;
let j = 0;
let message = `<h1 class='introduction-header mb-12'>Hi, my name is <span class="about-me-key"><span>${about.name}</span>.</span></h1><h1 class='introduction-header mb-48'>I am a user-focused <span class="about-me-key"><span>${about.jobTitle}</span></span> based in the <span class="about-me-key"><span>${about.location}</span>.</span></h1><p>I love designing and building<span id="animatedText">${about.interests[j]}.</span></p>`;
let target = about.targets.introduction;
let isTag;
let isAnimated = false;

function clickTags() {
  document.querySelectorAll(".filter-tags").forEach(filterTag => {
    filterTag.addEventListener("click", event => {
      const { filter } = event.target.dataset;
      event.preventDefault();
      sessionStorage.setItem("filter", filter);
      // var portfolio = '/portfolio.html'
      window.location.href = "portfolio.html";
    });
  });
}

const screenType = () => {
  const character = message.slice(0, (i += 1));
  if (character === message) {
    i = about.interests[j].length;
    setTimeout(backSpace, 500);
    return;
  }

  target.innerHTML = `${character}<span class="caret blink" aria-hidden="true"></span>`;

  const currentCharacter = character.slice(-1);
  if (currentCharacter === "<") isTag = true;
  if (currentCharacter === ">") isTag = false;

  if (isTag) {
    // eslint-disable-next-line consistent-return
    return screenType();
  }
  if (currentCharacter === "." || currentCharacter === "?") {
    setTimeout(screenType, 500);
  } else {
    setTimeout(screenType, 25);
  }
};

const backSpace = () => {
  const character = about.interests[j]
    ? about.interests[j].slice(0, (i -= 1))
    : "";
  document.querySelector(
    "#animatedText"
  ).innerHTML = `${character}<span class="caret blink" aria-hidden="true"></span>`;
  if (character.length === 0) {
    i = 0;
    if (j < about.interests.length - 1) {
      j++;
    } else {
      j = 0;
    }
    message = `<span>${about.interests[j]}.</span>`;
    target = document.querySelector("#animatedText");
    isAnimated = true;
    setTimeout(screenType, 500);

    return;
  }
  if (character === about.interests[j]) {
    setTimeout(backSpace, 50);
  } else {
    setTimeout(backSpace, 50);
  }
};

const init = () => {
  about.generateRecentWork();
  about.generateSkills();
  clickTags();
  about.smoothScrolling();
  about.targets.seeAll.innerHTML = `See All ${about.recentWork.length} Projects`;
};

const xhr = new XMLHttpRequest();
xhr.open("GET", "https://raw.githubusercontent.com/julienshim/portfolio-playground/master/data.json");
xhr.onload = () => {
  if (xhr.status === 200) {
    try {
      const resObj = JSON.parse(xhr.responseText);
      about.recentWork = resObj.projects;
      // eslint-disable-next-line no-console
      console.log("Projects Loaded.");
      screenType();
      init();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("There was an error in the JSON. Could not parse!", error);
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn("Did not receive 200 OK for response!");
  }
};
xhr.send();
