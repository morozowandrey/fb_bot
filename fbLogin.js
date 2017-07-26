"use strict";
var webPage = require('webpage');
var page = webPage.create();
var fs = require('fs');
var CookieJar = "cookiejar.json";
var pageResponses = {};

page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36';
page.settings.javascriptEnabled = true;
page.settings.loadImages = true;
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
/* LOGIC */

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
    page.open("https://m.facebook.com/story.php?story_fbid=103003277024225&id=100019436589542", function (status) {
        if ( status === "success" ) {
            var links = page.evaluate(function() {
                // creating links array
                var linksArr= [];
                document.querySelectorAll('.story_body_container div[data-sigil="m-feed-voice-subtitle"] > a:first-child').forEach(function (el, i) {
                    linksArr[i]=el.getAttribute('href');
                });
                // to do:
                // *promise
                // *for each проверка интераций (счетчик)
                // *setTimeout
            });
            window.setTimeout(function () {
                return linksArr;
            }, 1000);


            // parse links from lincksArr, open pages with this links and post comment in it with terminal
            window.setTimeout(function () {
                for (var i = 0; i <  links.length; i++){
                    page.open(links[i], function (status) {
                        if ( status === "success" ) {
                            if (document.querySelector('input[name="comment_text"]').value !='comment text'){
                                var el = document.querySelector(el);
                                el.value='comment text';
                                MAjaxify.form(event,document.querySelector('form'),"async_composer","cache",null,false);
                            }
                        }
                    });
                }

                console.log("comments done");
                page.render('comment.jpg');
                phantom.exit();
            }, 3000);
        }
    });
};

function comment(el) {
    var el = document.querySelector(el);
        el.value='comment';
    MAjaxify.form(event,document.querySelector('form'),"async_composer","cache",null,false);
}

function simulateClick (el) {
    var click = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
    });
    var clickTarget = document.querySelector(el);
    var cancelled = !clickTarget.detachEvent(event);
}

login(targetPage);