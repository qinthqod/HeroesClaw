#!/bin/bash
# HeroesClaw 管理脚本

cd "$(dirname "$0")"

case "$1" in
    start)
        echo "🚀 启动 HeroesClaw 服务器..."
        cd server
        uvicorn server:app --host 0.0.0.0 --port 8000
        ;;
    docker-build)
        echo "🐳 构建 Docker 镜像..."
        cd server
        docker build -t heroesclaw .
        ;;
    docker-run)
        echo "🐳 运行 Docker 容器..."
        docker run -d -p 8000:8000 --name heroesclaw heroesclaw
        ;;
    generate-code)
        echo "📝 生成验证码..."
        curl -X POST "http://localhost:8000/api/codes/generate?created_by=admin"
        echo ""
        ;;
    *)
        echo "用法: $0 {start|docker-build|docker-run|generate-code}"
        echo ""
        echo "命令说明:"
        echo "  start          - 启动开发服务器"
        echo "  docker-build   - 构建 Docker 镜像"
        echo "  docker-run     - 运行 Docker 容器"
        echo "  generate-code - 生成验证码"
        exit 1
        ;;
esac
