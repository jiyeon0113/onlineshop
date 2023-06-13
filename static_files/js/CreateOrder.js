function AjaxCreateOrder(e){
    e.preventDefault(); // form이 submit되는 것을 막아줌
    var order_id = '';

    var request = $.ajax({
        method: "POST",
        url: order_create_url, //요청이 전송될 url, order 생성 뷰 호출, templates(order\templates\order\create.html)에 준비해둔 url임
        async: false,          //요청 시 동기화 여부, 동기 과정으로 진행하여 하나의 일이 끝나고 다음 일 수행
        data: $('.order-form').serialize() // serialize()를 통해 form의 객체들을 한번에 가져옴
    });

    //응답 오면 처리하는 부분
    request.done(function (data) {
        if (data.order_id) {
            order_id = data.order_id;
        }
    });

    //응답이 왔는데 문제가 있을 때 처리
    request.fail(function (jqXHR, textStatus){
        if (jqXHR.status==404) {
            alert("페이지가 존재하지 않습니다.");
        }else if (jqXHR.status == 403){
            alert("로그인 해주세요.");
        } else {
            alert("문제가 발생했습니다. 다시 시도해주세요.");
        }
    });
    return order_id;
}