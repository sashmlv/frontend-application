#### SSL for localhost:

- ```cd docker/certs```
- run ```./certs.sh```
- fix for ssl certificates:
- - ```docker/proxy.conf.template```
- - ```docker/docker-compose.yml```
- optional import ```localhostCA.pem``` into browser