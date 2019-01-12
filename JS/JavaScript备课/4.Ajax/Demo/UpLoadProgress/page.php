<?include 'common.php'; ?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>File UpLoad Progress</title>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<style type="text/css">
* {
margin:0;
padding:0;
}
body {
	color:#444;
	padding:10px;
}
#progressDiv {
width:500px;
height:120px;
border:2px solid teal;
position:absolute;
left:30%;
top:30%;
z-index:12;
background:white;
display:none;
}
#progressDiv.moving {
	opacity:0.6;
	filter:alpha(opacity=60);
}
#progressDiv p {
width:94%;
margin:2px auto;
font-size:12px;
letter-spacing:1px;
text-align:center;
line-height:200%;
}
#progressDiv p span {
color:#F30;
}
#progressDiv h6 {
width:100%;
height:32px;
font-size:14px;
cursor:move;
background:teal;
color:white;
text-align:center;
line-height:32px;
}
#progressBar {
display:block;
width:94%;
height:26px;
margin:2px auto;
border:1px solid lime;
background:#EFE;
position:relative;
}
#progressBar img {
width:0%;
height:26px;
}
#progressBar #progressPercent {
display:block;
width:60px;
height:26px;
line-height:26px;
position:absolute;
left:50%;
top:0;
font-size:18px;
margin-left:-30px;
text-align:center;
color:#F30;
}
#closeDiv {
display:block;
width:60px;
height:24px;
line-height:24px;
font-size:13px;
color:white;
background:teal;
border:2px solid #EEE;
border-right-color:#999;
border-bottom-color:#999;
margin:4px 30px 0 auto;
}
</style>
</head>
<body>
<!--
target���upLoadFrame��ʵ���ļ����ϴ�
MAX_FILE_SIZE����ָ���ϴ��ļ��������,�������һ��������ֵ,��PHP�˻������ֵ
APC_UPLOAD_PROGRESS��ʹAPC���ϴ������Զ����м���,��ֵ������һ��Ψһ��ֵ,һ���������
��PHP��Ҫ��ȡ���ļ����ϴ�����,ֻ��Ҫʹ��apc_fetch("upload_".APC_UPLOAD_PROGRESS�����ֵ)���� 
 -->
	<form id="upFileForm" target="upLoadFrame" action="action.php" enctype="multipart/form-data" method="post">
		<input type="hidden" name="MAX_FILE_SIZE" value="10000000000000" />
		<input type="hidden" name="APC_UPLOAD_PROGRESS" value="<?php echo mt_rand(100000,1000000) ?>" />
		<input type="file" name="file" />
		<input type="submit" name="send" value="�ύ" />
	</form>
	<div id="progressDiv">
		<h6 id="titleBar">�����ϴ��ļ�</h6>
		<p>
			�ļ��ܴ�С:<span id="totalBytes">0M</span>
			���ϴ���С:<span id="currentBytes">0M</span>
			�ϴ��ٶ�:<span id="rate">0KB</span>/S
		</p>
		<span id="progressBar"><span id="progressPercent">0%</span><img id="progressPic" src="progress.jpg" alt="��ɽ���" /></span>
		<input type="button" id="closeDiv" value="�ر�" />
	</div>
	<h4>���ϴ��ļ�</h4>
	<table border="1" id="uploadedFile">
		<tr>
			<th>�ļ���</th>
			<th>�ļ���С</th>
			<th>�ϴ�����</th>
		</tr>
<?php
//�����ļ���,��ʾ�������Ѿ��ϴ����ļ�,�ϴ�һ���ļ���,�Զ��������һ����ʾ���ļ�������
$dirPath = "File";
$uploadDir = dir($dirPath);
while ($fileName=$uploadDir->read()) {
	$filePath= $dirPath."/".$fileName;
	if (is_dir($filePath)) {continue;}
	$fileSize = formatFileSize($filePath);
	$fileDate = date("Y��m��d��  H:i:s",filemtime($filePath));
	echo <<<FILE
	<tr>
		<td><a href="$filePath" target="_blank">$fileName</a></td>
		<td>$fileSize</td>
		<td>$fileDate</td>
	</tr>
FILE;
}
$uploadDir->close();
?>
	</table>
<script type="text/javascript" src="progress.js"></script>
</body>
</html>