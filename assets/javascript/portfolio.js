var portfolio = {
    projects: [
        {
            title: "Odin's Ravens",
            summary: "Web application clone of the strategic card game Odin's Ravens.",
            image: "assets/images/projects/odins-ravens.png",
            disciplines: ["ReactJS", "Firebase", "JavaScript", "CSS", "Bootstrap", "jQuery", "OAuth"],
            githubRepo: "https://github.com/Laethaka/OdinsWorld",
            deployedURL: "https://evening-coast-38386.herokuapp.com/",
            roles: ["Front-End Engineer", "QA Engineer"],
            year: 2018
    
        },
        {
            title: "Meishi",
            summary: "Social networking business card app for iOS and Android devices.",
            image: "assets/images/projects/meishi.png",
            disciplines: ["Expo", "JavaScript", "Firebase", "React-Native", "Redux", "OAuth"],
            githubRepo: "https://github.com/cliffpham/meishi-mvp",
            deployedURL: "https://expo.io/@cliffpham/expo-sanbox",
            roles: ["Database Developer", "QA Engineer"],
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
        },
        {
            title: "Marvel Me",
            summary: "Facial recognition web application to match users to the Marvel Cinematic Universe character they most resemble.",
            image: "assets/images/projects/marvel-me.png",
            disciplines: ["jQuery", "HTML", "CSS", "Bootstrap", "Facial Recognition", "Firebase"],
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
            githubRepo: "https://github.com/jerauld/unit-4-game",
            deployedURL: "https://jerauld.github.io/unit-4-game/",
            roles: ["Author"],
            year: 2018
        },
        {
            title: "Zelda Rupee Game",
            summary: "Legend of Zelda themed 'Crystals Collector'-type game dynamically updated via jQuery.",
            image: "assets/images/projects/zelda.png",
            disciplines: ["HTML", "CSS", "JavaScript", "jQuery"],
            githubRepo: "https://github.com/jerauld/unit-4-game",
            deployedURL: "https://jerauld.github.io/unit-4-game/",
            roles: ["Author"],
            year: 2018
        }
    ],
    targets: {
        filter: document.querySelector('.filter'),
        portfolio: document.querySelector('#portfolio'),
        currentFilterSelected: document.querySelector('#currentFilterSelected')
    },
    sessionStorage: {
        filter: sessionStorage.getItem('filter')
    }
}

// Generate Projects - Note: Object Literals

function generateProjects(filteredProjects) {
    portfolio.targets.portfolio.innerHTML = `
        ${filteredProjects.map(project => `
            <div class="project-container">
                <div class="project-content mb-12p">
                    <div class="project-image-container">
                        <img src="${project.image}" class="project-image" title="${project.title}" />
                        <div class="overlay">
                            <div class="text">
                                <ul>
                                    ${project.disciplines.map(discipline => `<li>${discipline}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="year-overlay">
                                <p>${project.year}</p>
                            </div>
                            <div class="external-links-overlay">
                                <p><a href="${project.deployedURL}" target="_blank">Github</a> <a href="${project.deployedURL}" target="_blank">Live</a></p>
                            </div>
                        </div>
                    </div>
                    <p class="project-title">${project.title}</p>
                    <p class="disciplines">${project.roles.join(', ')}</p>
                    <p class="summary">${project.summary}</p>
                </div>
            </div>
        `).join('')}
    `
};

// Filter Projects - Note: Object Literals

function generateFilterTags() {

    var disciplines = ["All"];

    portfolio.projects.forEach(function(project){
        project.disciplines.forEach(function(discipline){
            if(!disciplines.includes(discipline)) {
                disciplines.push(discipline);
            };
        });
    });

    portfolio.targets.filter.innerHTML = `
        ${disciplines.sort().map(discipline => `<li><a href="#" class="filter-tags" data-filter="${discipline}">${discipline}</a></li>`).join('')}
    `
}

function filterProjects(keyword) {
    
    var filteredProjects = [];

    portfolio.projects.forEach(function(project){
        if(project.disciplines.includes(keyword)) {
            filteredProjects.push(project);
        }
    });

    generateProjects(filteredProjects);

}

function init() {
    generateFilterTags();
    if(!portfolio.sessionStorage.filter){
        sessionStorage.setItem('filter', "All");
        generateProjects(portfolio.projects);
        portfolio.targets.currentFilterSelected.innerHTML = "";
    } else if(portfolio.sessionStorage.filter === "All") { 
        sessionStorage.setItem('filter', "All");
        generateProjects(portfolio.projects);
        portfolio.targets.currentFilterSelected.innerHTML = "";
    } else {
        filterProjects(portfolio.sessionStorage.filter);
        portfolio.targets.currentFilterSelected.innerHTML = `
        <span class="filter-id" id="filterId"><a href="#">${portfolio.sessionStorage.filter} <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg></a></span>`;
    };
};

init();