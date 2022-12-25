var numberButton = 2;

function hideClassBur() {
    $("." + "blur").hide();
}

function addEditableLabel(){
    $.get('/pages/components/editableLabel.html', function(data){
        if(data){
            let abc =  data
            $('#editableLabel').prepend(abc);
            hideClassBur();
            $('.clickMe').click(function () {
                "use strict";
                $(this).hide();
                $('#' + $(this).attr('for'))
                    .val($(this).text())
                    .toggleClass("form-control")
                    .show()
                    .focus();

            });
            $('.blur').blur(function () {
                "use strict";
                $(this)
                    .hide()
                    .toggleClass("form-control");
                var myid = (this).id;
                $('span[for=' + myid + ']')
                    .text($(this).val())
                    .show();
            });
            $('.btnAddLabel').click(function() {
                node = document.getElementById('btnAddLabel');
                buttonhtml = '<h3><span class="label label-primary clickMe" for="textBox' + (numberButton + 1) + '" style="margin-right: 5px;">   </span></h3>'
                 + '<input value="" type="text" id="textBox' + (numberButton + 1) + '" name="textBox' + (numberButton + 1) + '" class="blur">';
                node.insertAdjacentHTML('beforebegin', buttonhtml);
                numberButton++;
                hideClassBur();
                $('.clickMe').click(function () {
                    "use strict";
                    $(this).hide();
                    $('#' + $(this).attr('for'))
                        .val($(this).text())
                        .toggleClass("form-control")
                        .show()
                        .focus();

                });
                $('.blur').blur(function () {
                    "use strict";
                    $(this)
                        .hide()
                        .toggleClass("form-control");
                    var myid = (this).id;
                    $('span[for=' + myid + ']')
                        .text($(this).val())
                        .show();
                });
            });
        }
    });
}

