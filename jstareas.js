
function enableControl() {
    $('#enviar-evaluacion').attr("disabled", false);
    $('#enviar-evaluacion').html('<i class="fas fa-paper-plane"></i> Reintentar');
    
}

//  * * * * * * * * * * * * *
function disableControl() {
    $('#enviar-evaluacion').attr("disabled", true);
    $('#enviar-evaluacion').html("Espere...");
   
}


function guardarEvaluacion(e) {
    e.preventDefault();

    Swal.fire({
        title: '¿Estas Seguro?',
        text: "Deseas Enviar Tú Tarea",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, Terminé!',
        cancelButtonText: 'No estoy seguro'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                data: $('#form-evaluacion').serialize(),
                url: 'index.php?action=addEvaluacion',
                dataType: 'html',
                type: 'post',
                beforeSend: function () {
                    disableControl();
                    setTimeout(enableControl, 30000);
                },
                success: function (html) {
                    $('#resultado').html(html)
                    var idReg = $('#ider').val()
                    if (idReg) {
                        Swal.fire(
                            '¡Enviada!',
                            'La Tarea ha sido finalizada y enviada',
                            'success'
                        )
                        //$('.loading').hide()
                        $('#evaluacion').hide()
                        $('#alerta-save').show()
                    } else {
                        //$('.loading').hide()
                        Swal.fire({
                            icon: 'error',
                            title: 'Ups...',
                            text: 'Ha ocurrido un error durante el envío, vuelve a intentar'
                        })
                    }
                    //
                }
            });

        }
    })

};
