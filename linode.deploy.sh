#!/bin/bash

build=$1

if [[ !$build ]]; then
  build="$(ls -t /home/daniel/builds | head -1)"
fi

echo "${build}"

rm -rf /home/daniel/app
mkdir /home/daniel/app
mkdir /home/daniel/app/_CACHE

cp /home/daniel/builds/${build} /home/daniel/app
cd /home/daniel/app

tar -xzf ${build}
rm ${build}

ls -lh

npm --production install

cp /home/daniel/app/.secrets /etc/environment
pm2 restart server.js

# pre-compile index
curl daniellacos.se
