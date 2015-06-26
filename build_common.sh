#!/usr/bin/env bash
electron-packager . \
  $1 \
  --out=build/$2-$3 \
  --prune \
  --asar \
  --platform=$2 \
  --arch=$3 \
  --version=$4 \
  --icon=assets/app.icns \
  --ignore=node_modules/electron-prebuilt \
  --ignore=node_modules/electron-packager \
  --ignore=.git \
  --ignore=build

tar cfz build/$1-$2-$3.tar.gz build/$2-$3