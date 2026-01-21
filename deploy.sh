#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
# cp CNAME docs/.vuepress/dist/
cd docs/.vuepress/dist


git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# Use current branch (main) to push to gh-pages
git push -f git@github.com:easyhappy/travel-coding.git HEAD:gh-pages


cd -

# Don't re-initialize git, just commit and push
git add -A
git commit -m 'deploy' || echo "No changes to commit"

git push -f git@github.com:easyhappy/travel-coding.git master:master