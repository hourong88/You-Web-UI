<template>
  <div class="container">
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">YInput 输入框组件</text>
    </view>
    <div class="header">
      <h1 class="title">Input 输入框</h1>
      <p class="subtitle">用于接收用户输入的文本内容</p>
    </div>

    <div class="content">
      <!-- 基础用法 -->
      <div class="demo-section">
        <div class="section-title">基础用法</div>
        <div class="demo-item">
          <YInput placeholder="请输入姓名" v-model="basicValue" />
          <YInput placeholder="请输入手机号" v-model="basicValue" />
        </div>
      </div>

      <!-- 带标题 -->
      <div class="demo-section">
        <div class="section-title">带标题</div>
        <div class="demo-item">
          <YInput label="姓名" placeholder="请输入姓名" v-model="nameValue" />
          <YInput label="手机号" placeholder="请输入手机号" v-model="phoneValue" />
          <YInput label="邮箱" placeholder="请输入邮箱" v-model="emailValue" />
        </div>
      </div>

      <!-- 必填标识 -->
      <div class="demo-section">
        <div class="section-title">必填标识</div>
        <div class="demo-item">
          <YInput label="联系电话" placeholder="请输入手机号" :required="true" v-model="phoneValue" />
        </div>
      </div>

      <!-- 可清除 -->
      <div class="demo-section">
        <div class="section-title">可清除</div>
        <div class="demo-item">
          <YInput label="地址" placeholder="请输入地址" :clearable="true" v-model="addressValue" />
        </div>
      </div>

      <!-- 密码输入 -->
      <div class="demo-section">
        <div class="section-title">密码输入</div>
        <div class="demo-item">
          <YInput label="密码" placeholder="请输入密码" :password="true" :clearable="true" v-model="passwordValue" />
        </div>
      </div>

      <!-- 禁用状态 -->
      <div class="demo-section">
        <div class="section-title">禁用状态</div>
        <div class="demo-item">
          <YInput label="用户名" placeholder="张三" :disabled="true" v-model="disabledValue" />
        </div>
      </div>

      <!-- 数字输入 -->
      <div class="demo-section">
        <div class="section-title">数字输入</div>
        <div class="demo-item">
          <YInput label="年龄" placeholder="请输入年龄" type="number" :min="0" :max="120" v-model="ageValue" />
        </div>
      </div>

      <!-- 自定义样式 -->
      <div class="demo-section">
        <div class="section-title">自定义样式</div>
        <div class="demo-item">
          <YInput label="备注" placeholder="请输入备注信息" :input-border="true" :is-fillet="true" background-color="#f8f9fa"
            border-color="#007aff" v-model="remarkValue" />
        </div>
      </div>

      <!-- 右对齐 -->
      <div class="demo-section">
        <div class="section-title">右对齐</div>
        <div class="demo-item">
          <YInput label="金额" placeholder="0.00" type="digit" :text-right="true" v-model="amountValue" />
        </div>
      </div>

      <!-- 字符限制 -->
      <div class="demo-section">
        <div class="section-title">字符限制</div>
        <div class="demo-item">
          <YInput label="简介" placeholder="请输入个人简介" :maxlength="50" :clearable="true" v-model="introValue" />
          <p class="demo-desc">已输入 {{ introValue.length }}/50 字符</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { YInput } from '@you-uniapp/ui-core'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

// 响应式数据
const basicValue = ref('')
const nameValue = ref('')
const phoneValue = ref('')
const addressValue = ref('')
const passwordValue = ref('')
const disabledValue = ref('张三')
const ageValue = ref('')
const remarkValue = ref('')
const amountValue = ref('')
const introValue = ref('')
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
@import '../../styles/common.scss';

.container {
  padding: 40rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
  max-width: 1600rpx;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 60rpx;
  padding: 40rpx 0;
  background: white;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);

  .title {
    font-size: 48rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 16rpx;
  }

  .subtitle {
    font-size: 28rpx;
    color: #666;
    margin: 0;
  }
}


</style>
