#! node
/*
 
 SlideShow
 sebastiasebas@gmail.com


*/

var os=require('os');

var express = require('express');
var app = express();

var img_next = '<img id="i_nxt" src="./number_two.png" align="top" alt="next">' ;
var img_prev = '<img id="i_prv" src="./number_one.png" align="top" alt="prev">' ;

var a_img = [ '<img id="i_0" src="./number_zero.png"  align="top" alt="0">', 
              '<img id="i_1" src="./number_one.png"   align="top" alt="1">', 
              '<img id="i_2" src="./number_two.png"   align="top" alt="2">', 
              '<img id="i_3" src="./number_three.png" align="top" alt="3">',
              '<img id="i_3" src="./number_four.png"  align="top" alt="4">' ] ;
var l_img = a_img.length ;

var idxPic = 0 ;
var szTxt = '' ;

 console.log( '*** Windows Type is <'+ os.type() +'>.');
 console.log( '*** Homedir is <'+ os.homedir() +'>.');

// --- express middleware --------------------------------------------------
app.use( express.static(__dirname + '/public') ) ; // where to serve HTML from

// --- express routes --------------------------------------------------
app.get('/fresh', function (req, res) {
  console.log( '>>> ['+ Date.now() +'] APP.JS get /fresh' ) ;
  szTxt = '<p> ('+ idxPic +') </p>' ;
  console.log( '+++ enviem ['+ szTxt +'].' ) ;
  res.send( szTxt ) ;
}); 

app.get('/next', function (req, res) {
  console.log( '>>> ['+ Date.now() +'] APP.JS get /next' ) ;
  idxPic = idxPic + 1 ;
  if ( idxPic >= l_img ) { idxPic = l_img -1 } ;
  res.send( a_img[idxPic] ) ;
}); 

app.get('/prev', function (req, res) {
  console.log( '>>> ['+ Date.now() +'] APP.JS get /prev' ) ;
  idxPic = idxPic - 1 ;
  if ( idxPic < 0 ) { idxPic = 0 ; } ;
  res.send( a_img[idxPic] ) ;
});

// --- main --------------------------------------------------------

(function main(){  

  console.log('>>> SlideShow starts ....');
  var server = app.listen( process.env.PORT || 5432, function () {
    console.log( 'SlideShow server is now open for e-business' ) ;
    console.log( '... at localhost: ', server.address().port ) ;
  });
 
})();
