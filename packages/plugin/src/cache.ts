// Based on the `eslint-plugin-import`'s cache
// https://github.com/import-js/eslint-plugin-import/blob/main/utils/ModuleCache.js
import debugFactory from 'debug';

const log = debugFactory('graphql-eslint:ModuleCache');

export class ModuleCache<T, K = any> {
  map = new Map<K, { lastSeen: [number, number]; result: T }>();

  set(cacheKey: K, result: T): void {
    this.map.set(cacheKey, { lastSeen: process.hrtime(), result });
    log('setting entry for', cacheKey);
  }

  get(cacheKey, settings = { lifetime: 10 /* seconds */ }): void | T {
    if (!this.map.has(cacheKey)) {
      log('cache miss for', cacheKey);
      return;
    }
    const { lastSeen, result } = this.map.get(cacheKey);
    // check freshness
    if (
      process.env.NODE /* don't check for ESLint CLI */ ||
      process.hrtime(lastSeen)[0] < settings.lifetime
    ) {
      return result;
    }
  }
}