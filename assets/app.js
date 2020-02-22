document.addEventListener("DOMContentLoaded", function() {
  var body = document.body;
  var buttons = document.querySelectorAll(".button");
  var currentFilterSelected = document.querySelector("#currentFilterSelected");
  var filterTags = document.querySelectorAll(".filter-tags");
  var sidebar = document.querySelector(".sidebar");
  var sidebarItems = document.querySelectorAll(".sidebar-item");
  var sidebarShadow = document.querySelector(".sidebar-shadow");
  var sidebarSocialItems = document.querySelectorAll(".sidebar-social-item");
  var slider = document.querySelector("#slider");
  var trigger = document.querySelector("#sliderTrigger");
  var filterSVG = document.querySelector("#filterSVG");

  // Sidebar Event Listeners

  function toggleSidebar() {
    buttons.forEach(function(button) {
      button.classList.toggle("active");
    });
    body.classList.toggle("hidden");
    sidebar.classList.toggle("move-to-left");
    sidebarShadow.classList.toggle("bring-forward");
    sidebarItems.forEach(function(sidebarItem) {
      sidebarItem.classList.toggle("active");
    });
    sidebarSocialItems.forEach(function(sidebarSocialItem) {
      sidebarSocialItem.classList.toggle("active");
    });
  }

  buttons.forEach(function(button) {
    button.addEventListener("click", function(event) {
      toggleSidebar();
    });
  });

  // Portfolio Filtering Event Listeners

  if (slider) {
    trigger.addEventListener("click", function() {
      console.log(slider.classList);
      slider.classList.toggle("slideup");
      slider.classList.toggle("slidedown");
      filterSVG.classList.toggle("rotate");
    });
  }

  if (filterTags) {
    filterTags.forEach(function(filterTag) {
      filterTag.addEventListener("click", function(event) {
        var filter = event.target.dataset.filter;
        event.preventDefault();
        sessionStorage.setItem("filter", filter);
        if (filter === "All") {
          generateFilterTags("All");
          generateProjects(portfolio.projects);
          slider.classList.toggle("slideup");
          slider.classList.toggle("slidedown");
          currentFilterSelected.innerHTML = "";
        } else {
          generateFilterTags(filter);
          filterProjects(filter);
          slider.classList.toggle("slideup");
          slider.classList.toggle("slidedown");
          currentFilterSelected.innerHTML = `
                    <span class="filter-id" id="filterId"><a href="#">${filter} <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg></a></span>`;
        }
        slider.classList.toggle("slideup");
        slider.classList.toggle("slidedown");
      });
    });
  }

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
});
