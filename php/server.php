<?php

$hitFactor=false;

function validField($data, $min, $max){
    if(empty($data)){
        return false;
    }
    if(!isset($data)){
        return false;
    }
    if($data>=$min and $data<=$max){
        return true;    
    }else{
        return false;
    }
}

function validTimeZone($timezone){
    return isset($timezone);
}

function firstQuarter($x, $y, $r){
        
        $hypotenuse=sqrt($x*$x+$y*$y);
        if($hypotenuse<=$r){
            return true;
        }else{
            return false;
        }
}

function secondQuarter($x, $y, $r){
    $hypotenuse=sqrt($x*$x+($y*$y)/4);
    $calculatedY=sqrt(pow(($hypotenuse*($r-$x)/$r),2)-pow(($r-$x),2));
    if($calculatedY<=$y){
        return true;
    }else{
        return false;
    }
}

function thirdQuarter($x, $y, $r){
    
    if($x<=$r and $y<=$r){
        return true;
    }else{
        return false;
    }
}

function test_input($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data=strip_tags($data);
    $data = htmlspecialchars($data);
    return $data;
}

session_start();


    
if($_SERVER['REQUEST_METHOD']=='POST'){
    $x=test_input($_POST['x']);
    $y=test_input($_POST['yCoordinate']); 
    $r=test_input($_POST['radius']);
    $timeZone=test_input($_POST['timezone']);
}

if (!isset($_SESSION['data'])){
    $_SESSION['data'] = array();
}

if(validField($y,-5, 3) and validField($r, 2, 5)){
    if($x>=0 and $y>=0){
        $hitFactor=firstQuarter($x, $y, $r);
    }else if($x<0 and $y>=0){
        $hitFactor=secondQuarter(abs($x), $y, $r);
    }else if($y<0 and $x<=0){
        $hitFactor=thirdQuarter(abs($x), abs($y),$r);
    }else if($x>0 and $y<0){
        $hitFactor=false;
    }
}

$hitFactor=$hitFactor ? 'Hit':'Past';

$current_time = date("j M o G:i:s", time()-$timeZone*60);
$executionTime = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);

$answer = array("X"=>$x, "Y"=>$y, "R"=>$r, "Hit fact"=>$hitFactor, "Current time"=>$current_time, "Script running time(sec)"=>$executionTime);
array_push($_SESSION['data'], $answer);
    
foreach ($_SESSION['data'] as $elem){
	echo "<tr class='columns'>";
	echo "<td>" . $elem['X'] . "</td>";
	echo "<td>" . $elem['Y'] . "</td>";
	echo "<td>" . $elem['R'] . "</td>";
	echo "<td>" . $elem['Hit fact']  . "</td>";
	echo "<td>" . $elem['Current time']  . "</td>";
	echo "<td>" . $elem['Script running time(sec)'] . "</td>";
	echo "</tr>";
}


?>
