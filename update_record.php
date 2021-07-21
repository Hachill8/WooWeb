<?php include('connection.php');

$id =$_POST['id'];
$date = $_POST['date'];
$area = $_POST['area'];
$item = $_POST['item'];
$content = $_POST['content'];
$staff = $_POST['staff'];

$sql = "UPDATE 工作紀錄表 SET 作業日期 ='$date', 田區編號 ='$area', 工作項目 ='$item' , 內容 ='$content', 作業人員 ='$staff' WHERE id='$id'";
$query = sqlsrv_query($conn,$sql);
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