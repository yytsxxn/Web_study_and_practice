<?php
	if (isset(['sub'])) {
		$sfile = $_FILES['sfile'];
		$str = $sfile['name'];
		$arr = explode('.', $str);
		$len = count($arr) - 1;
		$hou = $arr[$len];
		$uname = time().".".$hou
		$newurl = "./upload".$uname;
		// echo "$hou";
		$b = move_uploaded_file($sfile['tmp_name'], $newurl);
		if ($b) {
			echo "<script>alert('上传成功')</script>";
		}
	}
?>

<meta charset="utf-8">
<form action="upload.php" method="post" enctype="multipart/form-data">
	<input type="file" name="sfile">
	<input type="submit" name="sub" value="上传">
</form>