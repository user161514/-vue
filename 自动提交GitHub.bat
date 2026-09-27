@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

title 自动提交 GitHub - vue-project

rem =====================================================
rem   一键提交并推送到 GitHub 脚本
rem   仓库: https://github.com/user161514/-vue
rem   默认分支: dev
rem =====================================================

cd /d "%~dp0"

echo ============================================
echo   自动提交并推送到 GitHub
echo ============================================
echo.

rem 检查当前目录是否为 git 仓库
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo [错误] 当前目录不是 git 仓库！
    pause
    exit /b 1
)

rem 显示当前状态
echo [1/4] 当前工作区变更：
git status -s
echo.

rem 如果没有变更则提示并退出
git status -s | findstr /r "." >nul 2>&1
if errorlevel 1 (
    echo [提示] 没有需要提交的变更，工作区是干净的。
    echo        仍会尝试拉取远程最新代码...
    git pull origin dev 2>nul
    pause
    exit /b 0
)

rem 添加所有变更
echo [2/4] 正在添加所有变更...
git add -A
if errorlevel 1 (
    echo [错误] git add 失败！
    pause
    exit /b 1
)

rem 提交（提交信息自动带上日期时间）
set commitMsg=自动提交 %date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,2%:%time:~3,2%
echo [3/4] 正在提交：!commitMsg!
git commit -m "!commitMsg!"
if errorlevel 1 (
    echo [错误] git commit 失败！
    pause
    exit /b 1
)

rem 推送到远程 dev 分支
echo [4/4] 正在推送到远程 dev 分支...
git push origin dev
if errorlevel 1 (
    echo [错误] 推送失败！请检查网络或远程仓库配置。
    pause
    exit /b 1
)

echo.
echo ============================================
echo   提交并推送成功！
echo ============================================
pause
