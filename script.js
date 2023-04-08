import LocalStorageHandler from "./modules/local-storage.js";
import DocsDetailsHandler from "./modules/docs-details-handler.js";

const tabBtns = document.querySelectorAll(".tab-btn");
const markdownTextarea = document.querySelector(".markdown-textarea");

class MarkdownPreviewer {
  static init() {
    markdownTextarea.value = LocalStorageHandler.getData();
    MarkdownPreviewer.displayCompiledHtml();
    DocsDetailsHandler.displayData();
    MarkdownPreviewer.clipBoardHandle();

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () =>
        MarkdownPreviewer.handleTabNavigation(btn)
      );
    });

    markdownTextarea.addEventListener(
      "keyup",
      debounce(() => {
        MarkdownPreviewer.displayCompiledHtml();
        LocalStorageHandler.setData(markdownTextarea.value);
      }, 1000)
    );

    //*****this is debounce technique************
    function debounce(callback, delay = 2000) {
      let time;
      return (...args) => {
        clearTimeout(time);
        time = setTimeout(() => {
          callback(...args);
        }, delay);
      };
    }
  }

  static handleTabNavigation(currentBtn) {
    const tabContainers = document.querySelectorAll(".tab-container");
    const currentContainer = document.querySelector(
      `.${currentBtn.dataset.tab}-tab-container`
    );
    console.log(currentBtn.classList.contains("active"));
    //this is throttle technique
    // to minimize unnecessary function invocations when using event listeners
    let isActive = false;

    if (currentBtn.classList.contains("active")) {
      isActive = true;
      return null;
    } else {
      isActive = false;
      tabContainers.forEach((container) => {
        container.classList.remove("active");
      });
      currentContainer.classList.add("active");

      tabBtns.forEach((btn) => {
        btn.classList.remove("active");
      });
      currentBtn.classList.add("active");
    }
  }

  static displayCompiledHtml() {
    const previewTabContainer = document.querySelector(
      ".preview-tab-container"
    );
    let htmlToBeRendered = "";
    if (markdownTextarea.value.trim().length === 0) {
      htmlToBeRendered = marked.parse(
        "Nothing to be rendered, try typing something in the Markdown tab."
      );
    } else {
      htmlToBeRendered = marked.parse(markdownTextarea.value);
    }
    previewTabContainer.innerHTML = htmlToBeRendered;

    (function displayFromUrl() {
      let textareaValue = document.querySelector(
        ".preview-tab-container p"
      ).innerText;
      const url = window.location.href;
      const searchParams = new URL(url).searchParams;
      const entries = new URLSearchParams(searchParams).values();
      const arrEntries = Array.from(entries);
      searchParams.append("value", JSON.stringify(textareaValue));
      console.log(searchParams.get("value"));
      document.querySelector(".markdown-textarea").innerHTML =
        searchParams.get("value");
      localStorage.setItem("markdown-content", searchParams.get("value"));
    })();
  }

  static clipBoardHandle() {
    const clipBoardBtn = document.getElementById("copy-btn");
    const url = window.location.href + "?";
    clipBoardBtn.addEventListener("click", () => {
      let textareaValue = document.querySelector(
        ".preview-tab-container p"
      ).innerText;
      const searchParams = new URLSearchParams({
        value: textareaValue,
      });
      const queryString = searchParams.toString();
      window.location.href = url + queryString;
    });
  }
}

MarkdownPreviewer.init();
