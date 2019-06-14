#!/bin/sh

rm -rf build  # Remove previous build

tsc # Build ts files

cp -r src/views build/views   # Copy ejs files in the build directory
cp -r src/assets build/assets # Copy static files

