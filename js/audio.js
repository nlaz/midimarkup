(function e(t,n,r){function o(i,c){if(!n[i]){if(!t[i]){var u=typeof require=="function"&&require;if(!c&&u)return u(i,!0);if(a)return a(i,!0);var s=new Error("Cannot find module '"+i+"'");throw s.code="MODULE_NOT_FOUND",s}var f=n[i]={exports:{}};t[i][0].call(f.exports,function(e){var n=t[i][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[i].exports}var a=typeof require=="function"&&require;for(var i=0;i<r.length;i++)o(r[i]);return o})({1:[function(e,t,n){"use strict";$(document).keyup(function(e){switch(e.which){case 37:case 39:break;case 38:case 40:var t=new SpeechSynthesisUtterance(r());window.speechSynthesis.speak(t);break;default:return}e.preventDefault()});function r(){var e=$(".track").text().substring(0,o($(".track")[0]));var t=e.split("\n");var n=t[t.length-1].trim();return n.split(" ")[0]}function o(e){var t=0;var n=e.ownerDocument||e.document;var r=n.defaultView||n.parentWindow;var o;if(typeof r.getSelection!="undefined"){o=r.getSelection();if(o.rangeCount>0){var a=r.getSelection().getRangeAt(0);var i=a.cloneRange();i.selectNodeContents(e);i.setEnd(a.endContainer,a.endOffset);t=i.toString().length}}else if((o=n.selection)&&o.type!="Control"){var c=o.createRange();var u=n.body.createTextRange();u.moveToElementText(e);u.setEndPoint("EndToEnd",c);t=u.text.length}return t}},{}]},{},[1]);
//# sourceMappingURL=audio.js.map
