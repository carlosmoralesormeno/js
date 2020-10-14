function cargaPregunta() {

    var idPrueba = $('#prueba').val();

    var params = {
        "id_ques": idPrueba
    };

    if (idPrueba) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewPreguntas',
            dataType: 'html',
            type: 'get',
            success: function (html) {
                $('#pregunta').html(html);
                ocultarVistaPrevia();
            }
        });
    } else {
        $('#texto-modal').html('Debe elegir una pregunta primero');
        $('#pregunta').html('<option value="">Seleccione la Prueba Primero</option>');
    }
};

function cargaPreguntaEditada() {

    var idPrueba = $('#prueba').val();
    var idPregunta = $('#pregunta-id-edit').val();

    var params = {
        "id_quest": idPrueba,
        "id_value": idPregunta
    };

    if (idPrueba) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewPreguntas',
            dataType: 'html',
            type: 'get',
            success: function (html) {
                $('#pregunta').html(html);

            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Ha ocurrido un error, vuelva a intentar'
        });
    }
};

function cargaPreguntaGuardada() {

    var idPrueba = $('#prueba').val();
    var idPregunta = $('#pregunta-id-insert').val();

    var params = {
        "id_quest": idPrueba,
        "id_value": idPregunta
    };

    if (idPrueba) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewPreguntas',
            dataType: 'html',
            type: 'get',
            success: function (html) {
                $('#pregunta').html(html);
                vistaPreviaPregunta();

            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Ha ocurrido un error, vuelva a intentar'
        });
    }
};


function vistaPreviaPregunta() {

    var idPregunta = document.getElementById("pregunta").value;

    var params = {
        "id_pru_a": idPregunta
    };

    if (idPregunta) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewPreguntas',
            dataType: 'html',
            type: 'get',
            beforeSend: function () {
                jQuery('#loading').show();
            },
            success: function (html) {
                jQuery('#loading').hide();
                mostrarVistaPrevia();
                $('#vista-previa-pregunta').html(html);
            }
        });

    }
};

function vistaPreviaPreguntaAlternativa(idPregunta) {

    var params = {
        "id_pru": idPregunta
    };

    if (idPregunta) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewPreguntas',
            dataType: 'html',
            type: 'get',
            success: function (html) {
                mostrarVistaPrevia();
                $('#vista-previa-pregunta-a').html(html);
            }
        });

    }
};



function guardarPregunta() {
    var idPrueba = $('#id-prueba').val();
    var tipoPregunta = $('#tipo-pregunta').val();
    var txtPregunta = tinymce.get('txt-pregunta').getContent();
    var params = {
        "id_prueba": idPrueba,
        "txt_pregunta": txtPregunta,
        "tipo_pregunta": tipoPregunta
    };

    if (idPrueba) {
        if (txtPregunta) {
            $.ajax({
                data: params,
                url: 'index.php?action=addPregunta',
                dataType: 'html',
                type: 'post',
                success: function (html) {
                    $('#insert-pregunta').html(html);
                    if (tipoPregunta == 1) {
                        guardarAlternativa_Abierta(0, 0);
                    }
                    tinyMCE.activeEditor.setContent('');
                    $('#modal-preg').modal('hide');
                    cargarEvaluacionVistaPrevia(idPrueba);
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Debe agregar la pregunta para guardar'
            });
        }
    } else {
        $('#titulo-modal').html('Ups! Hay un error');
        $('#texto-modal').html('Debe elegir la prueba antes de guardar la pregunta');
        $("#modal-msj").modal("show");
        ocultarPregunta();
    }
};

function guardarAlternativa_Abierta(st, id) {
    if (st == 0) {
        sta = $('#pregunta-id-insert').val();
    } else {
        sta = id;
    }
    var idPregunta = sta;
    var txtAlternativa = "OpenQuestion";
    var params = {
        "id_pregunta": idPregunta,
        "txt_alternativa": txtAlternativa
    };

    if (idPregunta) {
        if (txtAlternativa) {
            $.ajax({
                data: params,
                url: 'index.php?action=addAlternativa',
                dataType: 'html',
                type: 'post',
                success: function () {
                }
            });
        }
    }
};

function guardarAlternativa() {
    //e.preventDefault();
    var idPregunta = $('#id-pregunta-a').val();
    var txtAlternativa = tinymce.get('txt-alternativa').getContent();
    var idPrueba = $('#id-prueba').val();
    var params = {
        "id_pregunta": idPregunta,
        "txt_alternativa": txtAlternativa
    };

    if (idPregunta) {
        if (txtAlternativa) {
            $.ajax({
                data: params,
                url: 'index.php?action=addAlternativa',
                dataType: 'html',
                type: 'post',
                success: function () {
                    tinyMCE.activeEditor.setContent('');
                    tinyMCE.get('txt-alternativa').focus();
                    vistaPreviaPreguntaAlternativa(idPregunta);
                    cargarEvaluacionVistaPrevia(idPrueba);
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Debe escribir la alternativa para agregarla'
            });
        }
    } else {
        $('#titulo-modal').html('Ups! Hay un error');
        $('#texto-modal').html('Debe elegir una pregunta primero');
        $("#modal-msj").modal("show");
        ocultarAlternativa();
    }
};

function btnPreguntaAlternativa(idPregunta, id) {
    if (id == 1) {
        tinymce.get('txt-alternativa').setContent('');
        btnAlternativa(2);
        mostrarAlternativa();
        $('#form-altenativa').show();
        tinyMCE.get('txt-alternativa').focus();
        $('#form-pregunta').hide();
        vistaPreviaPreguntaAlternativa(idPregunta);
    } else {
        tinymce.get('txt-pregunta').setContent('');
        btnPregunta(2);
        mostrarPregunta();
        $('#form-pregunta').show();
        tinyMCE.get('txt-pregunta').focus();
        $('#form-altenativa').hide();
    }
}

function btnPregunta(id) {
    if (id == 1) {
        $('#btn-actualizar-pregunta').show();
        $('#btn-eliminar-pregunta').show();
        $('#btn-guardar-pregunta').hide();
    } else {
        $('#btn-actualizar-pregunta').hide();
        $('#btn-eliminar-pregunta').hide();
        $('#btn-guardar-pregunta').show();
    }
};

function btnAlternativa(id) {
    if (id == 1) {
        $('#btn-actualizar-alternativa').show();
        $('#btn-eliminar-alternativa').show();
        $('#btn-guardar-alternativa').hide();
    } else {
        $('#btn-actualizar-alternativa').hide();
        $('#btn-eliminar-alternativa').hide();
        $('#btn-guardar-alternativa').show();
    }
};

function guardarAlternativaCorrecta(idPregunta, idAlternativa, idPuntaje) {
    var idPrueba = $('#id-prueba').val();
    var idPuntaje = $('#ptj-' + idPregunta + '').val();

    if (idPuntaje) {
        idPuntaje = idPuntaje;
    } else {
        idPuntaje = 0;
    }
    //e.preventDefault();
    var params = {
        "pregunta-id": idPregunta,
        "alternativa-id": idAlternativa,
        "puntaje_id": idPuntaje
    };

    if (idPregunta) {
        $.ajax({
            data: params,
            url: 'index.php?action=updateAlternativaCorrecta',
            dataType: 'html',
            type: 'post',
            success: function () {
                cargarEvaluacionVistaPrevia(idPrueba);
            }
        });
    }
};

function cargarPreguntaEditar(idPregunta) {
    //e.preventDefault();
    var params = {
        "id_predit": idPregunta
    };
    if (idPregunta) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewPreguntas',
            dataType: 'JSON',
            type: 'get',
            success: function (response) {
                var len = response.length;
                for (var i = 0; i < len; i++) {
                    var rsTxtPregunta = response[i].txtPregunta;
                    var rsTipoPregunta = response[i].tipoPregunta;
                    btnPreguntaAlternativa(2);
                    tinymce.get('txt-pregunta').setContent(rsTxtPregunta);
                    $('#tipo-pregunta').val(rsTipoPregunta);
                    $('#pregunta-id-edit').val(idPregunta);
                    btnPregunta(1);
                }

            }
        });
    } else {
        $('#titulo-modal').html('Ups! Hay un error');
        $('#texto-modal').html('Debe elegir una pregunta para visualizarla previamente');
        $("#modal-msj").modal("show");
    }
};

