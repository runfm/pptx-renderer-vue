class PptSlide {
  constructor(name, content) {
    this.name = name;
    this._content = content;
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/xml");
    debugger
  }
}

export class PptArchiveContent {
  constructor(zipData) {
    this._zip = zipData;
  }

  readContent = async () => {
    const slidesMap = {};

    this._zip
      .filter((path) => {
        return /ppt\/slides\/slide\d+\.xml/.test(path);
      })
      .forEach(({ name }) => {
        slidesMap[name] = this._zip.file(name).async("text");
      });

    const slidesPromises = Object.values(slidesMap);
    await Promise.allSettled(slidesPromises);

    for (name in slidesMap) {
      const xmlContent = await slidesMap[name];
      const pptSlide = new PptSlide(name, xmlContent);
      slidesMap[name] = pptSlide;
    }
  };
}
