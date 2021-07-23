<!DOCTYPE html>
<html>
<head>
    <title>WOO</title>
    <!-- Required meta tags -->
	<meta chartset="UTF-8" name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
	
	<!-- Import lib -->	
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.css">
	<link rel="stylesheet" type="text/css" href="fontawesome-free/css/all.min.css">
	<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
	<!-- End import lib -->

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs5/jq-3.3.1/dt-1.10.25/datatables.min.css"/>
 
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css" integrity="sha512-mSYUmp1HYZDFaVKK//63EcZq4iFWFjxSL+Z3T/aCt4IO9Cejm03q3NKKYN6pFQzY0SBOr8h+eCIAZHPXcpZaNw==" crossorigin="anonymous" /> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker3.min.css" integrity="sha512-rxThY3LYIfYsVCWPCW9dB0k+e3RZB39f23ylUYTEuZMDrN/vRqLdaCBo/FbvVT6uC2r0ObfPzotsfKF9Qc5W5g==" crossorigin="anonymous" />
	<link rel="stylesheet" type="text/css" href="style.css">
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="http://code.jquery.com/jquery-1.10.2.js"></script>    
    <script src="http://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>    

    
</head>
<style>
    * {
    font-family: sans-serif; /* Change your font family */
    }
    .content-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    width: 100%;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(8, 7, 7, 0.15);
  }
  
  .content-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
  }
  
  .content-table th,
  .content-table td {
    padding: 12px 15px;
  }
  
  .content-table tbody tr {
    border-bottom: 1px solid #dddddd;
  }
  
  .content-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }
  
  .content-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }
  
  .content-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }
  .ph-button {
	
    border-style: solid;
    border-width: 0px 0px 3px;
    box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
    color: #FFFFFF;	   
    border-radius: 6px;
    cursor: pointer;
    display: inline-block;
    font-style: normal;
    overflow: hidden;
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
    transition: all 200ms ease-in-out 0s;
    white-space: nowrap;	
    font-family: "Gotham Rounded A","Gotham Rounded B",Helvetica,Arial,sans-serif;
    font-weight: 700;	
    padding: 8px 39px 3px;
    font-size: 16px;
	
  }
  .ph-btn-green {

    border-color: #3AC162;
    background-color: #009879;

    }
    .ph-btn-green:hover, .ph-btn-green:focus, .ph-btn-green:active {
    background-color: #4BC970;
    border-color: #3AC162;    
   }
