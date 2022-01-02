#!/bin/zsh
YAML=$(for FILE in public/images/*.webp; do
  echo "${FILE:t:r}:\\n  $(identify -format "width: %w\n  height: %h" $FILE)"
done)
echo $YAML > src/data/knownPictures.yaml