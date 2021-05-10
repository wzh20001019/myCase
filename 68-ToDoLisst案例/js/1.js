$(function() {
    load(); //调用函数 页面打开就渲染页面

    $("#title").on("keydown", function(event) { //绑定键盘按下事件
        if (event.keyCode === 13) { //判断按下的是否为回车键  回车键的keyCode为13
            if ($(this).val() === "") { //判断文本框内容是否为空
                alert("请输入你要的操作！");
            } else {
                var local = getData();
                local.push({ title: $(this).val(), done: false });
                saveData(local);
                load();
                $(this).val("");
            }
        }
    });

    $(".to, .do").on("click", "a", function() { //给a链接按钮绑定点击事件
        var data = getData();
        var index = $(this).attr("id"); //获取自定属性值 索引号
        data.splice(index, 1); //删除指定的字符串内容
        saveData(data);
        load();
    });

    $(".to, .do").on("click", "input", function() { //给复选框 按钮绑定点击事件
        var data = getData();
        var index = $(this).siblings("a").attr("id"); //获取兄弟节点的自定义属性值 索引号
        data[index].done = $(this).prop("checked"); //设定的值与复选框的布尔值一样
        saveData(data);
        load();
    });

    function getData() { //读取本地数据
        var data = localStorage.getItem("todo"); //获取本地数据
        if (data !== null) { //判断获取的数据是否为空
            return JSON.parse(data); //字符串转化为数组数据读取  返回这个数组
        } else {
            return [];
        }
    }

    function saveData(data) { //保存本地数据
        localStorage.setItem("todo", JSON.stringify(data)); //数组对象转化为字符串格式  本地存储  
    }

    function load() {
        var data = getData();
        $(".to, .do").empty(); //删除所有的子节点 防止多次调用出现相同的内容
        $.each(data, function(index, dom) { //遍历数组
            if (dom.done) {
                $(".to").prepend("<li><input type='checkbox' name='fx' id='fx' value='' checked='checked'/><p>" + dom.title + "</p><a href='javascript:;' id= " + index + "></a></li>");
            } else {
                $(".do").prepend("<li><input type='checkbox' name='fx' id='fx' value='' /><p>" + dom.title + "</p><a href='javascript:;' id= " + index + "></a></li>");
            }
        });
        var sp1 = $(".to li").length;
        $(".sp1").html(sp1);
        var sp2 = $(".do li").length;
        $(".sp2").html(sp2);
    }
});