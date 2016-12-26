<?php
    $new_stuID = $_POST['new_stuID'];
    //我试着返回布尔型的true和false但是均不成功，string型的就可以
    if($new_stuID == '1234567'){
        echo 'false';
    }
    else{
        echo 'true';
    }

?>