# NOTE: this is not yet a usable setup script. just a list of commands to run

ssh-keygen -R 104.200.31.233
ssh root@104.200.31.233 # NOTE: make sure your VPN is off!!

apt-get update && apt-get upgrade
echo "aluminium-entity" > /etc/hostname
hostname -F /etc/hostname
nano /etc/hosts # => add line 104.200.31.233 aluminium-entity

adduser daniel
adduser daniel sudo

curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
apt-get install nodejs
npm install -g pm2

apt-get install nginx
service nginx start

cd /etc/nginx/sites-available/

echo "upstream daniellacosse {
  server 127.0.0.1:9999;
  keepalive 8;
}

server {
  listen 0.0.0.0:80;
  server_name daniellacos.se;

  location / {
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header Host \$http_host;
    proxy_set_header X-NginX-Proxy true;

    proxy_pass http://daniellacosse/;
    proxy_redirect off;
  }
}" >> daniellacos.se

rm default

cd /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/daniellacos.se /etc/nginx/sites-enabled/daniellacos.se
rm default

service nginx restart

ssh daniel@104.200.31.233
cd ~
mkdir app
mkdir builds

# then run gulp deploy locally
