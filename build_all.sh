#!/usr/bin/env bash
APP_NAME=GooglePlayMusicPlayer
ELECTRON_VERSION=0.28.3
./build_common.sh ${APP_NAME} darwin x64 ${ELECTRON_VERSION}
./build_common.sh ${APP_NAME} linux ia32 ${ELECTRON_VERSION}