function DetectarCambioTipoPregunta() {
    $('#update-tipo-pregunta').val(1)
};

function actualizarPregunta(e) {
    e.preventDefault();
    var idPregunta = $('#pregunta-id-edit').val();
    var tipoPregunta = $('#tipo-pregunta').val();
    var txtPregunta = tinymce.get('txt-pregunta').getContent();
    var updateTipo = $('#update-tipo-pregunta').val();
    var idPrueba = $('#id-prueba').val();

    var params = {
        "id_pregunta": idPregunta,
        "txt_pregunta": txtPregunta,
        "tipo_pregunta": tipoPregunta
    };

    if (idPregunta) {
        if (txtPregunta) {
            $.ajax({
                data: params,
                url: 'index.php?action=updatePregunta',
                dataType: 'html',
                type: 'post',
                success: function () {
                    tinyMCE.activeEditor.setContent('');
                    ocultarPregunta();
                    if (updateTipo == 1) {
                        if (tipoPregunta == 0) {
                            eliminarAlternativas();
                        } else {
                            eliminarAlternativas();
                            guardarAlternativa_Abierta(1, idPregunta);
                        }
                    }
                    $('#modal-preg').modal('hide');
                    cargarEvaluacionVistaPrevia(idPrueba);
                    //vistaPreviaPregunta();
                    //cargaPreguntaEditada();
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Debe escribir una pregunta antes de actualizar'
            });
        }
    } else {
        $('#titulo-modal').html('Ups! Hay un error');
        $('#texto-modal').html('Debe elegir la pregunta antes de guardar');
        $("#modal-msj").modal("show");
    }
};

function cargarAlternativaEditar(idPregunta, idAlternativa) {
    //e.preventDefault();

    var params = {
        "id_aledit": idAlternativa
    };
    if (idAlternativa) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewPreguntas',
            dataType: 'html',
            type: 'get',
            success: function (html) {
                btnPreguntaAlternativa(idPregunta, 1);
                tinymce.get('txt-alternativa').setContent(html);
                $('#alternativa-id-edit').val(idAlternativa);
                btnAlternativa(1);
            }
        });
    } else {
        $('#titulo-modal').html('Ups! Hay un error');
        $('#texto-modal').html('Debe elegir una alternativa para visualizarla previamente');
        $("#modal-msj").modal("show");
    }
};

function actualizarAlternativa(e) {
    e.preventDefault();
    var idAlternativa = $('#alternativa-id-edit').val();
    var txtAlternativa = tinymce.get('txt-alternativa').getContent();
    var idPrueba = $('#id-prueba').val();
    var idPregunta = $('#id-pregunta-a').val();
    var params = {
        "id_alternativa": idAlternativa,
        "txt_alternativa": txtAlternativa
    };

    if (idAlternativa) {
        if (txtAlternativa) {
            $.ajax({
                data: params,
                url: 'index.php?action=updateAlternativa',
                dataType: 'html',
                type: 'post',
                success: function () {

                    //$('#titulo-modal').html('Actualizado');
                    //$('#texto-modal').html('La Alternativa ha sido actualizada');
                    //$("#modal-msj").modal("show");
                    vistaPreviaPreguntaAlternativa(idPregunta);
                    tinymce.get('txt-alternativa').setContent('');
                    btnAlternativa(2);
                    cargarEvaluacionVistaPrevia(idPrueba);
                    //ocultarAlternativa();
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Debe escribir la alternativa para poder actualizar'
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Ha ocurrido un error, vuelva a intentar'
        });
    }
};

function eliminarPregunta() {
    //e.preventDefault();
    var idPregunta = $('#pregunta-id-edit').val();
    var idPrueba = $('#id-prueba').val();
    var params = {
        "id_pregunta": idPregunta
    };

    if (idPregunta) {


        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Esto eliminará las alternativas incluidas",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, Borrar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    data: params,
                    url: 'index.php?action=deletePregunta',
                    dataType: 'html',
                    type: 'post',
                    success: function () {
                        tinymce.get('txt-pregunta').setContent('');
                        $('#modal-preg').modal('hide');
                        cargarEvaluacionVistaPrevia(idPrueba);
                        //ocultarPregunta();
                        //cargaPregunta();

                    }
                });
                Swal.fire(
                    'Eliminada!',
                    'La Pregunta ha sido eliminada',
                    'success'
                )
            }
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Ha ocurrido un error, vuelva a intentar'
        });
    }
};

