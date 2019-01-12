<?php
header("Content-Type:text/xml; charset=UTF-8");
$id = $_GET['id'];
if ($id) {
	sleep(3);
	echo "<?xml version='1.0' encoding='UTF-8'?><root>".getArea($id)."</root>";
}

function getArea($id="",$child=true) {
	$xmlDom = new DOMDocument();
	$xmlDom->load("AreaZIP.xml");
	if (!$id) {
		$xpath = "/root/a[@t='0']";//Ĭ�Ϸ���ʡ
	} else if ($id && !$child) {//����$id����$child��Ϊfalseʱ����id=$id�Ľڵ����Ϣ
		$node = $xmlDom->getElementById($id);
		return array(
		"name"=>$node->getAttribute("n"),
		"id"=>$id,
		"own"=>$node->getAttribute("own"),
		"type"=>$node->getAttribute("t")
		);
	} else {//����,����id=$id�������������
		$xpath = "/root/a[@own='$id']";
	}
	$xpathEval = new DOMXPath($xmlDom);
	$nodes= $xpathEval->query($xpath);
	$opts=array();
	foreach ($nodes as $one) {
		$opts[] = "<option value='".$one->getAttribute("id")."'>".$one->getAttribute("n")."</option>";
	}
	return join("\n",$opts);
}
?>