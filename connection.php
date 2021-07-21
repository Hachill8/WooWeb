<?php
        $serverName="127.0.0.1\MSSQLSERVER,1433";
        $connectionInfo=array("Database"=>"test", "UID"=>"test", "PWD"=>"123456", "CharacterSet"=>"UTF-8", 'ReturnDatesAsStrings'=> true);
        $conn=sqlsrv_connect($serverName, $connectionInfo);

        // if( $conn ) 
        // {
        //     echo "Connection established.";
        // }
        // else
        // {
        //     die("Connection could not be established.");
        // }

        //$sql="INSERT INTO inserttable(idea1,idea2,idea3,idea4) VALUES('$idea1','$idea2','$idea3','$idea4')";
        //$query=sqlsrv_query($conn,$sql)or die("sql error".sqlsrv_errors());
?>