function eliminarAlternativas() {
    var idPregunta = $('#pregunta-id-edit').val();
    var idPrueba = $('#id-prueba').val();
    var params = {
        "id_pregunta": idPregunta
    };

    if (idPregunta) {
        $.ajax({
            data: params,
            url: 'index.php?action=deleteAlternativas',
            dataType: 'html',
            type: 'post',
            success: function () {
            }
        });
        cargarEvaluacionVistaPrevia(idPrueba);
    }
};

function eliminarAlternativa(e) {
    e.preventDefault();
    var idAlternativa = $('#alternativa-id-edit').val();
    var idPrueba = $('#id-prueba').val();
    var idPregunta = $('#id-pregunta-a').val();
    var params = {
        "id_alternativa": idAlternativa
    };

    if (idAlternativa) {
        $.ajax({
            data: params,
            url: 'index.php?action=deleteAlternativa',
            dataType: 'html',
            type: 'post',
            success: function () {
                tinyMCE.activeEditor.setContent('');
                //ocultarAlternativa();
                vistaPreviaPreguntaAlternativa(idPregunta);
                btnAlternativa(2);
                cargarEvaluacionVistaPrevia(idPrueba);
            }
        });

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Ha ocurrido un error, vuelva a intentar'
        });
    }
};

function ocultarPregunta() {
    $('#form-pregunta').hide()
    //$('#collapseDatos').CardWidget('expand')
};

function mostrarPregunta() {
    $('#collapsePregunta').collapse('show')
    //$('#collapseDatos').CardWidget('collapse')
};

function ocultarAlternativa() {
    $('#form-altenativa').hide()
    $('#collapseDatos').CardWidget('expand')
    vistaPreviaPregunta();
};

function mostrarAlternativa() {
    $('#collapseAlternativa').collapse('show')
    //$('#collapseDatos').CardWidget('collapse')
};

function ocultarVistaPrevia() {
    $('#vista-previa-pregunta').collapse('hide')
};

function mostrarVistaPrevia() {
    $('#vista-previa-pregunta').collapse('show')
};

function cargarEvaluacionTest(idPrueba, idRegistro) {

    var params = {
        "id_eval": idPrueba,
        "id_reg_est": idRegistro
    };
    if (idPrueba) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewPreguntas',
            dataType: 'html',
            type: 'get',
            beforeSend: function () {

            },
            success: function (html) {
                $('.loading').hide();
                $('#evaluacion').html(html);
                $('#estudiante-id').val(idRegistro);
                $('#test-id').val(idPrueba);
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Ha ocurrido un error, vuelva a intentar'
        });
    }
};



function cargarCurso() {

    var idCurso = $('#curso').val();

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
            }
        });
    }
};

function cargarEvaluacionEstudiante(idEstudiante, estado, idView) {
    $('#id-estudiante').val(idEstudiante);

    var id = idEstudiante;
    var idPrueba = $('#id-prueba').val();
    var idNTest = $('#id-qt').val();

    var params = {
        "id_est": id,
        "id_eval_r": idPrueba,
        "id_ntest": idNTest,
        "id_view": idView
    };

    if (id) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewPreguntas',
            dataType: 'html',
            type: 'get',
            success: function (html) {
                $('#titulo-modal').html('<i class="fa fa-book-open"></i> Revisión');
                $('#texto-modal').html(html);
                if (estado == 0) {
                    $("#modal-msj").modal("show");
                }
            }
        });
    }
}

function guardarNuevaEvaluacion() {

    var txtNombre = $('#txt-nombre').val();
    var txtObjetivo = $('#txt-objetivo').val();
    var txtHabilidad = $('#txt-habilidad').val();
    var idAsignatura = $('#id-asignatura').val();
    var idRegistro = $('#id-registro').val();

    var params = {
        "txt-nombre": txtNombre,
        "txt-objetivo": txtObjetivo,
        "txt-habilidad": txtHabilidad,
        "id-asignatura": idAsignatura,
        "id-registro": idRegistro
    };

    if (txtNombre) {
        if (idAsignatura) {
            $.ajax({
                data: params,
                url: 'index.php?action=addTestEvaluacion',
                dataType: 'html',
                type: 'post',
                success: function (data) {
                    $('#modal-evaluacion').modal('hide');
                    Swal.fire(
                        '¡Excelente!',
                        'Una nueva Evaluación ha sido agregada',
                        'success'
                    )
                    cargarEvaluaciones();
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Debes seleccionar una Asignatura'
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Debes al menos agregar el Nombre de la Evaluación'
        });
    }
}

function cargarEvaluacionEditar(idPrueba) {

    var params = {
        "id_evadit": idPrueba
    };
    if (idPrueba) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewPreguntas',
            dataType: 'JSON',
            type: 'get',
            success: function (response) {
                var len = response.length;
                for (var i = 0; i < len; i++) {
                    var rsTxtNombre = response[i].txtNombre;
                    var rsTxtAsignatura = response[i].txtAsignatura;
                    var rsTxtOA = response[i].txtOA;
                    var rsTxtHabilidades = response[i].txtHabilidades;
                    $('#txt-nombre').val(rsTxtNombre);
                    $('#id-asignatura').val(rsTxtAsignatura);
                    $('#txt-objetivo').val(rsTxtOA);
                    $('#txt-habilidad').val(rsTxtHabilidades);
                    btnEvaluacion(1);
                    $('#id-prueba').val(idPrueba);
                    $('#titulo-evaluacion').html('<i class="fas fa-file-alt"></i> Editar Evaluación');
                    $('#modal-evaluacion').modal('show');
                    //btnPregunta(1);
                }
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Ha ocurrido un error, vuelva a intentar'
        });
    }
};

