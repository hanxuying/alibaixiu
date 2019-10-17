$.ajax({
    typr: 'get',
    url: '/users',
    success: function (res) {
        var html = template('usersTpl', { data: res })
        $('#usersBox').html(html)

    }
});
//添加用户
$('#userForm').on('submit', function () {
    //jp 提供的方法，可以吧表单数据自动序列化  自动收集
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function (res) {
            location.reload()//刷新当前页面
        }
    })
    return false;
});
//展示修改用户图片
$('#modifyBox').on('change', '#avatar', function () {
    var fd = new FormData();
    fd.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        processData: false,
        contentType: false,
        data: fd,
        success: function (res) {
            $('#preview').attr('src', res[0].avatar);
            $('#hiddeAvatar').val(res[0].avatar)
        }
    })
})

//展示修改页面
$('#usersBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (res) {
            var html = template('modifyTpl', res);
            $('#modifyBox').html(html)
        }
    })
});
//修改用户
$('#modifyBox').on('submit', '#modifyForm', function () {
    var formData = $(this).serialize();
    console.log(formData);
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (res) {
            location.reload()//刷新当前页面
        }
    })
    return false;
});
//单项删除
$('#usersBox').on('click', '.del', function () {
    if (confirm('确定删除吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function () {
                location.reload()//刷新当前页面

            }
        })
    }
})
//批量删除
$('#checkAll').on('change', function () {
    var bool = $(this).prop('checked');
    var checkList = $('#usersBox input[type="checkbox"]');
    checkList.prop('checked', bool);
    if(bool==true){
        $('#deleteAll').show();
    }else{
        $('#deleteAll').hide();

    }
   
});
//按钮状态
$('#usersBox').on('change', 'input[type="checkbox"]', function () {
    if ($('#usersBox input[type="checkbox"] ').length == $('#usersBox input[type="checkbox"]:checked ').length) {
        $('#checkAll').prop('checked', true)
    } else {
        $('#checkAll').prop('checked', false)
    }
    if($('#usersBox input[type="checkbox"]:checked ').length > 0){
        $('#deleteAll').show();
    }else{
        $('#deleteAll').hide();

    }
});


$('#deleteAll').on('click',function(){
  if(confirm('确定删除吗？'))  {
var checkList=$('#usersBox input[type="checkbox"]:checked ');
var str ="";
checkList.each(function(index,item){
    str+=$(item).attr('data-id')+'-'
})
str=str.substr(0,str.length-1);
$.ajax({
    type:'delete',
    url:'/users/'+str,
    success:function(){
        location.reload()//刷新当前页面

    }
})
}
})