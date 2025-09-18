// useDevice Hook - 设备判断工具
import { ref, onUnmounted, computed } from 'vue'
import type { DeviceInfo } from '../types'
import { safeExecute, ErrorType, ErrorLevel } from './errorHandler'

// 声明 uni 全局变量
declare const uni: any

/**
 * 设备判断 Hook
 * 用于智能组件根据设备类型选择合适的视图组件
 */
export function useDevice(): DeviceInfo {
  const platform = ref<'h5' | 'app' | 'mp-weixin' | 'mp-alipay' | 'unknown'>('unknown')
  const screenWidth = ref(0)

  const initDeviceInfo = () => {
    // UniApp 平台判断
    // #ifdef H5
    platform.value = 'h5'
    // #endif
    // #ifdef APP-PLUS
    platform.value = 'app'
    // #endif
    // #ifdef MP-WEIXIN
    platform.value = 'mp-weixin'
    // #endif
    // #ifdef MP-ALIPAY
    platform.value = 'mp-alipay'
    // #endif

    // 获取屏幕宽度
    screenWidth.value = safeExecute(
      () => {
        // UniApp 环境
        if (typeof uni !== 'undefined') {
          const systemInfo = uni.getSystemInfoSync()
          return systemInfo.windowWidth || systemInfo.screenWidth || 375
        }
        // H5 环境
        else if (typeof window !== 'undefined') {
          const width = window.innerWidth

          const handleResize = () => {
            screenWidth.value = window.innerWidth
          }

          // 监听窗口大小变化
          window.addEventListener('resize', handleResize)

          // 组件卸载时移除监听
          onUnmounted(() => {
            window.removeEventListener('resize', handleResize)
          })

          return width
        }
        return 375
      },
      375,
      {
        type: ErrorType.PLATFORM,
        level: ErrorLevel.WARN,
        message: '获取设备信息失败'
      }
    )
  }

  // 立即初始化
  initDeviceInfo()

  // 计算设备类型
  const isMobile = computed(() => {
    // 小于 768px 宽度为移动端，或者通过 UniApp 平台判断
    return screenWidth.value < 768 || ['app', 'mp-weixin', 'mp-alipay'].includes(platform.value)
  })

  const isPC = computed(() => {
    // PC 仅在 H5 环境中且屏幕宽度大于等于 768px
    return !isMobile.value && platform.value === 'h5'
  })

  const isH5 = computed(() => platform.value === 'h5')
  const isApp = computed(() => platform.value === 'app')
  const isMiniProgram = computed(() => ['mp-weixin', 'mp-alipay'].includes(platform.value))

  return {
    isMobile: isMobile.value,
    isPC: isPC.value,
    isH5: isH5.value,
    isApp: isApp.value,
    isMiniProgram: isMiniProgram.value,
    platform: platform.value,
    screenWidth: screenWidth.value
  }
}