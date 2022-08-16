const state = {
  lang: null,
  time: null,
};

export default {
  setLang: (lang) => (state.lang = lang),
  getLang: () => state.lang,
  defaultScale: 1,
  resetState: () => (state = { lang: null, time: null }),
  setTime: (time) => (state.time = time),
  getTime: () => state.time,
  getSS: () => state.time.split(":")[1],
};
