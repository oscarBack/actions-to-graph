# Install shared libraries
sudo apt update -y && sudo apt upgrade -y
sudo apt install -y libasound2 libnss3 libatk1.0-0 libgtk-3-dev libdrm-dev libatk-bridge2.0-0 libdbus-1-3

sudo chown node /workspace/node_modules
npm install -g yo generator-code
npm install -g ts-standard
npm i

