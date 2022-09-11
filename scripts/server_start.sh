#!/usr/bin/env bash
cd /home/ubuntu/seb39_main_038_new/src/main/resources
sudo nohup java -jar -Dspring.profiles.active=server Spring-0.0.1-SNAPSHOT.jar > /dev/null 2> /dev/null < /dev/null &