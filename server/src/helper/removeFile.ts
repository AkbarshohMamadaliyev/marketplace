import fs from "fs";
import path from "path";

export const removeFile = async (filename: string) => {
  try {
    if (!filename) return;
    const filePath = path.join(__dirname, "../public/files", filename);
    if (fs.existsSync(filePath)) {
      await fs.unlinkSync(filePath);
    } else {
      console.log(`File not found: ${filename}`);
    }
  } catch (error) {
    console.error(`Error deleting file: ${error}`);
  }
};
