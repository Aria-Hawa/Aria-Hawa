$(function () {
    // 開始

    // playAudio 變化事件
    let playAudio = $('#playAudio')[0];
    // pin在外面時true
    let pinOut = true;
    // 無限旋轉動畫+紀錄角度
    let deg = 0;
    let rotationId;
    // 用來控制旋轉的 interval
    let rotateInterval;
    $('#pin').click(function () {
        if (pinOut) {
            $('#pin').css('transform', 'rotate(0deg)');
            if (rotateInterval) {
                clearInterval(rotateInterval);
            }
            // 延遲1.4秒開始旋轉唱片
            setTimeout(function () {
                rotateInterval = setInterval(function () {
                    deg = (deg + 1) % 360; // 每次增加1度
                    $('.rotateImg').css('transform', `rotate(${deg}deg) scale(0.95)`);
                }, 15); // 每15毫秒更新一次角度
            }, 1400);
            // 延遲2.5秒開始播放音樂，並讓 pin 開始轉動
            setTimeout(function () {
                $('#pin').css('animation', `rotatePin linear ${playAudio.duration}s forwards`);
                $('#pin').css('animation-play-state', 'running'); // 恢復 pin 轉動
                playAudio.play();
                if ($(playAudio).find('source').attr('src') == './audio/snoozyBeats-lazyAfternoon.mp3') {
                    $('#audioLicense').fadeIn(2500);
                } else {
                    $('#audioLicense').remove();
                    $('#audioLicense2').delay(800).fadeIn(2500);
                }
            }, 2500);
            pinOut = false;
        } else {
            // 延遲1.4s停止旋轉+暫停pin
            setTimeout(function () {
                if (rotateInterval) {
                    clearInterval(rotateInterval);
                    rotateInterval = null;
                }
                // 暫停音樂
                playAudio.pause();
                // 暫停 pin 的動畫
                $('#pin').css('animation-play-state', 'paused');
            }, 1400);
            pinOut = true; // 更新狀態
        }
    });


    // 音樂結束，停止旋轉+pin歸位
    playAudio.onended = function () {
        // 停止旋轉
        clearInterval(rotateInterval);
        // pin歸位
        $('#pin').css({
            'animation': 'pinReturn 1.8s ease-in-out forwards',
        });
        // 淡出音樂license
        $('#audioLicense').fadeOut(2500);
        $('#audioLicense2').fadeOut(2500);
        pinOut = true;
    }


    // 9/19 修改拖拉clone元件卻無法移除唱片前的版本
    // 初始化draggable
    $(".draggable").draggable({
        revert: "invalid",
        start: function (event, ui) {
            $('#menuList').css('z-index', '2');
            // 停止音樂
            playAudio.pause();
            // 停止旋轉
            clearInterval(rotateInterval);
            // pin歸位
            $('#pin').css({
                'animation': 'pinReturn 1.8s ease-in-out forwards',
            });
            // 淡出音樂license
            $('#audioLicense').fadeOut(2500);
            $('#audioLicense2').fadeOut(2500);
            pinOut = true;
        },
        drag: function (event, ui) {
            $('#contactHome').css('animation', 'fadeOutTopLeft 1.8s forwards');
            $('.rotateImg').removeClass('rotateImg');
            $("#droppable").find(".draggable").fadeOut(800, function () {
                let thisDiv = $(this).clone().attr('style', '').css('display', 'none');
                let thisId = thisDiv.attr('id');
                $(`.${thisId}`).find('.albumBasic').after(function () {
                    return $(thisDiv).fadeIn(800);
                });
                $(this).remove();
                console.log(this);
                thisDiv.draggable();
            });
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
            if (!$('#center').hasClass('moveCorner')) {
                $('#center').addClass('moveCorner');
                if ($(window).width() <= 1280) {
                    $('#center.moveCorner').css({
                        'transform': 'rotate(42deg) translate3d(-41%, 80%, 0)',
                    });
                } else {
                    $('#center.moveCorner').css({
                        'transform': 'rotate(42deg) translate3d(-41%, 63%, 0)',
                        'transition': '2s 0.8s all ease-in-out',
                    });
                }
            }

            $('#center.moveCorner').find('h1,p').delay(1200).fadeOut(900);
            $('header').delay(2000).fadeIn(800);
            $('#content').delay(2400).fadeIn(800);
            switch ($droppedItem.attr('id')) {
                case 'aboutRecord':
                    $('.inner').css('display', 'none');
                    $('#about.inner').fadeIn(900);
                    $('#playAudio source').attr('src', './audio/snoozyBeats-midnightDrifter.mp3');
                    $('#audioLicense2 span').text('＜Midnight Drifter＞');
                    playAudio = $('#playAudio')[0];
                    playAudio.load();
                    break;
                case 'worksRecord':
                    $('.inner').css('display', 'none');
                    $('#works.inner').fadeIn(900);
                    $('#playAudio source').attr('src', './audio/snoozyBeats-doingGood.mp3');
                    $('#audioLicense2 span').text('＜Doing Good＞');
                    playAudio = $('#playAudio')[0];
                    playAudio.load();
                    break;
                case 'contactRecord':
                    $('.inner').css('display', 'none');
                    $('#contact.inner').fadeIn(900);
                    $('#playAudio source').attr('src', './audio/snoozyBeats-rewind.mp3');
                    $('#audioLicense2 span').text('＜Rewind＞');
                    playAudio = $('#playAudio')[0];
                    playAudio.load();
                    break;
            }

        }
    });


    // 以下9/19測試更改
    // // 初始化draggable
    // $(".draggable").draggable({
    //     revert: "invalid",
    //     start: function (event, ui) {
    //         $('#menuList').css('z-index', '2');
    //         // 停止音樂
    //         playAudio.pause();
    //         // 停止旋轉
    //         clearInterval(rotateInterval);
    //         // pin歸位
    //         $('#pin').css({
    //             'animation': 'pinReturn 1.8s ease-in-out forwards',
    //         });
    //         // 淡出音樂license
    //         $('#audioLicense').fadeOut(2500);
    //         $('#audioLicense2').fadeOut(2500);
    //         pinOut = true;
    //     },
    //     drag: function (event, ui) {
    //         $('#contactHome').css('animation', 'fadeOutTopLeft 1.8s forwards');
    //         $('.rotateImg').removeClass('rotateImg');
    //         $("#droppable").find(".draggable").fadeOut(800);
    //     },
    // });

    // // function () {
    // //     let thisDiv = $(this).clone().attr('style', '').css('display', 'none');
    // //     let thisId = thisDiv.attr('id');
    // //     $(`.${thisId}`).find('.albumBasic').after(function () {
    // //         return $(thisDiv).fadeIn(800);
    // //     });
    // //     $(this).remove();
    // //     thisDiv.draggable();
    // // }

    // // 初始化droppable
    // $("#droppable").droppable({
    //     accept: ".draggable",
    //     drop: function (event, ui) {
    //         // 9/19變更
    //         // #droppable裡面的.draggable要移除
    //         let currentItem = $(this).find(".draggable");
    //         console.log(currentItem)





    //         var $droppedItem = ui.helper;
    //         // 將新的物件放入droppable
    //         $(this).append($droppedItem);
    //         $droppedItem.css({
    //             position: "relative",
    //             left: 0,
    //             top: 0
    //         });
    //         $droppedItem.find('img:last').addClass('rotateImg');
    //         if (!$('#center').hasClass('moveCorner')) {
    //             $('#center').addClass('moveCorner');
    //             if ($(window).width() <= 1280) {
    //                 $('#center.moveCorner').css({
    //                     'transform': 'rotate(42deg) translate3d(-41%, 80%, 0)',
    //                 });
    //             } else {
    //                 $('#center.moveCorner').css({
    //                     'transform': 'rotate(42deg) translate3d(-41%, 63%, 0)',
    //                     'transition': '2s 0.8s all ease-in-out',
    //                 });
    //             }
    //         }

    //         $('#center.moveCorner').find('h1,p').delay(1200).fadeOut(900);
    //         $('header').delay(2000).fadeIn(800);
    //         $('#content').delay(2400).fadeIn(800);
    //         switch ($droppedItem.attr('id')) {
    //             case 'aboutRecord':
    //                 $('.inner').css('display', 'none');
    //                 $('#about.inner').fadeIn(900);
    //                 $('#playAudio source').attr('src', './audio/snoozyBeats-midnightDrifter.mp3');
    //                 $('#audioLicense2 span').text('＜Midnight Drifter＞');
    //                 playAudio = $('#playAudio')[0];
    //                 playAudio.load();
    //                 break;
    //             case 'worksRecord':
    //                 $('.inner').css('display', 'none');
    //                 $('#works.inner').fadeIn(900);
    //                 $('#playAudio source').attr('src', './audio/snoozyBeats-doingGood.mp3');
    //                 $('#audioLicense2 span').text('＜Doing Good＞');
    //                 playAudio = $('#playAudio')[0];
    //                 playAudio.load();
    //                 break;
    //             case 'contactRecord':
    //                 $('.inner').css('display', 'none');
    //                 $('#contact.inner').fadeIn(900);
    //                 $('#playAudio source').attr('src', './audio/snoozyBeats-rewind.mp3');
    //                 $('#audioLicense2 span').text('＜Rewind＞');
    //                 playAudio = $('#playAudio')[0];
    //                 playAudio.load();
    //                 break;
    //         }

    //     }
    // });
    // 以上9/19測試更改









    // 點擊HOME回歸原位
    $('header').click(function () {
        // $('#center').addClass('moveback');
        // $('#center.moveback').css({
        //     'transform': 'rotate(0deg) translate3d(0%, 0%, 0)',
        // });
        $('#center.moveCorner').removeClass('.moveCorner');

    });




    // jQuery結束
});