function actualizarEvaluacion() {

    var txtNombre = $('#txt-nombre').val();
    var txtObjetivo = $('#txt-objetivo').val();
    var txtHabilidad = $('#txt-habilidad').val();
    var idAsignatura = $('#id-asignatura').val();
    var idPrueba = $('#id-prueba').val();

    var params = {
        "txt-nombre": txtNombre,
        "id-asignatura": idAsignatura,
        "txt-objetivo": txtObjetivo,
        "txt-habilidad": txtHabilidad,
        "id-prueba": idPrueba
    };

    if (txtNombre) {
        $.ajax({
            data: params,
            url: 'index.php?action=updateTestEvaluacion',
            dataType: 'html',
            type: 'post',
            success: function (data) {
                $('#modal-evaluacion').modal('hide');
                Swal.fire(
                    '¡Bien!',
                    'La Evaluación ha sido modificada',
                    'success'
                )
                cargarEvaluaciones();
            }
        });
    }
}

function eliminarEvaluacion() {

    var idPrueba = $('#id-prueba').val();

    var params = {
        "id-prueba": idPrueba
    };

    if (idPrueba) {
        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Esto eliminará toda la información incluida la información de evaluaciones realizadas a estudiantes",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, Borrar Todo!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    data: params,
                    url: 'index.php?action=deleteTestEvaluacion',
                    dataType: 'html',
                    type: 'post',
                    success: function (data) {
                        $('#modal-evaluacion').modal('hide');
                        cargarEvaluaciones();
                    }
                });
                Swal.fire(
                    'Eliminada!',
                    'La Evaluación ha sido Eliminada',
                    'success'
                )
            }
        })
    }
}

function cargarEvaluaciones() {

    var idRegistro = $('#id-registro').val();

    var params = {
        "id_rut": idRegistro
    };

    if (idRegistro) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewEvaList',
            dataType: 'html',
            type: 'get',
            success: function (html) {
                $('#evaluaciones').html(html);
                $('.loading').remove();
            }
        });

    }
}

function cargarEvaluacionesAdmin(idRegistro) {

    var params = {
        "id_rut": idRegistro
    };


    if (idRegistro) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewEvaList',
            dataType: 'html',
            type: 'get',
            success: function (html) {
                $('#evaluaciones').html(html);
                //$('.loading').remove();
            }
        });

    }
}

function sessionEvaluacion(idRegistro) {
    var params = {
        "id_rut": idRegistro
    };

    if (idRegistro) {
        $.ajax({
            data: params,
            url: 'index.php?action=sessionRUT',
            dataType: 'html',
            type: 'post',
            success: function (html) {
                $('#id-registro').val(idRegistro);
                cargarEvaluacionesAdmin(idRegistro);
            }
        });

    }
}

function cargarNuevaEvaluacion() {
    $('#txt-nombre').val("");
    $('#id-asignatura').val("");
    $('#txt-objetivo').val("");
    $('#txt-habilidad').val("");
    btnEvaluacion(0);
    $("#modal-evaluacion").modal("show");
    $('#titulo-evaluacion').html('<i class="fas fa-file-alt"></i> Nueva Evaluación');
}

function btnEvaluacion(id) {
    if (id == 1) {
        $('#btn-actualizar-evaluacion').show();
        $('#btn-eliminar-evaluacion').show();
        $('#btn-guardar-evaluacion').hide();
    } else {
        $('#btn-actualizar-evaluacion').hide();
        $('#btn-eliminar-evaluacion').hide();
        $('#btn-guardar-evaluacion').show();
    }
};

function NuevaPreguntaV2(idPregunta, idA) {

    var id = 1;

    if (id) {
        btnPreguntaAlternativa(idPregunta, idA);
        $("#modal-preg").modal("show");
    }
}

function editarPreguntaV2(idPregunta) {

    var id = 1;

    if (id) {
        cargarPreguntaEditar(idPregunta);
        $("#modal-preg").modal("show");
    }
}

function guardarPreguntaV2(idPregunta, idA) {

    var id = 1;

    if (id) {
        btnPreguntaAlternativa(idPregunta, idA);
        $("#modal-preg").modal("show");
    }
}


function editarAlternativaV2(idPregunta, idAlternativa) {

    var id = 1;

    if (id) {
        $('#id-pregunta-a').val(idPregunta);
        cargarAlternativaEditar(idPregunta, idAlternativa);
        $("#modal-alt").modal("show");
    }
}

function editarAlternativaModalV2(idPregunta, idAlternativa) {

    var id = 1;

    if (id) {
        $('#id-pregunta-a').val(idPregunta);
        cargarAlternativaEditar(idPregunta, idAlternativa);
        //$("#modal-alt").modal("show");
    }
}

function guardarAlternativaCorrectaV2(idPregunta, idAlternativa, idPuntaje) {

    var id = 1;

    if (id) {
        //Pasar valor para editar a un input hide
        $('#id-pregunta-a').val(idPregunta);
        guardarAlternativaCorrecta(idPregunta, idAlternativa, idPuntaje);
        //$("#modal-alt").modal("show");
    }
}

function agregarAlternativaV2(idPregunta, id) {

    var id = 1;

    if (id) {
        $('#id-pregunta-a').val(idPregunta);
        btnPreguntaAlternativa(idPregunta, id);
        $("#modal-alt").modal("show");
    }
}

function cargarEvaluacionVistaPrevia(idPrueba) {

    var params = {
        "id_eval_vista": idPrueba
    };
    if (idPrueba) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewPreguntas',
            dataType: 'html',
            type: 'get',
            success: function (html) {
                //$('#titulo-modal').html('<i class="fa fa-book-open"></i> Vista Previa');
                //$('#texto-modal').html(html);
                //$("#modal-msj").modal("show");
                //$('#titulo-modal').html('<i class="fa fa-book-open"></i> Vista Previa');
                //$('#card-evaluaciones').CardWidget('collapse')
                $('#preguntas').html(html);
                //$("#modal-msj").modal("show");
                $('#id-prueba').val(idPrueba);
            }
        });
    }
};

function mostrarEvaluaciones() {
    $('#card-evaluaciones').CardWidget('expand')
    $('#vista-preguntas').CardWidget('remove')
};


function cargarConfigurarEvaluacion(idPrueba) {
    //$('#txt-nombre').val("");
    //$('#txt-objetivo').val("");
    //$('#txt-habilidad').val("");
    //btnEvaluacion(0);
    $('#id-curso-c').val("");
    $('#id-prueba').val(idPrueba);
    $('#id-intentos').val(1);
    $("#modal-aplicacion").modal("show");
    $('#titulo-aplicacion').html('<i class="fas fa-file-alt"></i> Cargando...');
    tablaConfigurarEvaluacion(1);
}

