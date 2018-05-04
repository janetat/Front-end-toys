$(function () {
    // 所有事件都会传入Event对象作为参数，可以从Event对象上获取到更多的信息
    $('#testMouseMoveDiv').mousemove(function (e) {
        $('#testMouseMoveSpan').text('pageX = ' + e.pageX + ', pageY = ' + e.pageY);
    });
});