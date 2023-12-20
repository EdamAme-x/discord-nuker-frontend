# SETUP SCRIPT

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.nvm/nvm.sh
nvm install node
nvm use node
npm install -g pnpm
pnpm install
pnpm dev