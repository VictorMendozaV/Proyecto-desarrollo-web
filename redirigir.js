
    function playGame(){

        let exp = new RegExp ('[a-zA-Z]+\\s*[a-zA-Z]*');
        var name = document.getElementById("names").value;
        var campo = exp.test(name);
      
        //valida que el nombre no contenga numeros
        if(campo){
      
         
      
        localStorage.setItem("name" , name );
      
        window.location.href = "snake.html";
      }
    }

    //te redirecciona por medio de un boton
    function retry(){

    window.location.href = "login.html";


}
