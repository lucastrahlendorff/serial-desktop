# serial-desktop
serial-desktop is a cross-platform tool to send serial commands to devices in a user friendly way based on Electron and Nuxt.

# Preview
![image](https://github.com/lucastrahlendorff/serial-desktop/assets/33978796/db476444-a80a-46ca-95b6-5fe2c6f08e4a)

# Installation
As this is still in development, this software is has currently no installation files. You can run it in development with `yarn` and `yarn dev`.

# How it works
The main thought behind this is to update variables of small hardware on-the-fly with sending key and value pairs like this: `variable_name:value`

# Features
- **Variables**: Add the variables you want to control with the types `text`, `number` (with visual slider support) and `toggle` (for switching between two values).
- **Workspaces**: Manage them with workspaces so you can handle multiple projects.
- **Serial Monitor**: Live view of the serial data incoming.
- **No more saving**: There are no "Save"-buttons. Everything you create or change is being saved immediately so you can focus on working.
