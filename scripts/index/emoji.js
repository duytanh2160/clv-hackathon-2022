(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-46156385-1', 'cssscript.com');
ga('send', 'pageview');


function initEmojiButton(button){
    EmojiButton(button, function (emoji) {
        button.value = emoji;
        updateData({user_id : CUR_USER_OBJ.user_id, emotion_text : `${button.value}Ξ${button.nextElementSibling.value}`});
    });
}

function openEmotion(ele) {
    var stickerEle = ele;
    var findHelpDiv = function (element) {
        if (!element) return;
        stickerEle = element.parentElement;
        try {
            if (stickerEle.className.indexOf("sticker") == -1) {
                return findHelpDiv(stickerEle);
            }
        } catch (e) {
            return false;
        }
    }
    findHelpDiv(stickerEle);
    var findEmoDiv = function(element){
        ele = element.parentElement;
        try{
            if(ele.getElementsByClassName("shwEmoj").length == 0) {
                return findEmoDiv(ele);
            }else{
                //ele will be "sticker" class here
                if(ele.id != "usr_" + CUR_USER_OBJ.user_id) return false;
                ele = ele.getElementsByClassName("shwEmoj")[0];
                return true;
            }
        }catch(e){
            return false;
        }
    }
    var blChk = findEmoDiv(ele);
    if(!blChk) return;
    if(stickerEle.getAttribute("isAttached") == "true") return;


    if (ele.style.visibility === "hidden") {
        ele.style.visibility = "visible";
        updateData({
            user_id : CUR_USER_OBJ.user_id,
            emotion_flg : "Y"
        });
    } else {
        ele.style.visibility = "hidden";
        updateData({
            user_id : CUR_USER_OBJ.user_id,
            emotion_flg : "N"
        });
    }
}
