$(function() {
    let timer = null;
    let obj = {};

    $('input').on('keyup', function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            let val = $('input').val().trim();
            $('ul').show();
            if (val.length > 0) {
                if (obj[val]) {
                    let arr = obj[val].result;
                    $('ul').html('');
                    $.each(arr, function(i, dom) {
                        let li = $('<li>' + dom[0] + '</li>');
                        $('ul').append(li);
                    });
                } else {
                    request(val);
                }
            } else if (val.length <= 0) {
                $('ul').hide();
            }
        }, 500);
    });

    function request(val) {
        $.ajax({
            url: 'https://suggest.taobao.com/sug?q=' + val,
            dataType: 'jsonp',
            jsonpCallback: 'fn',
            success: function(res) {
                obj[val] = res;
                let arr = res.result;
                $('ul').html('');
                $.each(arr, function(i, dom) {
                    let li = $('<li>' + dom[0] + '</li>');
                    $('ul').append(li);
                });
            }
        });
    }

    $('ul').on('click', 'li', function() {
        $('input').val($(this).html());
        $('ul').hide();
    });
});