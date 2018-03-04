/**
 * Created by weng on 2018/2/10.
 *
 *
 *
 * unused file
 *
 */


// define(function (require) {
//
//     var sender = require('RTCchannel.js');
//
//
//
//
//     function startCamera(vid) {
//         console.log(vid)
//         this.init(vid);
//     }
//
//     startCamera.prototype.init=function (vid) {
//         var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
//
//         getUserMedia.call(navigator, {
//             video: true,
//             audio: true
//         }, function(localMediaStream) {
//             var video = document.getElementById(vid);
//             video.src = window.URL.createObjectURL(localMediaStream);
//             video.onloadedmetadata = function(e) {
//                 console.log("Label: " + localMediaStream.label);
//                 console.log("AudioTracks" , localMediaStream.getAudioTracks());
//                 console.log("VideoTracks" , localMediaStream.getVideoTracks());
//             };
//         }, function(e) {
//             console.log('Reeeejected!', e);
//         });
//
//
//     }
//
//
//     return startCamera
//
// })