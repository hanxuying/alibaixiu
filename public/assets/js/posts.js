//向服务器端发送请求
$.ajax({
    typr:'get',
    url:'/posts',
    success:function(res){
        console.log(res);
        var html=template('postsTpl',{data:res});
        $('#postsBox').html(html);
    }
});
function dateFormat(date){
    date=new Date(date);
    return date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日';
}