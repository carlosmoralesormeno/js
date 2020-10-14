function validaRut(texto, inputText, inRUTType) {
    //ocultarAlerta();
    objRut = document.getElementById(inputText);
    var rut_aux = "";
    for (i = 0; i < texto.length; i++)
        if (texto.charAt(i) != ' ' && texto.charAt(i) != '.' && texto.charAt(i) != '-')
            rut_aux = rut_aux + texto.charAt(i);

    largo = rut_aux.length;

    if (largo == 0) {
        alertaSession("Por favor, ingrese rut y clave");
        return false;
    }

    if (largo < 2) {
        alertaSession("Por favor, ingrese rut y clave");
        objRut.focus();
        objRut.select();
        return false;
    }

    for (i = 0; i < largo; i++) {
        var letra = rut_aux.charAt(i);

        if (!letra.match(/^([0-9]|[kK])$/)) {
            alertaSession("El RUN ingresado no es valido");
            objRut.focus();
            objRut.select();
            return false;
        }
    }
    var rut_inv = "";
    for (i = (largo - 1), j = 0; i >= 0; i-- , j++) rut_inv = rut_inv + rut_aux.charAt(i);

    var dtexto = "";
    dtexto = dtexto + rut_inv.charAt(0);
    dtexto = dtexto + '-';
    cnt = 0;

    for (i = 1, j = 2; i < largo; i++ , j++) {
        if (cnt == 3) {
            dtexto = dtexto + '.';
            j++;
            dtexto = dtexto + rut_inv.charAt(i);
            cnt = 1;
        } else {
            dtexto = dtexto + rut_inv.charAt(i);
            cnt++;
        }
    }

    rut_inv = "";
    for (i = (dtexto.length - 1), j = 0; i >= 0; i-- , j++) rut_inv = rut_inv + dtexto.charAt(i);

    objRut.value = rut_inv.toUpperCase()
    if (validaDv(rut_aux, inputText, inRUTType)) return true;

    return false;
}

function validaDv(texto, inputText, inRUNType) {
    largo = texto.length;
    if (largo > 2) {
        rut_aux = texto.substring(0, largo - 1);
        dv = texto.charAt(largo - 1);
    } else {
        rut_aux = texto.charAt(0);
        dv = texto.charAt(largo - 1);
    }

    if (rut_aux.match(/k+/)) {
        alertaSession("El RUN ingresado no es valido");
        document.getElementById(inputText).focus();
        document.getElementById(inputText).select();
        return false;
    }

    document.getElementById("rut-"+inRUNType).value = rut_aux;
    document.getElementById("dv-"+ inRUNType).value = dv;

    if (rut_aux == null || dv == null) return 0;

    var dvr = '0'
    var suma = 0
    var mult = 2
    var res = 0
    for (i = rut_aux.length - 1; i >= 0; i--) {
        suma = suma + rut_aux.charAt(i) * mult
        if (mult == 7)
            mult = 2
        else
            mult++
    }
    res = suma % 11
    if (res == 1)
        dvr = 'k'
    else if (res == 0)
        dvr = '0'
    else {
        dvi = 11 - res
        dvr = dvi + ""
    }

    if (dvr != dv.toLowerCase()) {
        alertaSession("D\u00EDgito Verificador incorrecto");
        document.getElementById(inputText).focus();
        document.getElementById(inputText).select();
        return false;
    }

    return true;
}
function alertaSession(texto) {
    //$('#alerta-session').html('<i class="fas fa-exclamation-triangle"></i> ' + texto);
    //$('#alerta-session').show();
    $('#run').val('');
    $('#run').focus();
}
function ocultarAlerta() {
    $('#alerta-session').hide();
}
