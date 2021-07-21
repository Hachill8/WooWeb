<?php include('connection.php');
$id =$_POST['id'];
$sql = "SELECT * FROM 工作紀錄表 WHERE id='$id'";
$query = sqlsrv_query($conn,$sql,array(), array( "Scrollable" => SQLSRV_CURSOR_KEYSET ));
$row = sqlsrv_fetch_array($query,SQLSRV_FETCH_ASSOC);
echo json_encode($row);
?>