window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabs_item");
  const pageContentContainers = document.querySelectorAll("main .container");

  const likeButtons = document.querySelectorAll(".like");

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

  const addLike = () => {
    likeButtons.forEach((likeButton) => {
      likeButton.addEventListener("click", () => {
        if (likeButton.classList.contains("liked"))
          likeButton.classList.remove("liked");
        else likeButton.classList.add("liked");
      });
    });
  };

  selectTab();
  addLike();
});
