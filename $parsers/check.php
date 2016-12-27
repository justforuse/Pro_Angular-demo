<?php
	$postData = file_get_contents('php://input', true);  
	$obj=json_decode($postData);
	// echo $obj->username;
    // echo $username;
    if($obj->username == '123'){
        echo "exist";
    }
    else{
        echo "available";
    }


?>