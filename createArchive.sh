version="V7.4"

filename="pkmn-infinite-heardle_"$version

git archive --prefix=$filename/ --format=zip --output=$filename.zip -9 HEAD
cp $filename.zip ./archive/$filename.zip