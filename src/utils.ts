
import GraphemeSplitter = require('grapheme-splitter')
 
import { Emoji } from './types';

const splitter = new GraphemeSplitter();


export const mightRenderAsMultiple = (unicodeSequence: string) => {
  const emoji = charFromUtf16(unicodeSequence);
  if (splitter.countGraphemes(emoji) > 1) {
    return true; // Skip emojis that render as multiple graphemes
  }

  return false;
};

const charFromUtf16 = (utf16: string) =>
  String.fromCodePoint(...utf16.split('-').map((u) => parseInt(u, 16)));

export const charFromEmojiObject = (obj: Emoji) => charFromUtf16(obj.unified);

const emojiCache = new Map<string, string>();

export const charFromEmojiString = (unified: string): string => {
  if (emojiCache.has(unified)) {
    return emojiCache.get(unified)!;
  }
  const result = charFromUtf16(unified);
  emojiCache.set(unified, result);
  return result;
};

export function deepMerge<T extends Record<string, any>, S extends Record<string, any>>(target: T, source: S): T & S {
  const output: any = { ...target };
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (
        source[key] &&
        typeof source[key] === 'object' &&
        !Array.isArray(source[key])
      ) {
        output[key] = deepMerge(
          target[key] && typeof target[key] === 'object' ? target[key] : {},
          source[key]
        );
      } else {
        output[key] = source[key];
      }
    }
  }
  return output;
}

export function throttle<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let lastCall: number = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;

  return function (...args: Parameters<T>): void {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    lastArgs = args;

    if (timeSinceLastCall >= delay) {
      lastCall = now;
      func(...(lastArgs ?? undefined));
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        func(...(lastArgs ?? []));
        timeoutId = null;
      }, delay - timeSinceLastCall);
    }
  };
}