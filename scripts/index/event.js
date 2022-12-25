var IS_AREA_CREATE_ALLOW = true;
/**
 * If SOS type, false
 * If Invite, no action
 * If close: if SOS => true
 *           if Invite => no action
 * Scenario: user can only create one SOS, but multiple Invite areas;
 *           if user have already create Invite and SOS appear, user can keep the Invite one.
 */
function initControl() {
    document.onclick = processButtonClick;
    document.onchange = processInputChange;
}

function processButtonClick(e) {
    var element = e.target;
    switch (element.name) {
        case "btn_add_area":
            addAreaToScreen();
            break;
    }
}

function processInputChange(e) {
    var element = e.target;
    switch (element.name) {
        case "input_emotion":
            changeInputWidth(element);
            break;
    }
}

function changeInputWidth(ele) {
    ele.style.width = (ele.value.length >= ele.placeholder.length ? ele.value.length : ele.placeholder.length) + "ch";

    updateData({user_id : CUR_USER_OBJ.user_id, emotion_text : `😀Ξ${ele.value}`});
}

function addAreaToScreen() {
    if (!IS_AREA_CREATE_ALLOW) return;

    $.get('../../pages/components/help_area.html', function (data) {
        //passing param.
        var obj = [{
                code: "param1",
                value: "100"
            },
            {
                code: "param2",
                value: "100"
            },
        ];
        obj.forEach((rep) => {
            data = data.split(rep.code).join(rep.value);
        });
        let index = document.querySelectorAll(".help_area").length;
        let idPopup = 'closePopup_' + '' + index;
        let idPopup2 = 'xclosePopup_' + '' + index;
        data = data.replace('closePopup_', idPopup);
        data = data.replace('xclosePopup_', idPopup2);
        if (data) $('#main_layout').prepend(data);
    });
    setTimeout(() => {
        dragElement($('#main_layout')[0].firstChild);
        dropCurrentUserToArea($('#main_layout')[0].firstChild);
        addEditableLabel();

        //initResizableElement($('#main_layout')[0].firstChild);
    }, 100);
}
var stsMsg = 2;

function dropCurrentUserToArea(ele) {
    var stickerEle = document.getElementById("usr_" + CUR_USER_OBJ.user_id);

    stickerEle.style.top = (parseFloat(ele.style.top.split("px").join("")) + 50) + "px";
    stickerEle.style.left = (parseFloat(ele.style.left.split("px").join("")) + 50) + "px";
    stickerEle.setAttribute("isAttached", "true");

    stickerEle.querySelector(".shwEmoj").style.visibility = "hidden";
}

function validValue() {
    var value = document.getElementById("slOption").value;
    if (value == 0) {
        IS_AREA_CREATE_ALLOW = false;

        document.getElementById("slOption").style.color = "#CC0000";
        document.getElementById("sos").style.color = "gray";
        document.getElementById("inv").style.color = "gray";
        document.getElementById("typ").style.color = "gray";
        document.getElementById("help_area_body").style.backgroundColor = "#DDDDDD"
        document.getElementById("help_area_body").style.backgroundImage = "url(../../resources/home/SOS.png)";
        document.getElementById("help_area_body").style.opacity = "0.8";
        document.getElementById("help_area_body").style.backgroundSize = "contain";
        document.getElementById("help_area_body").style.backgroundPosition = "center";
        document.getElementById("help_area_body").style.backgroundRepeat = "no-repeat";
        stsMsg = 0;
    } else if (value == 1) {
        IS_AREA_CREATE_ALLOW = true;
        document.getElementById("slOption").style.color = "#3366FF";
        document.getElementById("sos").style.color = "gray";
        document.getElementById("inv").style.color = "gray";
        document.getElementById("typ").style.color = "gray";
        document.getElementById("help_area_body").style.backgroundColor = "#DDDDDD"
        document.getElementById("help_area_body").style.backgroundImage = "url(../../resources/home/invite.png)";
        document.getElementById("help_area_body").style.opacity = "0.8";
        document.getElementById("help_area_body").style.backgroundSize = "contain";
        document.getElementById("help_area_body").style.backgroundPosition = "center";
        document.getElementById("help_area_body").style.backgroundRepeat = "no-repeat";
        stsMsg = 1;
    } else {
        IS_AREA_CREATE_ALLOW = true;
        document.getElementById("slOption").style.color = "gray";
        document.getElementById("sos").style.color = "gray";
        document.getElementById("inv").style.color = "gray";
        document.getElementById("typ").style.color = "gray";
        document.getElementById("help_area_body").style.backgroundImage = "none";
        stsMsg = 2;
    }
}

function closePopup(event) {
    event = event.substring(1);
    var usrEle = document.getElementById("usr_" + CUR_USER_OBJ.user_id);

    document.getElementById(event).hidden = true;
    startRatting();

    usrEle.style.top = CUR_USER_OBJ.top + "px";
    usrEle.style.left = CUR_USER_OBJ.left + "px";
    usrEle.setAttribute("isAttached", "false");
}

function startRatting() {
    $.get('../../pages/components/startRatting.html', function (data) {
        let index = document.querySelectorAll(".help_area").length;
        let idPopup = 'Rat_' + '' + index;
        let idPopup2 = 'xRat_' + '' + index;
        data = data.replace('closePopup_', idPopup);
        data = data.replace('xclosePopup_', idPopup2);
        if (data) $('#main_layout').prepend(data);
    });
    setTimeout(() => {
        dragElement($('#main_layout')[0].firstChild);
    }, 500);
}

function closeRat(id) {
    id = id.substring(1);

    document.getElementById(id).hidden = true
    var audio = new Audio('../../resources/home/thank.mp3');
    audio.play();
    document.getElementById("area_help").style.display = "block";
    document.getElementById("msgHelp").style.color = "#00CC00";
    document.getElementById("msgHelp").innerHTML = "Owl feels thankful for the help!";
    setTimeout(function(){
        document.getElementById("area_help").style.display = "none";

    }, 3000);
    
}


var tempConfirmCnt = 2;
function confirmHelp(ele) {
    tempConfirmCnt--;
    var stickerEle = document.getElementById("usr_person2");
    var findHelpDiv = function (element) {
        if (!element) return;
        ele = element.parentElement;
        try {
            if (ele.className.indexOf("help_area") == -1) {
                return findHelpDiv(ele);
            }
        } catch (e) {
            return false;
        }
    }
    findHelpDiv(ele);


    var audio = new Audio('../../resources/home/alarm-3s.mp3');
    if (stsMsg == 0) {
        audio.play();
        document.getElementById("area_help").style.display = "block";
        document.getElementById("msgHelp").innerHTML = "Owl needs you help!";
        stsMsg = 2;
    } else if (stsMsg == 2) {
        document.getElementById("area_help").style.display = "none";
    }

    if(tempConfirmCnt == 0){
        stickerEle.style.top = (parseFloat(ele.style.top.split("px").join("")) + 50) + "px";
        stickerEle.style.left = (parseFloat(ele.style.left.split("px").join("")) + 200) + "px";
    }

}

function punchInOut(id){
    if (id = 1){
        document.getElementById(id).hidden = true;
        document.getElementById('person3').hidden = false;
    }
}