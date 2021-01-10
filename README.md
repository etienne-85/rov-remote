# Rov-Remote
## Intro
This project aims at remotely controlling an ROV, by providing a PWA (Progressive Web Application) running on any browser capable devices.

UI is specifically suitable for touch devices such as smartphones by displaying virtual joysticks on screen (based on nippleJS lib)

This web app is supposed to work in parallel with a remote server which will receive rover commands.
The server must process requests from client either by providing a REST api or WebSockets communication implementation.

For better performance in real time application, it is advised to choose Websockets as the mean of communication between client/server.
This PWA supports both (see code in WebInterfaces)

Server projects examples for both ESP32 and RPI can be found here:

- ESP with websockets: rov-control-esp
- RPI with REST api: rov-control-pi.

## Usage

Use yarn run start or npm run start or directly from VSCode click 'start' in npm scripts to launch application.

To do a production build, launch the 'build' scripts as before. Serve the static files from output 'build' folder.

## Advanced usage
You can automate deployment for targets such as ESP32 or rapsberry boards using following taylored scripts.

Before you need to adjust settings to your configuration.

See examples of projects as mentionned before: rov-control-esp and rov-control-pi.

For ESP, you'll need a platformIO project setup to build and upload filesystem image to host web application.
Path to external ESP PlatformIO project, should be configured in ESP scripts:

It should be then served on target device with a static http webserver (for instance ESPAsyncWebServer on ESP32 or Nginx on RPI).

-`build:nochunk`: sub task calling custom script `build-no-split.js` doing a production build without code splitting

-`ESP: exportBuildFiles`: removes hashes from build files and copy them to a custom directory which must point to ESP32 project's directory

-`PI:deploy`: customized script to scp PRD build to a raspberry 


## How it works

Whenever controls are moved on UI, it sends request in this form:
