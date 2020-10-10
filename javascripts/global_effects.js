/*
Project: LiveInternet - Функции глобальных эффектов
Author:   A.Timofeev / Re.Active (www.reactant.ru)
Version:  8 May 2008
В основном разные эффекты и не системные функции (для неавторизованных можно безболезненно отключить)
 */


/* Эффекты
----------------------------------------------- */
/* -----------| Управление блоками |----------- */
/* - Прячем или показываем нужный блок - */
function show_hide_effect(id) {
    if ($(id).style.display == 'none') {
        Effect.Appear(id);

    } else {
        Effect.Fade(id);
    }
}
/* - Прячем или показываем баннеры - */
function show_hide_banner(id) {
    var isset_id = document.getElementById(id);
    if (isset_id) {
        if ($(id).style.visibility == 'hidden') {
            $(id).style.visibility = 'visible';
        } else {
            $(id).style.visibility = 'hidden';
        }
    }
}
/* - Разворачиваем - */
Effect.OpenUp = function(element) {
        element = $(element);
        new Effect.BlindDown(element, arguments[1] || {});
    }
    /* - Сворачиваем - */
Effect.CloseDown = function(element) {
        element = $(element);
        new Effect.BlindUp(element, arguments[1] || {});
    }
    /* - Комбинируем - */
Effect.Combo = function(element) {
    element = $(element);
    if (element.style.display == 'none') {
        new Effect.OpenUp(element, arguments[1] || {});
    } else {
        new Effect.CloseDown(element, arguments[1] || {});
    }
}

/* -----------| Показ скриншотов |----------- */
function showscreen(screenblockid, screenurl, screentitle) {
    new Effect.Appear(screenblockid, { duration: .3 })
    $(screenblockid).innerHTML = "<span style='background:url(http://sc.li.ru/get.php?url=" + screenurl + "&s=400) no-repeat 50% 50%;'>&nbsp;</span>";
}


/* Личное сообщение
----------------------------------------------- */
/* -----------[ Полный экран bg ]----------- */
function getyScroll() {
    yScroll = 0;

    if (window.innerHeight && window.scrollMaxY || window.innerWidth && window.scrollMaxX) {
        yScroll = window.innerHeight + window.scrollMaxY;
        xScroll = window.innerWidth + window.scrollMaxX;

        var deff = document.documentElement;
        var wff = (deff && deff.clientWidth) || document.body.clientWidth || window.innerWidth || self.innerWidth;
        var hff = (deff && deff.clientHeight) || document.body.clientHeight || window.innerHeight || self.innerHeight;

        xScroll -= (window.innerWidth - wff);
        yScroll -= (window.innerHeight - hff);
    } else if (document.body.scrollHeight > document.body.offsetHeight || document.body.scrollWidth > document.body.offsetWidth) {
        yScroll = document.body.scrollHeight;
        xScroll = document.body.scrollWidth;
    } else {
        yScroll = document.body.offsetHeight;
        xScroll = document.body.offsetWidth;
    }
    return yScroll;
}

/* -----------[ Показать всплывающее окно ]----------- */
function confirm_newpm() {
    show_hide_banner('bantop_span');
    show_hide_banner('banprofile_span');

    /* - Показать всплывающее окно - */
    new Effect.Appear('GlPopLs', { duration: .1 });
    $('GlPopLsScreen').style.display = 'block';
    $('GlPopLsScreen').style.height = getyScroll() + 'px';

}

/* -----------[ Скрыть всплывающее окно ]----------- */
function LsHide() {
    /* - Скрыть всплывающее окно - */
    Effect.Fade('GlPopLs', { duration: .1 });
    $('GlPopLsScreen').style.display = 'none';

    show_hide_banner('bantop_span');
    show_hide_banner('banprofile_span');
}


/* Микроблог
----------------------------------------------- */
/* -----------[ Показываем всплывашку ]----------- */
function micro_showhide() {
    if ($('GlHdrNavTwitInnrMess').style.display == 'none') {
        show_hide_banner('bantop_span');
        show_hide_banner('banprofile_span');
        Effect.Appear('GlHdrNavTwitInnrMess');
    } else {
        Effect.Fade('GlHdrNavTwitInnrMess');
        show_hide_banner('bantop_span');
        show_hide_banner('banprofile_span');
    }
}
/* -----------[ Меняем сообщения и варнинги ]----------- */
var GlHdrNavTwitInnrArray = new Array();
var GlHdrNavTwitInnrCurrent = 0;
var microChangeTimer = 0;

function micro_change_bybutton() {
    if (microChangeTimer != 0) clearTimeout(microChangeTimer);
    micro_change();
    if (microChangeTimer != 0) clearTimeout(microChangeTimer);

}

function micro_change() {
    Effect.Fade(GlHdrNavTwitInnrArray[GlHdrNavTwitInnrCurrent]);
    if (++GlHdrNavTwitInnrCurrent == GlHdrNavTwitInnrArray.length) GlHdrNavTwitInnrCurrent = 0;
    Effect.Appear(GlHdrNavTwitInnrArray[GlHdrNavTwitInnrCurrent]);
    microChangeTimer = setTimeout("micro_change ();", 4000);
}

