<template>
  <div class="button-demo">
    <div class="demo-section">
      <div class="section-title">基础用法</div>
      <div class="button-group">
        <YButton>默认按钮</YButton>
        <YButton type="primary">主要按钮</YButton>
        <YButton type="success">成功按钮</YButton>
        <YButton type="warning">警告按钮</YButton>
        <YButton type="danger">危险按钮</YButton>
        <YButton type="info">信息按钮</YButton>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">镂空按钮</div>
      <div class="button-group">
        <YButton plain>默认按钮</YButton>
        <YButton type="primary" plain>主要按钮</YButton>
        <YButton type="success" plain>成功按钮</YButton>
        <YButton type="warning" plain>警告按钮</YButton>
        <YButton type="danger" plain>危险按钮</YButton>
        <YButton type="info" plain>信息按钮</YButton>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">按钮尺寸</div>
      <div class="button-group">
        <YButton size="large" type="primary">大号按钮</YButton>
        <YButton type="primary">默认按钮</YButton>
        <YButton size="mini" type="primary">小号按钮</YButton>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">圆角按钮</div>
      <div class="button-group">
        <YButton round>默认按钮</YButton>
        <YButton type="primary" round>主要按钮</YButton>
        <YButton type="success" round plain>成功按钮</YButton>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">圆形按钮</div>
      <div class="button-group">
        <YButton circle icon="uni-icons-add"></YButton>
        <YButton type="primary" circle icon="uni-icons-search"></YButton>
        <YButton type="danger" circle icon="uni-icons-trash"></YButton>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">禁用状态</div>
      <div class="button-group">
        <YButton disabled>默认按钮</YButton>
        <YButton type="primary" disabled>主要按钮</YButton>
        <YButton type="success" disabled plain>成功按钮</YButton>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">加载状态</div>
      <div class="button-group">
        <YButton loading>加载中</YButton>
        <YButton type="primary" loading loading-text="提交中">提交</YButton>
        <YButton type="success" loading plain>加载中</YButton>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">块级按钮</div>
      <div class="button-group">
        <YButton type="primary" block>块级按钮</YButton>
        <YButton type="success" block plain>块级按钮</YButton>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">自定义颜色</div>
      <div class="button-group">
        <YButton bg-color="#7232dd" text-color="#fff">自定义颜色</YButton>
        <YButton bg-color="#ff6034" text-color="#fff" plain>自定义颜色</YButton>
        <YButton border-color="#7232dd" text-color="#7232dd" plain>自定义边框</YButton>
      </div>
    </div>

    <div class="demo-section">
      <div class="section-title">点击事件</div>
      <div class="button-group">
        <YButton type="primary" @click="handleClick">点击我</YButton>
        <YButton type="success" :throttle="1000" @click="handleThrottleClick">节流按钮(1s)</YButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { YButton } from '@you-uniapp/ui-core'

const handleClick = () => {
  alert('按钮被点击了！')
}

const handleThrottleClick = () => {
  alert('节流按钮被点击！')
}
</script>

<style lang="scss" scoped>
.button-demo {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.demo-section {
  margin-bottom: 30px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;

  .y-button {
    margin: 0;
  }

  // 块级按钮单独一行
  .y-button--block {
    width: 100%;
    margin-bottom: 12px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>