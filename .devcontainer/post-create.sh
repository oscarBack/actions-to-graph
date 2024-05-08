# Install shared libraries
sudo apt update -y && sudo apt upgrade -y
sudo apt install -y libasound2 libnss3 libatk1.0-0 libgtk-3-dev libdrm-dev libatk-bridge2.0-0 libdbus-1-3

# sudo chown node /workspaces/node_modules
npm install -g yo generator-code ts-standard
npm ci

gh auth login --with-token < .devcontainer/token.txt