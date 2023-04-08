import { encodeHtmlEntities } from "./helper-functions.js";

class DocsDetailsHandler {
  static async getDataFromAPI() {
    const response = await fetch("./data.json");
    const JSON_RESPONSE = await response.json();

    return JSON_RESPONSE;
  }

  static async displayData() {
    const docsTabContainer = document.querySelector(".docs-tab-container");
    const docsDetails = await DocsDetailsHandler.getDataFromAPI();
    let htmlContentToRender = "";
    docsDetails.basic_syntax.forEach((concept) => {
      htmlContentToRender += `
                <div>
                    <h2>${encodeHtmlEntities(concept.name)}</h2>
                    <p>${encodeHtmlEntities(concept.description)}</p>
                    ${concept.examples
                      .map(
                        (example, index) => `
                            <div class="example-container">
                                <p class="example-heading">Example ${
                                  index + 1
                                }:</p>
                                <p class="code-title">- markdown</p>
                                <code>${encodeHtmlEntities(
                                  example.markdown
                                )}</code>
                                <p class="code-title">- html</p>
                                <code>${encodeHtmlEntities(example.html)}</code>
                            </div>
                        `
                      )
                      .join("")}
                    ${concept.additional_examples
                      .map(
                        (example) => `
                            <div class="example-container">
                                <p class="example-heading">${encodeHtmlEntities(
                                  example.name
                                )}</p>
                                <p>${encodeHtmlEntities(
                                  example.description
                                )}</p>
                                <p class="code-title">- markdown</p>
                                <code>${encodeHtmlEntities(
                                  example.markdown
                                )}</code>
                                <p class="code-title">- html</p>
                                <code>${encodeHtmlEntities(example.html)}</code>
                            </div>
                        `
                      )
                      .join("")}
                </div>
            `;
    });
    docsTabContainer.innerHTML = htmlContentToRender;
  }
}

export default DocsDetailsHandler;
