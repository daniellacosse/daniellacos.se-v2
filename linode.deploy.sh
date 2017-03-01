#!/bin/bash
build=$1
start=`date +%s`

if [[ !$build ]]; then
  build="$(ls -t /home/daniel/builds | head -1)"
fi

rm -rf /home/daniel/app
mkdir /home/daniel/app
mkdir /home/daniel/app/_CACHE

cp /home/daniel/builds/${build} /home/daniel/app
cd /home/daniel/app

current=`date +%s`
echo -ne " ...unzipping (($((current-start))s elapsed)              \r"

tar -xzf ${build}
rm ${build}

current=`date +%s`
echo -ne " ...installing dependencies ($((current-start))s elapsed) \r"

npm --production i > ./_build.log 2>&1 || ( EC=$?; cat ./_build.log; exit $EC )

current=`date +%s`
echo -ne " ...restarting server ($((current-start))s elapsed)      \r"

cp /home/daniel/app/.secrets /etc/environment
pm2 restart server.js > ./_build.log 2>&1 || ( EC=$?; cat ./_build.log; exit $EC )

current=`date +%s`
echo -ne " ...caching index ($((current-start))s elapsed)          \r"

# pre-compile index
curl -s daniellacos.se

current=`date +%s`
echo -ne " [[finished]] ($((current-start))s elapsed)              \r"
