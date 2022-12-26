[...document.getElementsByClassName("sticker")].forEach((sticker) => {
  dragElement(sticker);
});

[...document.getElementsByClassName("help_area")].forEach((sticker) => {
  dragElement(sticker);
})

window["mousedown_element"] = null;


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

    mousedown_element = e.target;

    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    var ele = mousedown_element;
    var findStickerDiv = function (element) {
      if (!element) return;
      ele = element.parentElement;
      try {
        if (ele.className.indexOf("sticker") == -1) {
          return findStickerDiv(ele);
        }
      } catch (e) {
        return false;
      }
    }
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
    findStickerDiv(ele);
    if (!ele) findHelpDiv(e.target);
    if (!ele || ele.className != "sticker" && ele.className != "help_area") return;
    // e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    var newTop = (elmnt.offsetTop - pos2),
       newLeft = (elmnt.offsetLeft - pos1);

    if (!ele.getAttribute("isAttached") || ele.getAttribute("isAttached") != "true" || ele.className == "help_area") {
      if (ele.className == "sticker" && ele.id != ("usr_" + CUR_USER_OBJ.user_id)) return;


      // elmnt.style.top = (newTop < 0 ? (chkIfStickerOverlap(elmnt) ? elmnt.style.top.split("px").join("") : 0) : newTop) + "px";
      // elmnt.style.left = (newLeft < 0 ? (chkIfStickerOverlap(elmnt) ? elmnt.style.left.split("px").join("") : 0) : newLeft) + "px";

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


function chkIfStickerOverlap(ele){
  var res = false;
  [...document.querySelectorAll('.sticker')].filter(x => {return x.id && x != ele})
  .forEach((el2) => {
      if(isDivOverlap(ele, el2)) {
        res = true;
      }
  });

  return res;
}

function isDivOverlap(el1, el2) {
  function getPositions( elem ) {
    var pos, width, height;
    pos = $( elem ).position();
    width = $( elem ).width() / 2;
    height = $( elem ).height();
    return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
  }

  function comparePositions( p1, p2 ) {
    var r1, r2;
    r1 = p1[0] < p2[0] ? p1 : p2;
    r2 = p1[0] < p2[0] ? p2 : p1;
    return r1[1] > r2[0] || r1[0] === r2[0];
  }

  var pos1 = getPositions( el1 ),
      pos2 = getPositions( el2 );

  return comparePositions( pos1[0], pos2[0] ) && comparePositions( pos1[1], pos2[1] );
}