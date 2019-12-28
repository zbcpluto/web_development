var form = document.getElementById("login_form");

// 接管表单的提交事件
form.addEventListener("submit", function (event) {
    event.preventDefault();
    sendData();
});

function sendData() {
    var XHR = new XMLHttpRequest();

    // 将FormData 和表单元素绑定在一起。
    let username = form.elements[0].value;
    let password = form.elements[1].value;
    let captcha = form.elements[2].value;

    // 发送成功
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

    // 发送失败
    XHR.addEventListener("error", function(event) {
        alert('哎呀,出错了！');
    });

    // 设置请求
    XHR.open("POST", "/login", true);

    // 发送的数据是由用户在表单中提供的
    XHR.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    XHR.send("username=" + username + "&password=" + password);
}