function getPortraitTable(cols,caption,cn) {
	var PortraitText = ["΢Ц","Ʋ��","ɫ","����","����","����","����","����","˯","���","����","��ŭ","��Ƥ","����","����","�ѹ�","��","�亹","ץ��","��","͵Ц","�ɰ�","����","����","����","��","����","����","��Ц","���","�ܶ�","����","����","��...","��","��ĥ","˥","����","�ô�","�ټ�","����","�ٱ�","����","�ܴ���","��Ц","��ߺ�","�Һߺ�","��Ƿ","����","ί��","�����","����","����","��","����"];
	var table = document.createElement("table");
	if (cn) {table.className = cn;}
	if (caption) {table.createCaption().innerHTML = caption;}
	var PortraitNum = PortraitText.length;
	var rowsNum = Math.ceil(PortraitNum/cols);
	var row;
	var cell;
	var img;
	var index;
	for (var i=0;i<rowsNum;i++) {
		row = table.insertRow(i);
		for (var j=0;j< cols;j++) {
			index = cols*i+j;
			if (PortraitText[index]) {
				cell = row.insertCell(j);
				img = document.createElement("img");
				img.title= PortraitText[index];
				img.alt =PortraitText[index];
				img.src="images/portrait/"+index+".gif";
				cell.appendChild(img);
			} else {
				break;
			}
		}
	}
	return table;
}