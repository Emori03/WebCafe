var restablecer = document.getElementById("restablecerForm");
var contrasenaInput = document.getElementById("nueva_contrasena");
restablecer.addEventListener('submit', function (e) {
    e.preventDefault();

    var urlActual = window.location.href;
    var url = new URL(urlActual);
    var parametros = new URLSearchParams(new URL(urlActual).search);
    var valor = parametros.get('token');

    if (contrasenaInput.value === "") {
        Swal.fire({
            position: "top-end",
            title: "Ingrese un correo electronico, por favor.",
            color: "#ffffff",
            background: "#ffbe32",
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        $.ajax({
            url: './PHP/restablecer_contrasena.php',
            type: 'POST',
            data: {
                contrasena: contrasenaInput.value,
                token: valor
            },
            success: function (response) {
                parametros.set('pagina', 'Principal');
                parametros.delete('token');
                url.search = parametros.toString();
                window.location.href = url.toString();
            },
            error: function (xhr, status, error) {
                parametros.set('pagina', 'Error');
                parametros.delete('token');
                url.search = parametros.toString();
                window.location.href = url.toString();
            }
        });
    }

});