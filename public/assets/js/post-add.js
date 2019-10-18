//获取分类的ajax
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        console.log(res);
        var html = template('categoryTpl', { data: res });
        $('#category').html(html)
    }
});
//当管理员选择文件的时候触发
$('#feature').on('change', function () {
    var fd = new FormData();
    fd.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: fd,
        processData: false,
        contentType: false,
        success: function (res) {
            console.log(res);
            $('.thumbnail').attr('src', res[0].avatar).show();
            $('#thumbnail').val(res[0].avatar)
        }
    })
});
//当添加文章表单提交的时候
$('#addForm').on('submit', function () {
    var FormData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: FormData,
        success: function (res) {
            location.href = 'posts.html'
        }
    })
    return false;
})