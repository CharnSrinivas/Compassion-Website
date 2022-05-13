#!/bin/bash
source ~/.procfile
cd /home/u962252833/public_html/compassion-api
rm nohup.out
NODE_ENV="production" nohup npm start &