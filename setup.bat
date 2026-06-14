@echo off
chcp 65001 >nul
echo === GameDev News - 环境搭建 ===
echo.

:: 检查 Node.js
where node >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [错误] 未找到 Node.js，请先安装 Node.js ^>= 20
    pause
    exit /b 1
)
node -v

:: 安装依赖
echo.
echo [1/3] 安装依赖...
call npm install
if %ERRORLEVEL% neq 0 (
    echo [错误] npm install 失败
    pause
    exit /b 1
)
echo 完成

:: 抓取数据
echo.
echo [2/3] 抓取数据（20 个数据源）...
call npx tsx scripts/fetch-all.ts
echo 完成

:: 构建前端
echo.
echo [3/3] 构建前端...
call npm run build
echo 完成

:: 完成
echo.
echo ========================================
echo  搭建完成!
echo.
echo  本地预览: npm run dev
echo  重新抓取: npm run fetch
echo  重新构建: npm run build
echo ========================================

pause
