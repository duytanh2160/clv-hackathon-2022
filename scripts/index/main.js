//run in loop
await start();

async function start(){
    var check = false;
    while(!check){
        let usr_id = prompt("Your id?");
        let usrs_db = await findData();

        let obj = usrs_db[Object.keys(usrs_db).filter(x => {return usrs_db[x].user_id == usr_id})];
        if(obj){
            check = true;
            window["CUR_USER_OBJ"] = obj;
        }
    }

    window["lifeLoop"] = setInterval(update,0);
    //window["lifeLoop01"] = setInterval(update,0);
    window.addEventListener("beforeunload", close, false);
}



async function update(){
    //update user data to server
    await insertData(CUR_USER_OBJ);

    //update other users to client
    var usrList = await findData();
    Object.keys(usrList).filter(x => {return x != CUR_USER_OBJ.user_id}).forEach(usr_id => {
        var doc = document.getElementById(`usr_${usr_id}`);
    
        doc.style.top = usrList[usr_id].top + 'px';
        doc.style.left = usrList[usr_id].left + 'px';
    })
}





function close(){
    alert("Close?");
}