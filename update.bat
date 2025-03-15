@echo off
cd /d "%~dp0"
echo Check Patch-Note

:: Lưu trạng thái commit hiện tại, nếu file chưa tồn tại thì tạo mới
if not exist old_commit.txt (
    git rev-parse HEAD > old_commit.txt
)

:: Kiểm tra commit mới nhất trên remote
git fetch origin main
git rev-parse origin/main > new_commit.txt

:: So sánh commit cũ và mới
fc old_commit.txt new_commit.txt > nul
IF %ERRORLEVEL% EQU 0 (
    echo Khong co update moi
    del new_commit.txt
    pause
    exit /b
)

echo co ban cap nhat moi . Yes hoac No? (Y/N)
set /p choice=
if /i "%choice%"=="Y" (
    git pull origin main
    IF %ERRORLEVEL% NEQ 0 (
        echo Da xay ra loi.
        pause
        exit /b
    )
    echo Cập nhật hoàn tất!
    git rev-parse HEAD > old_commit.txt
) else (
    echo Hủy cập nhật.
)

:: Xóa file tạm
del new_commit.txt

pause
