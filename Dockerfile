FROM node:18

RUN apt update -y && apt upgrade -y
RUN apt-get update && \
  apt-get install -y \
  neofetch \
  ffmpeg && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /root/xyvnz
RUN npm i -g pm2
COPY package.json .
COPY . .
RUN git clone https://VanzGantengz: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@github.com/VanzGantengz/es6
RUN mv es6 xyvnz && cp -r xyvnz /root
RUN npm install

CMD pm2-runtime index.js --name bot