(this.webpackJsonpv0=this.webpackJsonpv0||[]).push([[0],{115:function(e,t,n){e.exports=n(160)},120:function(e,t,n){},128:function(e,t){},130:function(e,t){},144:function(e,t){},146:function(e,t){},152:function(e,t){},154:function(e,t){},160:function(e,t,n){"use strict";n.r(t);var r,a,o=n(0),i=n.n(o),l=n(9),s=n.n(l),u=(n(120),n(208)),c=n(209),p=n(94),d=n.n(p),m=n(11),h=n(14),y=n(16),f=n(15),S=n(12),T=n(53),v=n.n(T),b=n(68),g=n(6),E="https://you-eng.ew.r.appspot.com/";!function(e){e[e.UnderstandTheContext=0]="UnderstandTheContext",e[e.WithSubtitles=1]="WithSubtitles",e[e.StudyWords=2]="StudyWords",e[e.Repeat=3]="Repeat"}(r||(r={})),function(e){e[e.NotReady=-2]="NotReady",e[e.Unstarted=-1]="Unstarted",e[e.Ended=0]="Ended",e[e.Playing=1]="Playing",e[e.Paused=2]="Paused",e[e.Buffering=3]="Buffering",e[e.VideoCued=5]="VideoCued"}(a||(a={}));function x(){return(x=Object(b.a)(v.a.mark((function e(t){var n,r,a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("getTimedtextLink "+t),n=E+"?u="+btoa("https://www.youtube.com/get_video_info?eurl=http%3A%2F%2Flocalhost%3A3000%2F&hl=en_US&video_id="+t),e.next=4,fetch(n);case 4:if(null==(r=e.sent)||null==r.body){e.next=16;break}return e.t0=P,e.next=9,r.text();case 9:if(e.t1=e.sent,null==(a=(0,e.t0)(e.t1))||null==a.player_response||null==a.player_response.captions||null==a.player_response.captions.playerCaptionsTracklistRenderer||null==a.player_response.captions.playerCaptionsTracklistRenderer.captionTracks){e.next=15;break}return e.abrupt("return",a.player_response.captions.playerCaptionsTracklistRenderer.captionTracks);case 15:console.log("captionTracks not found json=",a);case 16:return e.abrupt("return",[]);case 17:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function C(){return(C=Object(b.a)(v.a.mark((function e(t){var n,r,a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=E+"?u="+btoa(t+"&fmt=json3"),e.next=3,fetch(n);case 3:if(null==(r=e.sent)||null==r.body){e.next=11;break}return e.next=7,r.json();case 7:return a=e.sent,console.log("Timedtext=",a),a.events=a.events.filter((function(e){return e.segs&&e.segs.length>0&&!(1===e.segs.length&&"\n"===e.segs[0].utf8)})).sort((function(e,t){return e.tStartMs-t.tStartMs})),e.abrupt("return",a);case 11:return e.abrupt("return",void 0);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function P(e){var t,n,r,a={},o=e.split("&");for(var i in o)n=(t=o[i].split("="))[0],r=t[1],a[n]=decodeURIComponent(r),"player_response"===n&&(a[n]=JSON.parse(a[n]));return a}var k,w,I=n(211),j=Object(S.b)("YouTubePlayerStore")(k=Object(S.c)(k=function(e){Object(y.a)(n,e);var t=Object(f.a)(n);function n(){var e;Object(m.a)(this,n);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).componentDidMount=function(){if(window.YT)e.initPlayer();else{var t=document.createElement("script");t.src="https://www.youtube.com/iframe_api",window.onYouTubeIframeAPIReady=e.initPlayer;var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n)}window.addEventListener("message",e.getMessageFromYT)},e.initPlayer=function(){e.props.YouTubePlayerStore.SetPlayer(new window.YT.Player("player",{videoId:e.props.YouTubePlayerStore.VideoId,playerVars:{autoplay:1},events:{onReady:e.onReady,onStateChange:e.onStateChange,onError:e.onError}}))},e.getMessageFromYT=function(t){var n=performance.now(),r=void 0;try{r=JSON.parse(t.data)}catch(o){return}if(console.log("YT message",r.event,r.info),r.info){void 0!==r.info.playerState&&e.props.YouTubePlayerStore.PlayerStatus!==r.info.playerState&&e.props.YouTubePlayerStore.SetPlayerStatus(r.info.playerState);if(r.info.currentTimeLastUpdated_){var a=Date.now()-1e3*r.info.currentTimeLastUpdated_;a>100&&console.warn("dtime=",a)}r.info.currentTime&&e.props.YouTubePlayerStore.SetCurrentTime(1e3*r.info.currentTime+0)}performance.now()-n>2&&console.warn("<< YT message","".concat(performance.now()-n," ms"))},e.onReady=function(){e.props.YouTubePlayerStore.SetPlayerStatus(a.Unstarted)},e.dalayExitFullscreen=function(){setTimeout((function(){document.fullscreenElement&&e.props.YouTubePlayerStore.PlayerStatus!==a.Playing&&document.exitFullscreen()}),1e3)},e.onStateChange=function(t){e.props.YouTubePlayerStore.SetPlayerStatus(t.data),t.data!==a.Ended&&t.data!==a.Paused||e.dalayExitFullscreen()},e.onError=function(e){console.log("onError",e.data)},e}return Object(h.a)(n,[{key:"render",value:function(){var e=this;return console.log("render",this.props.YouTubePlayerStore.VideoId),this.props.YouTubePlayerStore.Player&&this.props.YouTubePlayerStore.Player.loadVideoById&&this.props.YouTubePlayerStore.Player.loadVideoById(this.props.YouTubePlayerStore.VideoId),o.createElement(o.Fragment,null,o.createElement(I.a,{label:"Enter youtube URL or VideoID",variant:"filled",onChange:function(t){e.props.YouTubePlayerStore.SetVideoId(t.target.value)},style:{width:"100%"},margin:"dense"}),o.createElement("div",{className:"videoWrapper"},o.createElement("div",{id:"player"})))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("message",this.getMessageFromYT)}}]),n}(o.PureComponent))||k)||k,O=n(213),M=n(202),Y=n(212),V=n(215),D=n(203),F=n(162),N=n(204),R=Object(S.b)("YouTubePlayerStore")(w=Object(S.c)(w=function(e){Object(y.a)(n,e);var t=Object(f.a)(n);function n(e){var a;return Object(m.a)(this,n),(a=t.call(this,e)).p=void 0,a.toStep1=function(){a.p.SetStudyStep(r.UnderstandTheContext)},a.toStep2=function(){a.p.SetStudyStep(r.WithSubtitles)},a.p=e.YouTubePlayerStore,a}return Object(h.a)(n,[{key:"render",value:function(){return o.createElement("div",null,o.createElement(O.a,{activeStep:this.p.StudyStep,orientation:"vertical"},o.createElement(M.a,{key:"s1"},o.createElement(Y.a,null,"\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u043f\u043e\u043b\u043d\u043e\u0441\u0442\u044c\u044e, \u0431\u0435\u0437 \u0441\u0443\u0431\u0442\u0438\u0442\u0440\u043e\u0432"),o.createElement(V.a,null,o.createElement(D.a,null,"\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0438\u0442\u0435 \u0432\u0438\u0434\u0435\u043e \u043f\u043e\u043b\u043d\u043e\u0441\u0442\u044c\u044e, \u0431\u0435\u0437 \u0441\u0443\u0431\u0442\u0438\u0442\u0440\u043e\u0432. \u041d\u0435 \u0432\u0430\u0436\u043d\u043e, \u043a\u0430\u043a\u043e\u0439 \u043f\u0440\u043e\u0446\u0435\u043d\u0442 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u0412\u044b \u043f\u043e\u0439\u043c\u0451\u0442\u0435, \u0441\u0442\u0430\u0440\u0430\u0439\u0442\u0435\u0441\u044c \u043f\u043e\u043d\u044f\u0442\u044c \u043a\u043e\u043d\u0442\u0435\u043a\u0441\u0442."),o.createElement(F.a,{onClick:this.p.PlayFullscreen,variant:"contained",color:"primary"},"\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c"),o.createElement("br",null),o.createElement("br",null),o.createElement(N.a,{color:"primary","aria-label":"outlined primary button group"},o.createElement(F.a,{disabled:!0,variant:"contained"},"Back"),o.createElement(F.a,{onClick:this.toStep2,variant:"contained"},"Next")))),o.createElement(M.a,{key:"s2"},o.createElement(Y.a,null,"\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u043f\u043e\u0444\u0440\u0430\u0437\u043d\u043e, \u0441 \u0441\u0443\u0431\u0442\u0438\u0442\u0440\u0430\u043c\u0438"),o.createElement(V.a,null,o.createElement(D.a,null,"\u041f\u043b\u0435\u0435\u0440 \u043f\u0440\u043e\u0438\u0433\u0440\u044b\u0432\u0430\u0435\u0442 \u043e\u0434\u043d\u0443 \u0444\u0440\u0430\u0437\u0443, \u043f\u043e\u043f\u044b\u0442\u0430\u0439\u0441\u044f \u043f\u043e\u043d\u044f\u0442\u044c \u0435\u0451 \u043d\u0430 \u0441\u043b\u0443\u0445. \u041f\u043e\u0432\u0442\u043e\u0440\u0438 \u0444\u0440\u0430\u0437\u0443 \u0437\u0430 \u0433\u0435\u0440\u043e\u0435\u043c. \u041f\u0440\u043e\u0432\u0435\u0440\u044c \u0441\u0435\u0431\u044f, \u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0432 \u0441\u0443\u0431\u0442\u0438\u0442\u0440\u044b."),o.createElement("br",null),o.createElement("br",null),o.createElement(N.a,{color:"primary","aria-label":"outlined primary button group"},o.createElement(F.a,{onClick:this.toStep1,variant:"contained"},"Back"),o.createElement(F.a,{disabled:!0,variant:"contained"},"Next"))))))}}]),n}(o.PureComponent))||w)||w,B=n(210),U=function(e){Object(y.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(m.a)(this,n),(r=t.call(this,e)).state={highlight:!1},r}return Object(h.a)(n,[{key:"render",value:function(){var e=this,t="word"+(this.state.highlight?" highlight":"");return o.createElement("span",{className:t,onMouseOver:function(){e.setState({highlight:!0})},onMouseOut:function(){e.setState({highlight:!1})}},this.props.word)}}]),n}(o.PureComponent);n(99);function W(e){return e.split(/([\W\d]+|[^\W\d]+(?:'[t]))/).filter((function(e){return e.length>0}))}function _(e,t){return!e&&!t||void 0!==e&&void 0!==t&&e.replace(/ +/g," ").trim().toLowerCase()===t.replace(/ +/g," ").trim().toLowerCase()}var L,z,A,G=function(e){Object(y.a)(n,e);var t=Object(f.a)(n);function n(){return Object(m.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){var e=this;return this.props.e&&this.props.e.segs?i.a.createElement("span",{id:this.props.id}," ",this.props.e.segs.map((function(t,n){return W(t.utf8).map((function(t,r){return i.a.createElement(U,{word:t,key:e.props.id+"s"+n+"w"+r})}))}))):i.a.createElement(i.a.Fragment,null)}}]),n}(i.a.PureComponent),J=Object(S.b)("YouTubePlayerStore")(L=Object(S.c)(L=function(e){Object(y.a)(n,e);var t=Object(f.a)(n);function n(){return Object(m.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){var e=this;console.log("Timedtext render");var t=this.props.YouTubePlayerStore.TimedTextData.events;return 0===t.length?i.a.createElement("h1",null,"<= Shoose video"):i.a.createElement("div",{className:this.props.className},i.a.createElement("h1",null,this.props.YouTubePlayerStore.VideoData.title,this.props.YouTubePlayerStore.VideoData.author?" // ":"",this.props.YouTubePlayerStore.VideoData.author),this.props.YouTubePlayerStore.CaptionTracks.length>1?i.a.createElement("h3",null,"Subtitles:"," ",this.props.YouTubePlayerStore.CaptionTracks.length>0?i.a.createElement(B.a,{native:!0,value:this.props.YouTubePlayerStore.CurrentCaptionTrack?this.props.YouTubePlayerStore.CurrentCaptionTrack.baseUrl:void 0,onChange:function(t){return e.props.YouTubePlayerStore.SetCurrentCaptionTrack(t.target.value)}},this.props.YouTubePlayerStore.CaptionTracks.map((function(e){return i.a.createElement("option",{key:e.baseUrl,value:e.baseUrl},e.name.simpleText)}))):i.a.createElement(i.a.Fragment,null)):"",i.a.createElement(D.a,{paragraph:!0},t.filter((function(t,n){return-1===e.props.YouTubePlayerStore.ShowCaptionTillEvent||n<e.props.YouTubePlayerStore.ShowCaptionTillEvent})).map((function(e,t){return i.a.createElement(G,{key:"e"+t,id:"e"+t,e:e})}))))}}]),n}(i.a.PureComponent))||L)||L,H=n(205),Z=n(206),q=n(207),$=n(109),K=n.n($),Q=n(103),X=n.n(Q),ee=n(104),te=n.n(ee),ne=n(105),re=n.n(ne),ae=n(106),oe=n.n(ae),ie=n(107),le=n.n(ie),se=Object(S.b)("YouTubePlayerStore")(z=Object(S.c)(z=function(e){Object(y.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(m.a)(this,n),(r=t.call(this,e)).p=void 0,r.p=e.YouTubePlayerStore,r}return Object(h.a)(n,[{key:"render",value:function(){return o.createElement(N.a,{color:"primary","aria-label":"outlined primary button group"},o.createElement(F.a,{onClick:this.p.PlayPrevCue},o.createElement(X.a,null)),o.createElement(F.a,{onClick:this.p.PlayCue},o.createElement(te.a,null)),this.p.PlayerStatus!==a.Playing?o.createElement(F.a,{onClick:this.p.PlayNextCue},o.createElement(re.a,null)):o.createElement(F.a,{onClick:this.p.Pause},o.createElement(oe.a,null)),o.createElement(F.a,{onClick:this.p.PlayNextCue},o.createElement(le.a,null)))}}]),n}(o.PureComponent))||z)||z,ue=n(108),ce=n.n(ue),pe=window.SpeechRecognition||window.webkitSpeechRecognition,de=window.SpeechGrammarList||window.webkitSpeechGrammarList,me=new pe,he=!1,ye=!1,fe=function(e){Object(y.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(m.a)(this,n),(r=t.call(this,e)).state={text:"",finalText:"",interimText:"",recognizing:!1},r.componentWillUnmount=function(){me.abort()},r.onstart=function(){console.log("SpeechMatcher onstart"),he=!0,ye=!1,r.setState({recognizing:!0})},r.onerror=function(e){console.log("SpeechMatcher onerror",e),r.setState({recognizing:!1})},r.onend=function(){console.log("SpeechMatcher onend"),he=!1,ye=!1,r.setState({recognizing:!1})},r.onresult=function(e){console.log("SpeechMatcher ",e.results);for(var t="",n="",a=e.resultIndex;a<e.results.length;++a)e.results[a].isFinal?t+=e.results[a][0].transcript:n+=e.results[a][0].transcript;var o=!1;switch(n.trim().toLowerCase()){case"next":r.props.onNext&&(o=!0,r.props.onNext());break;case"show":r.props.onShow&&(o=!0,r.props.onShow());break;case"repeat":r.props.onRepeat&&(o=!0,r.props.onRepeat())}""!==t&&r.props.onResult&&r.props.onResult(),_(n,r.state.text)||_(t,r.state.text)?r.props.onNext&&r.props.onNext():console.debug("SpeechMatcher check",t,n,r.state.text);var i=o?{finalText:"",interimText:""}:{finalText:t,interimText:n};r.setState(i)},me.lang="en-US",me.maxAlternatives=1,me.continuous=!0,me.interimResults=!0,me.onstart=r.onstart,me.onresult=r.onresult,me.onerror=r.onerror,me.onend=r.onend,me.onaudiostart=function(){return console.log("SpeechMatcher onaudiostart")},me.onaudioend=function(){return console.log("SpeechMatcher onaudioend")},me.onnomatch=function(){return console.log("SpeechMatcher onnomatch")},me.onsoundstart=function(){return console.log("SpeechMatcher onsoundstart")},me.onsoundend=function(){return console.log("SpeechMatcher onsoundend")},me.onspeechstart=function(){return console.log("SpeechMatcher onspeechstart")},me.onspeechend=function(){return console.log("SpeechMatcher onspeechend")},r}return Object(h.a)(n,[{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(F.a,null,i.a.createElement(ce.a,{color:this.state.recognizing?"secondary":"primary"})),i.a.createElement("span",null," ",this.state.finalText," "),i.a.createElement("span",{style:{color:"grey"}}," ",this.state.interimText," "))}}],[{key:"getDerivedStateFromProps",value:function(e,t){if(t.text!==e.text){console.log("SpeechMatcher recognition.abort();"),me.abort();var n="#JSGF V1.0; grammar phrase; public <phrase> = "+e.text+";",r=new de;return r.addFromString(n,1),me.grammars=r,{text:e.text,finalText:"",interimText:"",ItsStartOnPause:!1}}if(e.playerStatus===a.Paused&&!he&&!ye){try{console.log("SpeechMatcher recognition.start();"),me.start()}catch(o){console.error("SpeechMatcher",o)}ye=!0}return null}}]),n}(i.a.Component),Se=Object(S.b)("YouTubePlayerStore")(A=Object(S.c)(A=function(e){Object(y.a)(n,e);var t=Object(f.a)(n);function n(e){var r;return Object(m.a)(this,n),(r=t.call(this,e)).state={text:"",showSubtitles:!1},r.p=void 0,r.onShow=function(){r.setState({showSubtitles:!0})},r.p=e.YouTubePlayerStore,r}return Object(h.a)(n,[{key:"render",value:function(){return this.p.StudyStep!==r.WithSubtitles||0===this.p.TimedTextData.events.length||this.p.TimedTextData.events.length<=this.p.ShowCaptionTillEvent?o.createElement(o.Fragment,null):o.createElement(H.a,{variant:"outlined",id:"cue-form"},o.createElement(Z.a,null,o.createElement(D.a,{color:"textSecondary",gutterBottom:!0},"\u0422\u0435\u043a\u0443\u0449\u0430\u044f \u0444\u0440\u0430\u0437\u0430"),o.createElement(D.a,{variant:"h5",component:"h2"},o.createElement(F.a,{onClick:this.onShow},o.createElement(K.a,null)),this.state.showSubtitles?o.createElement("span",null,this.state.text):o.createElement("span",null,"\u043f\u0440\u043e\u0438\u0437\u043d\u0435\u0441\u0438\u0442\u0435, \u0447\u0442\u043e \u0441\u043a\u0430\u0437\u0430\u043b \u0433\u0435\u0440\u043e\u0439 \u0432\u0438\u0434\u0435\u043e, \u0441\u043a\u0430\u0436\u0438\u0442\u0435 ",o.createElement("i",null,o.createElement("b",null,"show"))," \u0438\u043b\u0438 \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \u043d\u0430 \u0433\u043b\u0430\u0437\u0438\u043a")),o.createElement(D.a,{color:"textSecondary",gutterBottom:!0},"\u0412\u044b \u043f\u0440\u043e\u0438\u0437\u043d\u0435\u0441\u043b\u0438"),o.createElement(D.a,{variant:"h5",component:"h2"},o.createElement(fe,{text:this.state.text,playerStatus:this.p.PlayerStatus,onShow:this.onShow,onResult:this.onShow,onNext:this.p.PlayNextCue,onRepeat:this.p.PlayCue})),o.createElement(D.a,{color:"textSecondary"},"\u041f\u043e\u0437\u0436\u0435, \u044f \u0434\u043e\u0431\u0430\u0432\u043b\u044e \u043f\u0435\u0440\u0435\u0432\u043e\u0434 \u0441\u0443\u0431\u0442\u0438\u0442\u0440\u043e\u0432 \u0438 \u0441\u043f\u0438\u0441\u043e\u043a \u0441\u043b\u043e\u0432. \u0410 \u043f\u043e\u043a\u0430 \u0441\u043e\u0432\u0435\u0442\u0443\u044e \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u0440\u0430\u0441\u0448\u0435\u0440\u0435\u043d\u0438\u0435 ",o.createElement("a",{href:"https://chrome.google.com/webstore/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb",target:"_blank",rel:"noopener noreferrer"},"Google Translate"))),o.createElement(q.a,null,o.createElement(se,null)))}}],[{key:"getDerivedStateFromProps",value:function(e,t){var n,r=(n=e.YouTubePlayerStore.TimedTextData.events[e.YouTubePlayerStore.ShowCaptionTillEvent])?n.segs.map((function(e){return e.utf8})).join(" "):"";return t.text!==r?{showSubtitles:!1,text:r}:null}}]),n}(o.PureComponent))||A)||A;function Te(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(u.a,null),i.a.createElement(c.a,{container:!0,className:"flex-section"},i.a.createElement(c.a,{item:!0,xs:4,className:"flex-col-scroll"},i.a.createElement(j,null),i.a.createElement(R,null)),i.a.createElement(c.a,{item:!0,xs:8,className:"flex-col-scroll"},i.a.createElement(J,null),i.a.createElement(Se,null))),i.a.createElement(d.a,{href:"//github.com/you-eng-com/you-eng-com",target:"_blank",position:"right"},"Fork me on GitHub"))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ve={YouTubePlayerStore:new function e(){var t=this;Object(m.a)(this,e),this.VideoId="CZ3wIuvmHeM",this.TimedTextData={events:[]},this.CurrentTimeMs=-1,this.Player=void 0,this.StudyStep=r.UnderstandTheContext,this.PlayerStatus=a.NotReady,this.CaptionTracks=[],this.CurrentCaptionTrack=void 0,this.VideoData={author:"",title:""},this.\u0421urrentCaptionTrackEventIndex=-1,this.playFromMyButtom=!1,this.ShowCaptionTillEvent=-1,this.SetTimedTextData=function(e){console.log("call setTimedTextData",e),t.TimedTextData=e||{events:[]},t.Set\u0421urrentCaptionTrackEventIndex(t.TimedTextData.events.findIndex((function(e){return t.CurrentTimeMs>=e.tStartMs})))},this.SetVideoId=function(e){if(11===e.length)t.VideoId=e;else{var n=function(e){var t=e.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/);return t&&11===t[1].length?t[1]:void 0}(e);n&&(t.VideoId=n)}window.history.pushState(null,"Title","?v="+t.VideoId),t.PlayerStatus=-1,t.SetCurrentTime(-1),function(e){return x.apply(this,arguments)}(t.VideoId).then((function(e){t.CaptionTracks=e;var n=void 0;if(console.log("captionTracks=",e),void 0!==e&&0!==e.length){n=e[0];for(var r=1;r<e.length;r++)"en"===e[r].languageCode&&"asr"===n.kind&&(n=e[r]);t.SetCurrentCaptionTrack(n.baseUrl)}else t.SetCurrentCaptionTrack(void 0)}))},this.SetCurrentCaptionTrack=function(e){void 0!==e?(t.CurrentCaptionTrack=t.CaptionTracks.find((function(t){return t.baseUrl===e})),function(e){return C.apply(this,arguments)}(e).then((function(e){return t.SetTimedTextData(e)})).catch((function(){console.log("getTimedtext error")}))):t.SetTimedTextData(void 0)},this.SetCurrentTime=function(e){if(t.CurrentTimeMs=e,-1===t.\u0421urrentCaptionTrackEventIndex||t.StudyStep!==r.WithSubtitles){var n=t.findTimedTextDataEventIndex(e);t.Set\u0421urrentCaptionTrackEventIndex(n)}t.StudyStep===r.WithSubtitles&&t.setPauseVideoTimer()},this.findTimedTextDataEventIndex=function(e){var n=performance.now();if(-1===e)return-1;var r=t.TimedTextData.events.findIndex((function(t){return e<=t.tStartMs}))-1;return console.log("findTimedTextDataEventIndex",r,"".concat(performance.now()-n," ms")),r},this.Set\u0421urrentCaptionTrackEventIndex=function(e){if(t.\u0421urrentCaptionTrackEventIndex!==e){var n=document.getElementById("e"+t.\u0421urrentCaptionTrackEventIndex);n&&n.classList.remove("currentCue");var r=document.getElementById("e"+e);r&&(r.classList.add("currentCue"),r.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})),t.\u0421urrentCaptionTrackEventIndex=e,console.log("\u0421urrentCaptionTrackEventIndex=",e),t.prepareCueForm()}},this.prepareCueForm=function(){t.StudyStep===r.WithSubtitles?(t.ShowCaptionTillEvent=t.\u0421urrentCaptionTrackEventIndex,setTimeout((function(){var e=document.getElementById("cue-form");e&&e.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})}),1)):t.ShowCaptionTillEvent=-1},this.SetPlayer=function(e){console.log("player",e),t.Player=e},this.SetStudyStep=function(e){console.log("studyStep",e),t.StudyStep=e,t.prepareCueForm()},this.SetPlayerStatus=function(e){if(console.log("playerStatus",e),t.PlayerStatus=e,t.Player.getVideoData){var n=t.Player.getVideoData();if(n&&(t.VideoData.author!==n.author&&(t.VideoData.author=n.author),t.VideoData.title!==n.title&&(t.VideoData.title=n.title)),e===a.Playing&&!t.playFromMyButtom&&t.StudyStep===r.WithSubtitles){var o=t.findTimedTextDataEventIndex(t.CurrentTimeMs);t.Set\u0421urrentCaptionTrackEventIndex(o)}}},this.PlayFullscreen=function(){t.Player&&t.Player.loadVideoById&&t.Player.playVideo(),t.Player.getIframe().requestFullscreen()},this.PlayPrevCue=function(){t.Set\u0421urrentCaptionTrackEventIndex(t.\u0421urrentCaptionTrackEventIndex-1),t.PlayCue()},this.PlayNextCue=function(){t.Set\u0421urrentCaptionTrackEventIndex(t.\u0421urrentCaptionTrackEventIndex+1),t.PlayCue()},this.deltaMs=100,this.timer=-1,this.setPauseVideoTimer=function(){var e=t.TimedTextData.events[t.\u0421urrentCaptionTrackEventIndex],n=t.TimedTextData.events[t.\u0421urrentCaptionTrackEventIndex+1];if(clearTimeout(t.timer),e){var r=n.tStartMs-e.tStartMs,a=e.tStartMs+(n&&e.dDurationMs>r?r:e.dDurationMs)+t.deltaMs;console.log("setPauseVideoTimer","eCurrent",Object.assign({},e),"timeForPauseMs",a,"eNext",Object.assign({},n),"start2Start",r,"pause after",a-t.CurrentTimeMs),a>t.CurrentTimeMs?t.timer=setTimeout(t.Pause,a-t.CurrentTimeMs):t.Pause()}},this.PlayCue=function(){if((t.\u0421urrentCaptionTrackEventIndex<0||t.\u0421urrentCaptionTrackEventIndex>=t.TimedTextData.events.length)&&t.Set\u0421urrentCaptionTrackEventIndex(0),0===t.TimedTextData.events.length)console.log("\u041e\u0448\u0438\u0431\u043a\u0430: \u0421\u0443\u0431\u0442\u0438\u0442\u0440\u044b \u043d\u0435 \u0441\u043a\u0430\u0447\u0430\u043d\u044b");else if(t.Player&&t.Player.loadVideoById){var e=t.TimedTextData.events[t.\u0421urrentCaptionTrackEventIndex];t.SetCurrentTime(e.tStartMs-t.deltaMs),t.Player.seekTo((e.tStartMs-t.deltaMs)/1e3,!0),t.playFromMyButtom=!0,setTimeout((function(){t.Player.playVideo(),t.setPauseVideoTimer()}),1)}},this.Pause=function(){t.Player&&t.Player.pauseVideo&&(console.log("pauseVideo",t.CurrentTimeMs),t.Player.pauseVideo(),t.timer=-1,t.playFromMyButtom=!1)},Object(g.l)(this),this.SetVideoId("CZ3wIuvmHeM")}};s.a.render(i.a.createElement(S.a,ve,i.a.createElement(i.a.StrictMode,null,i.a.createElement(Te,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[115,1,2]]]);
//# sourceMappingURL=main.1a6d1946.chunk.js.map