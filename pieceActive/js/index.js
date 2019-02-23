(function() {
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var isMock=true;
    var browser = checkVersion();
    var info = {};
    window.getMessage = function(key, value) {
        info[key] = value;
        initPage();
    };
    // if (browser.ios && window.webkit) {
    //     window.webkit.messageHandlers.getUid.postMessage(null);
    //     window.webkit.messageHandlers.getTicket.postMessage(null);
    // } else if (browser.android) {
    //     if (androidJsObj && (typeof androidJsObj === 'undefined' ? 'undefined' : _typeof(androidJsObj)) === 'object') {
    //         info.uid = parseInt(window.androidJsObj.getUid());
    //         info.ticket = parseInt(window.androidJsObj.getTicket());
    //         initPage();
    //     }
    // }
    isMock?mockFun():'';
   function mockFun(){
       
    info.uid = 10490;
    info.ticket = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWNrZXRfdHlwZSI6bnVsbCwidWlkIjoxMDQ5MCwidGlja2V0X2lkIjoiY2FjMzM4OGMtZjM4MS00M2Y5LWE1ZGMtOGFiZDBlNmRkOTM4IiwiZXhwIjozNjAwLCJjbGllbnRfaWQiOiJlcmJhbi1jbGllbnQifQ.6dbzDPGPEsyIxUKHQT8zxZUqexdayi-VDeJaGCGwqgo';
    initPage();
   }
    function initPage() {

        let Piece = {

            init : function(){//初始化
                this.getNum();
                this.addDataType();
                this.bindClick();

            },

            addDataType : function(){//存储对应的type
                $btn.each(function(i,item){
                    $(this).data('type',i+1)
                })
            },

            bindClass : function(){//根据碎片数量给每个按钮添加对应的样式类
                //console.log('bindClass')
                $btn.each(function(i,item){

                    if( num >= needNum[i] ){
                       // console.log('enough')

                        $(this).addClass('enough').removeClass('lacking');
                    }
                    else{
                        $(this).removeClass('enough').addClass('lacking');
                    }
                    })
            },

            bindClick : function(){//给每个按钮绑定点击事件
                $btn.on('click',function(){
                    // alert($(this).data('type'));
                    if( $(this).hasClass('enough') ){//足够兑换
                        info.type = $(this).data('type')//设置当前type
                        Piece.exchange();

                    }
                    else{
                        return;
                    }
                })
            },

            showPrompt : function(){
                $ ('.prompt').show ().delay (1500).fadeOut ();
            },

            getNum : function(){//向后台获取碎片数量
                $.ajax({
                    url: allUrl() + '/activity/html/getBoxFragment',//获取碎片
                    data: {
                        uid: info.uid,
                        ticket: info.ticket,
                    },
                    success: function(res) {

                        if (res.code === 200) {
                           // console.log('getNum-success')
                            //console.log(res.data)
                            num = res.data;
                            Piece.setNum();//显示数量

                        }
                    }
                })
            },

            setNum : function(){
                //console.log('setNum')
                $('.top .num span').html(num);
                this.bindClass();
            },

            exchange : function(){//兑换物品
                $.ajax({
                    url: allUrl() + '/activity/html/exchangeBoxFragment',
                    data: {
                        uid: info.uid,
                        ticket: info.ticket,
                        type:info.type
                    },
                    success: function success(res) {
                        
                        if (res.code === 200) {
                           // console.log('success')
                            Piece.getNum();
                            Piece.showPrompt();
                        }
                        //http://47.94.149.86:8081/swagger-ui.html#/
                        //deviceId=6f1499fd-cfca-3c93-8868-7a551027dfa4&appCode=81&pageSize=10&ticket=eyJhbGciOiJIUzI1NiJ9.eyJ0aWNrZXRfdHlwZSI6bnVsbCwidWlkIjoxMDQ5MCwidGlja2V0X2lkIjoiY2FjMzM4OGMtZjM4MS00M2Y5LWE1ZGMtOGFiZDBlNmRkOTM4IiwiZXhwIjozNjAwLCJjbGllbnRfaWQiOiJlcmJhbi1jbGllbnQifQ.6dbzDPGPEsyIxUKHQT8zxZUqexdayi-VDeJaGCGwqgo&ispType=4&app=xchat&os=android&appVersion=2.7.6&pageNum=1&osVersion=5.1&uid=10490&netType=2&channel=tt&model=HUAWEI+TAG-TL00
                    }
                })
            }
        }
        
        let $btn = $('.middle .btn_w .btn');
        let num = null;//拥有碎片的数量
        let needNum = [1,3,5,15,66,520];//兑换每个物品所需要的碎片数量
        Piece.init();

    }
})()