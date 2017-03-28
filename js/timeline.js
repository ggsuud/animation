'use strict';

var DEFAULT_INTERVAL = 1000/60;

//初始化状态
var STATE_INITIAL = 0;
//开始状态
var STATE_START = 1;
//停止状态
var STATE_STOP = 2;

/**
 * Timeline时间轴类
 * @constructor
 */
function Timeline(){
    this.animationHandler = 0;
    this.state = STATE_INITIAL;
}

/**
 * 时间轴上每一次回调执行的函数
 * @param time 从动画开始到当前执行的时间
 */
Timeline.prototype.onenterframe = function(time){

};

/**
 * 动画开始
 * @param interval 每一次回调的间隔时间
 */
Timeline.prototype.start = function(interval){
  if(this.state == STATE_START){
      return;
  }
    this.state = STATE_START;
    this.interval = interval || DEFAULT_INTERVAL;
    startTimeline(this,+new Date());
};

/**
 * 重新开始动画
 */
Timeline.prototype.restart = function(){
  if(this.state === STATE_START){
      return;
  }
  if(!this.dur || !this.interval){
      return;
  }
   this.state = STATE_START;

    //无缝链接停止动画的状态
    startTimeline(this,+new Date() - this.dur);
};

Timeline.prototype.stop = function(){
    if(this.state !== STATE_START)
        return;
    this.state = STATE_STOP;

    //如果动画开始过，则记录动画从开始到当前所经历的时间
    if(this.startTime){
        this.dur = +new Date() - this.startTime;
    }
    cancelAnimationFrame(this.animationHandler);
}

function startTimeline(timeline,startTime){
    //记录上一次回调的时间戳
    var lastTick = +new Date();

    timeline.startTime = startTime;
    nextTick.interval = timeline.interval;
    nextTick();

    function nextTick(){
        var now = +new Date();
        timeline.animationHandler = requestAnimationFrame(nextTick);

        //如果当前时间与上一次回调的时间戳相差大于我们设置的间隔时间，表示可以执行一次回调函数
        if(now-lastTick >= timeline.interval){
            timeline.onenterframe(now-startTime);
            lastTick = now;
        }
    }
}

//请求动画帧 浏览器兼容性
 var requestAnimationFrame = (function(){
     return window.requestAnimationFrame ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame ||
             window.oRequestAnimationFrame ||
         //所以都不支持，用setTimeout 兼容
     function (callback){
         return window.setTimeout(callback,(callbcak.interval || DEFAULT_INTERVAL));
     }
 })();

var cancelAnimationFrame = (function(){
    return window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
        function(id){
            window.clearTimeout(id);
        }
})();

module.exports = Timeline;






























