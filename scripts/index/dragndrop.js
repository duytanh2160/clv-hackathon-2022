[...document.getElementsByClassName("sticker")].forEach((sticker) => {
  dragElement(sticker);
});

[...document.getElementsByClassName("help_area")].forEach((sticker) => {
  dragElement(sticker);
})


function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (elmnt.querySelector("#help_area_header")) {
    elmnt.querySelector("#help_area_header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    var ele = e.target;
    var findStickerDiv = function (element) {
      if(!element) return;
      ele = element.parentElement;
      try {
        if (ele.className.indexOf("sticker") == -1 ) {
          return findStickerDiv(ele);
        }
      } catch (e) {
        return false;
      }
    }
    var findHelpDiv = function (element) {
      if(!element) return;
      ele = element.parentElement;
      try {
        if (ele.className.indexOf("help_area") == -1 ) {
          return findHelpDiv(ele);
        }
      } catch (e) {
        return false;
      }
    }
    findStickerDiv(ele);
    if(!ele) findHelpDiv(e.target);
    if(!ele || ele.className != "sticker" && ele.className != "help_area") return;
    // e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    var newTop = (elmnt.offsetTop - pos2),
      newLeft = (elmnt.offsetLeft - pos1);

      if(!ele.getAttribute("isAttached") || ele.getAttribute("isAttached") != "true" || ele.className == "help_area"){
        if(ele.className == "sticker" && ele.id != ("usr_" + CUR_USER_OBJ.user_id)) return;

        elmnt.style.top = (newTop < 0 ? 0 : newTop) + "px";
        elmnt.style.left = (newLeft < 0 ? 0 : newLeft) + "px";
        elmnt.style.zIndex = '999';

        CUR_USER_OBJ.top = parseFloat(elmnt.style.top.split("px").join(""));
        CUR_USER_OBJ.left = parseFloat(elmnt.style.left.split("px").join(""));
      }
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}