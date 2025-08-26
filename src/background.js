const api = typeof browser !== "undefined" ? browser : chrome;

api.action.onClicked.addListener(() => {
  api.tabs.create({ url: "https://grok.com" });
});
