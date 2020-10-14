function cargarSACalificaciones() {

    var idSemestre = $('#semestre').val();
    var idRegistro = $('#estudiante').val();

    var params = {
        "id_reg": idRegistro,
        "id_sem": idSemestre
    };

    if (idRegistro) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewSituacionAcademica',
            dataType: 'html',
            type: 'get',
            beforeSend: function () {
                $('#loading').show();
                $("#calificaciones").html("Cargando Calificaciones...");
            },
            success: function (response) {
                $('#loading').hide();
                $("#calificaciones").html(response);

            }
        });
    }
};

function cargarCalificaciones() {

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
            url: 'index.php?action=editCalificaciones',
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

function cargarVistaCalificaciones() {

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
            url: 'index.php?action=viewCalificaciones',
            dataType: 'html',
            type: 'get',
            beforeSend: function () {
                $('#loading').show();
                $("#calificaciones").html("Cargando Calificaciones...");
            },
            success: function (response) {
                $('#loading').hide();
                $("#calificaciones").html(response);

            }
        });
    }
};

function editNota(idA, idE, c, value) {
    var n1 = 0;
    var n2 = 0;
    if (idE) {
        $('#ida' + idA + '').val(1);
        notasGuardadas(0);
        if (value) {
            n = value.length;
            if (n > 1) {
                n1 = value.substring(0, 1);
                n2 = value.substring(1, 2);
            } else {
                n1 = value.substring(0, 1);
                n2 = 0;
            }
            value = n1 + n2;
            if (value >= 10 && value <= 70) {
                $('#idx' + idE + 'c' + c + '').val(n1 + '.' + n2);

            } else {
                $('#idx' + idE + 'c' + c + '').val('');
            }
        }
    }
};

function Numeros(string) {
    var out = '';
    var filtro = '1234567890';
    for (var i = 0; i < string.length; i++)
        if (filtro.indexOf(string.charAt(i)) != -1)
            out += string.charAt(i);
    return out;
}

function mover(yi, c, e, value) {
    var y = 0;
    var idE = 0;
    var cA = 0;
    var er = 40;
    var aM = 0;

    if (e.keyCode == 13 || e.keyCode == 40) {
        y = parseInt(yi) + parseInt(1);
        idE = $('#y' + y + '').val();
        $('#idx' + idE + 'c' + c + '').focus();
        $('#idx' + idE + 'c' + c + '').select();
    } else if (e.keyCode == 38) {
        y = parseInt(yi) - parseInt(1);
        idE = $('#y' + y + '').val();
        $('#idx' + idE + 'c' + c + '').focus();
        $('#idx' + idE + 'c' + c + '').select();
    } else if (e.keyCode == 39) {
        cA = parseInt(c) + parseInt(1);
        idE = $('#y' + yi + '').val();
        $('#idx' + idE + 'c' + cA + '').focus();
        $('#idx' + idE + 'c' + cA + '').select();
        document.getElementById("auto-no").checked = true;
    } else if (e.keyCode == 37) {
        cA = parseInt(c) - parseInt(1);
        idE = $('#y' + yi + '').val();
        $('#idx' + idE + 'c' + cA + '').focus();
        $('#idx' + idE + 'c' + cA + '').select();
        document.getElementById("auto-no").checked = true;
    } else if (value >= 10) {
        aM = $('#auto-movimiento-id').val();
        if (aM == 1) {
            moverAuto(yi, c, er);
            y = 0;
        }
    }

}

function moverAuto(yi, c, e) {
    var y = 0;
    var idE = 0;
    var cA = 0;
    if (e == 40) {
        y = parseInt(yi) + parseInt(1);
        idE = $('#y' + y + '').val();
        $('#idx' + idE + 'c' + c + '').focus();
        $('#idx' + idE + 'c' + c + '').select();
    } else if (e == 38) {
        y = parseInt(yi) - parseInt(1);
        idE = $('#y' + y + '').val();
        $('#idx' + idE + 'c' + c + '').focus();
        $('#idx' + idE + 'c' + c + '').select();
    } else if (e == 39) {
        cA = parseInt(c) + parseInt(1);
        idE = $('#y' + yi + '').val();
        $('#idx' + idE + 'c' + cA + '').focus();
        $('#idx' + idE + 'c' + cA + '').select();
    } else if (e == 37) {
        cA = parseInt(c) - parseInt(1);
        idE = $('#y' + yi + '').val();
        $('#idx' + idE + 'c' + cA + '').focus();
        $('#idx' + idE + 'c' + cA + '').select();
    }

}

function pulsar(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13) return false;
}

function seleccionarCelda(y, c) {
    var idE = $('#y' + y + '').val();
    $('#idx' + idE + 'c' + c + '').select();
}

function esconderMensaje() {
    var ng = $('#guardado-id').val();
    if (ng == 0) {
        alert("No ha guardado las calificaciones, si continua puede perder las calificaciones ingresadas");
    }
    $('#alert-nota').alert('close');
}

function movimientoAutomatico(value) {
    $('#auto-movimiento-id').val(value);
}

function notasGuardadas(value) {
    $('#guardado-id').val(value);
}

function moverPagina() {
    $('html, body').animate({
        scrollTop: '0px'
    }, 800);
    return false;
}

function guardarNotas(e) {
    e.preventDefault();
    $.ajax({
        data: $('#form-edit-calificaciones').serialize(),
        url: 'index.php?action=addCalificaciones',
        dataType: 'html',
        tryCount: 0,
        retryLimit: 3,
        type: 'post',
        beforeSend: function () {
            $('#loading').show();
            $('#mensaje').html("Espere un momento...");
        },
        success: function (html) {
            $('#mensaje').show();
            $("#mensaje").html(html);
            $('#loading').hide();
            cargarCalificaciones();
            notasGuardadas(1);
        },
        error: function (xhr, textStatus, errorThrown) {
            if (textStatus == 'timeout') {
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    //try again
                    $.ajax(this);
                    return;
                }
                return;
            }
            if (xhr.status == 500) {
                //handle error
            } else {
                //handle error
            }
        }
    });
};
