function addLoadEvent(fn) {
    


    var init = function() {

        if (arguments.callee.done) return;
   
        arguments.callee.done = true;

        fn.apply(document,arguments);
    };
    
    //ע��DOMContentLoaded�¼������֧�ֵĻ�
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", init, false);
    }
    
    //������Safari��������Ҫʹ��setInterval�������ϼ��document.readyState
    //��Ϊloaded��complete��ʱ�����DOM�Ѿ��������
    if (/WebKit/i.test(navigator.userAgent)) {
        var _timer = setInterval(function() {
            if (/loaded|complete/.test(document.readyState)) {
                clearInterval(_timer);
                init();
            }
        },10);
    }
    //����IE��ʹ������ע�ͣ���ʹ��script��ǩ��defer����
    //IE�п��Ը�script��ǩ���һ��defer(�ӳ�)���ԣ���������ǩ�еĽű�ֻ�е�DOM������Ϻ��ִ��
    /*@cc_on @*/
    /*@if (@_win32)
    document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
    var script = document.getElementById("__ie_onload");
    script.onreadystatechange = function() {
        if (this.readyState == "complete") {
            init();
        }
    };
    /*@end @*/
    return true;
}