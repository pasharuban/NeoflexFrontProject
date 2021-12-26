"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabs_item");
  const pageContentContainers = document.querySelectorAll("main .container");

  const likeButtons = document.querySelectorAll(".like");

  const table = document.querySelector(".table");
  const select = document.querySelector("select");
  const minRows = 3;
  const amountOfColumns = 3;

  const tableRows = [];
  const cells = [];
  let selectedRows = select.value;

  const tableHeader = document.createElement("div");
  tableHeader.className = "table-header table-row";

  tableHeader.innerHTML = `
    <span>Position</span>
    <span>Location</span>
    <span>Price</span>
    `;

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

  const clearTableContent = () => {
    while (table.hasChildNodes()) {
      table.removeChild(table.lastChild);
    }
  };

  const createTableHeader = () => {
    table.appendChild(tableHeader);
  };

  const createTable = () => {
    clearTableContent();
    createTableHeader();

    for (let rows = 0; rows < selectedRows; rows++) {
      let row = document.createElement("div");
      row.className = "table-row row-elements";

      for (let columns = 0; columns < amountOfColumns; columns++) {
        let cellElement = document.createElement("span");
        cellElement.textContent = `item${rows * minRows + columns}`;
        row.appendChild(cellElement);
      }
      table.appendChild(row);
    }
  };

  const selectRows = () => {
    select.addEventListener("change", (event) => {
      selectedRows = event.target.value;
      createTable();
    });
  };

  selectTab();
  addLike();

  createTable();
  selectRows();
});
