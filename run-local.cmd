@echo off
cd /d "%~dp0"
set EXPO_OFFLINE=1
npm.cmd run web > expo-web.out.log 2> expo-web.err.log
