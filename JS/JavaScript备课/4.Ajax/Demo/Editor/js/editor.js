(function ($) {
window.onload = initAll;
window.isIE = !!window.ActiveXObject;
function initAll() {
	//����textarea
	var textArea = $("content");
	textArea.style.display="none";
	//����Ϊ�ɱ༭
	var EditorFrame = $("EditorFrame");
	var FrameWin = EditorFrame.contentWindow;
	var FrameDoc = FrameWin.document;
	FrameDoc.designMode = "on";
	FrameDoc.contentEditable=true;
	FrameDoc.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head><title>Content</title><style type='text/css'>* {font-size:12px;} body {margin:0;padding:0;}</style></head><body> </body></html>");
	FrameDoc.close();
	//�鿴HTMLԴ���밴ť
	var viewHTML = $("viewHTML");
	viewHTML.checked = false;
	viewHTML.onclick = function () {
		if (this.checked) {
			textArea.value = FrameDoc.body.innerHTML;
			textArea.style.display="block";
			EditorFrame.style.display="none";
		} else {
			textArea.style.display="none";
			EditorFrame.style.display="block";
			FrameDoc.body.innerHTML = textArea.value;
		}
	};
	//�ر����еĲ�,IE
	FrameDoc.onclick = function () {
		portraitTable.style.display="none";
	};
	//QQ����
	var portraitTable = getPortraitTable(11,"QQ ����","portraitTable");
	document.body.appendChild(portraitTable);
	var insertQQ = $("insertQQ");
	portraitTable.onclick = function (evt) {
		evt = evt || window.event;
		var target = evt.target || evt.srcElement;
		if (target.tagName =="IMG") {
			cmd("InsertImage",target.src);
			this.style.display="none";
		}
	};
	insertQQ.onclick = function () {
		toggle(portraitTable,"display","block","none");
	};
	function toggle(obj,css,val1,val2) {
		obj.style[css]= obj.style[css]==val1?val2:val1;
	}
	//��ɫ��
	var colorTable = getColorTable("colorTable");
	document.body.appendChild(colorTable);
	var setFontColor = $("setFontColor");
	setFontColor.onclick =function () {
		toggle(colorTable,"display","block","none");
		colorTable.command ="ForeColor";
		colorTable.onclick = setColor;
	};
	var setBgColor = $("setBgColor");
	setBgColor.onclick = function () {
		toggle(colorTable,"display","block","none");
		colorTable.command ="BackColor";
		colorTable.onclick =setColor;
	};
	function setColor(evt) {
		evt =evt || window.event;
		var obj = evt.target || evt.srcElement;
		if (obj.tagName=="TD" && obj.title) {
			cmd(this.command,obj.title);
		}
		this.style.display="none";
	}
	//����ͼƬ
	var insertImage = $("insertImage");
	insertImage.onclick = function () {
		var url = prompt("������ͼ���ַ!!!","http://");
		if (url && url!= "http://") {
			var img = document.createElement("img");
			img.onload = function () {
				cmd("InsertImage",url);
			};
			img.onerror =function () {
				alert("ͼ���������,�����������URL�Ƿ���ȷ!\n"+url);
			};
			img.src=url;
		}
	};
	//���볬����
	var insertLink = $("insertLink");
	insertLink.onclick = function () {
		if (isIE) {
			cmd("CreateLink");
		} else {
			if (!FrameWin.getSelection().toString()) {
				return alert("����ѡ��Ҫ������ӵ��ı�!");
			}
			var url = prompt("������URL:","http://");
			if (url && url != "http://") {
				cmd("CreateLink",url);
			}
		}
	};
	//�Ӵ�
	var boldButton = $("boldButton");
	boldButton.onclick = function () {
		cmd("Bold");
	};
	//��б
	var italicButton = $("italicButton");
	italicButton.onclick = function () {
		cmd("Italic");
	};
	//�»���
	var underLineButton=$("underLineButton");
	underLineButton.onclick = function () {
		cmd("UnderLine");
	};
	//�����
	var leftAlign =$("leftAlign");
	leftAlign.onclick = function () {
		cmd("JustifyLeft");
	};
	//�Ҷ���
	var rightAlign =$("rightAlign");
	rightAlign.onclick = function () {
		cmd("JustifyRight");
	};
	//���ж���
	var centerAlign =$("centerAlign");
	centerAlign.onclick = function () {
		cmd("JustifyCenter");
	};
	//�������
	function insertNode() {
	}
	
	//ִ������
	function cmd(type,param) {
		FrameWin.focus();
		if (param) {
			FrameDoc.execCommand(type,false,param);
		} else if (isIE) {
			FrameDoc.execCommand(type,true);
		} else {
				FrameDoc.execCommand(type,false,false);
		}
	}
};
})(function (id) {return document.getElementById(id);});
