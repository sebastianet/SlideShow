
var lastD = 0;

// nova funció yyyyymmdd de Date() - at client
Date.prototype.yyyymmdd = function () {                            
	var yyyy = this.getFullYear().toString();                                    
	var mm   = (this.getMonth()+1).toString(); // getMonth() is zero-based         
	var dd   = this.getDate().toString();
	return yyyy + '/' + (mm[1]?mm:"0"+mm[0]) + '/' + (dd[1]?dd:"0"+dd[0]);
} ; // yyyymmd

Date.prototype.hhmmss = function () {
	function fixTime(i) {
        return (i < 10) ? "0" + i : i;
    }
	var today = new Date(),
	    hh = fixTime( today.getHours() ),
		mm = fixTime( today.getMinutes() ),
		ss = fixTime( today.getSeconds() ) ;
	var myHHMMSS = hh + ':' + mm + ':' + ss ;
	return myHHMMSS ;
} ; // hhmmss


function reload(){ 

  console.log( '### main.js + RELOAD() : get fresh ###' )
  $.get( '/fresh', function( data ){
	console.log( '**** FRESH returns (' + data + ').' ) ;
	$( "#my_counter" ).html( data ) ; // show actual count  
  });
};


function client_ready() {              // DOM ready for index.html

	console.log( '*** index client DOM ready.' ) ;

	$( ".clkPrev" ).click( function() {

		console.log( '### Prev button clicked.' ) ;

		$.get( '/prev', function( page ) {
			console.log( '**** MAIN.JS - Demanem al server la imatge PREV.' ) ;
			$( "#div-actual-image" ).html( page ) ; // show received HTML at specific <div>
		}) ; // get(prev)

	}) ; // click on PREV button or link

	
	$( ".clkNext" ).click( function() {
		console.log( '### Next button clicked.' ) ;

		$.get( '/next', function( page ) {
			console.log( '**** MAIN.JS - Demanem al server la imatge NEXT.' ) ;
			$( "#div-actual-image" ).html( page ) ; // show received HTML at specific <div>
		}) ; // get(next)

	}) ; // click on NEXT button or link

	
	var szAra = '<center>[' + (new Date).yyyymmdd() +','+ (new Date).hhmmss() + ']</center>' ;
	$( "#my_date" ).html( szAra ) ; // show actual date

	$( "#my_counter" ).html( "+" ) ; // show actual count
	
} ; // client_ready(), DOM ready for INDEX.HTM


$( function(){   

  reload();                      // now, .. 
  setInterval( reload, 10000 ) ; // .. and every 10 secs   

  client_ready(); // DOM ready event
	
} ) ; // DOM redy
