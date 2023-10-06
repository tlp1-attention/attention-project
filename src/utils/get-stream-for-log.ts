import { createWriteStream } from "fs";
import { mkdir, stat, writeFile } from "fs/promises";
import { join } from "path";

const streams = {};

const getFormattedDate = (date: Date) => {
  // Date format: YYYY-mm-dd
  return date.toISOString().slice(0, 10);
};

export async function getStreamForLogFile(logFolder: string, suffix: string) {
  const date = getFormattedDate(new Date());
  const dir = join(logFolder, `${suffix}`);

  await mkdir(dir, {
    // Create `logs` if it does not exist,
    // and do not fail if the desired directory 
    // already exists
    recursive: true,
  });

  const lastStream = streams[suffix];
  const filepath = join(dir, `${date}-${suffix}.log`);

  try {
    const _stats = await stat(filepath);

    if (lastStream) return lastStream;
  } catch (err) {
    if (err.code == "ENOENT") {
      await writeFile(filepath, "");
    } else {
      throw new Error("Error inesperado al generar archivo de logs");
    }
  }

  streams[suffix] = createWriteStream(filepath, {
    flags: "a",
  });

  return streams[suffix];
}
