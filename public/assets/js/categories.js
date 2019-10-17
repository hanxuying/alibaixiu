$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        var html = template('categoriesTpl', { data: res });
        $('#categoryBox').html(html)
    }
});
$('#addCategory').on('submit', function () {
    $.ajax({
        type: 'post',
        url: '/categories',
        data: $(this).serialize(),
        success: function () {
            location.reload();
        }
    })
    return false;
});
//编辑功能 修改用户
$('#categoryBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (res) {
            console.log(res);
            var html = template('modifyCategoryTpl', res)
            $('#modifyBox').html(html)
        }
    })
});
$('#modifyBox').on('submit', '#modifyCategory', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: $(this).serialize(),
        success: function () {
            location.reload();

        }
    })
    return false;
})
//删除
$('#categoryBox').on('click', '.xyz', function () {
    if (confirm('确定删除吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function () {
                location.reload();
            }
        })
    }
});
//全选按钮
$('#hxy').on('change', function () {
    var bool = $(this).prop('checked');
    var checkList = $('#categoryBox input[type="checkbox"]');
    checkList.prop('checked', bool);
});
//按钮
$('#categoryBox').on('change', 'input[type="checkbox"]', function () {
    if ($('#categoryBox input[type="checkbox"]').length == $('#categoryBox input[type="checkbox"]:checked').length) {
        $('#hxy').prop('checked', true)
    } else {
        $('#hxy').prop('checked', false)

    }


})

