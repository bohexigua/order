var $billBtn = $('.bill_btn');

$billBtn.on('click', function (e) {
	var ret = window.confirm("是否确认清账?");
	if(ret) {
		$.ajax({
			type: 'get',
			url: 'closeout.ejs',
		}).done(function(data) {
			alert('清账成功！');
			location.reload();
		}).fail(function() {
			alert('网络错误，请重试');
			location.reload();
		});
	}
});