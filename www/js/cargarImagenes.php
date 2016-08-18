<?php 
    header('Access-Control-Allow-Origin: *');
    if($_FILES["imagen"]["error"] > 0)
    {
        echo "Ocurrio un problema al cargar la imagen - > ".$_FILES["imagen"]["error"];
    }
    else
    {    
        $ruta="https://api.cloudinary.com/v1_1/hyktxhgfc/image/upload".$_FILES['imagen']['name'];
        if(!file_exists($ruta))
        {
            $resultado=@move_uploaded_file($_FILES["imagen"]["tmp_name"], $ruta);
            if($resultado)
            {
                echo "La carga de la imagen fue exitosa";
            }
            else
            {
                echo "La carga de la imagen fue fallida";
            }
        }
        else
        {
            echo "La imagen ya existe";
        }        
    }
?>