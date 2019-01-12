/*
 *Powered By CJ.
 *����:�ɼ�
 *2009-4-22
*/
String.prototype.trim = function (param) {
	switch (param) {
		case "L":
			return this.replace(/^\s+/g,"");
		case "R":
			return this.replace(/\s+$/g,"");
		case "F":
			return this.replace(/\s+/g,"");
		default:
			return this.replace(/^\s*(\S*)\s*/g,"$1");
	}
};
String.prototype.parseToDOM = function () {
	var container = document.create("div");
	container.innerHTML = this.toString();
	container = _get(container);
	container.clearWhiteSpace();
	if (container.childNodes.length == 1) {
		return container.firstChild;
	} else if (container.childNodes.length > 1) {
		var frag = document.createDocumentFragment();
		for (var i=0;i< container.childNodes.length;i++) {
			frag.appendChild(container.childNodes[i].cloneNode(true));
		}
		container = null;
		return frag;
	}
};
String.prototype.htmlEncode = function () {
	var t = document.create("div");
	t.appendChild(document.createTextNode(this.toString()));
	return t.innerHTML.replace(/\'/g,"&#39;").replace(/\"/g,"&quote;").replace(/\%/g,"&#37;").replace(/\?/g,"&#63;").replace(/\s+/g,"&nbsp;");
};
String.prototype.safeCode = function (param) {
	var str = this.toString();
	if (!param) return encodeURIComponent(encodeURIComponent(str));
	else return decodeURIComponent(decodeURIComponent(str));
};
String.prototype.addslashes = function () {
	return this.toString().replace(/\\/g,"\\\\").replace(/\"/g,"\\\"").replace(/\'/,"\\'");
};
String.prototype.nl2br = function () {
	return this.toString().replace(/\n\r/g,"<br />").replace(/\r\n/g,"<br />").replace(/\n/g,"<br />").replace(/\r/g,"<br />");
};
Array.prototype.each = function(fn,reArr) { //����ȥ��̫���õĺ���(����JavaScript 1.6�������Ƶ���������-- forEach ,every,some����filter,���ǵĹ��ܶ��������������ʵ��,������������������Ϊ����ֵ����,����Ϊ������,ֻ��û��ԭ�����ٶȿ�)
	if (!reArr) reArr = [];
	for (var i  in this) {
		if (!this.hasOwnProperty(i)) continue;
		var result = fn(this[i],i);
		if (result === false) break;
		if (typeof result == "undefined") continue;
		reArr.push(result);
	}
	return reArr;
};
Number.prototype.between = function (a,b,contain) {
	if (!contain) return (a < this.valueOf() && b > this.valueOf()) || (a > this.valueOf() && b < this.valueOf());
	else return (a <= this.valueOf() && b >= this.valueOf()) || (a >= this.valueOf() && b <= this.valueOf());
};
//�������ת����JSON�ַ���
Object.prototype.toJSON = function (obj,met) {
	obj = obj || this;
	var reStrArr = [];
	for (var i in obj) {
		if (!obj.hasOwnProperty(i))  continue;
		if (typeof obj[i] != "object") {
			reStrArr.push( "\""+i+"\":" +((typeof obj[i] != "string")?obj[i]:("\""+obj[i].toString().addslashes()+"\"")));
		} else {
			reStrArr.push("\""+i+"\":"+Object.toJSON(obj[i],1)); //��Ϊ��Щ���󲻾���ԭ�ͣ����Բ�һ����toJSON����
		}
	}
	var reStr = reStrArr.join(",");
	reStrArr = null;
	if (!met) reStr = "(function () { return {"+reStr+"}; })();";
	else reStr = "{"+reStr+"}";
	return reStr;
};
//�򵥲���һ�����������Ƿ���ȣ�ֻҪ������ȣ�����Ϊ����������ֵ��ȵ�
Object.prototype.equals = function (obj) {
	for (var i in this) {
		if (this.hasOwnProperty(i) != obj.hasOwnProperty(i)) return false;
		if (!this.hasOwnProperty(i)) continue;
		if (this[i].equals && this[i].equals(obj[i])) continue;
		if ( this[i] != obj[i] )  return false;
	}
	for (var i in obj) {
		if (!obj.hasOwnProperty(i)) continue;
		if (!this[i]) return false;
	}
	return true;
};


/*��Ӻ�ɾ��DOM�¼�*/
function addEvent(obj,evtype,fn,bubble) {
	if (typeof bubble != "undefined") { //�����ṩ�¼��Ƿ�ð�ݵı�ʶ,��˵������Ҫע���¼�����,���ҿ�����Ҫ����,�����ǹ��ϵ����ַ���.��ʵ������Dean Edwards��д���Ǹ�����,�Ѿ��ǳ���,��������֧�ֲ���(Ӧ���ڲ���Ҫ����ʱһֱʹ���������)
		if (obj.addEventListener) obj.addEventListener(evtype,fn,!!bubble);
		else if (obj.attachEvent) obj.attachEvent("on"+evtype,function () {
			fn(addEvent.fixEvent(window.event));
		});
	} else { //���´���(�Լ�delEvent,fixEvent.....����صĲ���)ΪDean Edwards ������,�������������һ��^0^
		if (!fn.$$eventID) fn.$$eventID = addEvent.eventsCounter++;
		if (!obj.events) obj.events={};
		if (!obj.events[evtype]) {
			obj.events[evtype] = [];
			if (obj["on"+evtype] && obj["on"+evtype] != addEvent.handleEvent) obj.events[evtype][0]=obj["on"+evtype];
		}
		obj.events[evtype][fn.$$eventID]=fn;
		obj["on"+evtype]=addEvent.handleEvent;
	}
}
addEvent.eventsCounter =1;
addEvent.fixEvent = function (evt) {
	evt.preventDefault =addEvent.fixEvent.preventDefault;
	evt.stopPropagation = addEvent.fixEvent.stopPropagation;
	evt.target = evt.srcElement;
	evt.pageX = evt.clientX+(document.documentElement.scrollLeft || document.body.scrollLeft);
	evt.pageY = evt.clientY+(document.documentElement.scrollTop || document.body.scrollTop);
	if (evt.target)	evt.layerX = evt.offsetX+evt.target.clientLeft; //�������Ұ�	Opera ��������
	if (evt.target)	evt.layerY = evt.offsetY+evt.target.clientTop;
	return evt;
};
addEvent.fixEvent.preventDefault = function () {
	this.returnValue = false;
};
addEvent.fixEvent.stopPropagation = function () {
	this.cancelBubble = true;
};

addEvent.handleEvent = function (evt) {
	evt = evt || addEvent.fixEvent(window.event);
	var reVal  = false;
	var obj = this;
	if (!obj.events || !obj.events[evt.type]) return false;
	var fns = obj.events[evt.type];
	fns.each(function (one,keyName) {
		//if (keyName.toString().indexOf("$$")==0) return; //Ϊ��$$��ͷ�����Ա���,��Ϊ����Ҫ�����������ı�ʶ
		if (one.call(obj,evt) === true) reVal = true;
	});
	return reVal;
};
function delEvent(obj,evtype,fn,bubble) {
	if (typeof bubble != "undefined") {
		if (obj.removeEventListener) obj.removeEventListener(evtype,fn,bubble || false);
		else if (obj.detachEvent) obj.detachEvent("on"+evtype,fn);
	} else {
		if (!obj.events || !obj.events[evtype]) return false;
		if (obj.events[evtype][fn.$$eventID]==fn) delete obj.events[evtype][fn.$$eventID];
	}
}

//������ʹ��Dean Edwards��д���Ǹ��¼�ע�ắ��,��ô�������������ͼ����ò�����
function stopBubble(evt) {  //��ֹ�¼�ð��
	if (evt.stopPropagation) evt.stopPropagation();
	else if (evt.srcElement) window.event.cancelBubble = true;
	else return false; 
}
function stopDefault(evt) {  //ȡ�������Ĭ����Ϊ
	if (evt.preventDefault) evt.preventDefault();
	else if (evt.srcElement) window.event.returnValue = false;
	else return false;
}
/*End EventFunctions*/




if (!HTMLElement) {
	var HTMLElement = function () {};
	HTMLElement.prototype = new Object();
}
HTMLElement.prototype._get = _get;
HTMLElement.prototype.trans =  trans;

//��ʵgetPos��moveTo����ֻ�����ڲ��ö�λ��Ԫ��,��Ϊ�����ö�λ��Ԫ������marginΪautoʱ�ڻ����Opera�н�û�а취�õ�����ֵ
HTMLElement.prototype.moveTo = function (finish,timeout,offParent) {
	//if (!this.offsetParent) return false;
	var de = document.documentElement;
	offParent = offParent || de;
	if (typeof finish.left == "string") {
		var parentWidth = (offParent==window)?(de.clientWidth || window.innerWidth || document.body.clientWidth):offParent.offsetWidth;
		var objWidth = this.offsetWidth;
		if (finish.left == "left") finish.left=0;
		else if (finish.left == "right") finish.left =  parentWidth  - objWidth;
		else if (finish.left == "center")finish.left = Math.round(( parentWidth  - objWidth)/2);
		else if (finish.left.indexOf("%")!=-1) finish.left = parseInt(( parentWidth  - objWidth)*parseInt(finish.left)/100);
	}
	if (typeof finish.top == "string" ) {
		var parentHeight = (offParent==window)?(de.clientHeight || window.innerHeight || document.body.clientHeight):offParent.offsetHeight;
		var objHeight = this.offsetHeight; 
		if (finish.top == "top") finish.top = 0;
		else if (finish.top == "bottom")finish.top = parentHeight - objHeight;
		else if (finish.top == "center") finish.top = Math.round(( parentHeight - objHeight)/2);
		else if (finish.top.indexOf("%")!=-1) finish.top = parseInt((parentHeight - objHeight)*parseInt(finish.top)/100);
	}
	var pos = this.getPos(offParent);
	if (pos.left == finish.left && pos.top == finish.top) return; //����Ŀǰ��λ�ú��յ����,��ִ��
	var start = {
		left:parseInt(this.getStyle("left")) || 0 ,
		top:parseInt(this.getStyle("top")) || 0 
	};
	finish.left = finish.left-pos.left+start.left +"px";
	finish.top = finish.top - pos.top+start.top + "px";
	start.left += "px";
	start.top += "px";
	if (Number(timeout)) {
		this.trans(start,finish,timeout);
	} else {
		this.style.left =finish.left;
		this.style.top = finish.top;
	}
};
HTMLElement.prototype.getPos = function (offParent) {
	var obj = this;
	var reObj = {
		left:0,
		top:0
	};
	while (obj) {
		reObj.left += obj.offsetLeft;
		reObj.top += obj.offsetTop;
		obj = obj.offsetParent;
	}
	var margin = {
		left:parseInt(this.getStyle("marginLeft")) || 0,
		top:parseInt(this.getStyle("marginTop"))  || 0
	};
	if (margin.left) reObj.left += margin.left;
	if (margin.top) reObj.top += margin.top;
	if (offParent) {
		if (offParent == window) {
			reObj.left -= document.documentElement.scrollLeft || document.body.scrollLeft;
			reObj.top -= document.documentElement.scrollTop || document.body.scrollTop;
		} else if (offParent != document.documentElement) {
			var offPos = _get(offParent).getPos();
			reObj.left -= offPos.left;
			reObj.top -= offPos.top;
		}
	}
	return reObj;
};//End of getPos

//��ȡ����¼�����ʱ�����Ŀ������ϵ�ƫ��(ʵ�����������ֻ��Opera������,��ΪEVENT����fixEvent��׼����)
HTMLElement.prototype.getEvtOffset = (document.attachEvent)?function (evt) {
	return  {
		left:evt.offsetX+parseInt(this.clientLeft),
		top:evt.offsetY+parseInt(this.clientTop)
	};
}:function (evt) {
	return  {
		left:(evt.offsetX || evt.layerX),  //��ΪIE��Opera����offsetX,��IE������߿����,��Opera������,������һ����Ҫ����
		top:(evt.offsetY || evt.layerY)
	};
};


//�й�className��һЩ�򵥷���
HTMLElement.prototype.hasClass  = function (cName) {
	return new RegExp("(\\b|^)"+cName+"(\\b|$)").test(this.className);
};
HTMLElement.prototype.addClass  = function (cName) {
	this.className += " "+cName;
	return this.className;
};
HTMLElement.prototype.delClass = function (cName) {
	var re = new RegExp("(\\b|^)"+cName+"(\\b|$)","g");
	this.className =  this.className.replace(re,"");
	return this.className;
};

/*һЩ��DOM�н��Ŀ�ݷ���*/
HTMLElement.prototype.clearWhiteSpace = function (obj) {	//������ı��ڵ�
	var obj = obj || this;
	if (!obj.tagName) return false;
	if (obj.noWhiteSpace || !obj.childNodes.length) return true;
	for (var i=0;i< obj.childNodes.length;i++) {
		var tmp = obj.childNodes[i];
		if (tmp.nodeType == 3 && (/^(\s|��)+$/).test(tmp.nodeValue)) tmp.parentNode.removeChild(tmp);
		else if (tmp.nodeType == 1) arguments.callee(tmp);
	}
	this.noWhiteSpace = true;
	return true;
};
HTMLElement.prototype.next = function (filter) { //filterΪ����Ľڵ�����ֵ ,Ԫ��Ϊ1,�ı��ڵ�Ϊ3
	this.clearWhiteSpace(this.parentNode);
	var nextObj = this.nextSibling;
	if (!filter) filter =1; //Ĭ��ֻѡ��Ԫ�ؽڵ�
	if (typeof filter=="string")  var prop = "tagName";
	else var  prop = "nodeType";
	while (nextObj && nextObj[prop] != filter) {
		nextObj = nextObj.nextSibling;
	}
	if (!nextObj) return null;
	return (nextObj.nodeType ==1)?_get(nextObj):nextObj;
};
HTMLElement.prototype.prev = function (filter) {
	this.clearWhiteSpace(this.parentNode);
	if (!filter) filter =1;
	if (typeof filter=="string") var prop = "tagName";
	else var prop = "nodeType";
	var prevObj =this.previousSibling;
	while (prevObj && prevObj[prop] != filter) {
		prevObj = prevObj.previousSibling;
	}
	if (!prevObj) return null;
	return (prevObj.nodeType == 1)?_get(prevObj):prevObj;
};
HTMLElement.prototype.seek = function (num) { //��Ԫ���ڲ��н�,��Ҫ���firstChild,����obj.seek(0)
	if (this.childNodes.length) {
		this.clearWhiteSpace();
		if (Number(num) >= 0) return _get(this.childNodes[num]);
		else if (num == "last") return _get(this.childNodes[this.childNodes.length-1]);
	} else return null;
};
HTMLElement.prototype.before = function (nodeObj) {
	this.parentNode.insertBefore(nodeObj,this);
};
HTMLElement.prototype.after = function (nodeObj) {
	var n = this.nextSibling;
	if (n) this.parentNode.insertBefore(nodeObj,n);
	else this.parentNode.appendChild(nodeObj);
};
HTMLElement.prototype.del = function (obj) {
	obj = obj || this;
	return obj.parentNode.removeChild(obj);
};
HTMLElement.prototype.attr = function (name,value,obj) {
	obj = obj || this;
	name = {"class":"className","for":"htmlFor","float":"cssFloat","text":"cssText"}[name] || name;
	if (typeof value == "undefined") {
		if (obj.getAttribute) return obj.getAttribute(name);
		else return obj[name] || "";
	} else {
		if (obj.setAttribute) return obj.setAttribute(name,value);
		else return obj[name]=value;
	}
};
//��ȡԪ��Ĭ����ʽ
HTMLElement.prototype.getStyle = function (name,obj) {  //���ڻ����Opera,Ԫ�ص�һЩֵΪautoʱ,��û�а취ȡ����,���Ǳ���Ϊ0
	obj = obj || this;
	if (obj[name]) return obj[name];
	else if (document.defaultView && document.defaultView.getComputedStyle) {
		name = name.replace(/([A-Z])/g,"-$1").toLowerCase();
		var s = document.defaultView.getComputedStyle(obj,"");
		return s && s.getPropertyValue(name);
	}
	else return obj.currentStyle && obj.currentStyle[name];
};

function trans(start,finish,timeout,obj) { //���Դ������style���Ե�CSS����ֵ����(����)Ч��,����֧��͸���Ⱦ��м��������������(���˾�);
	var obj = (this.tagName)?this:obj;
	var props = [];
	for (var i in start) {
		if (!finish.hasOwnProperty(i) ||  !start.hasOwnProperty(i)) continue;
		props.push({
			start:parseInt(start[i]),
			finish:parseInt(finish[i]),
			name:i.toString(),
			unit:getUnit(start[i])
		});
	}
	props.each(exe);
	function exe(one) {
		var add = (one.finish - one.start)/timeout*50;
		for (var i=0;i< parseInt(timeout/50);i++) {
			(function () {
				var val =  one.start+add*i;
				setTimeout(function () {
					obj.style[one.name] = Math.round(val)+one.unit;
				},i*50);
			})();
		}
		//ȷ������ֵΪfinish
		setTimeout(function () {
			obj.style[one.name] = one.finish+one.unit;
		},i*50);
	}
	function getUnit(str) {
		var re = /-?\d+\.?\d*/;
		return str.replace(re,"");
	}
}//End of trans



//����Ԫ��͸���Ⱥ�͸������ĺ���
HTMLElement.prototype.opacityTrans = function (start,finish,timeout) {
	var obj = this;
	var add = (finish-start)/timeout*50;
	for (var i=0;i< parseInt(timeout / 50);i++) {
		(function () {
			var num = Math.round(start + add*i);
			setTimeout(function () {obj.setOpacity(num)},i*50);
		})();
	}
	setTimeout(function () {obj.setOpacity(finish)},i*50);
};
HTMLElement.prototype.setOpacity = (document.all)?function(num) { this.style.filter = "alpha(opacity="+num+")" }:function(num) { this.style.opacity = num/100 };

document.create = (document.createElementNS)?function (strTag) { return document.createElementNS("http://www.w3.org/1999/xhtml",strTag)}:function (strTag) {return document.createElement(strTag)};

/*End HTMLElement.prototype Var*/
function _get(strTag,met) {
	var obj;
	var root=(this.tagName)?this:document;
	if (typeof strTag == "string") {
		met = (!_get.getMethod[met])?"id":met;
		obj = _get.getMethod[met](strTag,root);
	}
	if (!obj && typeof strTag == "object") obj = strTag;
	if (!obj || !obj.tagName) return obj;
	if (HTMLElement.constructor == Function && obj.prototype != HTMLElement.prototype) {
		if (obj.length && !obj.tagName) {
			for (var i=0;i< obj.length;i++) {
				if (obj[i] && obj[i].tagName) inherit(obj[i],HTMLElement);
			}
		} else inherit(obj,HTMLElement.prototype);
		obj.prototype = HTMLElement.prototype;
	}
	return obj;
	function inherit(child,parent) {		//��򵥡��ͼ��ķ����̳к���(��ʵֻ�Ƿ����Ŀ�¡����)
		for (var i in parent) {
			if (parent.hasOwnProperty(i) && parent[i]	&& parent[i].constructor == Function) {
				child[i]=parent[i];
			}
		}
		if (parent.prototype) inherit(child,parent.prototype);
		return child;
	}
}
_get.getMethod = {
	"id":function (strTag) {return _get(document.getElementById(strTag))},
	"t":function (strTag,root) {
		var partObj =[];
		var objs = root.getElementsByTagName(strTag);
		for (var i=0;i< objs.length;i++) {
			if (objs[i]) partObj.push(_get(objs[i]));
		}
		objs = null;
		return partObj;
	},
	"n":function (strTag) {
		var partObj =[];
		var objs = document.getElementsByName(strTag);
		for (var i=0;i< objs.length;i++) {
			if (objs[i]) partObj.push(_get(objs[i]));
		}
		objs =null;
		return partObj;
	},
	"c":(document.getElementsByClassName)?function (strTag,root) {
			var partObj=[];
			var objs;
			if (root.getElementsByClassName) objs= root.getElementsByClassName(strTag);
			if (!objs) return null;
			for (var i=0;i< objs.length;i++) {
				if (objs[i]) partObj.push(objs[i]);
			}
			objs=null;
			return partObj;
		}:function (strTag,root) {
			var partObj = [];
			var tmp = root.getElementsByTagName("*");
			var re = new RegExp("(^|\\b)"+strTag+"($|\\b)");
			for (var i=0;i< tmp.length;i++) {
				if (tmp[i] && tmp[i].className && re.test(tmp[i].className)) {
					partObj.push(_get(tmp[i]));
				}
			}
			tmp = null;
			return partObj;
		}
};
//End of _get

/*Start of DOMover*/
function DOMover(handle,obj) {
	obj = obj || handle;
	this.handle = (!!handle.prototype)?handle:_get(handle);
	this.handle.owner = this;
	this.obj =(!!obj.prototype)?obj:_get(obj);
	addEvent(this.handle,"mousedown",DOMover.regFn);
}
DOMover.prototype.setLimit = function (limitObj) {
	var l=t=-Infinity;
	var r=b=Infinity;
	if (limitObj.tagName || limitObj == window) {
		this.limitArea = function () {
			var de = document.documentElement;
			var bd = document.body;
			if (limitObj.tagName) {
				limitObj = _get(limitObj);
				var pos= limitObj.getPos();
			}
			var mover = DOMover.currentMover;
			var handle = mover.handle;
			var obj =mover.obj;
			var wid = Math.max(obj.offsetWidth+((handle.objOffset)?handle.objOffset.left:0),handle.offsetWidth);
			var hig = Math.max(obj.offsetHeight+((handle.objOffset)?handle.objOffset.top:0),handle.offsetHeight);
			return (limitObj.tagName)?{
				left:pos.left,
				right: pos.left+limitObj.clientWidth-wid,
				top: pos.top,
				bottom:pos.top+limitObj.clientHeight-hig
			}:{
				left: de.scrollLeft || bd.scrollLeft,
				right : (de.scrollLeft || bd.scrollLeft) + (window.innerWidth || de.clientWidth || bd.clientWidth)-wid,
				top : de.scrollTop || bd.scrollTop,
				bottom : (de.scrollTop || bd.scrollTop)+ (window.innerHeight || de.clientHeight || bd.clientHeight)-hig
			};
		};
	} else {
		l =limitObj.left;
		r = limitObj.right;
		t= limitObj.top;
		b = limitObj.bottom;
		this.limitArea = function () {
			return {
				left:l,
				right:r,
				top:t,
				bottom:b
			};
		};
	}
};
DOMover.prototype.setMovingClass = function (hc,oc) {
	this.handle.movingClass = hc || "";
	this.obj.movingClass = oc || hc || "";
};
DOMover.prototype.limitArea = function () {
	return  {
		left :  -Infinity,
		top :  -Infinity,
		right:Infinity,
		bottom:Infinity
	}
};
DOMover.prototype.free = function () {
	delEvent(this.handle,"mousedown",DOMover.regFn);
	delEvent(this.handle,"mousemove",DOMover.move);
	delEvent(this.handle,"mouseup",DOMover.clear);
	this.handle.evtOffset = null;
	this.handle.objOffset = null;
	this.handle.movingClass = null;
	this.obj.movingClass = null;
	for (var i in this) {
		delete this[i];
	}
};
DOMover.regFn = function (evt) {
	var handle = evt.target;
	if (!handle.tagName ||  !handle.owner || handle.owner.constructor != DOMover) return false;
	evt.preventDefault();
	DOMover.currentMover = handle.owner;
	if (handle.setCapture)	{
		handle.setCapture();//��֪��Ϊʲô,��IE������setCapture,�ڴ�ռ���ʾͽ�������
		addEvent(handle,"losecapture",DOMover.clear);
	}
	//else if (window.captureEvents) {
		//window.captureEvents(handle);  //���������captureEvents,�ڴ�й¶Ҳ�����
		//addEvent(window,"blur",DOMover.clear);
	//}
	handle.evtOffset = handle.getEvtOffset(evt);
	if (handle.movingClass) handle.addClass(handle.movingClass);
	var obj = handle.owner.obj;
	if (obj!= handle) {
		var handlePos = handle.getPos();
		var objPos = obj.getPos();
		var objOffset = {
			left : objPos.left-handlePos.left,
			top : objPos.top - handlePos.top
		};
		handle.objOffset = objOffset;
		if (obj.movingClass ) obj.addClass(obj.movingClass);
	}
	addEvent(document,"mousemove",DOMover.move);
	addEvent(document,"mouseup",DOMover.clear);
	//����갴��ʱȡ��ѡ������
	if (document.selection && document.selection.empty) document.selection.empty();  //IE
	else if (window.getSelection) window.getSelection().removeAllRanges(); //���
	return false;
};//End of DOMover.regFn
DOMover.clear = function (evt) {
	evt.preventDefault();
	delEvent(document,"mousemove",DOMover.move);
	delEvent(document,"mouseup",DOMover.clear);
	var handle = DOMover.currentMover.handle;
	var obj = handle.owner.obj;
	if (handle.movingClass) handle.delClass(handle.movingClass);
	if (obj.movingClass) obj.delClass(obj.movingClass);
	if (handle.releaseCapture) {
		delEvent(handle,"losecapture",DOMover.clear);
		handle.releaseCapture();
	} else if (window.releaseEvents) {
		delEvent(window,"blur",DOMover.clear);
		//window.releaseEvents(handle);
	}
	DOMover.currentMover = null;
	return false;
};//End of DOMover.clear
DOMover.move = function (evt) {
	var mover = DOMover.currentMover;
	if (!mover) return false;
	var handle = mover.handle;
	var obj = mover.obj;
	var des = {
		left :evt.pageX-handle.evtOffset.left,
		top:evt.pageY-handle.evtOffset.top
	};
	var limit = mover.limitArea();
	if (obj != handle) {
		var objDes = {
			left:des.left+handle.objOffset.left,
			top:des.top+handle.objOffset.top
		};
		if (des.left.between(limit.left,limit.right) && objDes.left.between(limit.left,limit.right)) {
			obj.style.left=objDes.left+"px";
			handle.style.left=des.left+"px";
		}
		if (des.top.between(limit.top,limit.bottom) && objDes.top.between(limit.top,limit.bottom)) {
			obj.style.top=objDes.top+"px";
			handle.style.top=des.top+"px";
		}
	} else {
		if (des.left.between(limit.left,limit.right)) handle.style.left=des.left+"px";
		if (des.top.between(limit.top,limit.bottom)) handle.style.top=des.top+"px";
	}
	return false;
};//End of DOMover.move
/*End of DOMover*/


function getCookie(name) {	//����ASP�е�cookie�ֵ��������ͬ�ķ�ʽ��ȡ -> getCookie("name1")("name2")  --����ֻ����һ����,��������Ͳ�������,����Ҳû�Ǹ���Ҫ
	function temp() {return false}
	temp.toString = function () {return ""};
	if (document.cookie == "") return temp;
	var cookies = document.cookie.split("; "); //������һ���ֺż�һ���ո�!
	for (var i=0;i< cookies.length;i++) {
		var content =cookies[i].split("=");
		if (content[0] != name) continue;
		if (content.length == 2) {
			temp.toString = function () { return content[1].toString().safeCode(true) };
			return temp;
		}
		if (content.length > 2) {
			content = cookies[i].substr(cookies[i].indexOf("=")+1).toString().safeCode(true);
			var returnFn = function (childName) {
				var children = content.split("&");
				for (var i=0;i< children.length;i++) {
					var child = children[i].split("=");
					if (child[0]==childName) return child[1];
				}
				return false;
			};
			returnFn.toString = function() {
				return content;
			};
			return returnFn;
		}
	}
	return temp;
}
function setCookie(name,value,expires) {  //���Ҳ�ǿ�������ASP�е��ֵ�cookie��,ֻ�Ƿ�����һ��----->setCookie("parent;childName","childValue")--��Ӧȡ�ķ�������getCookie("parent")("childName")--->��Ϊcookie��һ���ò����ֺ�(Ҳ������ֱ����),�������������ָ���
	if (typeof value=="undefined") value="";
	value = value.toString().safeCode();
	if (name.indexOf(";") != -1) {
		name = name.split(";");
		if (name.length >2) return false;
		var cookies = document.cookie.split("; ");
		for (var i=0;i< cookies.length;i++) {
			var content = cookies[i].split("=");
			if (content.length > 2 && content[0] == name[0]) {
				content = cookies[i].substr(cookies[i].indexOf("=")+1);
				content = content.split("&");
				var tempstr=[];
				for (var j=0;j< content.length;j++) {
					var child = content[j].split("=");
					if (child[0] == name[1]) child[1]=value;
					tempstr.push(child.join("="));
				}
				tempstr = tempstr.join("&");
				if (tempstr.indexOf(name[1]+"=")== -1) tempstr += "&"+name[1]+"="+value;
				value = tempstr;
				name=name[0];
				break;
			}
		}
		if (name.constructor == Array) { // �ڻ���������(�Լ�����Gecko,KHTML���ĵ������,����Chrome)�и�����ֵĵط�,�������Ƶ�����ת��:�����ַ���ʹ�������±�ʱ,�����������Զ�����ת��һ������Ԫ�ַ���ÿ���ַ�������;��var str = "abcdef",str[0]Ϊa,str[1]Ϊb
			value = name[1]+"="+value;
			name=name[0];
		}
	}
	if (typeof expires =="undefined")  document.cookie = name+"="+value;
	else if (parse(expires)) document.cookie = name+"="+value+";expires="+parse(expires).toUTCString();
	else {
		expires = new Date();
		expires.setMonth(expires.getMonth()+6);
		document.cookie = name+"="+value+";expires="+expires.toUTCString();
	}
	return false;
}


function myAjax(url,callBack,method) {
	var newXHR;
	try { newXHR = new XMLHttpRequest; }
	catch(e) {
		try { newXHR = new ActiveXObject("Msxml3.XMLHTTP"); }
		catch(e) {
			try { newXHR = new ActiveXObject("Msxml2.XMLHTTP"); }
			catch(e) {
				try { newXHR = new ActiveXObject("Microsoft.XMLHTTP"); }
				catch(e) {
					alert("Error : "+e.number+"\n"+e.description);
					//showMyStatus( '�ܱ�Ǹ,�����������֧�ֱ���վ��һЩ�߼�����(XMLHttpRequest),��Щ���ܿ��ܶ������а���,�����Ե��<a href="http://www.google.cn/search?ie=utf-8&oe=UTF-8&hl=zh-CN&q='+encodeURI("���°��������")+'">����</a>����֧�ָù��ܵ��ִ������!');
					return false;
				}
			}
		}
	}
	if (!method) method="get";
	else if (method !="post") method="put";
	newXHR.open(method,url,true);
	//newXHR.isTimeOut = false; //��IE�в������ActiveXObject ����Զ�������
	//setTimeout(function () {
	//	if (newXHR) newXHR.isTimeOut = true;
	//},5000);
	if (method=="post") newXHR.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	newXHR.onreadystatechange = function() {
		if (newXHR.readyState == 4 ) {
			var win = window.open("","win","width=400,height=400,scrollbars=yes");
			win.document.write(newXHR.responseText);
		}
		if (newXHR.readyState == 4 && newXHR.status==200) {
			callBack(newXHR);
		} else if (location.protocol == "file:" && newXHR.readyState == 4) {
			//showMyStatus("��������ɹ�!");
			callBack(newXHR);
		}/* else if (newXHR.status == 304) {
			//showMyStatus("�ĵ�δ�޸�!");
		} else if (newXHR.status > 200 && newXHR.status <= 300) {
			//showMyStatus("A little Error ! HTTP "+newXHR.status+" ����!");
			callBack(newXHR);
		} else if (newXHR.isTimeOut) {
			//showMyStatus("����ʱ!һ���Ӻ�����!");
		} else if (newXHR.onerror && newXHR.onerror.constructor == Function) {
			newXHR.onerror(newXHR);
		}  else {
			//showMyStatus("δ֪����!����ʧ��!");
		}*/
	};
	if (method=="get") newXHR.send(null);
	return newXHR;
}


function addFav(address,name) {
	if (window.sidebar) return window.sidebar.addPanel(name,address,""); //�ж�˳���ܴ�,��Ϊ�����windowҲ��external����,��û��addFavorite����,����IE���ж�external��addFavorite����ʱ�����
	else if (window.external) return window.external.addFavorite(address,name);
	return false;
}

function setHomePage(obj,url){
	try{
		obj.style.behavior='url(#default#homepage)';
		obj.setHomePage(url);
	}
	catch(e){
		if(window.netscape) {
			try { netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); }  
			catch (e) { alert("��Ǹ�������������֧��ֱ����Ϊ��ҳ������Ҫ�Լ�����!"); }
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage',url);
		}
	}
}