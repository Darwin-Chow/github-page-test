#!/bin/sh

ng build --prod --base-href=https://darwin-chow.github.io/github-page-test/

sudo npx ngh --dir=dist/github-page-test --no-silent

