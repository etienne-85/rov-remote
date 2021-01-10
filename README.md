# Rov-Remote
## Intro
PWA (Progressive Web Application) to remote control an ROV, to be run on browser capable devices like smartphones.

Features:

-RT (real-time) communications with remote webserver using websockets or classic REST api to transmit rover commands

-Touch optimized UI with virtual joysticks (based on nippleJS lib)

## Instructions

Use following npm/yarn scripts tailored for ESP32 or RaspberryyPI to produce a production build of the PWA.
It should be then served on target device with a static http webserver (for instance ESPAsyncWebServer on ESP32 or Nginx on RPI).

-`build:ESP`: builds web interface for ESP calling `build:nochunk` and `ESP:exportBuildFiles`

-`build:nochunk`: sub task calling custom script `build-no-split.js` doing a production build without code splitting

-`ESP: exportBuildFiles`: removes hashes from build files and copy them to a custom directory which must point to ESP32 project's directory

- `PI:deploy`: customized script to scp PRD build to a raspberry 


## How it works

Whenever controls are moved on UI, it sends request in this form:
