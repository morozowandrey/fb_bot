"use strict";
var webPage = require('webpage');
var page = webPage.create();
var fs = require('fs');
var CookieJar = "cookiejar.json";
var pageResponses = {};

page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36';
page.settings.javascriptEnabled = true;
page.settings.loadImages = false;
phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;

page.onResourceReceived = function(response) {
    pageResponses[response.url] = response.status;
    fs.write(CookieJar, JSON.stringify(phantom.cookies), "w");
};
if(fs.isFile(CookieJar))
    Array.prototype.forEach.call(JSON.parse(fs.read(CookieJar)), function(x){
        phantom.addCookie(x);
    });

///////////////////////////////////////////////////////////////////////////////////////////////
var login = function (callback) {
    page.open("https://m.facebook.com/", function(status) {
        if ( status === "success" ) {
            page.evaluate(function() {
                document.querySelector("input[name='email']").value = "andrey940@gmail.com";
                document.querySelector("input[name='pass']").value = "kerjdbwf15";
                document.querySelector("#login_form").submit();
            });

            window.setTimeout(function () {
                console.log("Login submitted!");
                page.render('main_page.jpg');
                callback(targetPage);
            }, 5000);
        }
    });
};

var targetPage = function (callback) {
    page.open("https://m.facebook.com/story.php?story_fbid=103003277024225&id=100019436589542&fs=0", function (status) {
        if ( status === "success" ) {
            window.setTimeout(function () {
                console.log("checkins page achieved");
                page.render('checkins_page.jpg');
                phantom.exit();
                parser(page);
            }, 5000);
        }
    });
};

var parser = function (page){
    var test= page.evaluate(function() {

        function comment(el) {
            el = document.querySelector(el);
            el.value='comment';

            MAjaxify.form(new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': true
            }),document.querySelector('form'),"async_composer","cache",null,false);
        }
        comment('[name="comment_text"]');

    });
    window.setTimeout(function () {
        console.log(test);
        console.log("all done");
        page.render('comment done.jpg');
        phantom.exit();
    }, 5000);
};
login(targetPage);