function guardarConfigurarEvaluacion() {

    var idTest = $('#id-prueba').val();
    var idCurso = $('#id-curso-c').val();
    var maxTest = $('#id-intentos').val();

    var params = {
        "test-id": idTest,
        "curso-id": idCurso,
        "intentos-id": maxTest
    };
    if (idCurso) {
        if (maxTest) {
            $.ajax({
                data: params,
                url: 'index.php?action=addEvaluacionConfig',
                dataType: 'html',
                type: 'post',
                success: function (data) {
                    //$('#modal-evaluacion').modal('hide');
                    Swal.fire(
                        '¡Excelente!',
                        'Una nueva aplicación de evaluación ha sido agregada',
                        'success'
                    )
                    tablaConfigurarEvaluacion(1);
                    //$('#titulo-modal').html('Ups! Hay un error');
                    //$('#texto-modal').html(data);
                    //$("#modal-msj").modal("show");
                }
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Debes colocar el número de intentos para la evaluación'
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Te falta seleccionar el curso'
        });
    }

}

function tablaConfigurarEvaluacion(id) {

    var idTest = $('#id-prueba').val();
   

    var params = {
        "test-id": idTest
    };

    if (idTest) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewEvaluacionConfig',
            dataType: 'html',
            type: 'get',
            success: function (data) {
                $('#tabla-evaluacion').html(data);
                if (id == 1) {
                    //$('#card-aplicacion').CardWidget('collapse')
                    //$('#card-aplicacion').CardWidget('expand')
                }
                //$('#titulo-modal').html('Ups! Hay un error');
                //$('#texto-modal').html(data);
                //$("#modal-msj").modal("show");
                var nombrePrueba = $('#name-evaluacion').val();
                $('#titulo-aplicacion').html('<i class="fas fa-file-alt"></i> '+nombrePrueba);
            }
        });

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Debes al menos agregar el Nombre de la Evaluación'
        });
    }
}

function actualizarConfigurarEvaluacion(idConfig, value) {

    var params = {
        "id-evconfig": idConfig,
        "intentos-id": value,
    };

    if (value > 0) {
        $.ajax({
            data: params,
            url: 'index.php?action=updateEvaluacionConfig',
            dataType: 'html',
            type: 'post',
            success: function (data) {
                //$('#modal-evaluacion').modal('hide');
                tablaConfigurarEvaluacion(0);

            }
        });

    }
}

function eliminarConfigurarEvaluacion(idConfig) {

    var params = {
        "id-evconfig": idConfig
    };

    if (idConfig) {

        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Eliminará la evaluación que sería aplicada al curso",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, Borrar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    data: params,
                    url: 'index.php?action=deleteEvaluacionConfig',
                    dataType: 'html',
                    type: 'post',
                    success: function (data) {
                        //$('#modal-evaluacion').modal('hide');
                        tablaConfigurarEvaluacion(1);

                    }
                });
                Swal.fire(
                    'Eliminada!',
                    'La Aplicación de Evaluación ha sido Eliminada',
                    'success'
                )
            }
        })
    }
}

function cargarRevisionEvaluacion(idPrueba) {
    $('#id-prueba').val(idPrueba);
    $('#modal-reporte').modal('show');

    var params = {
        "test-id": idPrueba
    };

    if (idPrueba) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewEvaListReport',
            dataType: 'html',
            type: 'get',
            success: function (data) {
                $('#reporte-curso').html(data);
                $('#modal-reporte').modal('show');
                $('.loading').hide();
                //tablaConfigurarEvaluacion(0);
            }
        });

    }
}

function cargarResultadoEvaluacion() {
    var idPrueba = 1;
    $('#modal-reporte').modal('show');

    if (idPrueba) {
        $.ajax({
            url: 'index.php?action=viewEvaListResult',
            dataType: 'html',
            type: 'get',
            success: function (data) {
                $('#reporte-curso').html(data);
                $('#modal-reporte').modal('show');
                $('.loading').hide();
                //tablaConfigurarEvaluacion(0);
            }
        });
    }
}

function cargarConfigReporteTest(idPrueba, idCurso, idLetra, idCursoP, idN) {
    var idNTest = $('#qt-' + idN).val();
    $('#id-qt').val(idNTest);
    cargarReporteTest(idPrueba, idCurso, idLetra, idCursoP);
};

function cargarReporteTest(idPrueba, idCurso, idLetra, idCursoP, IDVW) {

    //visualizar resultados estudiantes
    $('#id-curso').val(idCurso);
    $('#id-letra').val(idLetra);
    $('#id-curso-p').val(idCursoP);

    idNTest = $('#id-qt').val();

    var params = {
        "id_test": idPrueba,
        "id_ntest": idNTest,
        "id_nvl": idCurso,
        "id_ltr": idLetra,
        "idView": IDVW
    };
    if (idPrueba) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewEvaluacion',
            dataType: 'html',
            type: 'get',
            beforeSend: function () {
                $('.loading').show();
            },
            success: function (html) {
                $('.loading').hide();
                $('#reporte').html(html);
                $('#modal-reporte').modal('hide');
                var nombre_curso = $('#nombre-curso').val();
                $('#titulo-nombre-curso').html(nombre_curso);
                //$('#card-evaluaciones').CardWidget('collapse')
                $('#id-prueba').val(idPrueba);
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Ha ocurrido un error, vuelva a intentar'
        });
    }

};

function mostrarEvaluacionesReporte() {
    $('#card-evaluaciones').CardWidget('expand')
    $('#vista-reporte').CardWidget('remove')
};

function guardarPuntajeRespuesta(idRespuesta, puntaje, puntajeMax) {

    var idPrueba = $('#id-prueba').val();
    var idCurso = $('#id-curso').val();
    var idLetra = $('#id-letra').val();
    var idEstudiante = $('#id-estudiante').val();
    var idCursoP = $('#id-curso-p').val();

    var params = {
        "respuesta-id": idRespuesta,
        "puntaje_id": puntaje
    };

    if (puntaje) {
        if (puntajeMax >= puntaje) {
            $.ajax({
                data: params,
                url: 'index.php?action=updatePuntajeRespuesta',
                dataType: 'html',
                type: 'post',
                success: function () {
                    cargarEvaluacionEstudiante(idEstudiante, 1, 0);
                    cargarReporteTest(idPrueba, idCurso, idLetra, idCursoP);
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'No puedes un puntaje mayor que el configurado'
            });
            $("#" + idRespuesta + '').val(puntajeMax);
            cargarEvaluacionEstudiante(idEstudiante, 1, 0);
            cargarReporteTest(idPrueba, idCurso, idLetra, idCursoP);
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Te falta escribir el puntaje'
        });
        $("#" + idRespuesta + '').val(puntajeMax);
        cargarEvaluacionEstudiante(idEstudiante, 1, 0);
        cargarReporteTest(idPrueba, idCurso, idLetra, idCursoP);
    }

}

