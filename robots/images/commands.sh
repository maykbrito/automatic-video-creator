#!/bin/bash

mkdir gifs
find . -type f -iname '*.gif' | xargs -I{} -P 4 mv {} gifs/

mkdir converted
find . -type f -iname '*.jp*' -depth 1 | xargs -I{} -P 4 convert {} \( -clone 0 -background white -blur 0x9 -resize 1920x1080^ \) \( -clone 0 -background white -resize 1920x1080 \) -delete 0 -gravity center -compose over -composite -extent 1920x1080 converted/{} && find . -type f -iname '*.jp*' -depth 1 | xargs -I{} trash {}