
window["addUserToScreen"] = async function(obj) {
    let promise = new Promise((resolve, reject) => {
        $.get('../../pages/components/sticker', function (data) {
            if(data.match(/(?<=\$\{).+?(?=\})/g).length <= 0) return;
    
            [...data.match(/(?<=\$\{).+?(?=\})/g)].forEach(param => {
                data = data.split(`\$\{${param}\}`).join(obj[param]);
            });
    
            resolve(data);
        });
    });

    return await promise;
}

const usrs_db = await findData();
Object.keys(usrs_db).forEach(async id => {
    var obj = await addUserToScreen(usrs_db[id]);
    $('#main_layout').prepend(obj);
})