function recargarReporteTest(id) {
    var idPrueba = $('#id-prueba').val();
    var idCurso = $('#id-curso').val();
    var idLetra = $('#id-letra').val();
    var idCursoP = $('#id-curso-p').val();
    if (id == 0) {
        cargarReporteTest(idPrueba, idCurso, idLetra, idCursoP);
    } else {
        cargarReportePermiso(idPrueba, idCurso, idLetra, idCursoP, id);
    }
}

function EliminarEvaluacionEstudiante(idEstudiante) {
    var idPrueba = $('#id-prueba').val();
    var idNTest = $('#id-qt').val();

    var idCurso = $('#id-curso').val();
    var idLetra = $('#id-letra').val();
    var idCursoP = $('#id-curso-p').val();

    var params = {
        "id_test": idPrueba,
        "id_estudiante": idEstudiante,
        "id_ntest": idNTest
    };
    if (idPrueba) {

        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Eliminará la evaluación del estudiante que ha sido aplicada",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, Borrar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    data: params,
                    url: 'index.php?action=deleteEvaluacion',
                    dataType: 'html',
                    type: 'post',
                    success: function (html) {
                        cargarReporteTest(idPrueba, idCurso, idLetra, idCursoP);
                    }
                });
                Swal.fire(
                    'Eliminada!',
                    'La Evaluación del Estudiante ha sido Eliminada',
                    'success'
                )
            }
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Ha ocurrido un error, vuelva a intentar'
        });
    }

};


function cargarPermisosReporteTest() {
    $('#titulo-permiso-evaluacion').html('<i class="fas fa-share-square"></i> Compartir Resultados');
    $('#modal-permiso-evaluacion').modal('show');
    tablaConfigurarPermisos(1);
}

function guardarPermisosReporteTest() {

    var idPrueba = $('#id-prueba').val();
    var idCurso = $('#id-curso-p').val();
    var idDocente = $('#id-docente-p').val();

    var params = {
        "test-id": idPrueba,
        "curso-id": idCurso,
        "docente-id": idDocente
    };
    if (idCurso) {
        if (idDocente) {
            $.ajax({
                data: params,
                url: 'index.php?action=addEvaluacionPermiso',
                dataType: 'html',
                type: 'post',
                success: function (data) {
                    //$('#modal-evaluacion').modal('hide');
                    Swal.fire(
                        '¡Fantástico!',
                        'El Permiso de Reporte ha sido agregado',
                        'success'
                    )
                    tablaConfigurarPermisos(1);
                    //$('#titulo-modal').html('Revisión Codigo');
                    //$('#texto-modal').html(data);
                    //$("#modal-msj").modal("show");
                }
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Debes seleccionar el Docente'
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Te falta seleccionar el Curso'
        });
    }

}

function tablaConfigurarPermisos(id) {

    var idTest = $('#id-prueba').val();
    var idCurso = $('#id-curso-p').val();

    var params = {
        "test-id": idTest,
        "curso-p-id": idCurso
    };

    if (idTest) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewEvaluacionPermisos',
            dataType: 'html',
            type: 'get',
            success: function (data) {
                $('#tabla-permisos').html(data);
                if (id == 1) {
                    $('#card-permiso').CardWidget('collapse')
                    $('#card-permiso').CardWidget('expand')
                }
                //$('#titulo-modal').html('Ups! Hay un error');
                //$('#texto-modal').html(data);
                //$("#modal-msj").modal("show");
            }
        });

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Debes al menos agregar el Nombre de la Evaluación'
        });
    }
}

function eliminarConfigurarPermiso(idConfig) {

    var params = {
        "id-evperm": idConfig
    };

    if (idConfig) {

        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Eliminará el Permiso de Evaluación del Docente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, Borrar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    data: params,
                    url: 'index.php?action=deleteEvaluacionPermiso',
                    dataType: 'html',
                    type: 'post',
                    success: function (data) {
                        //$('#modal-evaluacion').modal('hide');
                        tablaConfigurarPermisos(1);

                    }
                });
                Swal.fire(
                    'Eliminada!',
                    'El Permiso de Evaluación ha sido Eliminado',
                    'success'
                )
            }
        })
    }
}

function cargarPermisoReporteTest(dPrueba, idCurso, idLetra, idCursoP, idView, idN) {
    var idNTest = $('#qt-' + idN).val();
    $('#id-qt').val(idNTest);
    cargarReportePermiso(dPrueba, idCurso, idLetra, idCursoP, idView);
};

function cargarReportePermiso(idPrueba, idCurso, idLetra, idCursoP, idView) {
    idNTest = $('#id-qt').val();
    $('#id-prueba').val(idCurso);
    $('#id-curso').val(idCurso);
    $('#id-letra').val(idLetra);
    $('#id-curso-p').val(idCursoP);

    var params = {
        "id_test": idPrueba,
        "id_ntest": idNTest,
        "id_nvl": idCurso,
        "id_ltr": idLetra,
        "id_view": idView
    };
    if (idPrueba) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewEvaluacion',
            dataType: 'html',
            type: 'get',
            beforeSend: function () {
                //$('.loading').show();
                jQuery("#evaluacion").html("Cargando Resultados...");
            },
            success: function (html) {
                //$('.loading').hide();
                $('#reporte').html(html);
                $('#modal-reporte').modal('hide');
                //$('#card-evaluaciones').CardWidget('collapse')
                $('#id-prueba').val(idPrueba);
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Ha ocurrido un error, vuelva a intentar'
        });
    }

};

function nuevoTexto(idPregunta) {

    var id = 1;

    if (id) {
        btnTexto(idPregunta);
        tinymce.get('txt-texto').setContent('');
        $('#pregunta-id-edit').val(idPregunta);
        $("#modal-texto").modal("show");
    }
}

