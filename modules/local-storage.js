class LocalStorageHandler {
  static getData() {
    const storedData = localStorage.getItem("markdown-content");
    if (storedData) {
      return storedData;
    }

    return "";
  }

  static setData(data) {
    localStorage.setItem("markdown-content", data);
  }
}

export default LocalStorageHandler;
