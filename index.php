<?php
/**
 * Created by PhpStorm.
 * User: postmen
 * Date: 09.11.16
 * Time: 12:45
 */
if(isset($_GET['a'])){
$a=$_GET['a'];
}
if(isset($_GET['p'])){
$p=$_GET['p'];
}
//EAAXDnPZAMMZCcBAEGoENOiJ8zSu2fVT52M6X4DYMHzUq7UiCEZAphSHHSAZAnHFAy5NZCSwZAhkYdmHZAxRxBtweuZAEdqa2pSgCohbm7g36rtUWTUzv8MD2gr5Yv9VqqDY31MUoBxawmD8EvmAjxN9GH9qiIXqJOsMZD
//1177996645570873
?>
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <link href="https://fonts.googleapis.com/css?family=Roboto:500" rel="stylesheet">
</head>
<body>
<script
    src="https://code.jquery.com/jquery-3.1.1.min.js"
    integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
    crossorigin="anonymous"></script>
<script>
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1622453798056951',
            xfbml      : true,
            version    : 'v2.6',
            status: true
        });
        var Counter = {
          init: function (FB) {
                        FB.api("/<?= $p ?>", {
                                access_token: <?= '"'.$a.'"' ?>,
                                fields: "reactions.type(LIKE).limit(0).summary(1).as(like),reactions.type(ANGRY).limit(0).summary(1).as(love)"
                            },
                            function (response) {
                                if (response && !response.error) {
                                    clearInterval(Counter.incs.incLi);
                                    clearInterval(Counter.incs.incLo);
                                var timeLi = Math.ceil(20000/(response.like.summary.total_count - Counter.cache.likes));

                                if(isFinite(timeLi) && timeLi>0){
                                    Counter.incs.incLi=setInterval(function(){
                                        if(response.like.summary.total_count>=Counter.cache.likes){
                                            Counter.cache.likes++;
                                            $('.like').html(Counter.cache.likes);
                                        }
                                        else {
                                            clearInterval(Counter.incs.incLi);
                                            $('.like').html(response.like.summary.total_count);
                                            Counter.cache.likes = response.like.summary.total_count;
                                        }
                                    },timeLi);
                                }
                                var timeLo = Math.ceil(20000/(response.love.summary.total_count - Counter.cache.loves));
                                if(isFinite(timeLo) && timeLo>0){
                                    Counter.incs.incLo=setInterval(function(){
                                        if(response.love.summary.total_count>=Counter.cache.loves){
                                            Counter.cache.loves++;
                                            $('.love').html(Counter.cache.loves);
                                        }
                                        else {
                                            clearInterval(Counter.incs.incLo);
                                            $('.love').html(response.love.summary.total_count);
                                            Counter.cache.loves = response.love.summary.total_count;
                                        }
                                    },timeLo);
                                }
                                }
                            });


            },
          incs: {
              incLi: 0,
              incLo: 0
          },
          cache: {
              likes: 0,
              loves: 0
          }
        }
        //Counter.init(FB);
        setInterval(function(){Counter.init(FB);}.bind(FB),20000);
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

</script>
<div class="bg">
    <div class="like"></div>
    <div class="love"></div>
</div>
<style>
    html, body, div {
        margin: 0px;
        padding: 0px;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .bg {
        background: url('bg.jpg') no-repeat 0 0 transparent;
        background-size: 100%;
        width: 1280px;
        height: 720px;
        position: relative;
        transform: translateY(-50%);
        top: 50%;
        margin: 0px auto;
        font-size: 43px;
        font-family: 'Roboto';
        font-weight: 500;
    }
    .like, .love {
        position: absolute;
        width: 200px;
        height: 45px;
        bottom: 55px;
        text-align: center;
    }
    .like {
        left: 382px;
    }
    .love {
        right: 360px;
    }
</style>
</body>
</html>