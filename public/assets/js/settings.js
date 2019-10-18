$('#logo').on('change',function(){
    var file = this.files[0];
    var fd= new FormData();
    fd.append('logo',file);
    $.ajax({
        type:'post',
        url:'/upload',
        data:fd,
        processData:false,
        contentType:false,
        success:function(res){
            $('#hiddenLogo').val(res[0].logo);
            $('#preview').attr('src', res[0].logo);
        }
    })
})