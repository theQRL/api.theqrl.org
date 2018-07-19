#!/bin/bash
export DISPLAY=:0.0

cp -r ${HOME}/work/examples/doc/* /var/www/html/
#cp -r ${HOME}/manual_site/* /var/www/html/api
cp -r ${HOME}/repo/api.theqrl.org/build/* /var/www/html/api
