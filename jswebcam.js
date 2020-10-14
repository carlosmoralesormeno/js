function guardarCaptura(e) {
    e.preventDefault();
    var formData = new FormData();
    var files = $('#image')[0].files[0];
    var idRegistro = $('#id-registro').val();
    formData.append('file',files);
    formData.append('id-registro', idRegistro);
    if (files) {
    $.ajax({
        url: 'index.php?action=addImagen',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        beforeSend: function () {
            //$('#btn-save-img').hide();
            $('#loading-img').show();
        },
        success: function(html) {
            $('#resultado').html(html);
            //$('#btn-save-img').show();
            cargarImagen();
            cargarCurso();
            $('#loading-img').hide();
        }
    });
    }
}

function guardarImagen(e) {
    e.preventDefault();

    var idRegistro = $('#id-registro').val();
    var img = $('#img').attr('src');
    var input = $('#imputImg').val();

    var params = {
        "id-registro-js": idRegistro,
        "img": img
    };
    if (input) {
        $.ajax({
            data: params,
            url: 'index.php?action=addImagen',
            dataType: 'html',
            type: 'post',
            beforeSend: function () {
                //$('#btn-save-img').hide();
                $('#loading-img').show();
            },
            success: function(html) {
                $('#resultado').html(html);
                //$('#btn-save-img').show();
                cargarImagen();
                cargarCurso();
                $('#loading-img').hide();
            }
        });
    }
};

function girarImagen(e,rotateImg) {
    e.preventDefault();

    var idRegistro = $('#id-registro').val();
    var rotate = rotateImg;

    var params = {
        "id-registro-img": idRegistro,
        "rotate-img": rotate
    };
    if (idRegistro) {
        $.ajax({
            data: params,
            url: 'index.php?action=addImagen',
            dataType: 'html',
            type: 'post',
            beforeSend: function () {
                //$('#btn-save-img').hide();
            },
            success: function (html) {
                cargarImagen();
            }
        });
    }
};

function cargarImagen() {

    var idRegistro = $('#id-registro').val();

    var params = {
        "id-registro-vista": idRegistro,
    };
    if (idRegistro) {
        $.ajax({
            data: params,
            url: 'index.php?action=addImagen',
            dataType: 'html',
            type: 'post',
            success: function (html) {
                $('#well-img').html(html);
            }
        });
    }
};

function eliminarImagen() {

    var idRegistro = $('#id-registro').val();

    var params = {
        "id-registro-eliminar": idRegistro,
    };
    if (idRegistro) {
        $.ajax({
            data: params,
            url: 'index.php?action=addImagen',
            dataType: 'html',
            type: 'post',
            beforeSend: function () {
            },
            success: function (html) {
                $('#resultado').html(html);
                cargarCurso();
                cargarImagen();
            }
        });
    }
};

var imagen = [];

function revisarImagen(input, num){
    var id_preview = "img";
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onloadend = function (e) {
            var id_preview_text = "#"+id_preview;
            var base64image = e.target.result;
            $("body").append("<canvas id='tempCanvas' width='800' height='800' style='display:none'></canvas>");
            var canvas=document.getElementById("tempCanvas");
            var ctx=canvas.getContext("2d");
            var cw=canvas.width;
            var ch=canvas.height;
            var maxW=800;
            var maxH=800;
            var img = new Image;
            img.src=this.result;
            img.onload = function(){
                var iw=img.width;
                var ih=img.height;
                var scale=Math.min((maxW/iw),(maxH/ih));
                var iwScaled=iw*scale;
                var ihScaled=ih*scale;
                canvas.width=iwScaled;
                canvas.height=ihScaled;
                ctx.drawImage(img,0,0,iwScaled,ihScaled);
                base64image = canvas.toDataURL("image/jpeg");
                $(id_preview_text).attr('src', base64image);
                imagen[num] = base64image;
                $("#tempCanvas").remove();
            }
        };
        reader.readAsDataURL(input.files[0]);
    }

}
