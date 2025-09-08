<template>
  <div class="demo-page-container">
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">工具函数演示</text>
    </view>
    <div class="demo-section">
      <div class="section-title">rpx2px 转换</div>
        <div class="demo-item">
          <p class="demo-desc">将rpx值转换为px值</p>
          <div class="conversion-demo">
            <div class="input-group">
              <label>输入rpx值:</label>
              <input v-model.number="rpxValue" type="number" placeholder="请输入rpx值" />
            </div>
            <div class="result">
              <span>转换结果: {{ convertedPx }}px</span>
            </div>
          </div>
        </div>
      </div>
      
    <div class="demo-section">
      <div class="section-title">px2rpx 转换</div>
        <div class="demo-item">
          <p class="demo-desc">将px值转换为rpx值</p>
          <div class="conversion-demo">
            <div class="input-group">
              <label>输入px值:</label>
              <input v-model.number="pxValue" type="number" placeholder="请输入px值" />
            </div>
            <div class="result">
              <span>转换结果: {{ convertedRpx }}rpx</span>
            </div>
          </div>
        </div>
      </div>
      
    <div class="demo-section">
      <div class="section-title">设备信息</div>
        <div class="demo-item">
          <div class="device-info">
            <p><strong>屏幕宽度:</strong> {{ deviceInfo.windowWidth }}px</p>
            <p><strong>屏幕高度:</strong> {{ deviceInfo.windowHeight }}px</p>
            <p><strong>平台:</strong> {{ deviceInfo.platform }}</p>
            <p><strong>像素比:</strong> {{ deviceInfo.pixelRatio }}</p>
          </div>
        </div>
      </div>
      
    <div class="demo-section">
      <div class="section-title">实际效果演示</div>
        <div class="demo-item">
          <p class="demo-desc">下面的方块使用rpx单位，会根据屏幕宽度自动适配</p>
          <div class="rpx-demo-box">
            <div class="box" :style="{ width: '200rpx', height: '200rpx' }">
              200rpx × 200rpx
            </div>
            <div class="box" :style="{ width: convertedPx + 'px', height: convertedPx + 'px' }">
              {{ convertedPx }}px × {{ convertedPx }}px
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { rpx2px, px2rpx, getSystemInfo } from '@you-uniapp/ui-core'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

// 响应式数据
const rpxValue = ref(200)
const pxValue = ref(100)
const deviceInfo = ref({
  windowWidth: 0,
  windowHeight: 0,
  platform: 'unknown',
  pixelRatio: 1
})

// 计算属性
const convertedPx = computed(() => {
  return Math.round(rpx2px(rpxValue.value))
})

const convertedRpx = computed(() => {
  return Math.round(px2rpx(pxValue.value))
})

// 生命周期
onMounted(() => {
  deviceInfo.value = getSystemInfo()
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
@import '../../styles/common.scss';



.demo-item {
  background: white;
  border-radius: $border-radius-md;
  padding: $spacing-xl;
  margin-bottom: $spacing-base;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border: $border-width-thin solid #eee;
  
  .demo-desc {
    margin-bottom: $spacing-base;
    font-size: $font-size-base;
    color: #666;
    padding: $spacing-sm $spacing-base;
    background: #f8f9fa;
    border-radius: $border-radius-sm;
    border-left: 6rpx solid #28a745;
  }
}

.conversion-demo {
  .input-group {
    display: flex;
    align-items: center;
    margin-bottom: $spacing-base;
    gap: $spacing-sm;
    
    label {
      font-size: $font-size-base;
      color: #333;
      min-width: 120rpx;
    }
    
    input {
      flex: 1;
      padding: $spacing-sm $spacing-base;
      border: $border-width-thin solid #ddd;
      border-radius: $border-radius-sm;
      font-size: $font-size-base;
      
      &:focus {
        outline: none;
        border-color: #007aff;
      }
    }
  }
  
  .result {
    padding: $spacing-base;
    background: #e3f2fd;
    border-radius: $border-radius-sm;
    border-left: 6rpx solid #2196f3;
    
    span {
      font-size: $font-size-base;
      color: #1976d2;
      font-weight: 500;
    }
  }
}

.device-info {
  p {
    margin: $spacing-sm 0;
    font-size: $font-size-base;
    color: #333;
    
    strong {
      color: #007aff;
    }
  }
}

.rpx-demo-box {
  display: flex;
  gap: $spacing-base;
  flex-wrap: wrap;
  
  .box {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $border-radius-sm;
    font-size: $font-size-sm;
    font-weight: 500;
    text-align: center;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
  }
}


</style>