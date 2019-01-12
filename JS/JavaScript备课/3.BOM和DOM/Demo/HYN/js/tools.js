//ltrim ȥ���ַ�����ߵĿո�
((String.prototype.ltrim = function () {return this.replace(arguments.callee.re,"");}).re = new RegExp()).compile("^\\s+","gi");
//rtrim ȥ���ַ����ұߵĿո�
((String.prototype.rtrim = function () {return this.replace(arguments.callee.re,"");}).re = new RegExp()).compile("\\s+$","gi");
//frim ȥ���ַ��������еĿո�
((String.prototype.ftrim = function () {return this.replace(arguments.callee.re,"");}).re = new RegExp()).compile("\\s","gi");
//trim ȥ���ַ������ߵĿո�
String.prototype.trim = function () {return this.ltrim().rtrim();};
//repeat �ظ�һ���ַ�����num����ָ���ظ�����
String.prototype.repeat = function (num) {return (new Array(num+1)).join(this);};
//isEmail �ж��ַ����Ƿ�����Ч�������ַ������true��ʾ��ȷ
((String.prototype.isEmail = function () {return arguments.callee.re.test(this);}).re=new RegExp()).compile("^\\w{1,15}(?:@(?!-))(?:(?:[a-z0-9-]*)(?:[a-z0-9](?!-))(?:\\.(?!-)))+[a-z]{2,4}$","i");
//reverse ���ַ�����ת
String.prototype.reverse = function () {return this.split("").reverse().join("");};
//nl2br ���ַ����еĻ��з��滻��<br />
((String.prototype.nl2br = function () {return this.replace(arguments.callee.re,"<br />");}).re=new RegExp()).compile("\\r\\n|\\n\\r|\\n|\\r","g");
//encodeHTML ���ַ����е�HTML�����ַ��滻��ʵ������
String.prototype.encodeHTML = function () {
	return this.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;").replace("\"","&quote;");
};
//hasClass ����ĳDOM�����Ƿ����ĳclassName
function hasClass(cn,obj) {
	var re = new RegExp("\\b"+cn+"\\b");
	return re.test(obj.className);
}
//classGetter ��ȡrootԪ���о���ĳclass��Ԫ��
function classGetter(cn,root) {
	root = root || document;
	if (root.getElementsByClassName && root.getElementsByClassName.constructor == Function) {
		return root.getElementsByClassName(cn);
	}
	var allTags = root.getElementsByTagName("*");
	var reArr = [];
	for (var i=0;i< allTags.length;i++) {
		if (hasClass(cn,allTags[i])) {
			reArr.push(allTags[i]);
		}
	}
	return reArr;
}
function nextElement(node) {
	var nextNode = node.nextSibling;
	if (!nextNode) {
		return null;
	}
	if (nextNode.nodeType!=1) {
		return nextNode.nextSibling?nextNode.nextSibling:null;
	}
}