</style>
<body class="overlay-scrollbar">

    <!-- Navbar -->
    <div class="navbar">
        <!-- nav left -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link">
                    <i class="fas fa-bars" onclick="collapseSidebar()"></i>
                </a>
            </li>
            <li class="nav-item">
                <img src="assets/greenhouse-effect.png" alt="WOO LOGO" class="logo">
            </li>
        </ul>
        <!-- end nav left -->
        <ul class="navbar-nav">
             
            <li class="logo logo-light" style="color:black; font-size:25px; margin-top: 5px; margin-left: -10px;">VeryFarm</li>
            <li class="logo logo-dark" style="color: white; font-size:25px; margin-top: 5px; margin-left: -10px;">Not12313Farm</li>    
            
        </ul>
        <!-- form -->
        <form class="navbar-search">
            <input type="text" name="Search" class="navbar-search-input" placeholder="搜尋GOGOGO...">
            <i class="fas fa-search"></i>    
        </form>
        <!-- end form -->
        <!-- nav right -->
        <ul class="navbar-nav nav-right">
            <li class="nav-item">
                <a class="nav-link" href="#" onclick="switchTheme()">
                    <i class="fas fa-moon dark-icon"></i>
                    <i class="fas fa-sun light-icon"></i>
                </a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link">
                    <i class="fas fa-bell dropdown-toggle" data-toggle="notification-menu"></i>
                    <span class="navbar-badge">15</span>
                </a>
                <ul id="notification-menu" class="dropdown-menu notification-menu">
                    <div class="dropdown-menu-header">
                        <span>
                            通知
                        </span>
                    </div>
                    <div class="dropdown-menu-content overlay-scrollbar">
                        <li class="dropdown-menu-item">
                            <a href="#" class="dropdown-menu-link">
                                <div>
                                    <i class="fas fa-check"></i>
                                </div>
                                <span>
                                    A1的番茄可以收成了喔!記得要去採收知道嗎?
                                    <br>
                                    <span>
                                        2021/01/01
                                    </span>
                                </span>
                                
                            </a>
                        </li> 
                        <li class="dropdown-menu-item">
                            <a href="#" class="dropdown-menu-link">
                                <div>
                                    <i class="fas fa-check"></i>
                                </div>
                                <span>
                                    A1的番茄可以收成了喔!記得要去採收知道嗎?
                                    <br>
                                    <span>
                                        2021/01/01
                                    </span>
                                </span>
                                
                            </a>
                        </li> 
                        <li class="dropdown-menu-item">
                            <a href="#" class="dropdown-menu-link">
                                <div>
                                    <i class="fas fa-check"></i>
                                </div>
                                <span>
                                    A1的番茄可以收成了喔!記得要去採收知道嗎?
                                    <br>
                                    <span>
                                        2021/01/01
                                    </span>
                                </span>
                                
                            </a>
                        </li> 
                        <li class="dropdown-menu-item">
                            <a href="#" class="dropdown-menu-link">
                                <div>
                                    <i class="fas fa-check"></i>
                                </div>
                                <span>
                                    A1的番茄可以收成了喔!記得要去採收知道嗎?
                                    <br>
                                    <span>
                                        2021/01/01
                                    </span>
                                </span>
                                
                            </a>
                        </li>   
                        <li class="dropdown-menu-item">
                            <a href="#" class="dropdown-menu-link">
                                <div>
                                    <i class="fas fa-check"></i>
                                </div>
                                <span>
                                    A1的番茄可以收成了喔!記得要去採收知道嗎?
                                    <br>
                                    <span>
                                        2021/01/01
                                    </span>
                                </span>
                                
                            </a>
                        </li> 
                        <li class="dropdown-menu-item">
                            <a href="#" class="dropdown-menu-link">
                                <div>
                                    <i class="fas fa-check"></i>
                                </div>
                                <span>
                                    A1的番茄可以收成了喔!記得要去採收知道嗎?
                                    <br>
                                    <span>
                                        2021/01/01
                                    </span>
                                </span>
                                
                            </a>
                        </li> 
                        <li class="dropdown-menu-item">
                            <a href="#" class="dropdown-menu-link">
                                <div>
                                    <i class="fas fa-check"></i>
                                </div>
                                <span>
                                    A1的番茄可以收成了喔!記得要去採收知道嗎?
                                    <br>
                                    <span>
                                        2021/01/01
                                    </span>
                                </span>
                                
                            </a>
                        </li> 
                        <li class="dropdown-menu-item">
                            <a href="#" class="dropdown-menu-link">
                                <div>
                                    <i class="fas fa-check"></i>
                                </div>
                                <span>
                                    A1的番茄可以收成了喔!記得要去採收知道嗎?
                                    <br>
                                    <span>
                                        2021/01/01
                                    </span>
                                </span>
                                
                            </a>
                        </li>
                        <li class="dropdown-menu-item">
                            <a href="#" class="dropdown-menu-link">
                                <div>
                                    <i class="fas fa-check"></i>
                                </div>
                                <span>
                                    A1的番茄可以收成了喔!記得要去採收知道嗎?
                                    <br>
                                    <span>
                                        2021/01/01
                                    </span>
                                </span>
                                
                            </a>
                        </li> 
                        <li class="dropdown-menu-item">
                            <a href="#" class="dropdown-menu-link">
                                <div>
                                    <i class="fas fa-check"></i>
                                </div>
                                <span>
                                    A1的番茄可以收成了喔!記得要去採收知道嗎?
                                    <br>
                                    <span>
                                        2021/01/01
                                    </span>
                                </span>
                                
                            </a>
                        </li> 
                        <li class="dropdown-menu-item">
                            <a href="#" class="dropdown-menu-link">
                                <div>
                                    <i class="fas fa-check"></i>
                                </div>
                                <span>
                                    A1的番茄可以收成了喔!記得要去採收知道嗎?
                                    <br>
                                    <span>
                                        2021/01/01
                                    </span>
                                </span>
                                
                            </a>
                        </li> 
                        <li class="dropdown-menu-item">
                            <a href="#" class="dropdown-menu-link">
                                <div>
                                    <i class="fas fa-check"></i>
                                </div>
                                <span>
                                    A1的番茄可以收成了喔!記得要去採收知道嗎?
                                    <br>
                                    <span>
                                        2021/01/01
                                    </span>
                                </span>
                                
                            </a>
                        </li>                
                    </div>
                    <div class="dropdown-menu-footer">
                        <span>
                            查看所有通知
                        </span>
                    </div>
                </ul>
            </li>
            <li class="nav-item">
                <div class="avt dropdown">
                    <img src="assets/user.png" alt="User image" class="dropdown-toggle" data-toggle="user-menu">
                    <ul id="user-menu" class="dropdown-menu">
                        <li class="dropdown-menu-item">
                            <a href="#nowhere" class="dropdown-menu-link">
                                <div>
                                    <i class="fas fa-user"></i>
                                </div>
                                <span>個人資料</span>
                            </a>
                        </li>
                        <li class="dropdown-menu-item">
                            <a href="#nowhere" class="dropdown-menu-link">
                                <div>
                                    <i class="fas fa-cog"></i>
                                </div>
                                <span>設定</span>
                            </a>
                        </li>
                        <li class="dropdown-menu-item">
                            <a href="#nowhere" class="dropdown-menu-link">
                                <div>
                                    <i class="fas fa-sign-out-alt"></i>
                                </div>
                                <span>登出</span>
                            </a>
                        </li>
                    </ul>
                </div>
                
            </li>
        </ul>
        <!-- end nav right -->

    </div>
    <!-- End navbar -->
    <!-- Sidebar -->
    <div class="sidebar">
        <ul class="sidebar-nav">
            <li class="sidebar-nav-item">
                <a href="./mainpage.html" class="sidebar-nav-link">
                    <div>
                        <i class="fas fa-tachometer-alt"></i>
                    </div>
                    <span>
                        Dashboard
                    </span>
                </a>
            </li>
            <li class="sidebar-nav-item">
              <a href="#" class="sidebar-nav-link" >
                  <div>
                      <i class="fas fa-history"></i>
                  </div>
                  <span id="historyt">
                      History
                  </span>
              </a>
            <li class="sidebar-nav-item">
                <a href="traceability.php" class="sidebar-nav-link active" >
                    <div>
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <span>
                        Traceability
                    </span>
                </a>
            </li>
        </ul>
        
    </div>
    <!-- End sidebar -->
    <!-- Main content -->
    <div class="wrapper">
        <div id="page-content-wraper" class="h-vh">
            <div class="container bg-white p-3 mw-100 mh-100" style="margin-top: 20px;">
                <!-- <h4 class="mb-4">生產履歷</h4> -->
                <div class="container-fluid">
                    <ul class="nav nav-tabs mb-4">
                        <li class="nav-item">
                            <a class="nav-link " href="./traceability.php">&nbsp;&nbsp;作物紀錄&nbsp;&nbsp;</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="./downloadpdf.php">檔案下載</a>
                        </li>
                    </ul> 
                    <div class="row">
                        <form method="POST">
                            <div class="row mb-3">
                                <label for="startdate" class="col-sm-1 col-form-label">開始日期</label>
                                <div class="col-sm-4">
                                    <input type="date" class="form-control pointer" placeholder="yyyy-mm-dd" id="startdate" name="startdate"  style="border: 1px solid rgb(206, 212, 218);">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="enddate" class="col-sm-1 col-form-label">結束日期</label>
                                <div class="col-sm-4">
                                    <input type="date" class="form-control pointer" placeholder="yyyy-mm-dd" id="enddate" name="enddate"  style="border: 1px solid rgb(206, 212, 218);">
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="areanum" class="col-sm-1 col-form-label">田區編號</label>
                                    <div class="col-sm-4">
                                        <select class="form-select" aria-label="Default select example" id="search_areanum" name="search_areanum">   
                                            <option value="C">C</option>                                                
                                        </select>
                                    </div>
                            </div>
                            <fieldset class="row mb-3">
                                <legend class="col-form-label col-sm-1 pt-0">表單選擇</legend>
                                <div class="col-sm-10 pt-0">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="sheet[]" value="工作紀錄表" id="worksheet">
                                        <label class="form-check-label" for="worksheet">
                                        工作紀錄表
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="sheet[]" value="出貨紀錄表" id="shipmentsheet">
                                        <label class="form-check-label" for="shipmentsheet">
                                        出貨紀錄表
                                        </label>
                                    </div>

                                </div>
                            </fieldset>
                            <div class="row">
                                
                                <div class="col-sm-1 col-form-label">
                                    <button type="submit" class="btn btn-primary btn-sm" name="search">搜尋</button>
                                </div>
                            </div>
                        
                        </form>
                    </div>
                    <div class="table-responsive" style="margin-top: 20px;">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>NO.</th>
                                    <th>開始日期</th>
                                    <th>結束日期</th>
                                    <th>田區編號</th>
                                    <th>表單類型</th>
                                    <th>檔案下載</th>
                                </tr>
                            </thead>
                        
                        <tbody>
                            <?php 
                            
                            if(array_key_exists('search', $_POST )) {
                            search();}
                            function search()
                            {
                                
                                //echo "Hello World";
                                $start=$_POST['startdate'];
                                $end=$_POST['enddate'];
                                $area=$_POST['search_areanum'];
                                $sheet=$_POST['sheet'];
                                $no=1;
                                $StartDate='StartDate=';
                                $EndDate='&EndDate=';
                                $Area='&Area=';
                                $url='http://134.208.97.191:8080/sensor_Webservice.asmx/exportPDF6?';
                                //http://134.208.97.191:8080/sensor_Webservice.asmx/exportPDF6?StratDate=string&EndDate=string&Area=string
                                $downloadurl=$url.$StartDate.$start.$EndDate.$end.$Area.$area;

                                if($start !=""&& $end !=""&& $area !=""&& empty( $sheet )==false){
                                    $N=count($sheet);
                                    for($i=0; $i < $N; $i++){
                                    ?>
                                    <tr>
                                        <td><?php echo $no;?></td>
                                        <td><?php echo $start;?></td>
                                        <td><?php echo $end;?></td>
                                        <td><?php echo $area;?></td>
                                        <td><?php echo $sheet[$i];?></td>
                                        <td>
                                            <?php 
                                            if($sheet[$i]=='工作紀錄表'){
                                                echo "<input type='button' class='btn btn-success' value='PDF' onclick='window.location.href=\"$downloadurl\"'/> ";}
                                            else {echo "無資料";}
                                            ?>
                                        </td>
                                    </tr> 
                                    <?php
                                    }
                                }

                                else{
                                    ?>
                                    <tr>
                                        <td>查無結果</td>
                                    </tr>
                                    <?php
                                }
                            }
                            ?>
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/v/bs5/jq-3.3.1/dt-1.10.25/datatables.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    
   

    
    <!--history start-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script language="JavaScript" src="mainpage.js" type="text/javascript" charset="UTF-8"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/5.4.0/bootbox.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha512-n6dYFOG599s4/mGlA6E+YLgtg9uPTOMDUb0IprSMDYVLr0ctiRryPEQ8gpM4DCMlx7M2G3CK+ZcaoOoJolzdCg==" crossorigin="anonymous"></script>
   
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossorigin="anonymous"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js" integrity="sha512-T/tUfKSV1bihCnd+MxKD0Hm1uBBroVYBOYSk1knyvQ9VyZJpc/ALb4P0r6ubwVPSGB2GvjeoMAJJImBG12TiaQ==" crossorigin="anonymous"></script>
    <script src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="traceability.js"></script>
    <!--history end-->
    <!-- End main content -->
    
