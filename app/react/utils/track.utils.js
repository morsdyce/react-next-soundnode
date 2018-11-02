export const formatSongDuration = (duration) => {
  var minutes = Math.floor(duration / 60000)
    , seconds = ((duration % 60000) / 1000).toFixed(0);

  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

export const showBigArtwork = function (image) {
  if (image) {
    return image.replace('large', 't300x300');
  } else {
    return 'public/img/song-placeholder.png';
  }
};
