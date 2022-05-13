#!/bin/bash
ntstat=`netstat -tulpn | grep ":53 " | grep LISTEN | awk {'print $4'} | sed -e 's/.*:/:/g'`
port=":53 "

#Just to echo for testing
echo $ntstat  
echo $port

if [[ "$ntstat" == "$port" ]]
then
    echo " X Service at port number $port"
else 
    echo " Port is not listing  "
fi 