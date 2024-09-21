#!/bin/bash

VERSION=$(grep 'version:' seec.config | awk '{print $2}')

echo "Bumping package.json version to $VERSION"
sed -i -E "s/\"version\": \"[^\"]+\"/\"version\": \"$VERSION\"/" ./frontend/package.json

echo "Bumping pom.xml version to $VERSION"
sed -i -E "s/<version>[0-9]+\.[0-9]+\.[0-9]+-SNAPSHOT<\/version>/<version>${VERSION}-SNAPSHOT<\/version>/" ./server/pom.xml

echo "Version updated to $VERSION in package.json and pom.xml"