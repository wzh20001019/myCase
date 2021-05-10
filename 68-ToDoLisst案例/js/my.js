$(function() {
    load();

    $("#title").on("keydown", function(e) {
        if (e.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入要求！");
            } else {
                var local = getDate();
                local.push({ title: $(this).val(), flag: false });
                saveDate(local);
                load();
                $(this).val("");
            }
        }
    });

    $(".to, .do").on("click", "a", function() {
        var data = getDate();
        var index = $(this).attr("id");
        data.splice(index, 1);
        saveDate(data);
        load();
    });

    $(".to, .do").on("click", "input", function() {
        var data = getDate();
        var index = $(this).siblings("a").attr("id");
        data[index].flag = $(this).prop("checked");
        saveDate(data);
        load();
    })

    function getDate() {
        var data = localStorage.getItem("todo");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    function saveDate(data) {
        localStorage.setItem("todo", JSON.stringify(data));
    }

    function load() {
        var data = getDate();
        $(".to, .do").empty();
        $.each(data, function(index, dom) {
            if (dom.flag) {
                $(".do").prepend("<li><input type='checkbox' name='fx' id='fx' value='' checked='checked'/><p> " + dom.title + "</p><a href='javascript:;' id= " + index + "></a></li>");
            } else {
                $(".to").prepend("<li><input type='checkbox' name='fx' id='fx' value=''/><p> " + dom.title + "</p><a href='javascript:;' id= " + index + "></a></li>");
            }
        })
        var sp1 = $(".to li").length;
        $(".sp1").html(sp1);

        var sp2 = $(".do li").length;
        $(".sp2").html(sp2);
    }
})