var about = {
    name: "Jerauld Manansala",
    jobTitle: "full-stack developer",
    image: "",
    location: "San Francisco Bay Area",
    skills: [
        {
            name: "Documentation",
            type: "soft",
            level: 4
        },
        {
            name: "JavaScript",
            type: "hard",
            level: 5
        },
        {
            name: "Organization",
            type: "soft",
            level: 5
        },
        {
            name: "Express",
            type: "hard",
            level: 3
        },
        {
            name: "MySQL",
            type: "hard",
            level: 3
        },
        {
            name: "Leadership",
            type: "soft",
            level: 4
        },
        {
            name: "Firebase",
            type: "hard",
            level: 2
        },
        {
            name: "HTML/CSS",
            type: "hard",
            level: 5
        },
        {
            name: "Communication",
            type: "soft",
            level: 5
        },
        {
            name: "NodeJS",
            type: "hard",
            level: 4
        },
        {
            name: "Photoshop",
            type: "hard",
            level: 5
        },       {
            name: "React-Native",
            type: "hard",
            level: 2
        },
        {
            name: "React",
            type: "hard",
            level: 3
        },
        {
            name: "Collaboration",
            type: "soft",
            level: 5
        },
        {
            name: "Redux",
            type: "hard",
            level: 2
        },
        {
            name: "jQuery",
            type: "hard",
            level: 4
        },
        {
            name: "Design",
            type: "soft",
            level: 5
        },
        {
            name: "MongoDB",
            type: "hard",
            level: 2
        }
    ],
    recentWork: [
        {
            title: "Odin's Ravens",
            summary: "Web application clone of the strategic card game Odin's Ravens.",
            image: "assets/images/projects/odins-ravens.png",
            disciplines: ["ReactJS", "Firebase", "JavaScript", "CSS", "Bootstrap", "jQuery", "OAuth"],
            githubRepo: "https://github.com/Laethaka/OdinsWorld",
            deployedURL: "https://evening-coast-38386.herokuapp.com/",
            roles: ["Front End Engineer", "QA Engineer"],
            year: 2018
    
        },
        {
            title: "Meishi",
            summary: "Social networking business card app for iOS and Android devices.",
            image: "assets/images/projects/meishi.png",
            disciplines: ["Expo", "JavaScript", "Firebase", "React-Native", "Redux", "OAuth"],
            githubRepo: "https://github.com/cliffpham/meishi-mvp",
            deployedURL: "https://expo.io/@cliffpham/expo-sanbox",
            roles: ["QA Engineer", "Database Developer"],
            year: 2018
        },
        {
            title: "Jumpstart",
            summary: "Job search web application tool.",
            image: "assets/images/projects/jumpstart.png",
            disciplines: ["JavaScript", "EJS", "jQuery", "Bootstrap", "HTML", "CSS", "NodeJS", "Express", "MySQL", "OAuth"],
            githubRepo: "https://github.com/jerauld/jumpstart",
            deployedURL: "https://obscure-beach-77511.herokuapp.com/",
            roles: ["Database Developer", "Project Manager", "QA Engineer"],
            year: 2018
        }
    ],
    targets: {
        introduction: document.querySelector('#typedIntroduction'),
        recentWork: document.querySelector('#recent-work'),
        skills: document.querySelector('#skillsBubbleDiagram'),
        ahref: document.querySelectorAll('a[href^="#"]')
    },
    generateSkills: function() {
        this.targets.skills.innerHTML = `
        ${about.skills.map(skill => `
            <dt class="${skill.type}-skill-${skill.level}">${skill.name}</dt>
            <dd>${skill.level}</dd>
        `).join('')}
    `
    },
    generateRecentWork: function() {
        this.targets.recentWork.innerHTML = `
        ${about.recentWork.map(works => `
            <div class="project-container">
                <div class="project-content">
                    <div class="project-image-container">
                        <img src="${works.image}" class="project-image" title="${works.title}" />
                        <div class="overlay">
                            <div class="text">
                                <ul>
                                    ${works.disciplines.map(discipline => `<li>${discipline}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="year-overlay">
                                <p>${works.year}</p>
                             </div>
                            <div class="external-links-overlay">
                                <p><a href="${works.deployedURL}" target="_blank">Github</a> <a href="${works.deployedURL}" target="_blank">Live</a></p>
                            </div>
                        </div>
                    </div>
                    <p class="project-title">${works.title}</p>
                    <p class="disciplines">${works.roles.join(', ')}</p>
                    <p class="summary">${works.summary}</p>
                </div>
            </div>
        `).join('')}
    `
    },
    smoothScrolling: function() {
        this.targets.ahref.forEach(anchor => {
            anchor.addEventListener('click', function (event) {
                event.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    },
    init: function(){
        this.generateRecentWork();
        this.generateSkills();
        this.smoothScrolling();
    }
}


about.init();

// Introduction - Note: Object Literals

var introduction = `<h1 class='mb-12'>Hi, my name is <span>${about.name}</span>.</h1> <h1 class='mb-48'>I am a user-focused <span>${about.jobTitle}</span> based in the <span>${about.location}</span>.</h1><p>I love designing and building full-stack web applications.</p>`,
    i = 0,
    isTag,
    text;


function screenType() {
    character = introduction.slice(0, i++)
    if (character === introduction) return;
    
    about.targets.introduction.innerHTML = character + '<span class="caret blink" aria-hidden="true"></span>';

    var currentCharacter = character.slice(-1);
    if( currentCharacter === '<' ) isTag = true;
    if( currentCharacter === '>' ) isTag = false;

    if (isTag) return screenType();

    if (currentCharacter === "." | currentCharacter === "?") {
        setTimeout(screenType, 500);
    } else {
        setTimeout(screenType, 25);
    }
  
    
};

screenType();