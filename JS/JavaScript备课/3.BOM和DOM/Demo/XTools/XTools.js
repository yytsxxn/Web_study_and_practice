/*
XTools Library v1.0 2009-7-1
�����ռ�:XT
*/


{/*
��չString���һЩ����
*/
//ltrim����ַ�����ߵĿհ��ַ�
((String.prototype.ltrim = function () {return this.replace(arguments.callee.re,"")}).re = new RegExp()).compile("^\\s+","gi");

//rtrim����ַ����ұߵĿհ��ַ�
((String.prototype.rtrim = function () {return this.replace(arguments.callee.re,"")}).re = new RegExp()).compile("\\s+$","gi");

//ftrim����ַ��������пհ��ַ�
((String.prototype.ftrim = function () {return this.replace(arguments.callee.re,"")}).re = new RegExp()).compile("\\s","gi");

//trim����ַ������ߵĿհ��ַ�
String.prototype.trim = function () {return this.ltrim().rtrim()};

//repeat�����ظ�һ���ַ���,����һ�����ֱ�ʾ�ظ�����
String.prototype.repeat = function (num) {
	return (new Array(num+1)).join(this);
};

//�µ�replace���������滻,���滻ǰ�ȱ�����ǰ����������
String.prototype.__Replace = String.prototype.replace;
String.prototype.replace = function (a,b) {
	var reStr=this;
	if (b instanceof Array && a instanceof Array) {
		//ʹ�������滻ʱ�贫����������
		for (var i=0;i< a.length;i++) {
			reStr = reStr.__Replace(a[i],b[i]?b[i]:"");
		}
	} else {
		reStr = reStr.__Replace(a,b);
	}
	return reStr;
};
//encodeHTML���ַ�����HTML�����ַ�ת����ʵ������
String.prototype.encodeHTML = function () {
	var specailChars=[/&/g,/</g,/>/g,/\"/g,/\'/,/\%/g,/\?/g];
	var entityRefs=["&amp;","&lt;","&gt;","&quote;","&#39;","&#37;","&#63;"];
	return this.replace(specailChars,entityRefs);
};
}//������ECMAScript���ö���Stringԭ�͵���չ


if (typeof window.XT!="undefined") {//�鿴�Ƿ��Ѿ�����ȫ�ֱ���XT
	throw new Error("�����ռ�XT�Ѿ���ʹ��");
}
//���������ռ�XT
var XT = function () {
	//��XT����Ϊһ������,��ΪDOMѡ�������,������������,��XT.$���������е�����
	return arguments.callee.$.apply(this,arguments);
};
//XT��������

(function (NS) {
/*
�����ռ俪ʼ,NS(NameSpace)��ʾ�����ռ���������(window.XT)
�������ռ���� window.XT��Ϊ���������ȥ
����,��ʹҪ�޸������ռ�����,�ڲ������Բ���Ӱ��
*/

/*
��undefined,window��Ϊ�ֲ�����
����,������ִ��ʱ,����undefined,window��Щ���õĶ���ʱ�����ܳ���ǰ����������
��ȫ����������window�ǲ��ܸ��ǵ�,���ھֲ������������,ע�������thisҲ��ָ��ȫ��window
var undefinedֻ������û�и�ֵ,����ֵ����undefined
*/
var undefined,window=this;

//cloneProperty���ڴ�from�����Ͽ�¡���Ե�desc����
function cloneProperty(desc,from) {
	if (desc.length && typeof desc=="object") {//��descΪ����ʱ����������¡
		for (var i=0,len=desc.length;i<len;i++) {
			cloneProperty(desc[i],from);
		}
	} else {
		for (var i in from) {
			if (from.hasOwnProperty(i)) {
				desc[i]=from[i];
			}
		}
	}
	return desc;
}
NS.cloneProperty = cloneProperty;

//��������
var Browser = {
	//IE��Opera������attachEvent����
	IE:!!(navigator.userAgent.indexOf('MSIE') > -1 && window.attachEvent && !window.opera),
	Opera:!!window.opera,//��Opera����operaȫ�ֶ���
	KHTML:navigator.userAgent.indexOf('KHTML') > -1,
	//ʹ��KHTML��������������userAgent�ַ����а����ַ���"like Cecko"
	Gecko:navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1
};
NS.Browser = Browser;



/*
��������ӵ�HTMLElement��ԭ���������ʹ����DOMԪ�ؼ̳и÷���(��Ȼ�������������Ͻ�,��ȷʵ�ܷ���)
IE��֧��HTMLElementԭ��,��������ʱ����,������֧��HTML DOM�������,HTMLElement.prototype�ϵķ������Զ���DOMԪ�ؼ̳�
����IE����Ҫ�ֶ���HTMLElement.prototype�Ͽ�¡����
*/
if (typeof HTMLElement=="undefined") {
	window.HTMLElement =function () {};
	//IE���޸����õĻ�ȡDOMԪ�صķ���,���޸�ǰ�ȱ���ԭ������������
	document.__getElementById = document.getElementById;
	document.__getElementsByTagName = document.getElementsByTagName;
	document.__getElementsByName = document.getElementsByName;
	document.getElementById = function (id) {
		return $.getObj(document.__getElementById(id));
	};
	document.getElementsByTagName = function (tag) {
		return $.getObj(document.__getElementsByTagName(tag));
	};
	document.getElementsByName = function (name) {
		return $.getObj(document.__getElementsByName(name));
	};
	document.getElementsByClassName = function () {//ΪIE����һ����ͨ��������ȡԪ�صķ���
		return $C.apply(this,arguments);
	};
}
var HEP = HTMLElement.prototype;//ΪHTMLElement.prototype�����̵�����



{//$��һ��DOMԪ��ѡ����
function $() {
	var args = arguments;
	if (!args.length) {
		return document;//û���κβ���ʱ����document
	}
	if (args.length==1) {
		//ֻ��һ���ַ�������ʱӦ���Ǵ���Ԫ�ص�ID,Ȼ�����Ԫ�ط���
		if (typeof args[0]=="string") {
			return $.getObj(document.getElementById(args[0]));
		}
		//����һ������ʱ����$.getObjȥ����
		if (typeof args[0]=="object") {
			return $.getObj(args[0]);
		}
	}
	//���ж������ʱ,���Ƿ���tagName��className������Ҫ���Ԫ��
	var tag = args[0];//��һ��������tagName
	var cn = args[1];//�ڶ���������className
	var context = args[2] || this.tagName?this:document;
	var allTags = context.getElementsByTagName(tag);
	var re = new RegExp();
	var reArr=[];
	re.compile("\\b"+cn+"\\b");
	var len = allTags.length;
	for (var i=0;i<len;i++) {
		if (re.test(allTags[i].className)) {
			reArr.push($.getObj(allTags[i]));
		}
	}
	return reArr;
}
//$.getObj��Ϊ��$�Ĳ���ֻ��һ�������Ƕ���ʱ,�ж��Ƿ���Ҫ��HTMLElement.prototype�Ͽ�¡����
$.getObj = (HTMLElement.constructor == Function)?function (obj) {
	if (!obj) {return null;}
	if (obj.length && !obj.nodeType) {//objΪ����ʱʵ��������¡
		for (var i=0,len=obj.length;i<len;i++) {
			$.getObj(obj[i]);
		}
		return obj;
	}
	if (obj.nodeType != 1) {return obj;}//������Ԫ�ؽڵ�,�������չһЩ����,�ı��ڵ㲻���
	//�ڲ�֧��HTMLElement���������,HTMLElement���ֶ�������,��IE��ʱ$.getObj�ͻ�ʹ�ô˺���
	if (obj.constructor == HTMLElement) {
		return obj;//���ƹ�������,�Ͳ����ٸ�����
	}
	obj.constructor = HTMLElement;//����һ����Ǳ����Ѿ���¡��������
	return cloneProperty(obj,HEP);
}:function (obj) {
	//��֧��HTMLElement��������л��Զ��̳�HTMLElement.prototype�ϵ�����,����ֻҪ���䷵�ؼ���
	return obj;
};
NS.$=HEP.$= $;

//ͨ��className����ȡԪ�صķ���
var $C = (HTMLElement.constructor != Function)?function (cn) {//�������getElementsByClassName����,����ֱ��ʹ��
	return this.getElementsByClassName(cn);
}:function (cn) {
	var allTags = this.getElementsByTagName("*");
	var reArr = [];
	var re = new RegExp();
	re.compile("\\b"+cn+"\\b");
	for (var i=0,len=allTags.length;i<len;i++) {
		if (re.test(allTags[i].className)) {
			reArr.push(allTags[i]);
		}
	}
	return reArr;
};
NS.$C=HEP.$C= $C;//����������ÿ��DOM�����ϵ��ø÷���,������Ӧ��contextҲ���ɸ�DOM����

//$T��ͨ��HTML��tagName����ȡԪ��
function $T(tag) {
	return $.getObj(this.getElementsByTagName(String(tag).toUpperCase()));
}
NS.$T=HEP.$T = $T;
//$N��������name��ѡ��Ԫ��
function $N(name) {
	return this.getElementsByName(name);
}
NS.$N=HEP.$N = $N;
//$A����������������ֵѡ��Ԫ��
function $A(attrName,attrVal) {
	var allTags = this.$T("*");
	var reArr=[];
	for (var i=0,len=allTags.length;i<len;i++) {
		if (allTags[i] && allTags[i].attr(attrName)==attrVal) {
			reArr.push(allTags[i]);
		}
	}
	return reArr;
}
NS.$A = HEP.$A = $A;
}//ѡ��������

{//Event Start
function addEvent(evtype,fn,useCapture) {
	var obj = this;//������Ǹ���ǰ��������¼�����,����ʹ��addEvent.call(...)
	if (typeof useCapture!="undefined" && obj.addEventListener) {
		obj.addEventListener(evtype,fn,!!useCapture);
	} else {
		if (!fn.__EventID) {//ʹ��һ���Զ������ı�ʶ����־ÿ������
			fn.__EventID =addEvent.__EventCounter++;//���ID��Ψһ��
		}
		if (!obj.__EventHandles) {
			//__EventHandles�����������������¼�������������
			obj.__EventHandles={};
		}
		//���������¼����ͷ�������obj.__EventHandles����
		if (!obj.__EventHandles[evtype]) {
			obj.__EventHandles[evtype]=[];
			if (obj["on"+evtype]) {//��֮ǰ��ע��ĺ�����ӵ�0λ
				obj.__EventHandles[evtype][0]=obj["on"+evtype];
			}
			obj["on"+evtype]=addEvent.__ExecFns;
		}
		obj.__EventHandles[evtype][fn.__EventID]=fn;
	}
	return obj;
}
addEvent.__EventCounter = 1;//���¼������������Զ����,0λ��������
//addEvent.__ExecFns �����¼�����ʱִ�ж���__EventHandles�����Ӧ�����еĺ���,����this���¼����󴫽�ȥ
addEvent.__ExecFns = function (evt) {
	evt = addEvent.__FixEvent(evt || window.event);//���¼������׼��
	if (!this.__EventHandles || !this.__EventHandles[evt.type]) {return false;}
	var fns = this.__EventHandles[evt.type];
	var len=fns.length;
	for (var i=0;i< len;i++) {
		if (fns[i]) {
			fns[i].call(this,evt);//�ں����ڲ���this����ָ��ע�ᵽ�Ķ�����,��evtҲ�ǵڸ�����
		}
	}
};
//addEvent.__FixEvent���ڽ��¼������׼��,��ʹ��IE��FF��ʹ��ͬһ�ַ�ʽ�����¼����������
addEvent.__FixEvent = function (evt) {
	if (!evt.target) {
		evt.target = evt.srcElement;
		evt.preventDefault = addEvent.__FixEvent.preventDefault;
		evt.stopPropagation = addEvent.__FixEvent.stopPropagation;
		if (evt.type == "mouseover") {
			evt.relatedTarget = evt.fromElement;
		} else if (evt.type =="mouseout") {
			evt.relatedTarget = evt.toElement;
		}
		evt.charCode =  (evt.type=="keypress")?evt.keyCode:0;
		evt.eventPhase = 2;//IE��������ð�ݽ׶�
		evt.timeStamp = (new Date()).getTime();//��������Ϊ��ǰʱ��
		evt.pageX = evt.clientX+document.documentElement.scrollLeft;
		evt.pageY = evt.clientY+document.documentElement.scrollTop;
	}
	if (evt.offsetX) {//IE��Opera������offsetX����,�������������ͬ����,���ǵ�offset���Բ������߿�
		evt.layerX = evt.offsetX+evt.target.clientLeft;
		evt.layerY = evt.offsetY+evt.target.clientTop;
	}
	return evt;
};
addEvent.__FixEvent.preventDefault =function () {//��ֹ�����Ĭ����Ϊ
	this.returnValue = false;//�����thisָ����ĳ���¼����󣬶�����__FixEvent
};
addEvent.__FixEvent.stopPropagation =function () {//ֹͣ�¼�����
	this.cancelBubble = true;
};
//delEvent���ڴӶ�����ɾ���¼�������
function delEvent(evtype,fn,useCapture) {
	var obj = this;
	if (typeof useCapture!="undefined" && obj.addEventListener) {
		obj.removeEventListener(evtype,fn,!!useCapture);
	} else {
		if (obj.__EventHandles && obj.__EventHandles[evtype]) {
			delete obj.__EventHandles[evtype][fn.__EventID];
		}
	}
	return obj;
}
NS.addEvent=HEP.addEvent = addEvent;
NS.delEvent =HEP.delEvent  =delEvent;
//DOMContentLoaded�¼�
function addLoadEvent(fn) {
	if (addLoadEvent.__Done) {
		fn();
		return NS;
	}
	if (!fn.__EventID) {
		fn.__EventID=addEvent.__EventCounter++;
	};
	addLoadEvent.__EventHandles[fn.__EventID] = fn;
	if (addLoadEvent.__Added) {
		return NS;
	}
	if (document.addEventListener) {
		document.addEventListener("DOMContentLoaded", addLoadEvent.__ExecFns, false);
	} else if (Browser.IE) {
		/*@cc_on @*/
		/*@if (@_win32)
			document.write("<script id=\"__XT_IE_Load\" defer=\"defer\" src=\"javascript:void(0)\"><\/scr"+"ipt>");
			addLoadEvent.__IEScript = document.getElementById("__XT_IE_Load");
			addLoadEvent.__IEScript.onreadystatechange = function() {
				if (this.readyState == "complete") {
					addLoadEvent.__ExecFns();
				}
			};
		/*@end @*/
	} else if (Browser.KHTML) {
		addLoadEvent.__KTimer = setInterval(function () {
			if (/loaded|complete/.test(document.readyState)) {
				addLoadEvent.__ExecFns();
			}
		},10);
	}
	addEvent.call(window,"load",addLoadEvent.__ExecFns);
	addLoadEvent.__Added = true;
	return NS;
}
addLoadEvent.__EventHandles=[];
addLoadEvent.__ExecFns = function () {
	if (addLoadEvent.__Done) {return;}
	addLoadEvent.__Done=true;
	var fns=addLoadEvent.__EventHandles;
	for (var i=0,len=fns.length;i<len;i++) {
		if (fns[i]) {
			fns[i]();
			delete fns[i];
		}
	}
	if (addLoadEvent.__IEScript) {
		addLoadEvent.__IEScript.onreadystatechange = null;
		addLoadEvent.__IEScript.del();
		addLoadEvent.__IEScript=null;
	}
	if (addLoadEvent.__KTimer) {
		clearInterval(addLoadEvent.__KTimer);
	}
};
function delLoadEvent(fn) {
	delete addLoadEvent.__EventHandles[fn.__EventID];
	return NS;
}
NS.addLoadEvent = addLoadEvent;
NS.delLoadEvent = delLoadEvent;
}//Event End

{//Style Start
//getRealStyle ���Ի�ȡԪ�ص�CSS������ʽ��ʵ��ֵ
function getRealStyle(name) {
	obj = this;
	if (obj.style[name]) {
		return obj.style[name];
	} else if (document.defaultView && document.defaultView.getComputedStyle) {
		name = name.replace(/([A-Z])/g,"-$1").toLowerCase();
		var s = document.defaultView.getComputedStyle(obj,"");
		return s && s.getPropertyValue(name);
	} else {
		return obj.currentStyle && obj.currentStyle[name];
	}
}
NS.getRealStyle = HEP.getRealStyle = getRealStyle;
//getStyleSheet������ȡҳ�����ʽ��
function getStyleSheet() {
	if (!document.styleSheets) {
		return null;
	}
	var args = arguments;
	var sheets= document.styleSheets;
	if (typeof args[0]=="number") {
		return getStyleSheet.__FixStyleSheet(sheets[args[0]]);
	}
	var property = "";
	if (String(args[0]).indexOf(".")>-1) {
		property="href";
	} else {
		property="id";
	}
	for (var i=0,len = sheets.length;i<len;i++) {
		if (sheets[i] && sheets[i][property]==args[0]) {
			return sheets[i];
		}
	}
}
getStyleSheet.__FixStyleSheet = function (sheet) {
	if (sheet.addRule) {//IE
		sheet.ownerNode =sheet.owningElement;
		sheet.cssRules = sheet.rules;
		sheet.insertRule = getStyleSheet.__insertRule;
		sheet.deleteRule = getStyleSheet.__deleteRule;
	}
	return sheet;
};
getStyleSheet.__insertRule = function (cssText,index) {
	var arr =arguments.callee.re.exec(cssText);
	var selector = String(arr[1]).trim();
	var declarations = String(arr[2]).trim();
	this.addRule(selector,declarations,index);
	return this;
};
getStyleSheet.__deleteRule=function (index) {
	this.removeRule(index);
};
(getStyleSheet.__insertRule.re =new RegExp()).compile("([^{]+)(\\{[^}]+\\})","i");
NS.getStyleSheet=getStyleSheet;
//setStyle��������һ�θ�Ԫ��style�������Ӷ��CSS
function setStyle(cssObj,obj) {
	obj = this;
	for (var i in cssObj) {
		if (cssObj.hasOwnProperty(i)) {
			obj.style[i]=cssObj[i];
		}
	}
	return obj;
}
NS.setStyle = HEP.setStyle = setStyle;
function hide() {
	this.style.display="none";
}
NS.hide = HEP.hide = hide;
function show() {
	this.style.display = "block";
}
NS.show = HEP.show = show;
}//Style End

{//Node Start
//attr��ֻ����������ʱ��������ֵ,������������������ֵʱ�����ö��������ֵ
function attr(name,val) {
	var args = arguments;
	var quiksName = {"class":"className","for":"htmlFor","float":"cssFloat","text":"cssText"}[name] || name;
	if (args.length===1)  {
		if (this.getAttribute) {
			return this.getAttribute(name);
		} else {
			return this[quiksName] || "";
		}
	} else if (args.length===2) {
		if (this.setAttribute) {
			this.setAttribute(name,val)
		} else {
			this[quiksName]=val;
		}
	}
	return this;
}
NS.attr=HEP.attr = attr;
//clearSpaceNode ������ı��ڵ�
function clearSpaceNode() {
	if (this.__NoWhiteSpace) {return;}
	var obj = this.firstChild;
	var tmp;
	if (!obj) {return;}
	do {
		tmp = obj.nextSibling;
		if (obj.nodeType===3 && !arguments.callee.re.test(obj.nodeValue)) {
			this.removeChild(obj);
		}
		obj = tmp;
	} while (obj)
	obj=tmp=null;
	this.__NoWhiteSpace =true;//����һ����Ǳ����Ѿ���������ı��ڵ���
}
(clearSpaceNode.re = new RegExp()).compile("\\S","i");
NS.clearSpaceNode=clearSpaceNode;
//walk������ȡ�ڵ���ֵܽڵ�,Ĭ�ϻ�ȡԪ�ؽڵ�,��ָ���ڵ����ͻ�Ԫ������
function walk(filter) {
	clearSpaceNode.call(this.parentNode);
	var args = arguments;
	if (filter) {
		return this[args[2]];
	}
	var nextObj=this;
	do {
		nextObj=nextObj[args[2]];
	} while (nextObj && nextObj.nodeType != 1)
	return $.getObj(nextObj);
}
function next() {
	var args = arguments;
	return walk.apply(this,[args[0],args[1],"nextSibling"]);
}
function prev() {
	var args = arguments;
	return walk.apply(this,[args[0],args[1],"previousSibling"]);
}
function getChildren(filter) {
	clearSpaceNode.call(this);
	var nodes = this.childNodes;
	if (filter) {
		return nodes;
	}
	var reArr=[];
	for (var i=0,len=nodes.length;i<len;i++) {
		if (nodes[i].nodeType == 1) {
			reArr.push($.getObj(nodes[i]));
		}
	}
	return reArr;
}
function first(filter) {
	return this.getChildren(filter)[0];
}
function last(filter) {
	var children = this.getChildren(filter);
	return children[children.length-1];
}
function placeNode(node,fn,__this) {
	fn.call(__this,frag(node));
	return __this;
}
function append(node) {
	return placeNode(node,function (one) {this.appendChild(one)},this);
}
function prepend(node) {
	return placeNode(node,function (one) {this.insertBefore(one,this.firstChild)},this);
}
function before(node) {
	return placeNode(node,function (one) {this.parentNode.insertBefore(one,this)},this);
}
function after(node) {
	if (this.nextSibling) {
		placeNode(node,function (one) {this.parentNode.insertBefore(one,this.nextSibling)},this);
	} else {
		placeNode(node,function (one) {this.parentNode.appendChild(one)},this);
	}
	return this;
}
function del() {
	this.parentNode.removeChild(this);
}
function frag(nodes) {
	var tempFrag =document.createDocumentFragment();
	if (nodes.nodeType) {nodes=[nodes];}
	for (var i=0,len=nodes.length;i<len;i++) {
		if (nodes[i]) {
			tempFrag.appendChild(nodes[i]);
		}
	}
	return tempFrag;
}
NS.next = HEP.next = next;
NS.prev = HEP.prev = prev;
NS.first = HEP.first = first;
NS.last =HEP.last = last;
NS.append = HEP.append =append;
NS.prepend=HEP.prepend = prepend;
NS.before =HEP.before =before;
NS.after = HEP.after = after;
NS.del = HEP.del = del;
NS.getChildren = HEP.getChildren = getChildren;
NS.frag = frag;
}//Node End

{//ClassName Start
function hasClass(cn,obj) {//�����Ƿ����ĳ����
	obj = obj || this;
	return (new RegExp("\\b"+cn+"\\b")).test(obj.className);
}
function addClass(cn,obj) {//���һ������
	obj = obj || this;
	obj.className += " " + cn;
	return obj;
}
function delClass(cn,obj) {//ɾ��һ������
	obj = obj || this;
	obj.className = obj.className.replace(new RegExp("\\b"+cn+"\\b"),"");
	return obj;
}
NS.hasClass = HEP.hasClass = hasClass;
NS.addClass= HEP.addClass = addClass;
NS.delClass = HEP.delClass = delClass;
}//ClassName End


{//͸��������
function opacityTrans(start,finish,add) {
	var obj=this;
	var times = Math.abs((finish-start)/add);
	for (var i=0;i<=times;i++) {
		(function () {
			var val = i*add+start;
			setTimeout(function () {
				setOpacity(obj,val);
			},i*50);
		})();
	}
}
var setOpacity = (document.documentElement.filters)?function (obj,val) {
	obj.style.filter = "alpha(opacity="+val+")";
}:function (obj,val) {
	obj.style.opacity = val/100+"";
};
NS.opacityTrans = HEP.opacityTrans = opacityTrans;
NS.setOpacity = HEP.setOpacity = setOpacity;
function trans(start,finish,timeout) {
	//for ()
}

}


{//Cookie Start
function getCookie(cookieName) {
	var re = new RegExp("\\b"+cookieName+"=([^;]*)\\b");
	var arr =  re.exec(document.cookie);
	return arr?decodeURI(arr[1]):"";
}
function setCookie(name,value,expires,path,domain,secure) {
	var str = name+"="+encodeURI(value);
	if (expires) {str += "; expires="+expires.toGMTString();}
	if (path) {str += "; path="+path;}
	if (domain) {str += "; domain="+domain;}
	if (secure) {str += "; secure";}
	document.cookie = str;
}
function delCookie(cookieName) {
	var expires = new Date();
	expires.setTime(expires.getTime()-1);//��expires��Ϊһ����ȥ�����ڣ���������Զ�ɾ����
	document.cookie = cookieName+"=; expires="+expires.toGMTString();
}
NS.getCookie = getCookie;
NS.setCookie = setCookie;
NS.delCookie = delCookie;
}//Cookie End



//��ӵ��ղؼд���
function addFav(address,name) {
	try {return window.sidebar.addPanel(name,address,"");}
	catch(e) {
		try {return window.external.addFavorite(address,name);}
		catch(e) {}
	}
}
NS.addFav=addFav;












/*
�����ռ����
window.XT������Ϊ��������
*/
})(window.XT);