function btnTexto(idPregunta) {
    tinymce.get('txt-texto').setContent('');
    tinyMCE.get('txt-texto').focus();
}

function guardarTexto() {
    var idPrueba = $('#id-prueba').val();
    var idPregunta = $('#pregunta-id-edit').val();
    var txtTexto = tinymce.get('txt-texto').getContent();
    var params = {
        "id_pregunta": idPregunta,
        "txt_texto": txtTexto
    };

    if (idPregunta) {
        if (txtTexto) {
            $.ajax({
                data: params,
                url: 'index.php?action=addTextoPregunta',
                dataType: 'html',
                type: 'post',
                success: function (html) {
                    //$('#titulo-modal').html('Ups! Hay un error');
                    //$('#texto-modal').html(html);
                    $('#modal-texto').modal('hide');
                    cargarEvaluacionVistaPrevia(idPrueba);
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Debe agregar el texto para guardar'
            });
        }
    } else {
        $('#titulo-modal').html('Ups! Hay un error');
        $('#texto-modal').html('Debe elegir la pregunta antes de guardar el texto');
        $("#modal-msj").modal("show");
        //ocultarPregunta();
    }
};

function editarTexto(idTexto) {

    var id = 1;

    if (id) {
        cargarTextoEditar(idTexto);
        $("#modal-texto").modal("show");
    }
}

function cargarTextoEditar(idTexto) {
    //e.preventDefault();
    var params = {
        "id_txtedit": idTexto
    };
    if (idTexto) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewPreguntas',
            dataType: 'JSON',
            type: 'get',
            success: function (response) {
                var len = response.length;
                for (var i = 0; i < len; i++) {
                    var rsTxtTexto = response[i].txtTexto;
                    //btnPreguntaAlternativa(2);
                    tinymce.get('txt-texto').setContent(rsTxtTexto);
                    $('#id-texto-p').val(idTexto);
                    //$('#pregunta-id-edit').val(idPregunta);
                    btnTexto(1);
                }

            }
        });
    } else {
        $('#titulo-modal').html('Ups! Hay un error');
        $('#texto-modal').html('Debe elegir una pregunta para visualizarla previamente');
        $("#modal-msj").modal("show");
    }
};

function actualizarTexto() {
    var idTexto = $('#id-texto-p').val();
    var txtTexto = tinymce.get('txt-texto').getContent();
    var idPrueba = $('#id-prueba').val();
    var params = {
        "id_txt": idTexto,
        "txt_texto": txtTexto
    };

    if (idTexto) {
        if (txtTexto) {
            $.ajax({
                data: params,
                url: 'index.php?action=updateTextoPregunta',
                dataType: 'html',
                type: 'post',
                success: function () {
                    //$('#titulo-modal').html('Actualizado');
                    //$('#texto-modal').html('La Alternativa ha sido actualizada');
                    //$("#modal-msj").modal("show");
                    //vistaPreviaPreguntaAlternativa(idPregunta);
                    $('#modal-texto').modal('hide');
                    tinymce.get('txt-texto').setContent('');
                    btnTexto(2);
                    cargarEvaluacionVistaPrevia(idPrueba);
                    //ocultarAlternativa();
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Debe escribir el texto para poder actualizar'
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Ha ocurrido un error, vuelva a intentar'
        });
    }
};

function eliminarTexto() {
    //e.preventDefault();
    var idTexto = $('#id-texto-p').val();
    var idPrueba = $('#id-prueba').val();
    var params = {
        "id_txt": idTexto
    };

    if (idTexto) {


        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Esto eliminará el texto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, Borrar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    data: params,
                    url: 'index.php?action=deleteTextoPregunta',
                    dataType: 'html',
                    type: 'post',
                    success: function () {
                        tinymce.get('txt-texto').setContent('');
                        $('#modal-texto').modal('hide');
                        cargarEvaluacionVistaPrevia(idPrueba);
                        //ocultarPregunta();
                        //cargaPregunta();

                    }
                });
                Swal.fire(
                    'Eliminada!',
                    'El Texto ha sido Eliminado',
                    'success'
                )
            }
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Ha ocurrido un error, vuelva a intentar'
        });
    }
};

function btnTexto(id) {
    if (id == 1) {
        $('#btn-actualizar-texto').show();
        $('#btn-eliminar-texto').show();
        $('#btn-guardar-texto').hide();
    } else {
        $('#btn-actualizar-texto').hide();
        $('#btn-eliminar-texto').hide();
        $('#btn-guardar-texto').show();
    }
};

function vistaPreviaEvaluacion(id) {
    var id = 1;
    var idPrueba = $('#id-prueba').val();
    var params = {
        "id_eva_prevista": idPrueba
    };
    if (id) {

        $.ajax({
            data: params,
            url: 'index.php?action=viewPreguntas',
            dataType: 'html',
            type: 'get',
            success: function (data) {
                $("#vista-previa").modal("show");
                $('#texto-vista').html(data);
            }
        });
    }
}

function nuevoUsuario() {

    var id = 1;

    if (id) {
        //cargarTextoEditar(idTexto);
        $("#modal-usuario").modal("show");
    }
}

function cargar_imprimir_ventana(idEvaluacion, idEstudiante, idTest){
    window.open("index.php?action=print.evaluacion.estudiante&id_est=" + idEstudiante + "&id_eval_r="+ idEvaluacion +"&id_ntest="+ idTest +"",width=600,height=400);
}

function cargar_imprimir_evaluacion(idEvaluacion){
    var id_column = $("#id-columnas").val();
    if(id_column>4){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Solo se puede imprimir entre 1 a 4 columnas'
        });
        $("#id-columnas").val(2);
    }else{
        $("#configurar-impresion").modal('hide');
        window.open("index.php?action=print.evaluacion&id_eva_prevista=" + idEvaluacion + "&id_column=" + id_column + "",width=600,height=400);
    }
    
}

function configurar_impresion() {
    $("#configurar-impresion").modal("show");
}

