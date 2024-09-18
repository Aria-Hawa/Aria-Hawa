$(function () {
    // 開始

    // homeAudio 變化事件
    let homeAudio = $('#homeAudio')[0];

    // 音樂結束，停止旋轉+pin歸位
    homeAudio.onended = function () {
        // 停止旋轉
        clearInterval(rotateInterval);
        // pin歸位
        $('#pin').css({
            // 'transform': 'rotate(3deg)',
            'animation': 'pinReturn 1.8s ease-in-out forwards',
        });
        // 淡出音樂license
        $('#audioLicense').fadeOut(2500);
    }

    // pin在外面時true
    let pinOut = true;
    // 無限旋轉動畫+紀錄角度
    let deg = 0;
    let rotationId;
    // 用來控制旋轉的 interval
    let rotateInterval;
    // $('#pin').click(function () {
    //     if (pinOut) {
    //         setTimeout(function () {
    //             rotateInterval = setInterval(function () {
    //                 deg = (deg + 1) % 360; // 每次增加1度
    //                 $('.rotateImg').css('transform', `rotate(${deg}deg) scale(0.95)`);
    //             }, 15); // 每15毫秒更新一次角度
    //         }, 1400);  //延遲1.4s才旋轉
    //         setTimeout(function () {
    //             // 播放音樂
    //             homeAudio.play();
    //             // pin隨音樂長度變化
    //             $('#pin').css('animation', `rotatePin linear ${homeAudio.duration}s forwards`);
    //             // 顯示音樂license
    //             $('#audioLicense').fadeIn(2500);
    //         }, 2500);
    //         pinOut = false;
    //     } else {
    //         setTimeout(function () {
    //             // 停止旋轉
    //             clearInterval(rotateInterval);
    //             // 暫停音樂
    //             homeAudio.pause();
    //         }, 1400);
    //         pinOut = true;
    //     }
    //     $(this).toggleClass('beclick');
    // });


    $('#pin').click(function () {
        if (pinOut) {
            // 清除任何現有的 rotateInterval
            if (rotateInterval) {
                clearInterval(rotateInterval);
            }
            setTimeout(function () {
                rotateInterval = setInterval(function () {
                    deg = (deg + 1) % 360; // 每次增加1度
                    $('.rotateImg').css('transform', `rotate(${deg}deg) scale(0.95)`);
                }, 15); // 每15毫秒更新一次角度
            }, 1400);  // 延遲1.4s才旋轉
            setTimeout(function () {
                // 播放音樂
                homeAudio.play();
                // pin隨音樂長度變化
                $('#pin').css('animation', `rotatePin linear ${homeAudio.duration}s forwards`);
                // 顯示音樂license
                $('#audioLicense').fadeIn(2500);
            }, 2500);
            pinOut = false;

        } else {
            setTimeout(function () {
                // 停止旋轉和其他操作
                if (rotateInterval) {
                    // 停止旋轉
                    clearInterval(rotateInterval);
                    rotateInterval = null; // 重置變量
                }
                // 暫停音樂
                homeAudio.pause();
            }, 1400);
            pinOut = true;

        }
        $(this).toggleClass('beclick');
    });




    // 初始化draggable
    $(".draggable").draggable({
        revert: "invalid",
        start: function (event, ui) {
            $('#menuList').css('z-index', '2');
        },
        drag: function (event, ui) {
            $('#contactHome').css('animation', 'fadeOutTopLeft 1.8s forwards');
            $("#droppable").find(".draggable").fadeOut(800, function () {
                let thisDiv = $(this).clone().attr('style', '').css('display', 'none');
                let thisId = thisDiv.attr('id');
                $(`.${thisId}`).find('.albumBasic').after(function () {
                    return $(thisDiv).fadeIn(800);
                });
                // console.log($('#aboutRecord.draggable').data("ui-draggable"));
                $(this).remove();
            });
        },
        stop: function (event, ui) {
            $(this).css('rotate', '-90deg');
        },
    });

    // 初始化droppable
    $("#droppable").droppable({
        accept: ".draggable",
        drop: function (event, ui) {
            var $droppedItem = ui.helper;
            // 將新的物件放入droppable
            $(this).append($droppedItem);
            $droppedItem.css({
                position: "relative",
                left: 0,
                top: 0
            });
            $droppedItem.find('img:last').addClass('rotateImg');
            if (! $('#center').hasClass('moveCorner')) {
                $('#center').addClass('moveCorner');
                if ($(window).width() < 1280){
                    $('#center.moveCorner').css({
                        'transform': 'rotate(42deg) translate3d(-41%, 80%, 0)',
                    });
                }else{
                    $('#center.moveCorner').css({
                        'transform': 'rotate(42deg) translate3d(-41%, 63%, 0)',
                    });
                }
                
                $('#center.moveCorner').find('h1,p').delay(1200).fadeOut(900);
                $('header').delay(2000).fadeIn(800);
            }
        }
    });




    // 測試初始化
    // console.log($('#aboutRecord.draggable').data())
    // // 初始化draggable
    // function initializeDraggable() {
    // console.log($('#aboutRecord.draggable').data())
    //     $(".draggable").draggable({
    //         revert: "invalid",
    //         start: function (event, ui) {
    //             $('#menuList').css('z-index', '2');
    //         },
    //         drag: function (event, ui) {
    //             $('#contactHome').css('animation', 'fadeOutTopLeft 1.8s forwards');
    //             $("#droppable").find(".draggable").fadeOut(800, function () {
    //                 let thisDiv = $(this).clone().attr('style', '').css('display', 'none');
    //                 let thisId = thisDiv.attr('id');
    //                 $(`.${thisId}`).find('.albumBasic').after(function () {
    //                     return $(thisDiv).fadeIn(800);
    //                 });
    //                 console.log($('#aboutRecord.draggable').data("ui-draggable"));
    //                 $(this).remove();
    //             });
    //         },
    //         stop: function (event, ui) {
    //             $(this).css('rotate', '-90deg');
    //         },
    //     });
    // }

    // // 初始化 droppable
    // $("#droppable").droppable({
    //     accept: ".draggable",
    //     drop: function (event, ui) {
    //         var $droppedItem = ui.helper;

    //         // 將新的物件放入droppable
    //         $(this).append($droppedItem);
    //         $droppedItem.css({
    //             position: "relative",
    //             left: 0,
    //             top: 0
    //         });
    //     }
    // });

    // // 首次初始化
    // initializeDraggable();

    // // 動態新增 .draggable 元素的函數
    // function addDraggableElement() {
    //     // 假設你在這裡新增了一個元素到 .albumBasic 中
    //     let newElement = $('<div class="draggable">...</div>');
    //     $('.albumBasic').append(newElement);

    //     // 重新初始化剛新增的 .draggable 元素
    //     initializeDraggable();
    // }

    // // 使用 addDraggableElement() 函數來動態新增元素
    // addDraggableElement();







    // jQuery結束
});