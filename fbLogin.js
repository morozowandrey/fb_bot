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
    page.open("https://m.facebook.com/story.php?story_fbid=103003277024225&id=100019436589542&fs=0", function (status) {
        if (status === "success") {
            page.evaluate(function() {
                var nodeList = document.querySelectorAll('.story_body_container div[data-sigil="m-feed-voice-subtitle"] > a:first-child');
                var linksArr = Array.prototype.map.call(nodeList, function(el) {
                    return  el.getAttribute('href')
                });

                setTimeout(function () {
                    var el = document.querySelector('input[name="comment_text"]');
                    el.value = 'comment text';
                    MAjaxify.form(event, document.querySelector('form'), "async_composer", "cache", null, false);
                }, 3000);
            });
            setTimeout(function () {
                console.log('true');
                phantom.exit();
            }, 4000)

        }
    });

    // page.open("https://m.facebook.com/story.php?story_fbid=103003277024225&id=100019436589542", function (status) {
    //     if ( status === "success" ) {
    //
    //         var links = page.evaluate(function() {
    //             var nodeList = document.querySelectorAll('.story_body_container div[data-sigil="m-feed-voice-subtitle"] > a:first-child');
    //             var linksArr = Array.prototype.map.call(nodeList, function(el) {
    //                 return  el.getAttribute('href')
    //             });
    //         });
    //
    //         page.open("https://m.facebook.com/story.php?story_fbid=103003277024225&id=100019436589542&fs=0", function (status) {
    //             if ( status === "success" ) {
    //                 // if (document.querySelector('input[name="comment_text"]').value !='comment text'){
    //                 var el = document.querySelector('input[name="comment_text"]');
    //                 el.value='comment text';
    //                 MAjaxify.form(event,document.querySelector('form'),"async_composer","cache",null,false);
    //                 // }
    //             }
    //         });
    //
    //         window.setTimeout(function () {
    //
    //             // for (var i = 0; i <  linksArr.length; i++){
    //             // page.open("https://m.facebook.com/story.php?story_fbid=103003277024225&id=100019436589542&fs=0", function (status) {
    //             //     if ( status === "success" ) {
    //             //         // if (document.querySelector('input[name="comment_text"]').value !='comment text'){
    //             //         var el = document.querySelector('input[name="comment_text"]');
    //             //         el.value='comment text';
    //             //         MAjaxify.form(event,document.querySelector('form'),"async_composer","cache",null,false);
    //             //         // }
    //             //     }
    //             // });
    //             // }
    //
    //             console.log("comments done");
    //             page.render('comment.jpg');
    //             phantom.exit();
    //         }, 1000);
    //     }
    // });



};

login(targetPage);