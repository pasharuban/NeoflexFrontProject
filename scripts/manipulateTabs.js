"use strict";

const manipulateTabs = () => {
  const tabs = document.querySelectorAll(".tabs_item");
  const pageContentContainers = document.querySelectorAll("main .container");

  const removePrevActiveClass = () => {
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
  };

  const addActiveClass = (activeTab) => {
    activeTab.classList.add("active");
  };

  const hidePrevContent = () => {
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
        removePrevActiveClass();
        addActiveClass(tab);
        hidePrevContent();
        showContent(index);
      });
    });
  };

  selectTab();
};

export default manipulateTabs;
