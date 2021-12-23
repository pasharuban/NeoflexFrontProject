window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabs_item");
  const pageContentContainers = document.querySelectorAll("main .container");

  const removeActiveClass = () => {
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
  };

  const addActiveClass = (activeTab) => {
    activeTab.classList.add("active");
  };

  const hideContent = () => {
    pageContentContainers.forEach((contentContainer) => {
      contentContainer.classList.add("hide");
    });
  };

  const showContent = (index) => {
    pageContentContainers[index].classList.remove("hide");
  };

  const selectTab = () => {
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        removeActiveClass();
        addActiveClass(tab);
        hideContent();
        showContent(index);
      });
    });
  };


  

  selectTab();
});
