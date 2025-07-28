@echo off
echo Deploying Star Wars project fixes...
git add .
git commit -m "Fix: Firebase errors, font loading, and Vercel deployment issues"
git push origin main
echo Deployment pushed to repository. Vercel will auto-deploy.
pause