<?php include('connection.php');

$sql="select * from 工作紀錄表";
$query=sqlsrv_query($conn,$sql,array(), array( "Scrollable" => 'static' ));
// if( $query === false ) {
//     print( print_r( sqlsrv_errors() ) );
// }
$count_all_rows=sqlsrv_num_rows($query);

//echo $count_all_rows;

if(isset($_POST['search']['value']))
{
    $search_value = $_POST['search']['value'];
    $sql .= " WHERE 作業日期 like '%".$search_value."%' ";
    $sql .= " OR 田區編號 like '%".$search_value."%' ";
    $sql .= " OR 工作項目 like '%".$search_value."%' ";
    $sql .= " OR 作業人員 like '%".$search_value."%' ";
}

if(isset($_POST['order']))
{
    $column = $_POST['order'][0]['column'];
    $order = $_POST['order'][0]['dir'];
    $sql .= "ORDER BY '".$column."' ".$order;
}
else
{
    $sql .= "ORDER BY ID ASC";
}

// if($_POST['length']!= -1)
// {
//     $start = $_POST['start'];
//     $length = $_POST['length'];
// //  $sql .= " LIMIT ".$start.", ".$length;//Select * From 資料表名稱 Limit 第幾筆開始(數字), 讀取幾筆資料(Mysql)
//     $sql .= " OFFSET ".$start." ROWS FETCH NEXT ".$length." ONLY ";//MSSQL
// }

$data = array();

$run_query = sqlsrv_query($conn,$sql,array(), array( "Scrollable" => SQLSRV_CURSOR_KEYSET ));
// if( $run_query === false) {
//     die( print_r( sqlsrv_errors(), true) );
// }
$filtered_rows = sqlsrv_num_rows($run_query);
// if ($filtered_rows === false)
//    echo "Error in retrieveing row count.";
// else
//    echo $filtered_rows;

while($row = sqlsrv_fetch_array($run_query,SQLSRV_FETCH_ASSOC))
{
    $subarray = array();
    $subarray[] = $row['id'];
    $subarray[] = $row['作業日期'];
    $subarray[] = $row['田區編號'];
    $subarray[] = $row['工作項目'];
    $subarray[] = $row['作業人員'];
    $subarray[] = '<a href="javascript:void();" data-id="'.$row['id'].'" class="btn btn-sm btn-success editBtn">編輯</a>
    <a href="javascript:void();" data-id="'.$row['id'].'" class="btn btn-sm btn-danger btnDelete">刪除</a>';
    $data[]= $subarray;
}



$output = array(
    'data'=>$data,
    'draw'=>intval($_POST['draw']),//draw:表示请求次数
    'recordsTotal'=>$count_all_rows,//recordsTotal:总记录数
    'recordersFiltered'=>$filtered_rows,//recordsFiltered:过滤后的总记录数

);

echo json_encode($output);

?>