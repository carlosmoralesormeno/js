function validaRut(texto, inputText) {
    ocultarAlerta();
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
    if (validaDv(rut_aux, inputText)) return true;

    return false;
}

function validaDv(texto, inputText) {
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
   
    document.getElementById("rut").value = rut_aux;
    document.getElementById("dv").value = dv;

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

function validarCampos() {
    var f = document.getElementById("login-form");
    var rut = trimobj(document.getElementById("rut"));
    var rut2 = '';
    var dv = trimobj(document.getElementById("dv")).toUpperCase();
    document.getElementById("dv").value = dv;
    var clave = document.getElementById("password").value;
    j = 0;
    for (i = 0; i <= rut.length; i++) {
        if (j == 0 && rut.substr(i, 1) == '0') {
            j = 0;
        } else {
            rut2 = rut2 + rut.substr(i, 1);
            j = 1;
        }
    }
    rut = rut2;
    document.getElementById("rut").value = rut2;
    if (rut == '' || !isNumero(rut) || rut * 1 == 0) {
        bootstrap_alert.warning('Rut Inv\u00E1lido');
        return (false);
    } else if ((!isNumero(dv) && (dv != "K")) || (dv == "")) {
        bootstrap_alert.warning('D\u00EDgito Verificador inv\u00E1lido');
        return (false);
    } else if (!validaM11(rut, dv)) {
        bootstrap_alert.warning('D\u00EDgito Verificador err\u00F3neo');
        return (false);
    } else if (clave == '') {
        bootstrap_alert.warning('Debe ingresar Clave');
        document.getElementById("clave").focus();
        return (false);
    }
    return (true);
}
function validar() {

    if (!validaRut(document.getElementById("run").value, document.getElementById("run").id)) {
        return false;
    }
    if (validarCampos()) {
        return true;
    }
    return false;
}
function ejecuta_opcion() {
    var fejecutar = validar();
    if (fejecutar) {
        var f = document.getElementById("login-form");
        f.submit();
    } else
        return false;

    return false;
}

function alertaSession(texto) {
    $('#alerta-session').html('<i class="fas fa-exclamation-triangle"></i> ' + texto);
    $('#alerta-session').show();
}

function ocultarAlerta() {
    $('#alerta-session').hide();
}
