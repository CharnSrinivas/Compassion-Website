#!/bin/bash
source ~/.procfile
cd /home/u962252833/public_html/compassion
rm nohup.out
NODE_ENV="production" nohup  npm start &
