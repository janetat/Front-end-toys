'use strict';

$(function () {
    var
        form = $('#test-form'),
        // $.find的都是DOM对象，下面要用$(DOM object)转换为jQuery对象，才能用jQuery的API
        langs = form.find('[name=lang]'),
        selectAll = form.find('label.selectAll :checkbox'),
        // 显示全选的label(其实是label里面的span)
        selectAllLabel = form.find('label.selectAll span.selectAll'),
        // 显示全部选的label(其实是label里面的span)
        deselectAllLabel = form.find('label.selectAll span.deselectAll'),
        // 反选，以链接<a>的形式实现
        invertSelect = form.find('a.invertSelect');

    // 重置初始化状态:
    //off()取消所有绑定事件
    form.find('*').show().off();
    form.find(':checkbox').prop('checked', false).off();
    deselectAllLabel.hide();
    // 拦截form提交事件:
    form.off().submit(function (e) {
        e.preventDefault();
        alert(form.serialize());
    });

    // 绑定事件，第一步：全部打钩或消勾；第二步：通过change切换显示的文字
    selectAll.change(function () {
        // 当全选或者全部选打上勾时，全部checkbox打上勾或取消勾，且用change()切换全选/全部选文字显示
        langs.prop('checked', selectAll.is(':checked'));
        langs.change();
    });

    invertSelect.click(function () {
        langs.each(function () {
            $(this).prop('checked', !$(this).is(':checked'));
        });
        langs.change();
    });

    // 此函数显示和隐藏第一个checkbox里的全选或者全不选的文字，即切换显示的文字
    langs.change(function () {
        var isAllChecked = true;
        for (var i = 0; i < langs.length; i++) {
            // &每位与操作，都是true才是true
            isAllChecked &= $(langs[i]).is(':checked');
        }
        if (isAllChecked) {
            // 全部都为选中时
            selectAllLabel.hide();
            deselectAllLabel.show();
            selectAll.prop('checked', true);
        } else {
            // 没有全部选中时
            selectAllLabel.show();
            deselectAllLabel.hide();
            selectAll.prop('checked', false);
        }
    });
});