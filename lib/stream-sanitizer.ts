/**
 * lib/stream-sanitizer.ts
 * StreamTagSanitizer buffers potential unclosed HTML tags across stream chunk boundaries
 * to prevent XSS injection via split tags (e.g. "<scr" + "ipt>").
 */
export class StreamTagSanitizer {
  private buffer = '';

  processChunk(chunk: string): string {
    const combined = this.buffer + chunk;
    const lastOpen = combined.lastIndexOf('<');
    const lastClose = combined.lastIndexOf('>');

    if (lastOpen > lastClose) {
      const safePrefix = combined.slice(0, lastOpen);
      this.buffer = combined.slice(lastOpen);
      return safePrefix.replace(/<[^>]*>/g, '');
    } else {
      this.buffer = '';
      return combined.replace(/<[^>]*>/g, '');
    }
  }

  flush(): string {
    const remaining = this.buffer;
    this.buffer = '';
    return remaining.replace(/<[^>]*>/g, '');
  }
}
