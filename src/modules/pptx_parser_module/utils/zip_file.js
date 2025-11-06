import JSZip from "jszip";
import { PptArchiveContent } from "../types/PptArchive/ppt_archive.js";

export const readZipFile = async (file) => {
  const zip = await JSZip.loadAsync(file);
  const pptData = new PptArchiveContent(zip)
  await pptData.readContent()
};
