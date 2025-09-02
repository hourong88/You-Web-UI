/**
 * 屏幕适配工具函数
 * 基于750rpx设计稿标准的rpx适配机制
 */

/**
 * 获取当前设备的屏幕宽度 (px)
 * 通常在应用启动时获取一次并缓存即可，因为设备宽度不会改变
 */
let _windowWidth: number | null = null;

export function getWindowWidth(): number {
  if (_windowWidth === null) {
    try {
      // 在UniApp环境中使用uni.getSystemInfoSync()
      const uniGlobal = (globalThis as any).uni || (window as any).uni;
      if (uniGlobal && uniGlobal.getSystemInfoSync) {
        _windowWidth = uniGlobal.getSystemInfoSync().windowWidth;
      } else {
        // 在H5环境中使用window.innerWidth
        _windowWidth = window.innerWidth || document.documentElement.clientWidth || 375;
      }
    } catch (error) {
      console.warn('Failed to get window width, using default 375px', error);
      _windowWidth = 375;
    }
  }
  return _windowWidth as number;
}

/**
 * 将 rpx 值转换为当前设备的 px 值
 * @param rpxValue - 需要转换的 rpx 值
 * @returns 转换后的 px 值
 */
export function rpx2px(rpxValue: number): number {
  try {
    // 优先使用UniApp官方提供的转换API
    const uniGlobal = (globalThis as any).uni || (window as any).uni;
    if (uniGlobal && uniGlobal.upx2px) {
      return uniGlobal.upx2px(rpxValue);
    }
    
    // 手动实现转换逻辑
    const currentWindowWidth = getWindowWidth();
    return (rpxValue / 750) * currentWindowWidth;
  } catch (error) {
    console.warn('Failed to convert rpx to px, using fallback calculation', error);
    const currentWindowWidth = getWindowWidth();
    return (rpxValue / 750) * currentWindowWidth;
  }
}

/**
 * 将 px 值转换为 rpx 值 (如果需要反向转换)
 * @param pxValue - 需要转换的 px 值
 * @returns 转换后的 rpx 值
 */
export function px2rpx(pxValue: number): number {
  const currentWindowWidth = getWindowWidth();
  if (currentWindowWidth === 0) {
    console.warn('getWindowWidth returned 0, cannot convert px to rpx.');
    return 0;
  }
  return (pxValue / currentWindowWidth) * 750;
}

/**
 * 获取设备信息
 * @returns 设备信息对象
 */
export function getSystemInfo() {
  try {
    const uniGlobal = (globalThis as any).uni || (window as any).uni;
    if (uniGlobal && uniGlobal.getSystemInfoSync) {
      return uniGlobal.getSystemInfoSync();
    } else {
      // H5环境下的模拟设备信息
      return {
        windowWidth: getWindowWidth(),
        windowHeight: window.innerHeight || document.documentElement.clientHeight || 667,
        platform: 'h5',
        pixelRatio: window.devicePixelRatio || 1
      };
    }
  } catch (error) {
    console.warn('Failed to get system info', error);
    return {
      windowWidth: 375,
      windowHeight: 667,
      platform: 'unknown',
      pixelRatio: 1
    };
  }
}

/**
 * 重置缓存的窗口宽度（在屏幕旋转等场景下可能需要）
 */
export function resetWindowWidth(): void {
  _windowWidth = null;
}