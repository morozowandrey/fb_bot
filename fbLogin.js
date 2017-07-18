"use strict";
var webPage = require('webpage');
var page = webPage.create();
var fs = require('fs');
var CookieJar = "cookiejar.json";
var pageResponses = {};
// res = page.injectJs('jquery-3.2.1.min.js');
// console.log(res);

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
    page.open("http://facebook.com", function(status) {
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
    page.open("https://www.facebook.com/Lalala2-1908199049468067/notifications/?section=activity_feed&subsection=checkin", function (status) {
        if ( status === "success" ) {
            window.setTimeout(function () {
                console.log("notifications page achieved");
                page.render('notifications_page.jpg');
                //callback(parser);
                parser(page);
            }, 5000);
        }
    });
};

var parser = function (page){
    console.log(page);
    var test= page.evaluate(function() {
        var els=[];
        var postInputs = document.querySelectorAll('[name="ft_ent_identifier"]');

        postInputs.forEach(function(el,i){
            els[i]=el.value;
        });
        console.log(els);
    });
    window.setTimeout(function () {
        console.log(test);
        console.log("all done");
        page.render('notification.jpg');
        phantom.exit();
    }, 5000);
};
login(targetPage);