var form = document.getElementById("register_form");

// ...然后接管表单的提交事件
form.addEventListener("submit", function (event) {
    event.preventDefault();
    sendData();
});

function sendData() {
    var XHR = new XMLHttpRequest();

    // 我们把这个 FormData 和表单元素绑定在一起。
    let username = form.elements[0].value;
    let password = form.elements[1].value;
    let conform = form.elements[2].value;

    if (conform !== password){
        alert("两次密码输入不一致，请重新输入。");
    }
    else{
        // 我们定义了数据成功发送时会发生的事。
        XHR.addEventListener("load", function(event) {
            let resMes = JSON.parse(event.target.response);
            let err_code = resMes["err_code"];
            if (err_code === 0) {
                alert("欢迎您，" + JSON.parse(event.target.response)["message"]);
                window.location.href = '/'
            }
            else {
                alert(JSON.parse(event.target.response)["message"]);
            }
        });

        // 我们定义了失败的情形下会发生的事
        XHR.addEventListener("error", function(event) {
            alert('哎呀，出错了！');
        });

        // 我们设置了我们的请求
        XHR.open("POST", "/register", true);

        // 发送的数据是由用户在表单中提供的
        XHR.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        XHR.send("username=" + username + "&password=" + password);
    }

}