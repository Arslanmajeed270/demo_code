FROM node:14.15.5

RUN mkdir -p /home/frontend

RUN apt update && \
    apt install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
RUN npm i -g cypress@6.2.1 --unsafe-perm --silent

WORKDIR /home/frontend

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]