<?php include('connection.php');

$workdate = $_POST['date'];
$areanum = $_POST['area'];
$workitem = $_POST['item'];
$workcontent = $_POST['content'];
$staff = $_POST['staff'];
        
$sql="INSERT INTO 工作紀錄表(作業日期,田區編號,工作項目,內容,作業人員) VALUES('$workdate','$areanum','$workitem','$workcontent','$staff')";
$query=sqlsrv_query($conn,$sql);//or die("sql error".sqlsrv_errors());

if($query==true)
{
    $data = array(
        'status'=>'success',
    );
    echo  json_encode($data);
}
else
{
    $data = array(
        'status'=>'failed',
    );
    echo  json_encode($data);
}
?>
