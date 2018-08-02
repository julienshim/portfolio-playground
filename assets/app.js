document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll('.button');
    var sidebar = document.querySelector('.sidebar');
    var sidebarShadow = document.querySelector('.sidebar-shadow');
    var sidebarItems = document.querySelectorAll('.sidebar-item');
    var sidebarSocialItems = document.querySelectorAll('.sidebar-social-item');
    var body = document.body;

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
});
