$(function() {
    getUserInfo()
    var layer = layui.layer
        //点击按钮实现退出功能
    $('#btnLogout').on('click', function() {
        //提示用户是否退出
        layer.confirm('确定退出登录吗？', { icon: 3, title: '提示' }, function(index) {
            // 1清空本地存储中的token
            localStorage.removeItem('token')
                // 2.跳转登录页面
            location.href = './login.html'
                //关闭询问框
            layer.close(index)
        })
    });
})

function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status != 0) { return layui.layer.msg('获取用户信息失败!') }
            renderAvatar(res.data)
        },
    });
}
//渲染用户头像
function renderAvatar(user) {
    // 1.欢迎用户信息
    let uname = user.nickname || user.username
    $('#welcome').html('来啦' + uname)
        //2.头像
    if (user.user_pic != null) {
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('str', user.user_pic).show()

    } else {
        $('.layui-nav-img').hide()
        let name = uname[0].toUpperCase()
        $('.text-avatar').html(name).show()
    }
}