function cargarCurso() {

    var idCurso = $('#id_curso').val();

    var params = {
        "id_curso": idCurso
    };

    if (idCurso) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewCurso',
            dataType: 'html',
            type: 'get',
            success: function (html) {
                $('#id-reg').html(html);
                cargarAsignatura();
            }
        });
    }
}
function cargarAsignatura() {

    var idCurso = $('#id-nvl-n').val();

    var params = {
        "id_curso": idCurso
    };

    if (idCurso) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewAsignatura',
            dataType: 'html',
            type: 'get',
            success: function (html) {
                $('#id_asignatura').html(html);
            }
        });
    }
}

function ocultarFechaEntrega() {
    $('#fecha').hide()
    $('#lb_fecha').hide()
}

function estadoAtributo() {
    var atributo = $('#id_atributo').val();

    if (atributo == 1) {
        $('#fecha').show()
        $('#lb_fecha').show()
    } else if (atributo == 2) {
        $('#fecha').hide()
        $('#lb_fecha').hide()
    }
};

function cargarDocumentosRUN() {


    var idRun = $('#id-rut').val();

    var params = {
        "id_rut": idRun
    };
    if (idRun) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewDocumento',
            dataType: 'html',
            type: 'get',
            beforeSend: function () {
                $('#loading_spinner').show();
                $("#evaluacion").html("Cargando Resultados...");
            },
            success: function (html) {
                $('#loading_spinner').hide();
                $('#reporte').html(html);
            }
        });
    } else {
        $('#titulo-modal').html('Ups! Hay un error');
        $('#texto-modal').html('Debe elegir una prueba para ver los resultados');
        $("#modal-msj").modal("show");
    }

};

function guardarDocumento(e) {
    e.preventDefault();

    var form = $('#form-documento')
    var formData = new FormData(form[0]);
    var idRut = $('#id-rut').val();

    if (idRut) {
        $.ajax({
            url: 'index.php?action=addDocumento',
            data: formData,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (data) {
                alert(data);
                limpiarFormularioDocumento();
            }
        });
    }

};

function limpiarFormularioDocumento(){
    $('#txt_nombre').val('');
    $('#txt_objetivo').val('');
    $('#documento').reset();
}
