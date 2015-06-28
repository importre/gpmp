#!/usr/bin/env bash
if [ $2 == "win32" ]; then
  icon=""
else
  icon="assets/app.icns"
fi

electron-packager . \
  $1 \
  --out=build/$2-$3 \
  --prune \
  --asar \
  --platform=$2 \
  --arch=$3 \
  --version=$4 \
  --icon=$icon \
  --ignore=node_modules/electron-prebuilt \
  --ignore=node_modules/electron-packager \
  --ignore=.git \
  --ignore=build

tar cfz build/$1-$2-$3.tar.gz build/$2-$3