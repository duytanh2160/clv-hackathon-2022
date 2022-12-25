 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 
 // Your web app's Firebase configuration
 const firebaseConfig = {
     apiKey: "AIzaSyCkZpTEo7Bn-pJHkW9nWj8YZ6at8_EuH6w",
     authDomain: "hackathon-24888.firebaseapp.com",
     projectId: "hackathon-24888",
     storageBucket: "hackathon-24888.appspot.com",
     messagingSenderId: "330680342144",
     appId: "1:330680342144:web:3ab3877785a2a07c17b865",
     databaseURL: "https://hackathon-24888-default-rtdb.asia-southeast1.firebasedatabase.app/"
 };
 
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 import {getDatabase, set, get, update, remove, ref, child}
 from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

 const db = getDatabase();

 window["db_result"] = {};




 window["insertData"] = async function({user_id, user_name, top, left, login_status, profile_pic}){
    let promise = new Promise((resolve, reject) => {
        set(ref(db, "person-list/" + user_id), {
            user_id: user_id,
            user_name: user_name,
            top: top,
            left: left,
            login_status: login_status,
            profile_pic: profile_pic
        }).then(() => {
            resolve("S");
        }).catch((e) => {
            reject("F");
        });
    });

    return await promise;
 }

 window["findData"] = async function(user_id = ''){
    const dbref = ref(db);

    if(user_id) user_id = "/" + user_id;

    let promise =  new Promise((resolve, reject) => {
        get(child(dbref, "person-list" + user_id)).then((res) => {
            resolve(res.val());
        });
    });
    
    // .then((res) => {
    //     if(res.exists()){
    //         db_result[res.val().user_id] = res.val();
    //     }
    // })
    return await promise;
 }

