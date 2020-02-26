document.addEventListener('DOMContentLoaded', () => {
  const { body } = document;
  const buttons = document.querySelectorAll('.button');
  const currentFilterSelected = document.querySelector(
    '#currentFilterSelected'
  );
  const filterTags = document.querySelectorAll('.filter-tags');
  const sidebar = document.querySelector('.sidebar');
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const sidebarShadow = document.querySelector('.sidebar-shadow');
  const sidebarSocialItems = document.querySelectorAll('.sidebar-social-item');
  const slider = document.querySelector('#slider');
  const trigger = document.querySelector('#sliderTrigger');
  const filterSVG = document.querySelector('#filterSVG');

  // Sidebar Event Listeners

  const toggleSidebar = () => {
    buttons.forEach(button => {
      button.classList.toggle('active');
    });
    body.classList.toggle('hidden');
    sidebar.classList.toggle('move-to-left');
    sidebarShadow.classList.toggle('bring-forward');
    sidebarItems.forEach(sidebarItem => {
      sidebarItem.classList.toggle('active');
    });
    sidebarSocialItems.forEach(sidebarSocialItem => {
      sidebarSocialItem.classList.toggle('active');
    });
  };

  buttons.forEach(button => {
    button.addEventListener('click', event => {
      toggleSidebar();
    });
  });

  // Portfolio Filtering Event Listeners

  if (slider) {
    trigger.addEventListener('click', () => {
      // eslint-disable-next-line no-console
      console.log(slider.classList);
      slider.classList.toggle('slideup');
      slider.classList.toggle('slidedown');
      filterSVG.classList.toggle('rotate');
    });
  }

  if (filterTags) {
    filterTags.forEach(filterTag => {
      filterTag.addEventListener('click', event => {
        const { filter } = event.target.dataset;
        event.preventDefault();
        sessionStorage.setItem('filter', filter);
        if (filter === 'All') {
          generateFilterTags('All');
          generateProjects(portfolio.projects);
          slider.classList.toggle('slideup');
          slider.classList.toggle('slidedown');
          currentFilterSelected.innerHTML = '';
        } else {
          generateFilterTags(filter);
          filterProjects(filter);
          slider.classList.toggle('slideup');
          slider.classList.toggle('slidedown');
          currentFilterSelected.innerHTML = `
                    <span class="filter-id" id="filterId"><a href="#">${filter} <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg></a></span>`;
        }
        slider.classList.toggle('slideup');
        slider.classList.toggle('slidedown');
      });
    });
  }

  if (currentFilterSelected && currentFilterSelected.innerHTML.trim() !== '') {
    currentFilterSelected.addEventListener('click', event => {
      event.preventDefault();
      sessionStorage.setItem('filter', 'All');
      currentFilterSelected.innerHTML = '';
      generateFilterTags('All');
      if (slider.classList.contains('slidedown')) {
        slider.classList.toggle('slideup');
        slider.classList.toggle('slidedown');
      }
      generateProjects(portfolio.projects);
    });
  }
});
