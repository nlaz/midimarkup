var soundfont, 
    ctx = new AudioContext(),
    listOfPlayers = [],
    TIEMPO = 120.0,
    MEASURE = 60.0/TIEMPO * 4.0,
    Soundfont = require('soundfont-player');


$( document ).keypress(function (e) {
  if(e.shiftKey){
    var key = e.which;
    switch( key ) {
      case 13: //Enter key
      e.preventDefault();
      soundfont = new Soundfont(ctx);
      togglePlay();
      break;
      default:
      break;
    }
  }
});

var playing = false;

var togglePlay = function () {
  if (playing) 
    stopAll();
  else
    play();
  playing = !playing;
};

var stopAll = function () {
  for (var x in listOfPlayers)
    listOfPlayers[x].stop(0);
};

var play = function () {
  console.log("play!");

  var lines = $('.track').text().trim().split('\n');
  for (var x in lines)
    lines[x] = lines[x].trim();

  // console.log(lines);
  for (var i = 0; i < lines.length; i++){
    var trackCommands = parseMarkup(lines[i].trim());
    trackCommands = addTimes(trackCommands);
    playTrack(trackCommands);
  }
};

var playTrack = function ( commands ) {
  var time = 0;

  for ( var x = 0; x < commands.length; x++ ) {

    (function(x) {
      var key        = commands[x].key,
          time       = commands[x].timeStart,
          duration   = commands[x].duration,
          instrument = commands[x].instrument;

      var inst = soundfont.instrument(instrument);
      inst.onready(function() {
        // console.log("key: " + key  + " time: " + time + " duration: " + duration);
        var note = inst.play(key, time, MEASURE * duration);
        listOfPlayers.push(note);
      });
    })(x);
  }
};

var addTimes = function ( instructions ) {
  var time = 0.0;
  for (var x in instructions) {
    var step = instructions[x];
    step.timeStart = time;
    time = time + MEASURE * step.duration;
  }
  return instructions;
};

var parseMarkup = function( markup ) {
  var output = [],
      notes = markup.toUpperCase().split(" ");

  for (var x in notes) {  
    var key = noteToKey(notes[x]);
    if (key) {
      key["key"] = keyToNote(key["key"])
      output.push(key);
      // console.log(key);
    } 
  }
  return output; // i.e. { key: "Cb4", duration: 1 }
}

var instrumentSetting = 'acoustic_grand_piano';

var noteToKey = function( token ) {
  var key = -1,
      duration = 1;

  if (token.length > 3) {
    switch (token) {
      case (token.match(/^[T][0-9]{3}\b/) || {}).input:
        TIEMPO = parseFloat(token.substring(1));
        MEASURE = 60.0/TIEMPO * 4.0;
        console.log("new tiempo: " + TIEMPO);
        return;
      case "PIANO":
        instrumentSetting = 'acoustic_grand_piano';
        return;
      case "DRUMS":
        instrumentSetting = 'gunshot';
        return;
      case "GUITAR":
        instrumentSetting = 'acoustic_guitar_steel';
        return;
      case "SAXOPHONE":
        instrumentSetting = 'alto_sax';
        return;
      case "TRUMPET":
        instrumentSetting = 'trumpet';
        return;
      default:
        return;
    }
  }

  for (var x in token) {
    var cmd = token.charAt(x);
    switch( cmd ) {
      case 'A':
        key = 69;
        break;
      case 'B':
        key = 71;
        break;
      case 'C':
        key = 60;
        break;
      case 'D':
        key = 62;
        break;
      case 'E':
        key = 64;
        break;
      case 'F':
        key = 65;
        break;
      case 'G':
        key = 67;
        break;
      case '+':
        if (key === -1) return;
        key++;
        break;
      case '-':
        if (key === -1) return;
        key--;
        break;
      case ';':
        key = -1;
        break;
      case '1':
        duration = 1.0;
        break;
      case '2':
        duration = 0.5;
        break;
      case '4':
        duration = 0.25;
        break;
      case '8':
        duration = 0.125;
        break;
      default:
        return;
    } 
  }
  // console.log(key + ": " + duration + ": " + instrumentSetting); 
  return {
      key: key, 
      duration: duration, 
      instrument: instrumentSetting 
    };
}

var keyToNote = function ( key ) {
  var octave = 4;
  var A0 = 0x15; // first note
  var C8 = 0x6C; // last note
  var number2key = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  return number2key[ key % 12] + octave;
}
