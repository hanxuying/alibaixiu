//向服务器端发送请求
$.ajax({
    typr: 'get',
    url: '/posts',
    success: function (res) {
        console.log(res);
        var html = template('postsTpl', { data: res });
        $('#postsBox').html(html);
        var page = template('pageTpl', res);
        $('#page').html(page);
    }
});
function dateFormat(date) {
    date = new Date(date);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
}
//分页设置
function changePage(pageNum) {  
    $.ajax({
        typr: 'get',
        url: '/posts',
        data: {
            page: pageNum
        },
        success: function (res) {
            var html = template('postsTpl', { data: res });
            $('#postsBox').html(html);
            var page = template('pageTpl', res);
            $('#page').html(page);
        }
    })
};
//分类展示
$.ajax({
    typr: 'get',
    url: '/categories',
    success: function (res) {
        var html = template('categoryTpl', { data: res });
        $('#categoryBox').html(html);
  
    }
});

$('#filterForm').on('submit',function(){
    var formData=$(this).serialize();
    $.ajax({
        typr: 'get',
        url: '/posts',
        data:formData,
        success: function (res) {
            var html = template('postsTpl', { data: res });
            $('#postsBox').html(html);
            var page = template('pageTpl', res);
            $('#page').html(page);
        }
    })
    return false;
})

