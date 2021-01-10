# Rov-Remote
## Intro
Browser based remote control for controlling an ROV, to be run on devices like smartphones.

Including features such as:

-communication with rover using websockets or classic REST api.

-UI based on virtual joysticks (nippleJS lib)

## Instructions
The following npm/yarn scripts are tailored for ESP32 or RaspberryyPI targets.

-`build:ESP`: main script which builds web interface tailored for ESP calling `build:nochunk` and `ESP:exportBuildFiles`

-`build:nochunk`: sub script calling custom script `build-no-split.js` to build and remove chunks (no code splitting)

-`ESP: exportBuildFiles`: removes hashes from build files and copy them to your a custom directory which must point to your plaformIO ESP32 projects directory
