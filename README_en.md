![Image text](./Starrydew.png)

* [简体中文](./README.md)

* [English](./README_en.md)

# Starrydew-Wiki
***Author: BluefishV (2719149077)***

***Bilibili: BluefishV***

***Thanks to all the following developers who assisted us in making Starrydew!***

***-Online installation version: voyage27(476445136)***

***-Cube color library: Sparks(2033161737)***

***-Installation script: UCKET(3228851731)***
* StarryDew is a JavaScript-based WebSocket quick build program for Minecraft Bedrock Edition
* To learn more, please join the QQ group: [424960844](https://jq.qq.com/?_wv=1027&k=msOk61g4)
---
### Basic commands
```
set pos-save the current coordinates (you must use this command before executing all export/import commands to save your position)

pos1-set pos1 to the current coordinates

pos2-set pos2 to the current coordinates

pos3-set pos3 to the current coordinates

speed <number: milliseconds>-set the export speed (default 7)

speed2 <number: milliseconds>-Set the speed of .sd file import
```
### Basic Geometry
```
circle <number: radius> <string: square | number: square id> [number: special value] [x|y|z]-draw a circle towards x/y/z (the direction is not filled and the default is y)

       fill <true | false>-Whether to use fill mode. true: yes, false: no.

pen <string: square> <number: special value>-To draw a third-order Bezier curve, you must first use the set pos, pos1, pos2, and pos3 commands, and must be in the first quadrant (not recommended)

maze <number: length> <number: width> <number: height> <string: block|number: block id> [number: special value]-Create a maze with xxx squares with special values ​​of xxx (both length and width are not allowed Less than 5)

      solve-automatically solve the last maze generated

random <number: length> <number: height> <number: width>-Generate an area composed of random squares

steeple <number: radius> <string: block | number: block id> [number: special value]-generate a steeple

        fill <true | false>-Set whether to use /fill mode

sphere <number: radius> <string: square | number: square id> [number: special value]-generate a sphere

        fill [true/false]-Set whether to use fill mode


```
### Import/Export Architecture/Pixel Art/QR Code
```
sche import <string: file>-parse and import .schematic files

     import <string: file> per <number: percentage>-Specify the percentage to parse and import the .schematic file

     import <string: file> from <number: y-axis start point> <number: y-axis end point>-specify the height range to import the schematic file

             auto <number: index>-After using the readdir command, the file index will be displayed, and the index represents the corresponding file

             auto <number: index> per <number: percentage>-specify the percentage to import the file

             speed <number: milliseconds>-set schematic import speed (default 7)

mcfunc <string: file>-run the command in the .mcfunction file

         <string: file> per <number: percentage>-run the command in the .mcfunction file

         auto <number: index>-The file index will be displayed after the readdir command is used, and the index represents the corresponding file

         auto <number: index> per <number: percentage>-specify the percentage to import the file

         speed <number: milliseconds>-set the speed of executing mcfunction (xxx milliseconds/1 block)

nbt speed <number: milliseconds>-Set the import speed of .nbt files (default 7)

    import <string: file>-parse and import .nbt files

    import <string: file> per <number: percentage>-parse and import the .nbt file according to the percentage

            auto <number: index>-The file index will be displayed after the readdir command is used, and the index represents the corresponding file

            auto <number: index> per <number: percentage>-specify the percentage to import the file

pixel <string: path>-Import a .png image

      auto <number: index>-Import a png image according to the index

      speed <number: speed>-set the speed at which the image is generated

      follow <true | false>-whether to follow automatically

      color_pixel <true | false>-whether to use color pixel painting mode
      
      multi_thread <true | false>-Whether to enable multi-thread mode

export <coordinate x increase value> <coordinate y increase value> <coordinate z increase value> <string: file name>-export the area of ​​the specified size

        auto <string: file name>-automatically calculate the export size according to set pos, pos1, pos2 (set pos must be in the upper left corner of the building (corresponding to the position where the x, y, z coordinates of all vertices of the building will increase), pos1, pos2 must Located on the diagonal of the building)

readdir-read all files in the ./buildings/ path and display them to the chat bar and display the file index

tomcfunc <string: file>-Convert .sd file to .mcfunction file

qr <string: content>-Generate a QR code containing the content

   speed <number: speed>-Set the speed of QR code generation



```
### Other commands
```
about-About

version-version

help [number: page]-view help

eval <string: js code>-execute javascript code in the console (debugging)

time-Display the current time

run <string: command>-execute the command on the console and return the result to the game

times <number: number of squares>-the prompt speed of the title when various export/import commands are automatically executed (once every xxx square title, the default is 20, and the recommended setting is 20)

       import <string: file>-Import the .sd file in the ./buildings/ path

       auto [number: index]-After using the readdir command, the file index will be displayed, and the index represents the corresponding file

title content <string: content>-set the content of the title

     colors <string: color>-Set the color, each color is divided by% (for example, title colors color1%color2%color3...)

     players <string: player>-set the displayed player (can be the player name, @a,@s,@p,@r, etc., you can use the selector)

     model <string: mode>-Set the mode of the title, which can be title, actionbar, etc.

     start <number: milliseconds>-refresh and display the title every xxx milliseconds

     stop-stop display

home add <string: name of the home> <here | x y z>-Set the current coordinates as home

       remove <string: home>-remove a home

       index <number: index>-delete a home based on the array index (use home list to view the index)

       go <string: home>-send to a home

       index <number: index>-send to a home according to the array index

       list-show all homes

       rename <string: old name> <string: new name>-rename a home

       setpos <string: home> <x y z>-reset home coordinates

       private <true | false> Set display permissions (true: only visible to yourself false: visible to all players)

       save-automatically save all homes to disk (path is ./data/homes)

       load-automatically read the home on the disk (path is ./data/homes)

fastench-Quickly enchant an item in the hand

guess start [number: starting range] [number: ending range]-set the number generation range of the guessing number game

       <Number: Guessed Number>-Guessed Number

       stop-end the number guessing game

wne start [number: speed]-display current coordinates

     stop-stop display

getloc <string: type> [string: name]: get the coordinates of any entity without op permission

       range <number: the x coordinate of the starting point> <number: the z coordinate of the starting point> <number: the x coordinate of the ending point> <number: the z coordinate of the ending point>: Set the range.

       accuracy <number: accuracy>: Set the accuracy.

set <number: block id|string: block name> [number: block special value] [string: other]-fill the area selected by pos1 and pos2 as the specified block

    undo-undo this operation

replace <block ID: special value | block ID | block name: special value | block name> <block ID: special value | block ID | block name: special value | block name>-Put pos1 and pos2 in the selected area Replace one type of block with another

        undo-undo this operation

clone [string: other attributes]-copy the area selected by pos1 and pos2 to pos3, for example: "clone masked move" = "/clone pos1 pos2 pos3 masked move", "clone"="/clone pos1 pos2 pos3" .

swc help-View world chat help
```
### Console commands
```
Console instructions:
    swc help: view world chat help
```
***Console commands currently only support world chat commands and mc original commands.***

### Configuration file
```
server_port: port number
       
colorPixelThreadCount: The number of color pixel painting analysis threads (if multi-threading is enabled)
       
custom_cmd: Whether to enable custom commands (custom command configuration file path: ./data/custom_cmd.json)
       
customcmd_remind_before_running_mcfunc: Whether to prompt when executing the function file of the custom instruction
       
log_time: Whether to log the message time
       
write_log_on_disk: Whether to automatically write console messages to disk (path./data/logs/)
       
guessNumberCommand: Whether to enable the guess number command
       
language: language
       
pixel_tp_every_xxx_cmds: Transmission speed when importing png images (automatically follow if allowed)
       
use_cmd_in_console: Whether to enable console commands
       
log_in_game_when_run_cmd_in_console: Whether the console command is fed back to the players connected to ws
       
enable_worldchat: Whether to enable world chat
       
worldchat_address: worldchat server address
       
enableNewPixelAlgorithm: Whether to enable the new color pixel drawing algorithm
       
defaultFilePath: default path
       
colorText: whether to use colored text
       
particle_tip: Whether to enable particle tip effect (particle tip when exporting, do not enable it if it causes a stutter)
       
enableFastCommand: Whether to enable fast commands (fast command file path: ./data/FastCommand.json)
       
default: some default values
       
custom_cmd.json file:

There are instructions inside the file, please open the file with text
```
