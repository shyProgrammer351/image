function initialize()
{
		var strOutput = "";
		for ( var i = 0 ; i < info.length ; i++ )
			strOutput  += info[ i ][ OUTPUT ];
		var countLines = strOutput.split('\n').length - 1;

		var outputBox = document.getElementById( "outputBox" );
		outputBox.innerText    = strOutput;
		outputBox.style.height = ( countLines + 3 ) * 14.5 + "px";
		outputBox.style.width  = outputBox.offsetWidth + "px";
		outputBox.style.color  = "White";
		outputBox.innerText    = "";

		if( strOutput.trim() == "" )
		{
				outputBox.style.width = 0;
				outputBox.style.height = 0;	
				outputBox.style.padding = 0;
		}
		
		update_view( 0, 0 );
		timer_id = setTimeout( "onTimeEvent()", 500 );
}

function getStyle( styleCode )
{
	if( styleCode == 'cbw' ) 
		return 'border:5px solid SkyBlue;background:white;margin:0px;text-align:center';
	else if( styleCode == 'cb' ) 
		return 'border:5px solid SkyBlue;background:SkyBlue;margin:0px;text-align:center';
	else if( styleCode == 'lbw' ) 
		return 'border:5px solid SkyBlue;background:white;margin:0px;text-align:left';
	else if( styleCode == 'lb' ) 
		return 'border:5px solid SkyBlue;background:SkyBlue;margin:0px;text-align:left';
	else if( styleCode == 'rb' ) 
		return 'border:5px solid SkyBlue;background:SkyBlue;margin:0px;text-align:right';
	else if( styleCode == 'cgw' ) 
		return 'border:5px solid MediumSeaGreen;background:white;margin:0px;text-align:center';
	else if( styleCode == 'cg' ) 
		return 'border:5px solid MediumSeaGreen;background:MediumSeaGreen;margin:0px;text-align:center';
	else if( styleCode == 'lgw' ) 
		return 'border:5px solid MediumSeaGreen;background:white;margin:0px;text-align:left';
	else if( styleCode == 'lg' ) 
		return 'border:5px solid MediumSeaGreen;background:MediumSeaGreen;margin:0px;text-align:left';
	else if( styleCode == 'rg' ) 
		return 'border:5px solid MediumSeaGreen;background:MediumSeaGreen;margin:0px;text-align:right';
	else if( styleCode == 'cow' ) 
		return 'border:5px solid DarkOrange;background:white;margin:0px;text-align:center';
	else if( styleCode == 'co' ) 
		return 'border:5px solid DarkOrange;background:DarkOrange;margin:0px;text-align:center';
	else if( styleCode == 'low' ) 
		return 'border:5px solid DarkOrange;background:white;margin:0px;text-align:left';
	else if( styleCode == 'lo' ) 
		return 'border:5px solid DarkOrange;background:DarkOrange;margin:0px;text-align:left';
	else if( styleCode == 'ro' ) 
		return 'border:5px solid DarkOrange;background:DarkOrange;margin:0px;text-align:right';
	else if( styleCode == 'cyw' ) 
		return 'border:5px solid YellowGreen;background:white;margin:0px;text-align:center';
	else if( styleCode == 'cy' ) 
		return 'border:5px solid YellowGreen;background:YellowGreen;margin:0px;text-align:center';
	else if( styleCode == 'lyw' ) 
		return 'border:5px solid YellowGreen;background:white;margin:0px;text-align:left';
	else if( styleCode == 'ly' ) 
		return 'border:5px solid YellowGreen;background:YellowGreen;margin:0px;text-align:left';
	else if( styleCode == 'ry' ) 
		return 'border:5px solid YellowGreen;background:YellowGreen;margin:0px;text-align:right';
	else
		return 'border:5px solid #FFFFFF; background:white;margin:0px;text-align:left';
}

function delete_rows() 
{
	for( var variableTable = document.getElementById('variableTable');
			 variableTable.rows.length > 0;
			 variableTable.deleteRow(0) );
}

