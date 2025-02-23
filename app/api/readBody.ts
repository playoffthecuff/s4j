export async function readBody(request: Request): Promise<string> {
  const chunks: Uint8Array[] = [];
  const reader = request.body?.getReader();

  if (reader) {
    let done = false;
    while (!done) {
      const { done: doneReading, value } = await reader.read();
      if (value) {
        chunks.push(value);
      }
      done = doneReading;
    }
  }

  return Buffer.concat(chunks).toString("utf8");
}
