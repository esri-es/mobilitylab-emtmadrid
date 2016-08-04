'use strict';

var player;
function loadYoutubeVideo(videoId){
  var tag = document.createElement('script');

  tag.src = 'http://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
}
function onYouTubeIframeAPIReady() {
  //console.log('videoId',videoId);
  var videos = ['intro-mobilitylabs','intro-rabbitmq','petition-mybus-stop','load-collection','intro-agol'];
  player = {};

  videos.forEach(function(elem, i){
    console.log(elem);
    //JSo_JT4K5TI
    var videoId = document.getElementById(elem).getAttribute('data-video-id');
    player[elem] = new YT.Player(elem, {
      height: '330',
      width: '100%',
      videoId: videoId,
      events: {
        'onReady': onPlayerReady
        //'onStateChange': onPlayerStateChange
      }
    });
  })
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  //event.target.playVideo();
}

function parseToSeconds(str){
  var p = str.split(':'), // split it at the colons
      s = 0, m = 1;

  while (p.length > 0) {
      s += m * parseInt(p.pop(), 10);
      m *= 60;
  }

  return s;
}