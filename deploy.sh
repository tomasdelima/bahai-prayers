#!/bin/bash

source ~/.bash_profile
cd ~/Projects/prayers

adb tcpip 5555
adb connect 192.168.0.184

if ionic run --device android
  then echo 'deployed'
fi