</body>
<div class="form-content" style="display:none;">
    <a class="searchb" href="./history.html"></a>
    <form class="needs-validation" novalidate name='form1' id='form1'>
        <h5 class="mb-0"><strong>感測器</strong></h5>
        <div class="row">
            <div class="col-md-12">
                <label class="PillList-item">
                <input type="checkbox" name="feature" value="light">
                <span class="PillList-label">光照
                <span class="Icon Icon--checkLight Icon--smallest"><i class="fa fa-check"></i></span>
                </span>
                </label>
                
                <label class="PillList-item">
                <input type="checkbox" name="feature" value="temperature">
                <span class="PillList-label">溫度
                <span class="Icon Icon--checkLight Icon--smallest"><i class="fa fa-check"></i></span>
                </span>
                </label>
        
                <label class="PillList-item">
                <input type="checkbox" name="feature" value="humidity">
                <span class="PillList-label">濕度
                <span class="Icon Icon--checkLight Icon--smallest"><i class="fa fa-check"></i></span>
                </span>
                </label> 
            
            </div>
        </div>
        <h5 class="mb-0"><strong>日期</strong></h5>
        <div class="row">
            <div class="col-xs-12 col-sm-6" id="datepicker1">
                <div class="datepicker date input-group">
                    <input type="text" class="form-control datepicker1" name ="date1"id="Date1" placeholder="開始日期" autocomplete="off">
                    <i class="fas fa-calendar-alt"></i>
                </div>
            </div>
            
            <div class="col-xs-12 col-sm-6" id="datepicker2">
                <div class="datepicker date input-group">
                    <input type="text" class="form-control datepicker2" name ="date2"id="Date2" placeholder="結束日期" autocomplete="off">
                    <i class="fas fa-calendar-alt"></i>
                </div>
            </div>
        </div>
        <h5 class="mb-0"><strong>裝置</strong></h5>
        <div class="row">
            <div class="col-md-12">
                <label class="PillList-item">
                <input type="checkbox" name="environment" value="1">
                <span class="PillList-label">氣象站
                <span class="Icon Icon--checkLight Icon--smallest"><i class="fa fa-check"></i></span>
                </span>
                </label>
                
                <label class="PillList-item">
                <input type="checkbox" name="environment" value="2">
                <span class="PillList-label">棚內
                <span class="Icon Icon--checkLight Icon--smallest"><i class="fa fa-check"></i></span>
                </span>
                </label>
                
                <label class="PillList-item">
                <input type="checkbox" name="environment" value="3">
                <span class="PillList-label">室外
                <span class="Icon Icon--checkLight Icon--smallest"><i class="fa fa-check"></i></span>
                </span>
                </label>
            </div>
        </div>
        <h5 class="mb-0"><strong>作物</strong></h5>
            <div class="form-group">
            <!--<label for="vegetselect">作物</label>--這邊不確定會不會影響到後端曲資料-->
                <select class="form-select mt-2" id="vegetselect" onChange="vegetfunction(this);">
                    <option value="brassica">小松</option>
                    <option value="milkcabbage">奶白</option>
                    <option value="broccoli">花椰菜</option>
                    <option value="tomato">番茄</option>
                    <option value="lettuce">萵苣</option>
                </select>
            </div>
        <h5 class="mb-0 mt-3"><strong>棚架</strong></h5>
            <div class="form-group">
            <!--<label for="vegetselect">作物</label>--這邊不確定會不會影響到後端曲資料-->
                <select class="form-select mt-2" id="scaffoldselect" onChange="scaffoldfunction(this);">
                    <option value="A1">A區1</option>
                    <option value="A2">A區2</option>
                    <option value="A3">A區3</option>
                    <option value="A4">A區4</option>
                    <option value="A5">A區5</option>
                </select>
            </div>
      </form>
    </div>
</html>