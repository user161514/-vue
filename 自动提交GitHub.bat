@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

title 自动提交 GitHub - vue-project

rem =====================================================
rem   一键提交并推送到 GitHub 脚本
rem   仓库: https://github.com/user161514/-vue   分支: dev
rem   本文件必须保存为 UTF-8（无 BOM）编码！
rem   （开头 chcp 65001 与文件编码配套，别只改一边）
rem =====================================================

cd /d "%~dp0"

echo ============================================
echo   自动提交并推送到 GitHub
echo ============================================
echo.

rem 让 git 状态输出里的中文文件名正常显示（仅影响本仓库显示）
git config core.quotepath false >nul 2>&1

rem 检查是否为 git 仓库
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo [错误] 当前目录不是 git 仓库！
    pause
    exit /b 1
)

echo [1/5] 当前工作区变更：
git status -s
echo.

rem 没有任何变更时，只同步远程代码然后退出
git status -s | findstr /r "." >nul 2>&1
if errorlevel 1 (
    echo [提示] 没有需要提交的变更，工作区是干净的。
    echo        顺便拉取一下远程最新代码...
    git pull origin dev
    pause
    exit /b 0
)

echo [2/5] 正在添加所有变更...
git add -A
if errorlevel 1 (
    echo [错误] git add 失败！
    pause
    exit /b 1
)

rem 用 PowerShell 生成时间戳，不受系统日期格式（周日 2026/09/27）影响
set "commitTime="
for /f "usebackq delims=" %%i in (`powershell -NoProfile -Command "Get-Date -Format 'yyyy-MM-dd HH:mm'"`) do set "commitTime=%%i"
if not defined commitTime set "commitTime=%date% %time:~0,5%"
set "commitMsg=自动提交 %commitTime%"

echo [3/5] 正在提交：!commitMsg!
git commit -m "!commitMsg!"
if errorlevel 1 (
    echo [错误] git commit 失败！
    pause
    exit /b 1
)

echo [4/5] 正在拉取远程更新并推送...
git pull --rebase origin dev
if errorlevel 1 (
    echo [错误] 同步远程失败！如有冲突，运行 git rebase --abort 可取消。
    pause
    exit /b 1
)
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
