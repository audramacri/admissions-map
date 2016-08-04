//This file sets the variable names for Ohio Counties

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
        url: 'xml/OhioCounties.xml',
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

// Set Variable names for ohio counties
        var usa = {};
        usa.adams = r.set();
        usa.allen = r.set();
        usa.ashland = r.set();
        usa.ashtabula = r.set();
        usa.athens = r.set();
        usa.auglaize = r.set();
        usa.belmont = r.set();
        usa.brown = r.set();
        usa.butler = r.set();
        usa.carroll = r.set();
        usa.champaign = r.set();
        usa.clark = r.set();
        usa.clemont = r.set();
        usa.clinton = r.set();
        usa.cochocton = r.set();
        usa.columbiana = r.set();
        usa.crawford = r.set();
        usa.cuyahoga = r.set();
        usa.darke = r.set();
        usa.defiance = r.set();
        usa.delaware = r.set();
        usa.erie = r.set();
        usa.fairfield = r.set();
        usa.fayette = r.set();
        usa.franklin = r.set();
        usa.fulton = r.set();
        usa.gallia = r.set();
        usa.geauga = r.set();
        usa.greene = r.set();
        usa.guernsey = r.set();
        usa.hamilton = r.set();
        usa.hancock = r.set();
        usa.hardin = r.set();
        usa.harrison = r.set();
        usa.henry = r.set();
        usa.highland = r.set();
        usa.hocking = r.set();
        usa.holmes = r.set();
        usa.huron = r.set();
        usa.jackson = r.set();
        usa.jefferson = r.set();
        usa.knox = r.set();
        usa.lake = r.set();
        usa.lawrence = r.set();
        usa.licking = r.set();
        usa.logan = r.set();
        usa.lorain = r.set();
        usa.lucas = r.set();
        usa.madison = r.set();
        usa.mahoning = r.set();
        usa.marion = r.set();
	usa.medina = r.set();
	usa.meigs = r.set();
	usa.mercer = r.set();
	usa.miami = r.set();
	usa.monroe = r.set();
	usa.montgomery = r.set();
	usa.morgan = r.set();
	usa.morrow = r.set();
	usa.muskingum = r.set();
	usa.noble = r.set();
	usa.ottawa = r.set();
	usa.paulding = r.set();
	usa.perry = r.set();
	usa.pickaway = r.set();
	usa.pike = r.set();
	usa.portage = r.set();
	usa.preble = r.set();
	usa.putnam = r.set();
	usa.richland = r.set();
	usa.ross = r.set();
	usa.sandusky = r.set();
	usa.scioto = r.set();
	usa.seneca = r.set();
	usa.shelby = r.set();
	usa.stark = r.set();
	usa.summit = r.set();
	usa.trumbull = r.set();
	usa.tuscarawas = r.set();
	usa.union = r.set();
	usa.vanwert = r.set();
	usa.vinton = r.set();
	usa.warren = r.set();
	usa.washington = r.set();
	usa.wayne = r.set();
	usa.williams = r.set();
	usa.wood = r.set();
	usa.wyandot = r.set();
	usa.map = r.set();
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
