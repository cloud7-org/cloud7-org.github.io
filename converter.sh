#!/bin/zsh
for FILE in public/images/*.jpg; do
  echo ${FILE:r}
  convert $FILE -resize 1320x\> -quality 50 -units PixelsPerInch -density 144 ${FILE:r}.jp2
  convert $FILE -resize 1320x\> -quality 90 -units PixelsPerInch -density 144 ${FILE:r}.webp
done

./savePictureData.sh