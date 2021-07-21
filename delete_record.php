<?php include('connection.php');

$id = $_POST['id'];
$sql = "DELETE FROM 工作紀錄表 WHERE id='$id'";
$query = sqlsrv_query($conn,$sql);
if($query==true)
{
	$data = array(
		'status'=>'success',
	);
	echo json_encode($data);

}
else
{
	$data = array(
		'status'=>'failed',
	);
	echo json_encode($data);
}