(function e(n,o,t){function r(a,l){if(!o[a]){if(!n[a]){var s=typeof require=="function"&&require;if(!l&&s)return s(a,!0);if(c)return c(a,!0);var i=new Error("Cannot find module '"+a+"'");throw i.code="MODULE_NOT_FOUND",i}var u=o[a]={exports:{}};n[a][0].call(u.exports,function(e){var o=n[a][1][e];return r(o?o:e)},u,u.exports,e,n,o,t)}return o[a].exports}var c=typeof require=="function"&&require;for(var a=0;a<t.length;a++)r(t[a]);return r})({1:[function(e,n,o){"use strict";var t,r="",c=$(".track"),a=["piano","saxophone","drums","trumpet","violin","flute","guitar"],l=["a","b","c","d","e","f","g"],s=["2","4","8","16"];function i(){var e=c.html().replace(/<\/?span class="track-instrument">/gi,""),n=e.replace(/<[^>]+>/g," ").replace(/\s+/g," "),o;$.each(a,function(n,t){o=new RegExp("\\b("+t+")\\b","gi");e=e.replace(o,function(e){console.log("INSTRUMENT MATCH:",e);return'<span class="track-instrument">'+e+"</span>"})});console.log("HTML:",e);console.log("----");c.html(e)}function u(){var e=c.html().replace(/<\/?span class="track-note">/gi,""),n=e.replace(/<[^>]+>/g," ").replace(/\s+/g," "),o;$.each(l,function(n,t){o=new RegExp("\\b("+t+")\\b","gi");e=e.replace(o,function(e){console.log("NOTE MATCH:",e);return'<span class="track-note">'+e+"</span>"})});console.log("HTML:",e);console.log("----");c.html(e)}function f(){var e=c.html().replace(/<\/?span class="track-modifier">/gi,""),n=e.replace(/<[^>]+>/g," ").replace(/\s+/g," "),o;$.each(s,function(n,t){o=new RegExp("("+t+")\\b","gi");e=e.replace(o,function(e){console.log("MODIFIER MATCH:",e);return'<span class="track-modifier">'+e+"</span>"})});console.log("HTML:",e);console.log("----");c.html(e)}$(document).keydown(function(e){setInterval(p(),500)});function p(){var e=c.html();if(r!=e&&e){window.getSelection().setPosition(0);r=e;i();u();f();g(c[0])}}function g(e){var n,o;if(document.createRange){n=document.createRange();n.selectNodeContents(e);n.collapse(false);o=window.getSelection();o.removeAllRanges();o.addRange(n)}else if(document.selection){n=document.body.createTextRange();n.moveToElementText(e);n.collapse(false);n.select()}}p()},{}]},{},[1]);
//# sourceMappingURL=highlight.js.map
