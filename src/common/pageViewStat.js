

let gaPromise;
export function gaInit(){	
	gaPromise=new Promise((resolve)=>{
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.onload=gaReady;j.src=
		'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-54J8VK');

		function gaReady(){
			resolve();
		}
	});		
}

export function sendPageView(){
	if(!gaPromise)
		throw new Error('ga is not init!');
	let path=location.pathname,
   		hash=location.hash;
	gaPromise.then(()=>{
		try{				   						
			ga('create', 'UA-80008755-2', 'auto');
			ga('create', 'UA-40178411-1', 'auto' ,'clientTracker');
			ga('set', 'page',path+hash);
			ga('clientTracker.set', 'page',path+hash);
			ga('send', 'pageview');
			ga('clientTracker.send', 'pageview');					   			
		}catch(e){
			console.log(e)
		}
	})
}


export function fxInit(){
	/*代码部署1*/
	var _fxcmd=_fxcmd||[];
	_fxcmd.sid='043118173285ce9cda35a6e6ea65c64c';
	_fxcmd.trackAll=true;
	_fxcmd.fct=21600;
	 // 参数配置(可选)...
	 // 追踪配置(可选)...
	 (function () {
	   var _pzfx=document['createElement']('script');
	   _pzfx.type='text/javascript';
	   _pzfx.async=true;
	   _pzfx.src='//static.w3t.cn/fx/1/1/fx.js';
	  var sc=document.getElementsByTagName('script')[0];
	  sc.parentNode.insertBefore(_pzfx,sc);
	})();
}

export function gwdInit(){
	/*代码部署2 2016/6/30*/
    var _gsq = _gsq || [];
    (function () {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = (location.protocol == 'https:' ? 'https://ssl.' : 'http://static.') + 'gridsumdissector.com/js/Clients/GWD-002847-3AFBB4/gs.js';
        var    firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(s, firstScript);
    })();
}