function insert_rows( imgIdx ) 
{
	var variableTable = document.getElementById( 'variableTable' );
	for ( const line of info[ imgIdx ][ IMAGE ].split('\t') )	
	{
		var row = variableTable.insertRow( variableTable.rows.length ); 
		for ( const pairOfVariableNameAndValue of line.split('$') )	
		{
			var pairOfStringAndStyle = pairOfVariableNameAndValue.split(':');
			if ( pairOfStringAndStyle.length >= 2 )
			{
				var variableNameOrValue = pairOfStringAndStyle[0];
				var styleCode = pairOfStringAndStyle[1];	

				var cell = row.insertCell();
				cell.innerHTML = "<pre style='margin:0;padding:0;'>" + variableNameOrValue + "</pre>";
				cell.style = getStyle( styleCode );
			}
		}
	}
}

function update_table( imgIdx ) 
{
	delete_rows(); 
	insert_rows( imgIdx );
}

function update_image( currentTurn )
{
	var imgIdx = currentTurn;
	for( ; ( imgIdx >= 0 ) && ( info[ imgIdx ][ IMAGE ].length < 1 ); imgIdx--);
				
	if ( ( imgIdx >= 0 ) && ( info[ imgIdx ][ IMAGE ].indexOf( "table\t" ) >= 0 ) ) 
	{
		document.getElementById( 'imageBox' ).width = 0;
		update_table( imgIdx );
	}
	else if ( imgIdx >= 0 )
	{
		var imageBox = document.getElementById( 'imageBox' );
		imageBox.src = "https://raw.githubusercontent.com/shyProgrammer351/image/main/" + info[ imgIdx ][ IMAGE ];
		imageBox.width = imageBox.naturalWidth / 2;
	}
}

function update_output( currentTurn )
{
	var strOutput = "";
	for(var idx = 0 ; idx <= currentTurn ; idx++ )
		strOutput += info[ idx ][ OUTPUT ];
	document.getElementById( "outputBox" ).innerText = strOutput ;
}

function update_sequence( currentTurn )
{
	var strSequence = "";
	for(var idx = 0 ; idx <= currentTurn ; idx++)
		strSequence += info[ idx ][ SEQUENCE ] +" ";
	document.getElementById( "sequenceBox" ).innerText = strSequence ;
}

function update_bg_color( id, mouseover )
{
	if( mouseover )
		document.getElementById( id ).style.backgroundColor = "#BBBBBB";
	else
		document.getElementById( id ).style.backgroundColor = "white";
}

function move_floatingBox( codeId )
{
	 var focusedLine = document.getElementById( codeId );
	 window.scrollTo( {left:0, top:(focusedLine.offsetTop - 200)} )
	 var floatingBox = document.getElementById( "floatingBox" );
	 floatingBox.setAttribute( "style", "top:" + focusedLine.offsetTop - ( document.body.clientHeight / 2 )  + "px; left:" + 800 + "px;");
}

const SEQUENCE = 0;
const OUTPUT = 1;
const IMAGE = 2;

function update_view( currentTurn, previousTurn )
{
	update_image( currentTurn );
	update_output( currentTurn );
	update_sequence( currentTurn );

	update_bg_color( "code" + info[ previousTurn][ SEQUENCE ], false );
	update_bg_color( "code" + info[ currentTurn ][ SEQUENCE ], true );
	move_floatingBox("code" + info[ currentTurn ][ SEQUENCE ]);
}

var timestamp = 0;
function on_key_down() 
{
	 var keycode = event.keyCode;
	 var previousTurn = timestamp;
	 // pageUp / A
	 if ( ( ( keycode == 33 ) || ( keycode == 65 ) ) && ( timestamp > 0 ) )
	 {
		timestamp--;
		update_view( timestamp, previousTurn );
	 }
	 // pageDown / D
	 else if ( ( ( keycode == 34  ) || ( keycode == 68 ) ) && ( timestamp < info.length ) )
	 {
		timestamp++;
		update_view( timestamp, previousTurn );
	 }
}
	
var timer_id;
function onTimeEvent()
{
	var previousTurn = timestamp;
	timestamp++;
	update_view( timestamp, previousTurn );
	
	// 2초후 재호출 
	if ( timestamp >= info.length )
		clearTimeout( timer_id  );
	else
		timer_id = setTimeout( "onTimeEvent()", 500 );
}
