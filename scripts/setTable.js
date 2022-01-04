"use strict";

const setTable = () => {
  const getTableData = async () => {
    const limit = "?_limit=65";
    const url = `https://jsonplaceholder.typicode.com/albums/${limit}`;

    const data = await fetch(url);

    if (!data.ok) alert("Ошибка загрузки данных для таблицы!");

    manipulateTable(await data.json());
  };

  const manipulateTable = (tableData) => {
    //dom
    const table = document.querySelector(".table");
    const select = document.querySelector("select");
    const tableHeader = document.querySelector(".table-header");

    const paginationContainer = document.querySelector(".pagination");

    const paginationPrevArrow = paginationContainer.querySelector(".prev ");
    const paginationNextArrow = paginationContainer.querySelector(".next ");

    const paginatorElementsContainer = paginationContainer.querySelector(
      ".paginator-elements-container"
    );

    //constants
    const amountOfColumns = 3;
    const visiblePaginators = 7;
    const stepForNextPaginators = 4;

    //mutable
    let selectedRows = +select.value;

    let tablePages = 1;

    let paginators = []; //here are all paginators (buttons of pagination without '...')

    let currentIndexPaginator = 0;
    let startIndexPaginator = 0;
    let endIndexPaginator = visiblePaginators;

    const clearChildNodes = (parentNode) => {
      while (parentNode.hasChildNodes()) {
        parentNode.removeChild(parentNode.lastChild);
      }
    };

    const appendTableHeader = () => {
      table.appendChild(tableHeader);
    };

    const createTablePageData = (index) => {
      const tablePageData = tableData.slice(
        index * selectedRows,
        index * selectedRows + selectedRows
      );

      return tablePageData;
    };

    const showTableData = (tableData) => {
      const length =
        tableData.length > selectedRows ? selectedRows : tableData.length;

      for (let row = 0; row < length; row++) {
        const rowData = Object.values(tableData[row]);
        let tableRow = document.createElement("div");
        tableRow.className = "table-row row-elements";

        for (let column = 0; column < amountOfColumns; column++) {
          let cellElement = document.createElement("span");
          cellElement.textContent = `${rowData[column]}`;
          tableRow.appendChild(cellElement);
        }

        table.appendChild(tableRow);
      }
    };

    const createTable = (tableData) => {
      clearChildNodes(table);

      appendTableHeader();
      showTableData(tableData);
    };

    const setTableWithPagination = () => {
      createTable(tableData);

      showPagination();
      addPaginationActiveClass(0); //init 1st paginator (add active class)
    };

    /* --------------------------------- pagination --------------------------------- */

    const removePaginationActiveClass = () => {
      paginators.forEach((paginator) => {
        paginator.classList.remove("active");
      });
    };

    const addPaginationActiveClass = (index) => {
      paginators[index].classList.add("active");
    };

    const createPaginatorElement = (paginatorContent) => {
      const paginatorElement = document.createElement("a");
      paginatorElement.className = "paginator-item";
      paginatorElement.textContent = `${paginatorContent}`;

      paginators.push(paginatorElement);

      return paginatorElement;
    };

    const setAllPaginators = () => {
      paginators = [];
      tablePages = Math.ceil(tableData.length / selectedRows);

      for (let index = 0; index < tablePages; index++)
        createPaginatorElement(index + 1);
    };

    const showPagination = (startIndex = 0, endIndex = visiblePaginators) => {
      clearChildNodes(paginatorElementsContainer);
      setAllPaginators();

      if (paginators.length < visiblePaginators) endIndex = paginators.length;
      for (let index = startIndex; index < endIndex; index++)
        paginatorElementsContainer.appendChild(paginators[index]);

      selectTablePage(startIndex, endIndex);
    };

    const clickedOnLastPaginatorElement = (startIndex, index) => {
      if (
        index - startIndex + 1 === visiblePaginators &&
        index != tablePages - 1
      ) {
        startIndexPaginator += stepForNextPaginators;

        endIndexPaginator =
          endIndexPaginator + stepForNextPaginators > tablePages
            ? tablePages
            : endIndexPaginator + stepForNextPaginators;

        showPagination(startIndexPaginator, endIndexPaginator);
        addPaginationActiveClass(index, paginators);
      }
    };

    const clickedOnFirstPaginatorElement = (startIndex, index) => {
      if (index === startIndex && index != 0) {
        startIndexPaginator -=
          startIndexPaginator - stepForNextPaginators > 0
            ? stepForNextPaginators
            : startIndexPaginator; //move index to 0

        const amountOfPaginators = endIndexPaginator - startIndex;

        if (amountOfPaginators < visiblePaginators)
          endIndexPaginator =
            endIndexPaginator -
            (stepForNextPaginators - (visiblePaginators - amountOfPaginators));
        else if (tablePages - visiblePaginators < stepForNextPaginators)
          endIndexPaginator -= tablePages - visiblePaginators + 1;
        else endIndexPaginator -= stepForNextPaginators;

        showPagination(startIndexPaginator, endIndexPaginator);
        addPaginationActiveClass(index);
      }
    };

    const pageSelected = (startIndex, index) => {
      const tablePageData = createTablePageData(index);
      createTable(tablePageData);

      currentIndexPaginator = index;

      clickedOnLastPaginatorElement(startIndex, index);
      clickedOnFirstPaginatorElement(startIndex, index);

      removePaginationActiveClass();
      addPaginationActiveClass(index);
    };

    const selectTablePage = (startIndex, endIndex) => {
      for (let index = startIndex; index < endIndex; index++) {
        paginators[index].addEventListener("click", () => {
          currentIndexPaginator = index;

          pageSelected(startIndex, index);
        });
      }
    };

    const selectPreviousPage = () => {
      paginationPrevArrow.addEventListener("click", () => {
        if (currentIndexPaginator > 0) currentIndexPaginator--;
        pageSelected(startIndexPaginator, currentIndexPaginator);
      });
    };

    const selectNextPage = () => {
      paginationNextArrow.addEventListener("click", () => {
        if (currentIndexPaginator < tablePages - 1) currentIndexPaginator++;
        pageSelected(startIndexPaginator, currentIndexPaginator);
      });
    };

    const selectAmountOfRows = () => {
      select.addEventListener("change", (event) => {
        selectedRows = event.target.value;
        setTableWithPagination();

        currentIndexPaginator = 0;
        startIndexPaginator = 0;
        endIndexPaginator = visiblePaginators;
      });
    };

    setTableWithPagination();
    selectAmountOfRows();
    selectNextPage();
    selectPreviousPage();
  };

  getTableData();
};

export default setTable();
