# Auto WinBoat

This script helps launch Windows applications using [WinBoat](https://github.com/TibixDev/winboat). I've included an example desktop file for Paint.NET.

## Usage

`auto-winboat <path_to_executable_on_windows> <comma_separated_file_arg_positions> <arguments_to_executable>`

`auto-winboat C:\path\to\executable.exe` starts the container, launches the executable through RDP, and automatically shuts down the container after.

The `comma_separated_file_arg_positions` means something like `5,6` would automatically replace paths to the files specified in argument 5 and 6 with their Windows path, assuming they're in the host's home directory. Running `auto-winboat C:\program.exe 4 ./image.png` would replace `./image.png` with an absolute Windows file path, then run `C:\program.exe C:\path\to\image.png` on the Windows VM.
