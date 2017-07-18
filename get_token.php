<?php
/**
 * Created by PhpStorm.
 * User: postmen
 * Date: 09.11.16
 * Time: 12:45
 */
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
            appId      : '973150949493486',
            xfbml      : true,
            version    : 'v2.9',
            status: true
        });
        FB.getLoginStatus(function (response) {
            FB.login(function (response) {
                $.get('https://graph.facebook.com/oauth/access_token?client_id=973150949493486&client_secret=c82edf5c8fe61e92ac060b2359ba5898&grant_type=fb_exchange_token&fb_exchange_token='+response.authResponse.accessToken,function(data){
                    console.log(data);
                    $('h1').html(data.access_token);
                });
            }, {scope: ['user_posts','publish_pages']});
        });
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

</script>
<h1 style="font-size: 20px; font-weight: bold;"></h1>
</body>
</html>