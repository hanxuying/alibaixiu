$.ajax({
    type: 'get',
    url: '/slides',
    success: function (res) {
        var html = template('slidesTpl', { data: res })
        $('#slidesBox').html(html);
    }
});
//添加轮播图
$('#file').on('change', function () {
    var fd = new FormData();
    fd.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: `/upload`,
        data: fd,
        processData: false,
        contentType: false,
        success: function (res) {
            console.log(res);
            $('#hiddeImage').val(res[0].avatar)
            
        }
    })
});

$('#slidesForm').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: `/slides`,
        data: formData,
        success: function (res) {
            location.reload()
        }
    })
    return false;
})
//删除轮播图
$('#slidesBox').on('click', '.delete', function () {
    if (confirm('确定要删除此轮播图吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: `/slides/${id}`,
            success: function () {
                location.reload()
            }
        })
    }
})
