# DDC Brightness Control

Gnome extension to control display brightness via DDC.

## Preparation

1. Install ddcutil: [https://www.ddcutil.com](https://www.ddcutil.com)
2. Set I2C permissions for non-root users: [https://lexruee.ch/setting-i2c-permissions-for-non-root-users.html](https://lexruee.ch/setting-i2c-permissions-for-non-root-users.html)

## Installation

Prepare extension directory:

```bash
git clone git@gitlab.com:bgornicki/gnome-ddc-brightness-control.git
mkdir -p ~/.local/share/gnome-shell/extensions/ddc-brightness-control@bgornicki.gitlab.com
cp -R src/* ~/.local/share/gnome-shell/extensions/ddc-brightness-control@bgornicki.gitlab.com/
```

Enable extension:

 - `gnome-shell-extension-tool --enable ddc-brightness-control@bgornicki.gitlab.com`

Restart GNOME:

 - Press `Alt + F2`, type `r` and press `Enter`.


# Development

## Linter

`npm i eslint`
`node_modules/eslint/eslint .`
