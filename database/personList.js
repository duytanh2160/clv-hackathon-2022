var personList = [ 
{
"firstName": "Hao", 
"lastName": "Nguyen",
"phoneNumber": 001,
"address": "address",
"punch": false,
"img": "../../resources/home/4.png"
},{
"firstName": "Duy", 
"lastName": "Tran",
"phoneNumber": 002,
"address": "address",
"punch": false,
"img": "../../resources/home/5.png"
},
{
"firstName": "Toan", 
"lastName": "Nguyen",
"phoneNumber": 003,
"address": "address",
"punch": false,
"img": "../../resources/home/6.png"
},
{
"firstName": "Toan", 
"lastName": "Nguyen",
"phoneNumber": 004,
"address": "address",
"punch": false,
"img": "../../resources/home/7.png"
},

];
   
  

function personListMisspunch(){
    let margin = 0;
    for (const property in personList) {
        let check = personList[property].punch
        if(!check){
         
            $.get('../../pages/components/help_area2.html', function(data){
                if(data){                   
                   let abc =  data.replace('Person1',personList[property].firstName);
                    abc = abc.replace('srcImg',personList[property].img)
                    abc = abc.replace('abcxyz',margin+"px")
                    abc = abc.replace('idne',personList[property].phoneNumber)
                    
                    $('#personListMisspunch').prepend(abc);
                 
                } 
                
            });
        }
        margin = margin+ 30;  
      }
  
}
   
