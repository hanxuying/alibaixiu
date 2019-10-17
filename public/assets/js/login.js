
//选择登录按钮，添加点击事件
$('#loginBtn').on('click', function () {
  //邮箱
  var email = $('#email').val();
  //密码
  var password = $('#password').val();
  //判断用户是否输入邮箱
  if (email.trim().length == 0) {
    alert('请输入邮箱')
    return;
  }
  //判断用户是否输入密码
  if (password.trim().length == 0) {
    alert('请输入密码');
    return;
  }

  //ajax
  $.ajax({
    type: 'post',
    url: '/login',
    data: {
      email: email,
      password: password
    },
    success: function (res) {
      //登陆成功,跳转页面
      location.href = 'index.html'
    },
    error: function () {
      //登陆失败
      console.log('邮箱或密码错误');

    }
  })
})
