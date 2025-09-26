export const NS = {
  p: "http://schemas.openxmlformats.org/presentationml/2006/main",
  a: "http://schemas.openxmlformats.org/drawingml/2006/main",
  r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
};

export const getNsResolver = (prefix) => {
  return NS[prefix] || null;
};

export const xpathSelector = (query, xmlDoc, root) => {
  const contextNode = root ?? xmlDoc;
  const result = xmlDoc.evaluate(
    query,
    contextNode,
    getNsResolver,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  return result.singleNodeValue;
};

export const extractPictureRestrictions = (node) => {
  const result = {
    canGroup: node?.getAttribute("noGrp") !== "1",
    canChangeAspect: node?.getAttribute("noChangeAspect") !== "1",
    canRotate: node?.getAttribute("noRot") !== "1",
    canSelect: node?.getAttribute("noSelect") !== "1",
    canMove: node?.getAttribute("noMove") !== "1",
    canResize: node?.getAttribute("noResize") !== "1",
  };

  return result;
};
