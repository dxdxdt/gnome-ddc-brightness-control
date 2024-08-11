#!/bin/sh
set -e

gnome-extensions pack -f \
	--extra-source=services \
	--extra-source=ui \
	src
gnome-extensions install -f ddc-brightness-control@bgornicki.gitlab.com.shell-extension.zip
