@echo off
echo ========================================================
echo Starting Portfolio Ecosystem (Backend + Frontend + CMS)
echo ========================================================

start "Portfolio Backend & CMS (:5000)" cmd /k "cd backend && npm start"
timeout /t 2 /nobreak > nul
start "Portfolio Frontend Client (:5173)" cmd /k "cd frontend && npm run dev"

echo.
echo Services launched!
echo Public Portfolio: http://localhost:5173
echo CMS Admin Panel:  http://localhost:5000/admin (admin / admin123)
echo REST API:         http://localhost:5000/api/v1
echo ========================================================
pause
