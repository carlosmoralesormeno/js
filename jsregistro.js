function cargarCurso() {

    var idCurso = $('#id-nvl').val();
    var idLetra = $('#id-ltr').val();

    var params = {
        "id_nvl": idCurso,
        "id_ltr": idLetra
    };

    if (idCurso) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewRegistroCurso',
            dataType: 'html',
            type: 'get',
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (html) {
                $('#registro-curso').html(html);
                $('#loading').hide();
            }
        });
    }
}

function cargarRegistro() {

    var idCurso = $('#id-nvl').val();
    var idLetra = $('#id-ltr').val();

    var params = {
        "id_nvl": idCurso,
        "id_ltr": idLetra
    };

    if (idCurso) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewRegistro',
            dataType: 'html',
            type: 'get',
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (html) {
                $('#registro-curso').html(html);
                $('#loading').hide();
            }
        });
    }
}

function cargarDatosEstudiante(idEstudiante) {

    var id = idEstudiante;

    var params = {
        "id_est": id
    };

    if (id) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewEstudiante',
            dataType: 'html',
            type: 'get',
            success: function (html) {
                $('#titulo-modal').html('<i class="fa fa-book-open"></i> Resumen de Información del Estudiante');
                $('#texto-modal').html(html);
                $("#modal-msj").modal("show");
            }
        });
    }
}

function capturaFotoEstudiante(idEstudiante) {

    var id = idEstudiante;

    var params = {
        "id_est": id
    };

    if (id) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewCamera',
            dataType: 'html',
            type: 'get',
            success: function (html) {
                $('#titulo-modal').html('<i class="fas fa-camera"></i> Captura de Fotografía');
                $('#texto-modal').html(html);
                $("#modal-msj").modal("show");
                cargarImagen();
            }
        });
    }
}