$(function () {

    var stateNames = new Array();
    var stateURLs = new Array();
    var stateModes = new Array();
    var stateColors = new Array();
    var stateOverColors = new Array();
    var stateClickedColors = new Array();
    var stateText = new Array();
	var externalUrl = new Array();

    var offColor,
    strokeColor,
    abbrColor,
    mapWidth,
    mapHeight,
    useSideText,
    textAreaWidth,
    textAreaPadding;

    var mouseX = 0;
    var mouseY = 0;
    var current = null;

    // Detect if the browser supports ajax.
    var hasAjax = jQuery.support.ajax;

    $.ajax({
        type: 'GET',
        url: 'xml/usaMapSettings.xml',
        dataType: hasAjax ? 'xml' : 'text',
        success: function (data) {


            var xml;
            if (!hasAjax) {
                xml = new ActiveXObject('Microsoft.XMLDOM');
                xml.async = false;
                xml.loadXML(data);
            } else {
                xml = data;
            }

            var $xml = $(xml);

            offColor = '#' + $xml.find('mapSettings').attr('offColor');
            strokeColor = '#' + $xml.find('mapSettings').attr('strokeColor');
            abbrColor = '#' + $xml.find('mapSettings').attr('abbreviationColor');
            mapWidth = $xml.find('mapSettings').attr('mapWidth');
            mapHeight = $xml.find('mapSettings').attr('mapHeight');
            useSideText = $xml.find('mapSettings').attr('useSideText');
            textAreaWidth = $xml.find('mapSettings').attr('textAreaWidth');
            textAreaPadding = $xml.find('mapSettings').attr('textAreaPadding');
			textAreaHeight = $xml.find('mapSettings').attr('textAreaHeight');


            if (useSideText == 'true') {
                $("#text").css({
                    'width': parseFloat(mapWidth, 10) - parseFloat(textAreaPadding, 10)*2 + 'px',
                    'height': textAreaHeight + 'px',
                    'float': 'left',
					'marginTop': (parseFloat(mapHeight, 10) + 20) + 'px',
                    'padding': textAreaPadding + 'px'
                });

                $('#text').html($xml.find('defaultSideText').text());
            }


            //Parse xml
            $xml.find('stateData').each(function (i) {

                var $node = $(this);

                stateText.push($node.text());
                stateNames.push($node.attr('stateName'));
                stateURLs.push($node.attr('url'));
                stateModes.push($node.attr('stateMode'));
				externalUrl.push($node.attr('externalUrl'));
                stateColors.push('#' + $node.attr('initialStateColor'));
                stateOverColors.push('#' + $node.attr('stateOverColor'));
                stateClickedColors.push('#' + $node.attr('stateSelectedColor'));

            });

            createMap();
		}
    });


    function createMap() {

        //start map
        var r = new ScaleRaphael('map', 930, 590),
            attributes = {
                fill: '#d9d9d9',
                cursor: 'pointer',
                stroke: strokeColor,
                    'stroke-width': 1,
                    'stroke-linejoin': 'round',
                    'font-family': 'Verdana',
                    'font-size': '19px',
                    'font-weight': 'bold'
					
					
            },
            arr = new Array();


        var usa = {};

        usa.alabama = r.set();
        usa.alaska = r.set();
        usa.arizona = r.set();
        usa.arkansas = r.set();
        usa.california = r.set();
        usa.colorado = r.set();
        usa.connecticut = r.set();
        usa.delaware = r.set();
        usa.dc = r.set();
        usa.florida = r.set();
        usa.georgia = r.set();
        usa.hawaii = r.set();
        usa.idaho = r.set();
        usa.illinois = r.set();
        usa.indiana = r.set();
        usa.iowa = r.set();
        usa.kansas = r.set();
        usa.kentucky = r.set();
        usa.louisiana = r.set();
        usa.maine = r.set();
        usa.maryland = r.set();
        usa.massachusetts = r.set();
        usa.michigan = r.set();
        usa.minnesota = r.set();
        usa.mississippi = r.set();
        usa.missouri = r.set();
        usa.montana = r.set();
        usa.nebraska = r.set();
        usa.nevada = r.set();
        usa.newHampshire = r.set();
        usa.newJersey = r.set();
        usa.newMexixo = r.set();
        usa.newYork = r.set();
        usa.northCarolina = r.set();
        usa.northDakota = r.set();
        usa.ohio = r.set();
        usa.oklahoma = r.set();
        usa.oregon = r.set();
        usa.pennsylvenia = r.set();
        usa.rhodeIsland = r.set();
        usa.southCarolina = r.set();
        usa.southDakota = r.set();
        usa.tennessee = r.set();
        usa.texas = r.set();
        usa.utah = r.set();
        usa.vermont = r.set();
        usa.virginia = r.set();
        usa.washington = r.set();
        usa.westVirginia = r.set();
        usa.wisconsin = r.set();
        usa.wyoming = r.set();
		usa.international = r.set();
		usa.transfer = r.set();
		usa.additional = r.set();
		usa.backToAdmiss = r.set();

        var boxattrs = {
            'cursor': 'pointer',
            'fill': "#fff"
        };
        var i = 0;

        for (var state in usamappaths) {

            //Create obj
            var obj = usa[state];
            obj.attr(attributes);

            if (stateModes[i] == 'OFF') {
                boxattrs = {
                    'cursor': 'default',
                    'fill': offColor
                };
            } else {
                boxattrs = {
                    'cursor': 'pointer',
                    'fill': stateColors[i],
					stroke: strokeColor,
                    'id': i
                };
            }


            obj.push(r.path(usamappaths[state].path).attr(boxattrs));
            obj.push(r.text(usamappaths[state].textX, usamappaths[state].textY, usamappaths[state].text).attr({
                "font-family": "Arial, sans-serif",
                    "font-weight": "bold",
                    "font-size": "14",
                    "fill": abbrColor,
                    'cursor': 'pointer',
                    'z-index': 1000
            }));

            obj[0].node.id = i;
            obj[0].toBack();
            obj[1].toFront();

            obj.mouseover(function (e) {

                e.stopPropagation();

                var id = $(this.node).attr('id');

                if (stateModes[id] != 'OFF') {

                    //Animate if not already the current state
                    if (this != current) {
                        this.animate({
                            fill: stateOverColors[id]
                        }, 500);
                    }

                    //tooltip
                    $('#map').next('.point').remove();
                    $('#map').after($('<div />').addClass('point'));
                   }


            });



            obj.mouseout(function (e) {

                var id = $(this.node).attr('id');
				

                if (stateModes[id] != 'OFF') {

                    //Animate if not already the current state
                    if (this != current) {
                        this.animate({
                            fill: stateColors[id]
                        }, 500);
                    } 
					

                    $('#map').next('.point').remove();

                }
            });

            obj.mouseup(function (e) {

                var id = $(this.node).attr('id');

                if (stateModes[id] != 'OFF') {
					
                    //Reset scrollbar
                    var t = $('#text')[0];
                    t.scrollLeft = 0;
                    t.scrollTop = 0;

                    //Animate previous state out
                    if (current) {
                        var curid = $(current.node).attr('id');
                        current.animate({
                            fill: stateColors[curid]
                        }, 500);
                    }

                    //Animate next
                    this.animate({
                        fill: stateClickedColors[id]
                    }, 500);

                    current = this;
					
					  if (useSideText == 'true') {
						if(externalUrl[id] != 'undefined' && externalUrl[id] == 'true'){
							window.open(stateText[id], '_self');
						}
						else{
                           $('#text').html(stateText[id]);
						}
						
                    } else {
                        //change "_self" to "_blank" if using in WP iframe
                        window.open(stateURLs[id], '_self');
                    }
                }
            });


            i++;
        }

        resizeMap(r);

    }



    // Set up for mouse capture
    if (document.captureEvents && Event.MOUSEMOVE) {
        document.captureEvents(Event.MOUSEMOVE);
    }

    // Main function to retrieve mouse x-y pos.s

    function getMouseXY(e) {

        var scrollTop = $(window).scrollTop();

        if (e && e.pageX) {
            mouseX = e.pageX;
            mouseY = e.pageY - scrollTop;
        } else {
            mouseX = event.clientX + document.body.scrollLeft;
            mouseY = event.clientY + document.body.scrollTop;
        }
        // catch possible negative values
        if (mouseX < 0) {
            mouseX = 0;
        }
        if (mouseY < 0) {
            mouseY = 0;
        }

        $('#map').next('.point').css({
            left: mouseX - 50,
            top: mouseY - 70
        })
    }

    // Set-up to use getMouseXY function onMouseMove
    document.body.onmousemove = getMouseXY;


    function resizeMap(paper) {

        paper.changeSize(mapWidth, mapHeight, true, false);

        if (useSideText == 'true') {
            $(".mapWrapper").css({
                'width': parseFloat(mapWidth, 10) + 'px',
                    'height': mapHeight + 'px'
            });
        } else {
            $(".mapWrapper").css({
                'width': mapWidth + 'px',
                    'height': mapHeight + 'px'
            });
        }

    }



});