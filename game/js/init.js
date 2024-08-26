
 var stageWidth,stageHeight=0;
 var isLoaded=false;


 $(function() {
	  var resumeAudioContext = function() {
		// handler for fixing suspended audio context in Chrome
		try {
			if (createjs.WebAudioPlugin.context.state === "suspended") {
				createjs.WebAudioPlugin.context.resume();
				// Should only need to fire once
				window.removeEventListener("click", resumeAudioContext);
			}
		} catch (e) {
			// SoundJS context or web audio plugin may not exist
			console.error("There was an error while trying to resume the SoundJS Web Audio context...");
			console.error(e);
		}
	};
	window.addEventListener("click", resumeAudioContext);

	 // Check for running exported on file protocol
	if (window.location.protocol.substr(0, 4) === "file"){
		alert("Game run error");
	}


	 $(window).resize(function(){
		resizeLoaderFunc();
	 });
	 resizeLoaderFunc();
	 checkBrowser();
});


 function resizeLoaderFunc(){
	stageWidth=$(window).width();
	stageHeight=$(window).height();

	$('#mainLoader').css('left', checkContentWidth($('#mainLoader')));
	$('#mainLoader').css('top', checkContentHeight($('#mainLoader')));
 }


var browserSupport=false;
var isTablet;
function checkBrowser(){
	isTablet = (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase()));
	deviceVer=getDeviceVer();

	var canvasEl = document.createElement('canvas');
	if(canvasEl.getContext){
	  browserSupport=true;
	}

	if(browserSupport){
		if(!isLoaded){
			isLoaded=true;
			initPreload();
		}
	}else{
		//browser not support
		$('#notSupportHolder').show();
	}
}
