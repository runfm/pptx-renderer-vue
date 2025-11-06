import {
  xpathSelector,
  NS,
  extractPictureRestrictions,
} from "@/modules/pptx_parser_module/utils/xpath.js";

class PptPicture {
  constructor(picNode) {
    const doc = picNode.ownerDocument;
    const locsNode = xpathSelector(
      "./p:nvPicPr/p:cNvPicPr/a:picLocks",
      doc,
      picNode
    );
    this.restrictions = extractPictureRestrictions(locsNode);
    const propsNode = xpathSelector("./p:nvPicPr/p:cNvPr", doc, picNode);
    this.props = {
      id: propsNode?.getAttribute("id"),
      name: propsNode?.getAttribute("name"),
    };
    debugger;
  }
}

class PptSlide {
  constructor(name, content) {
    this.name = name;
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/xml");
    const root = xpathSelector("//p:sld/p:cSld/p:spTree", doc);
    const picNodes = root.getElementsByTagNameNS(NS.p, "pic");
    this._doc = doc;
    this._treeRoot = root;
    debugger;
    this.pictures = Array.from(picNodes).map((item) => new PptPicture(item));
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
