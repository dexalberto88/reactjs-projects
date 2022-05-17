## Prerequisite
 - Linux OS (Mint, Ubuntu)
 - React >= v18.1.0
## Development
 1. Install docker [link](https://docs.docker.com/engine/install/ubuntu/)
```bash
sudo apt update
sudo apt install -y docker.io
sudo groupadd docker
sudo usermod -aG docker $USER
# open new terminal
docker run hello-world # to check
```
2. Create docker container
```bash
docker pull ubuntu:20.04
docker run -v ~/shared_folder:/root/shared_folder --cap-add=NET_ADMIN --name "my-ubuntu" -w "/root" -it "ubuntu:20.04"
```
3. Install nodejs [link1](https://nodejs.org/en/download/) [link2](https://github.com/nodejs/help/wiki/Installation)
```bash
apt update
apt install -y wget
wget https://nodejs.org/dist/v16.15.0/node-v16.15.0-linux-x64.tar.xz
VERSION=v16.15.0
DISTRO=linux-x64
sudo mkdir -p /usr/local/lib/nodejs
sudo tar -xJvf node-$VERSION-$DISTRO.tar.xz -C /usr/local/lib/nodejs
```
Edit ~/.profile and add this lines
`VERSION=v16.15.0`
`DISTRO=linux-x64`
`export PATH=/usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin:$PATH`
```bash
. ~/.profile
node -v
npm version
npx -v
```
 4. Create react app [link](https://reactjs.org/docs/create-a-new-react-app.html)
```bash
cd ~/shared_folder/
npx create-react-app <your_app_name> # if permission error run 'chown -R root:root ~/shared_folder'
cd <your_app_name>
npm start
```
## Usage
 - **auto-loan-calc/** - Application that computes auto loan monthly amortization
```bash
docker start my-ubuntu
docker exec -it my-ubuntu /bin/bash
source ~/.profile
cd shared_folder
git clone https://github.com/dexalberto88/reactjs-projects.git
cd reactjs-projects/
cd auto-loan-calc/
rm -rf src/
cp -r ../src.auto-loan-calc/ src
npm start
```
![image](https://lh3.googleusercontent.com/pw/AM-JKLWhdBTsprNoA0vJB5rkNpN6FfNzBetRbliCQnaO5a8wfsGXVOEBGsxApAM59D6OtolDA1GMnDFG9MOeHU_QqxQ8BdWH-Ngf8gwpVLBEzCqf8CU78gDakLQGU0mHz1E0Dq1m9kxlKV0i-JHewqvlNa85=w395-h373-no?authuser=0)