//run in loop
await start();

async function start(){
    var check = false;
    let usrs_db = await findData();

    while(!check){
        let usr_id = prompt("Your id?");

        let obj = usrs_db[Object.keys(usrs_db).filter(x => {return usrs_db[x].user_id == usr_id})];
        if(obj){
            //login done.
            check = true;
            window["CUR_USER_OBJ"] = obj;

            await updateData({
                user_id : CUR_USER_OBJ.user_id,
                login_status : "Y"
            });
        }
    }

    window["lifeLoop"] = setInterval(update,0);
    //window["lifeLoop01"] = setInterval(update,0);
    window.addEventListener("beforeunload", close, false);
}



async function update(){
    //update user data to server
    await updateData({
        user_id : CUR_USER_OBJ.user_id,
        top : CUR_USER_OBJ.top,
        left : CUR_USER_OBJ.left
    });

    //update other users to client
    var usrList = await findData();
    Object.keys(usrList)//.filter(x => {return x != CUR_USER_OBJ.user_id})
    .forEach(usr_id => {
        var doc = document.getElementById(`usr_${usr_id}`);
        
        if(!doc){
            addUserToScreen(usrList[usr_id]);
        }else{
            if(usrList[usr_id].login_status == 'N') {
                doc.querySelector('img').style.borderColor = "";
                doc.querySelector('.shwEmoj').style.visibility = "hidden";
                return;
            }

            //update for all
            doc.querySelector('img').style.borderColor = "green";

            if(usr_id == CUR_USER_OBJ.user_id) return;
            //update for other users only

            //1. set location
            doc.style.top = usrList[usr_id].top + 'px';
            doc.style.left = usrList[usr_id].left + 'px';

            //2. set emotion visibility
            if(usrList[usr_id].emotion_flg == "Y"){
                doc.querySelector('.shwEmoj').style.visibility = "visible";
            }else{
                doc.querySelector('.shwEmoj').style.visibility = "hidden";
            }

            //3. set emotion text
            var txt = usrList[usr_id].emotion_text.split("Ξ");
            if(txt.length > 1){
                doc.querySelectorAll('input')[0].value = txt[0];
                doc.querySelectorAll('input')[1].value = txt[1];

                doc.querySelectorAll('input')[1].style.width = (doc.querySelectorAll('input')[1].value.length >= doc.querySelectorAll('input')[1].placeholder.length ? doc.querySelectorAll('input')[1].value.length : doc.querySelectorAll('input')[1].placeholder.length) + "ch";
            }
        }
    })
}





function close(){
    console.log("send logout to server.");
    updateData({user_id : CUR_USER_OBJ.user_id, login_status : "N", emotion_flg : "N", emotion_text : "😀Ξ"});
}