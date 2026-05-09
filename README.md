# Auto WinBoat

A collection of utilities to make using Windows applications with [WinBoat](https://github.com/TibixDev/winboat) easier. Includes a script to help launch applications, a KWin Script for window management on multi-monitor setups, and some example desktop files I use.

## auto-winboat

This script helps launch Windows applications easily, automatically starting and stopping the Windows VM on program launch and close. This only works for Docker installations btw; sorry!

### Setup

Copy `auto-winboat` into wherever you store your user scripts (I put mine in `~roger/.local/bin/auto-winboat`) and run `chmod +x auto-winboat` to make it executable.

Modify the constants at the top of the file to fit your own WinBoat setup.

- `WINBOAT_INSTALLATION_FOLDER` is the directory that contains your `winboat.config.json` and `docker-compose.yml` files
- `SEND_NOTIFICATIONS` controls whether to show notifications for launching and container shutdown
- `AUTO_SHUTDOWN_CONTAINER` controls whether to shut down the container automatically when the RDP window is closed and the WinBoat application isn't running

If you want `AUTO_SHUTDOWN_CONTAINER` to work, you'll need to run `pip install paramiko` to install the SSH library on your host machine, install [OpenSSH](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=gui&pivots=windows-11) on the Windows VM, and expose port 22 from the Windows VM to the docker container.

To do that last thing,

1. Run `docker container ls -a` and find the container ID for your WinBoat container
2. Go to `/var/lib/docker/containers/` and enter the folder that starts with the ID you noted
3. Modify `hostconfig.json` to add `"22/tcp":[{"HostIp":"127.0.0.1","HostPort":"47310-47319"}]` under the `PortBindings` object
4. Reboot your system

Here's what my `PortBindings` looks like:
```
"PortBindings": {
    "22/tcp": [{"HostIp":"127.0.0.1","HostPort":"47310-47319"}],
    "3389/tcp": [{"HostIp":"127.0.0.1","HostPort":"47300-47309"}],
    "3389/udp": [{"HostIp":"127.0.0.1","HostPort":"47300-47309"}],
    "7148/tcp": [{"HostIp":"127.0.0.1","HostPort":"47280-47289"}],
    "7149/tcp": [{"HostIp":"127.0.0.1","HostPort":"47290-47299"}],
    "8006/tcp": [{"HostIp":"127.0.0.1","HostPort":"47270-47279"}]
}
```


I found SSH was the easiest way to communicate from Linux to Windows, as janky as this setup is. There's probably a way to remake the container with the ports already set up, but I haven't enough learned Docker to do that :P

I also did [this](https://learn.microsoft.com/en-us/troubleshoot/windows-server/remote/frame-rate-limited-to-30-fps) on the Windows VM; not sure if it actually does anything tho.

### Usage

`auto-winboat <path_to_executable_on_windows> <comma_separated_file_arg_positions> <arguments_to_executable>`

`auto-winboat C:\path\to\executable.exe` starts the container, launches the executable through RDP, and automatically shuts down the container after.

The `comma_separated_file_arg_positions` means something like `5,6` would automatically replace paths to the files specified in argument 5 and 6 with their Windows path, assuming they're in the host's home directory. Running `auto-winboat C:\program.exe 4 ./image.png` would replace `./image.png` with an absolute Windows file path, then run `C:\program.exe C:\path\to\image.png` on the Windows VM.

`auto-winboat desktop` launches a fullscreen RDP session.

### On Mime Types

I use KDE Plasma, which has a file associations page in system settings for me to add the `application/paintdotnet` MIME Type and associate it with `*.pdn` files. Your desktop might have a similar app, or you might have to Google it. With this MIME Type, you can use that Paint.NET desktop file to open PDN files directly. You can right click and edit stuff like PNGs or JPEGs, done via the MimeType line in the desktop file.

All of this is in Public Domain btw
