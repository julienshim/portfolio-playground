document.addEventListener("DOMContentLoaded", function () {
    var body = document.body;
    var buttons = document.querySelectorAll('.button');
    var currentFilterSelected = document.querySelector('#currentFilterSelected');
    var filterTags = document.querySelectorAll('.filter-tags');
    var sidebar = document.querySelector('.sidebar');
    var sidebarItems = document.querySelectorAll('.sidebar-item');
    var sidebarShadow = document.querySelector('.sidebar-shadow');
    var sidebarSocialItems = document.querySelectorAll('.sidebar-social-item');
    var slider = document.querySelector('#slider');
    var trigger = document.querySelector('#sliderTrigger');

    // Sidebar Event Listeners

    function toggleSidebar() {
        buttons.forEach(function(button) {
            button.classList.toggle("active");
        });
        body.classList.toggle("hidden");
        sidebar.classList.toggle("move-to-left");
        sidebarShadow.classList.toggle("bring-forward");
        sidebarItems.forEach(function (sidebarItem) {
            sidebarItem.classList.toggle("active");
        });
        sidebarSocialItems.forEach(function (sidebarSocialItem) {
            sidebarSocialItem.classList.toggle("active");
        });
    }

    buttons.forEach(function(button) {
        button.addEventListener('click', function (event) {
            toggleSidebar();
        });
    });

    // Portfolio Filtering Event Listeners

    if(slider){
        trigger.addEventListener('click', function(){
            slider.classList.toggle('slideup');
            slider.classList.toggle('slidedown');
        })
    }

    if(filterTags){
        filterTags.forEach(function(filterTag) {
            filterTag.addEventListener('click', function(event) {
                var filter = event.target.dataset.filter;
                             event.preventDefault();
                             sessionStorage.setItem('filter', filter);
                if(filter === "All") {
                    generateProjects(portfolio.projects);
                    currentFilterSelected.innerHTML = "";
                    slider.classList.toggle('slideup');
                    slider.classList.toggle('slidedown');
                } else {
                    filterProjects(filter);
                    slider.classList.toggle('slideup');
                    slider.classList.toggle('slidedown');
                    currentFilterSelected.innerHTML = `
                    <span class="filter-id" id="filterId"><a href="#">${filter} <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg></a></span>`

                }
            });
        });
    }

    if(currentFilterSelected && (currentFilterSelected.innerHTML.trim() !== " ")) {
        currentFilterSelected.addEventListener('click', function(event){
            event.preventDefault();
            currentFilterSelected.innerHTML = "";
            generateProjects(portfolio.projects);
        });
    };
      
    
});