function micro_change_init() {
    $i = 0;
    if (document.getElementById('GlHdrNavTwitInnrWarn0')) GlHdrNavTwitInnrArray[$i++] = 'GlHdrNavTwitInnrWarn0';
    if (document.getElementById('GlHdrNavTwitInnrStat')) GlHdrNavTwitInnrArray[$i++] = 'GlHdrNavTwitInnrStat';
    if (document.getElementById('GlHdrNavTwitInnrWarn1')) GlHdrNavTwitInnrArray[$i++] = 'GlHdrNavTwitInnrWarn1';
    if (document.getElementById('GlHdrNavTwitInnrWarn')) GlHdrNavTwitInnrArray[$i++] = 'GlHdrNavTwitInnrWarn';

    microChangeTimer = setTimeout("micro_change ();", 4000);
}

/* -----------[ Форма отправки ]----------- */
var load_process = 0;
var request = false;
var reqTimeout;
/* - Прячем и показываем поля ввода - */
function micro_area(action) {
    if (action == "show") {
        Effect.Appear('GlHdrNavTwitInnrMessArea');
        Effect.Appear('GlHdrNavTwitInnrMessLnk');
    } else {
        $('GlHdrNavTwitInnrMessArea').style.display = 'none';
        $('GlHdrNavTwitInnrMessLnk').style.display = 'none';
    }
}
/* - Результат - */
function do_PostEvent_callback() {
    if (request.readyState == 4) {
        clearTimeout(reqTimeout);
        load_process = 0;

        if (request.status == 200) {
            result = request.responseText;
            if (result != '-1') {
                /* - Шаг 2 / Выводим сообщение - */
                $('GlHdrNavTwitInnrStat').innerHTML = unescape(result);
                new Effect.Fade('GlHdrNavTwitInnrMess');
                micro_area('show');
                show_hide_banner('bantop_span');
                show_hide_banner('banprofile_span');
            } else {
                alert('Превышены лимиты по спаму. Попробуйте отправить событие чуть позже.');
            }
        } else {
            alert("Не удалось получить данные:\n" + request.statusText);
        }
    }
}
/* - Остановить запрос - */
function stop_query() {
    if (load_process == 1) {
        micro_area('show');
        request.abort();
        load_process = 0;
    }
}
/* - Сообщение событие - */
function do_PostEvent() {
    if ($('GlHdrNavTwitInnrMessArea').value == '' || $('GlHdrNavTwitInnrMessArea').value == ' ') {
        alert("Поле ввода события не может быть пустым...");
    } else {
        /* - Шаг 1 / Формируем сообщение - */
        micro_area('hide');

        if (load_process == 1) return;
        load_process = 1;
        message = new String($('GlHdrNavTwitInnrMessArea').value);

        if (window.XMLHttpRequest) {
            try {
                request = new XMLHttpRequest();
            } catch (e) {}
        } else if (window.ActiveXObject) {
            try {
                request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    request = new AciveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }

        if (request) {
            request.open("POST", "/microblog.php?cmd=post", true);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.onreadystatechange = do_PostEvent_callback;
            reqTimeout = setTimeout("stop_query()", 30000);
            try {
                request.send("text=" + escape(message.replace(/\+/g, '%u002B')));
            } catch (e) {
                alert('Отправка сообщений временно не работает');
            }
        } else alert("Браузер не поддерживает AJAX");
    }
}

/* Микроблог для профиля и блога
----------------------------------------------- */
var microblog = new Object();
microblog.add = function(field, form, mess, addlnk) {
    message = new String($(field).value);
    if (message == '' || message == ' ') {
        alert('Поле ввода события не может быть пустым...');
    } else {
        $(form).setStyle({ display: 'none' });
        $(mess).innerHTML = message;
        Effect.Appear(mess);
        $(addlnk).setStyle({ display: 'block' });
        $(field).value = '';
        new Ajax.Request('/microblog.php?cmd=post', { parameters: { text: message, encode: 'utf' } });
    }
};

/* Панель приложений
----------------------------------------------- */
function appanel_showpanel(action) {
    var url = '/show_app_panel.php';
    if (action == "show") {
        var pars = 'cmd=show';
        Effect.Combo('GlAppanelPanelHidden');
        Effect.Combo('GlAppanelPanel');
    }
    if (action == "hide") {
        var pars = 'cmd=hide';
        Effect.Combo('GlAppanelPanel');
        Effect.Combo('GlAppanelPanelHidden');
    }
    var myAjax = new Ajax.Updater('', url, { method: 'get', parameters: pars });
}

function appanel_showapp(action, blockid) {
    id = "GlAppanel" + blockid;
    id_block = "GlAppanelBl" + blockid;
    if (action == "show") {
        $(id).setStyle({ textIndent: '0' });
        $(id_block).setStyle({ width: 'auto' });
    }
    if (action == "hide") {
        $(id).setStyle({ textIndent: '-777em' });
        $(id_block).setStyle({ width: '0' });
    }
}