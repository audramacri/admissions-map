# Interactive USA Map
## Synopsis

An interactive map of the United States to allowing students to find who their Admissions Counselor is and learn additional information about them. The states of Ohio, West Virginia and Pennsylvania are displayed as individual counties. Originally downloaded from <a href="https://codecanyon.net/item/interactive-svg-usa-map/1021095">Code Canyon</a> and modified for projects needs.

## Code Example

Show what the library does as concisely as possible, developers should be able to figure out **how** your project solves their problem by looking at the code example. Make sure the API you are showing off is obvious, and that your code is short and concise.

## Motivation

Create an interactive way for prospective students to find their Admissions Counselor based on location. A short description of the motivation behind the creation and maintenance of the project. This should explain **why** the project exists.

## Installation

To add the map to your website, open the index.html for the version you have chosen, and start by importing the fonts.css and map.css withing the head tag of your site:

<link href="/jscripts/counselorMap/css/style.css" rel="stylesheet" type="text/css" />
<link href="/jscripts/counselorMap/css/map.css" rel="stylesheet" type="text/css" />

Then import all the js files within the head tag as well:

<script src="/jscripts/counselorMap/js/jquery.js" type="text/javascript"></script>
<script src="/jscripts/counselorMap/js/raphael.js" type="text/javascript"></script>
<script src="/jscripts/counselorMap/js/scale.raphael.js" type="text/javascript"></script>
<script src="/jscripts/counselorMap/js/paths.js" type="text/javascript"></script>
<script src="/jscripts/counselorMap/js/init.js" type="text/javascript"></script>

Make sure to also copy and paste all these files in your website directory keeping the same structure relative to the page you want to load the map into.

Finally copy/paste the mapWrapper div and its content where you want to include the map on your page:

  <div id="container">
    
        <div class="mapWrapper">
                <div id="map"></div>
                <div id="text"></div>
        </div>
        
    </div>


## License

Raphael: Licensed under the MIT (http://raphaeljs.com/license.html) license.
JavaScript Events Library: Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
