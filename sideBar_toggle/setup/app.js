const toggleBtn = document.querySelector(".toggle-sidebar");
const removeSidebar = document.querySelector(".close-sidebar");
const sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener("click", function(){
    sidebar.classList.toggle("show-sidebar")
})
removeSidebar.addEventListener("click", function(){
    sidebar.classList.remove("show-sidebar")
})