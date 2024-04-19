/**
 * @description 获取路径
 * @param pathStr {string} 路径字符串
 */
const pathFormatter = (pathStr: string) => {
  const i = pathStr.lastIndexOf('/');
  return pathStr.slice(i + 1);
};
/**
 * @description 获取同步资源映射
 * @param assetMap import.meta.glob('./images/*.png', {eager: true})
 * @param formatter (key: string) => string
 * @example const map = getAssetSyncURLMap(import.meta.glob('./images/*.png', {eager: true}) )
 */
export const getAssetSyncURLMap = (assetMap: unknown, formatter = pathFormatter) => {
  if (!assetMap) return {};
  const map = {} as Record<string, string>;
  for (const k in assetMap as Record<string, unknown>) {
    if (Object.prototype.hasOwnProperty.call(assetMap, k)) {
      const v = assetMap[k];
      const _k = formatter ? formatter(k) : k;
      map[_k] = new URL(v.default || v, import.meta.url).href; // 一般情况使用v.default
    }
  }

  return map;
};