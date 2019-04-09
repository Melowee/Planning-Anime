<!DOCTYPE html>
<?php
    header('Location: https://melowee.github.io/Planning-Anime/index.html');
    
    $jsonFile = fopen("animes.json", "w");
    fwrite($jsonFile, $_GET['json']);
    fclose($jsonFile);
?>

<html>
    vous allez etre redirigé
</html>
