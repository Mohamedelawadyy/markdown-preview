const encodeHtmlEntities = (htmlContent) => {
  const encodedStr = htmlContent.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
    return `&#${i.charCodeAt(0)};`;
  });

  return encodedStr;
};

export { encodeHtmlEntities };
