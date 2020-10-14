function cargarInasistencia() {

    var idSemestre = $('#semestre').val();
    var idAsignatura = $('#asignatura').val();
    var idCurso = $('#id-curso').val();
    var idLetra = $('#id-letra').val();

    var params = {
        "id_asig": idAsignatura,
        "id_sem": idSemestre,
        "id_nvl": idCurso,
        "id_ltr": idLetra
    };

    if (idAsignatura) {
        $.ajax({
            data: params,
            url: 'index.php?action=editInasistencia',
            dataType: 'html',
            type: 'get',
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (response) {
                $('#loading').hide();
                $("#calificaciones").html(response);

            }
        });
    }
};

function esconderMensaje() {
    var ng = $('#guardado-id').val();
    if (ng == 0) {
        alert("No ha guardado las calificaciones, si continua puede perder las calificaciones ingresadas");
    }
    $('#alert-nota').alert('close');
}