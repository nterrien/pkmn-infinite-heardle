version="V7.3"

filename="pkmn-infinite-heardle_"$version

git archive --prefix=$filename/ --format=zip --output=$filename.zip -9 HEAD
cp $filename.zip ./archive/$filename.zip