function configurarListaEstudiantes(idTest,idCurso) {

    $('#id-curso').val(idCurso);
    $('#id-test').val(idTest);
    $('#titulo-lista-curso').html('<i class="fas fa-user"></i> Configurar Estudiantes');
    $('#card-aplicacion').hide();
    
    //$('#card-aplicacion').show();
    var params = {
        "id-curso": idCurso,
        "id-test": idTest
    };

    if (idTest) {
        $.ajax({
            data: params,
            url: 'index.php?action=evaluacion.configurar.curso.listado',
            dataType: 'html',
            type: 'get',
            success: function (data) {
                $('#tabla-curso').html(data);
                var nombre_curso = $('#name-curso').val();
                $('#titulo-curso').html('<i class="fas fa-users"></i> Estudiantes de '+nombre_curso);
                $('#card-lista-curso').show();
            }
        });
    }

    
    //$('#texto-vista').html(data);
}

function cerrarListaCurso(){
    $('#card-lista-curso').hide();
    $('#card-aplicacion').show();
}

function guardarConfigurarCursoTest(e) {
    e.preventDefault();
    $.ajax({
        data: $('#form-configurar-curso').serialize(),
        url: 'index.php?action=evaluacion.configurar.curso',
        dataType: 'html',
        type: 'post',
        beforeSend: function () { 
            //$('#loading').show();
            //$('#mensaje').html("Espere un momento...");
        },
        success: function (html) {
            //$('#mensaje').show();
            Swal.fire(
                '¡Muy Bien!',
                'Se han guardado los cambios',
                'success'
            )
            cerrarListaCurso();
            
        }
    });
};

function nuevaResolucion(idPregunta) {

    var id = 1;

    if (id) {
        btnResolucion(idPregunta);
        tinymce.get('txt-resolucion').setContent('');
        $('#pregunta-id-edit').val(idPregunta);
        $("#modal-resolucion").modal("show");
    }
}

function guardarResolucion() {
    var idPrueba = $('#id-prueba').val();
    var idPregunta = $('#pregunta-id-edit').val();
    var txtResolucion = tinymce.get('txt-resolucion').getContent();
    var params = {
        "id_pregunta": idPregunta,
        "txt_resolucion": txtResolucion
    };

    if (idPregunta) {
        if (txtResolucion) {
            $.ajax({
                data: params,
                url: 'index.php?action=addTextoResolucion',
                dataType: 'html',
                type: 'post',
                success: function (html) {
                    //$('#titulo-modal').html('Ups! Hay un error');
                    //$('#texto-modal').html(html);
                    $('#modal-resolucion').modal('hide');
                    cargarEvaluacionVistaPrevia(idPrueba);
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Debe agregar el texto para guardar'
            });
        }
    } else {
        $('#titulo-modal').html('Ups! Hay un error');
        $('#texto-modal').html('Debe elegir la pregunta antes de guardar el texto');
        $("#modal-msj").modal("show");
        //ocultarPregunta();
    }
};

function editarResolucion(idResolucion) {

    var id = 1;

    if (id) {
        cargarResolucionEditar(idResolucion);
        $("#modal-resolucion").modal("show");
    }
}

function cargarResolucionEditar(idResolucion) {
    //e.preventDefault();
    var params = {
        "id_resoedit": idResolucion
    };
    if (idResolucion) {
        $.ajax({
            data: params,
            url: 'index.php?action=viewPreguntas',
            dataType: 'JSON',
            type: 'get',
            success: function (response) {
                var len = response.length;
                for (var i = 0; i < len; i++) {
                    var rsTxtResolucion = response[i].txtResolucion;
                    //btnPreguntaAlternativa(2);
                    tinymce.get('txt-resolucion').setContent(rsTxtResolucion);
                    $('#id-resolucion-p').val(idResolucion);
                    //$('#pregunta-id-edit').val(idPregunta);
                    btnResolucion(1);
                }

            }
        });
    } else {
        $('#titulo-modal').html('Ups! Hay un error');
        $('#texto-modal').html('Debe elegir una pregunta para visualizarla previamente');
        $("#modal-msj").modal("show");
    }
};

function actualizarResolucion() {
    var idResolucion = $('#id-resolucion-p').val();
    var txtResolucion = tinymce.get('txt-resolucion').getContent();
    var idPrueba = $('#id-prueba').val();
    var params = {
        "id_txt": idResolucion,
        "txt_resolucion": txtResolucion
    };

    if (idResolucion) {
        if (txtResolucion) {
            $.ajax({
                data: params,
                url: 'index.php?action=updateResolucionPregunta',
                dataType: 'html',
                type: 'post',
                success: function () {
                    //$('#titulo-modal').html('Actualizado');
                    //$('#texto-modal').html('La Alternativa ha sido actualizada');
                    //$("#modal-msj").modal("show");
                    //vistaPreviaPreguntaAlternativa(idPregunta);
                    $('#modal-resolucion').modal('hide');
                    tinymce.get('txt-resolucion').setContent('');
                    btnResolucion(2);
                    cargarEvaluacionVistaPrevia(idPrueba);
                    //ocultarAlternativa();
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Debe escribir el texto para poder actualizar'
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Ha ocurrido un error, vuelva a intentar'
        });
    }
};

function eliminarResolucion() {
    //e.preventDefault();
    var idResolucion = $('#id-resolucion-p').val();
    var idPrueba = $('#id-prueba').val();
    var params = {
        "id_resolucion": idResolucion
    };

    if (idResolucion) {


        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Esto eliminará la Justificacion de Respuesta",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, Borrar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    data: params,
                    url: 'index.php?action=deleteResolucionPregunta',
                    dataType: 'html',
                    type: 'post',
                    success: function () {
                        tinymce.get('txt-resolucion').setContent('');
                        $('#modal-resolucion').modal('hide');
                        cargarEvaluacionVistaPrevia(idPrueba);
                        //ocultarPregunta();
                        //cargaPregunta();

                    }
                });
                Swal.fire(
                    'Eliminada!',
                    'La Justificacion de Respuesta ha sido Eliminada',
                    'success'
                )
            }
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Ha ocurrido un error, vuelva a intentar'
        });
    }
};

function btnResolucion(id) {
    if (id == 1) {
        $('#btn-actualizar-resolucion').show();
        $('#btn-eliminar-resolucion').show();
        $('#btn-guardar-resolucion').hide();
    } else {
        $('#btn-actualizar-resolucion').hide();
        $('#btn-eliminar-resolucion').hide();
        $('#btn-guardar-resolucion').show();
    }
};
