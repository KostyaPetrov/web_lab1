<?php
session_set_cookie_params(0);
session_start();
if(isset($_SESSION['data'])){
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
}
?>