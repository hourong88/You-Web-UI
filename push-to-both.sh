#!/bin/bash

# 双仓库推送脚本
# 使用方法: ./push-to-both.sh "提交信息"

set -e

# 检查是否提供了提交信息
if [ -z "$1" ]; then
    echo "错误: 请提供提交信息"
    echo "使用方法: ./push-to-both.sh \"提交信息\""
    exit 1
fi

COMMIT_MESSAGE="$1"

echo "🚀 开始双仓库推送流程..."
echo "提交信息: $COMMIT_MESSAGE"
echo ""

# 添加所有更改
echo "📝 添加所有更改..."
git add .

# 检查是否有更改
if git diff --cached --quiet; then
    echo "⚠️  没有检测到更改，退出推送流程"
    exit 0
fi

# 提交更改
echo "💾 提交更改..."
git commit -m "$COMMIT_MESSAGE"

# 推送到GitHub
echo "🐙 推送到 GitHub..."
if git push origin master; then
    echo "✅ GitHub 推送成功"
else
    echo "❌ GitHub 推送失败"
    exit 1
fi

# 推送到Gitee
echo "🦄 推送到 Gitee..."
if git push gitee master; then
    echo "✅ Gitee 推送成功"
else
    echo "⚠️  Gitee 推送失败，可能需要配置身份验证"
    echo "请检查 SSH 密钥或访问令牌配置"
    exit 1
fi

echo ""
echo "🎉 双仓库推送完成！"
echo "GitHub: https://github.com/hourong88/You-Web-UI"
echo "Gitee: https://gitee.com/yoyo88/You-Web"