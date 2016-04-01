define(["appSettings","events","jQuery"],function(e,t,n){function a(){function t(t){t=Object.assign(t,{userId:Dashboard.getCurrentUserId(),deviceId:ApiClient.deviceId(),accessToken:ApiClient.accessToken(),serverAddress:ApiClient.serverAddress(),receiverName:p||y});var n=e.maxChromecastBitrate();n&&(t.maxBitrate=n),require(["chromecasthelpers"],function(e){e.getServerAddress(ApiClient).then(function(e){t.serverAddress=e,a(t)})})}function a(e){JSON.stringify(e)}function i(){var e=o.devices||{},t=[];for(var n in e){var a=e[n];t.push({name:a.friendlyName,deviceName:a.friendlyName,playerName:y,playableMediaTypes:["Audio","Video"],isLocalPlayer:!1,id:a.id,supportedCommands:["VolumeUp","VolumeDown","Mute","Unmute","ToggleMute","SetVolume","SetAudioStreamIndex","SetSubtitleStreamIndex","DisplayContent","SetRepeatMode","EndSession"]})}return Promise.resolve(t)}function r(){var e=f.lastPlayerData||{};return e=e.PlayState||{},null==e.VolumeLevel?100:e.VolumeLevel}function u(){s(),MediaController.removeActivePlayer(y)}function s(){f.lastPlayerData={}}function c(e,t){e&&o.disconnect(),s(),p=null,t||(d=null)}function l(e,t){var n=i().filter(function(t){return t.getId()==e})[0];n?f.tryPair(e):t&&setTimeout(function(){l(e,!1)},2e3)}function m(){var e=d;e&&setTimeout(function(){l(e,!0)},0)}var d,p,f=this,y="Chromecast",v="2D4B1DA3";f.name=y,f.getItemsForPlayback=function(e){var t=Dashboard.getCurrentUserId();return e.Ids&&1==e.Ids.split(",").length?new Promise(function(n){ApiClient.getItem(t,e.Ids.split(",")).then(function(e){n({Items:[e],TotalRecordCount:1})})}):(e.Limit=e.Limit||100,e.ExcludeLocationTypes="Virtual",ApiClient.getItems(t,e))};var g={};Events.on(g,"playbackstart",function(e,t){var n=f.getPlayerStateInternal(t);Events.trigger(f,"playbackstart",[n])}),Events.on(g,"playbackstop",function(e,t){var n=f.getPlayerStateInternal(t);Events.trigger(f,"playbackstop",[n]),f.lastPlayerData={}}),Events.on(g,"playbackprogress",function(e,t){var n=f.getPlayerStateInternal(t);Events.trigger(f,"positionchange",[n])}),f.play=function(e){Dashboard.getCurrentUser().then(function(){e.items?f.playWithCommand(e,"PlayNow"):f.getItemsForPlayback({Ids:e.ids.join(",")}).then(function(t){e.items=t.Items,f.playWithCommand(e,"PlayNow")})})},f.playWithCommand=function(e,n){return e.items?(e.items=e.items.map(function(e){return{Id:e.Id,Name:e.Name,Type:e.Type,MediaType:e.MediaType,IsFolder:e.IsFolder}}),void t({options:e,command:n})):void ApiClient.getItem(Dashboard.getCurrentUserId(),e.ids[0]).then(function(t){e.items=[t],f.playWithCommand(e,n)})},f.unpause=function(){t({command:"Unpause"})},f.pause=function(){t({command:"Pause"})},f.shuffle=function(e){var t=Dashboard.getCurrentUserId();ApiClient.getItem(t,e).then(function(e){f.playWithCommand({items:[e]},"Shuffle")})},f.instantMix=function(e){var t=Dashboard.getCurrentUserId();ApiClient.getItem(t,e).then(function(e){f.playWithCommand({items:[e]},"InstantMix")})},f.canQueueMediaType=function(e){return"Audio"==e},f.queue=function(e){f.playWithCommnd(e,"PlayLast")},f.queueNext=function(e){f.playWithCommand(e,"PlayNext")},f.stop=function(){t({command:"Stop"})},f.displayContent=function(e){t({options:e,command:"DisplayContent"})},f.mute=function(){t({command:"Mute"})},f.unMute=function(){f.setVolume(r()+2)},f.toggleMute=function(){var e=f.lastPlayerData||{};e=e.PlayState||{},e.IsMuted?f.unMute():f.mute()},f.getTargets=function(){return i()},f.seek=function(e){e=parseInt(e),e/=1e7,t({options:{position:e},command:"Seek"})},f.setAudioStreamIndex=function(e){t({options:{index:e},command:"SetAudioStreamIndex"})},f.setSubtitleStreamIndex=function(e){t({options:{index:e},command:"SetSubtitleStreamIndex"})},f.nextTrack=function(){t({options:{},command:"NextTrack"})},f.previousTrack=function(){t({options:{},command:"PreviousTrack"})},f.beginPlayerUpdates=function(){},f.endPlayerUpdates=function(){},f.volumeDown=function(){t({options:{},command:"VolumeDown"})},f.setRepeatMode=function(e){t({options:{RepeatMode:e},command:"SetRepeatMode"})},f.volumeUp=function(){t({options:{},command:"VolumeUp"})},f.setVolume=function(e){e=Math.min(e,100),e=Math.max(e,0),t({options:{volume:e},command:"SetVolume"})},f.getPlayerState=function(){return new Promise(function(e){var t=f.getPlayerStateInternal();e(t)})},f.lastPlayerData={},f.getPlayerStateInternal=function(e){return e=e||f.lastPlayerData,f.lastPlayerData=e,e},f.tryPair=function(e){return o.selectDevice(e.id).then(function(){var t=function(){d=e.id,p=e.name};return o.joinApplication().then(t,function(){return o.launchApplication().then(t)})})},f.endSession=function(){f.stop(),setTimeout(function(){c(!0,!1)},1e3)},document.addEventListener("resume",m,!1),o.scanForDevices(v),n(o).on("disconnectWithError",u),n(o).on("deviceDidGoOffline",function(e,t){t.id==d&&u()})}var o=cordova.require("fw-cordova-chromecast.FWChromecast");MediaController.registerPlayer(new a)});