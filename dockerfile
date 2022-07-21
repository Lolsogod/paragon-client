FROM node:alpine
WORKDIR /usr/src/app
COPY .next/standalone/ .
EXPOSE 8080
CMD ["node", "server.js"]