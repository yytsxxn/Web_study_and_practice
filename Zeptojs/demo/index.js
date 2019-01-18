// 当前的  划出来
var iNow = 0;
// 划出去
var last = -1;

$(document).swipeUp(function(){
    last = iNow;
    iNow++;
    if(iNow <= $('.page').length-1){
        // $('.page').eq(last).addClass('moveToTop');
        $('.page').eq(last).attr('class','page page-'+ (last+1) +' moveToTop');
        $('.page').eq(iNow).removeClass('hide').attr('class','page page-'+ (iNow+1) +' moveFromBottom');
    }
    setTimeout(function(){
        $('.page').eq(iNow).find('img').removeClass('hide');
        $('.page').eq(last).find('img').addClass('hide');
    },600)
})


$(document).swipeDown(function(){
    last = iNow;
    iNow--;
    if(iNow >= 1 ){
        $('.page').eq(last).attr('class','page page-'+ (iNow+1) +' moveToBottom');
        $('.page').eq(iNow).attr('class','page page-'+ (iNow+1) +' moveFromTop');
    }
    setTimeout(function(){
        // 等iNow 当前页 600ms划出来后  再让图片出来开始执行动画
        $('.page').eq(iNow).find('img').removeClass('hide');
        $('.page').eq(last).find('img').addClass('hide');
    },600)
})
