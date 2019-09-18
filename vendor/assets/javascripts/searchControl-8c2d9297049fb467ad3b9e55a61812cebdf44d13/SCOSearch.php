<?php if(empty($_REQUEST["streetAddress"]) && empty($_REQUEST["gazetteer"]) && empty($_REQUEST["county"]) && empty($_REQUEST["cityTownVillage"]) && empty($_REQUEST["township"]) && empty($_REQUEST["range"]) && empty($_REQUEST["dir"]) && empty($_REQUEST["sec"]) && empty($_REQUEST["quad"])): ?>

<!-- 
The purpose of this API is to return a latitude and longitude and/or a bounding box for a requested feature when searched.  The search parameters are given to the API, which in turn
queries an external service.  The API then interprets the result from that service, and returns a formatted response to the orignal requestee.
Written by: Joe Marks 
-->

    <!-- Only include hmtl content if there was no search request -->
    <!DOCTYPE HTML>  
    <html>
    <head>
    <title>Coordinates Search</title>
    <link href='https://dev.sco.wisc.edu/searchControl/Joe/searchControl/SCOSearch.css' rel="stylesheet" type="text/css"/>
    <style>
    .error {color: #FF0000;}
    </style>
    </head>
    <body>  



    <html>
    <table width="100%" class="userTable">
    <tr>
    <!-- <td class="titlecell">
    Coordinates Search
    </td> -->
    <td align="right">
    
        
    
    </td>
    </tr>
    </table>
    <table width="100%" class="navTable">
    <tr valign="top">
    <!-- <td class="breadcrumbs">
    <a href="/arcgis/rest/services">Home</a>






    &gt; <a href="/arcgis/rest/services">services</a>
    
    &gt; <a href="/arcgis/rest/services/Cadastral">Cadastral</a>
    
    &gt; <a href="/arcgis/rest/services/Cadastral/BLM_Natl_PLSS_CadNSDI/MapServer">BLM_Natl_PLSS_CadNSDI (MapServer)</a>
    
    &gt; <a href="/arcgis/rest/services/Cadastral/BLM_Natl_PLSS_CadNSDI/MapServer/exts/CadastralSpecialServices">CadastralSpecialServices</a>
    
    &gt; <a href="/arcgis/rest/services/Cadastral/BLM_Natl_PLSS_CadNSDI/MapServer/exts/CadastralSpecialServices/GetLatLon"><i>GetLatLon</i></a>
    
    </td> -->
    <td align="right">
    <a href="" target="_blank">Help</a> | <a href="https://dev.sco.wisc.edu/searchControl/Joe/searchControl/apireference.html" target="_blank">API Reference</a>
    </td>
    </tr>
    </table>



    <h2>Coordinates Search</h2>

    <div class="rbody">




    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">

    <table class="formTable">

    <tr valign="top">
        <td><label for="streetAddress">Single Line Address</label></td>
        <td>
        <textarea id="streetAddress" name="streetAddress" rows="3" cols="50"></textarea>
        </td>
    </tr>
    
    <tr valign="top">
        <td><label for="gazetteer">Gazetteer Search</label></td>
        <td>
        <textarea id="gazetteer" name="gazetteer" rows="3" cols="50"></textarea>
        </td>
    </tr>

    <tr>
        <td><label for="county">WI County Search</label></td>
        <td>
        <select id="county" name="county">

            <option selected disabled>Choose a county</option><option>Adams</option><option>Ashland</option><option>Barron</option><option>Bayfield</option><option>Brown</option><option>Buffalo</option><option>Burnett</option><option>Calumet</option><option>Chippewa</option><option>Clark</option><option>Columbia</option><option>Crawford</option><option>Dane</option><option>Dodge</option><option>Door</option><option>Douglas</option><option>Dunn</option><option>Eau Claire</option><option>Florence</option><option>Fond du Lac</option><option>Forest</option><option>Grant</option><option>Green</option><option>Green Lake</option><option>Iowa</option><option>Iron</option><option>Jackson</option><option>Jefferson</option><option>Juneau</option><option>Kenosha</option><option>Kewaunee</option><option>La Crosse</option><option>Lafayette</option><option>Langlade</option><option>Lincoln</option><option>Manitowoc</option><option>Marathon</option><option>Milwaukee</option><option>Monroe</option><option>Oconto</option><option>Oneida</option><option>Outagamie</option><option>Ozaukee</option><option>Pepin</option><option>Pierce</option><option>Polk</option><option>Portage</option><option>Price</option><option>Racine</option><option>Richland</option><option>Rock</option><option>Rusk</option><option>Sauk</option><option>Sawyer</option><option>Shawano</option><option>Sheboygan</option><option>St. Croix</option><option>Taylor</option><option>Trempealeau</option><option>Vernon</option><option>Vilas</option><option>Walworth</option><option>Washburn</option><option>Washington</option><option>Waukesha</option><option>Waupaca</option><option>Waushara</option><option>Winnebago</option><option>Wood</option>
        
        </select>
        </td>
    </tr>

    <tr valign="top">
        <td><label for="cityTownVillage">City, Town, or Village Search</label></td>
        <td>
        <textarea id="cityTownVillage" name="cityTownVillage" rows="3" cols="50"></textarea>
        </td>
    </tr>

    <tr>
        <td><label for="plss">PLSS Search</label></td>
        <td>
        <select id="township" name="township">

            <option selected disabled>Town</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option><option>32</option><option>33</option><option>34</option><option>35</option><option>36</option><option>37</option><option>38</option><option>39</option><option>40</option><option>41</option><option>42</option><option>43</option><option>44</option><option>45</option><option>46</option><option>47</option><option>48</option><option>49</option><option>50</option><option>51</option><option>52</option><option>53</option>
        
        </select>
            <select id="range" name="range">

            <option selected disabled>Range</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option>
        
        </select>

            <select id="dir" name="dir">

            <option selected disabled>Dir</option><option>E</option><option>W</option>

        </select>
        </td>
        
    </tr>

    <tr>
        <td><label for="plsss">PLSS Section Search</label></td>
        <td>
            <select id="township" name="township">

                <option selected disabled>Town</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option><option>32</option><option>33</option><option>34</option><option>35</option><option>36</option><option>37</option><option>38</option><option>39</option><option>40</option><option>41</option><option>42</option><option>43</option><option>44</option><option>45</option><option>46</option><option>47</option><option>48</option><option>49</option><option>50</option><option>51</option><option>52</option><option>53</option>
        
            </select>
                <select id="range" name="range">

                <option selected disabled>Range</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option>
        
            </select>

            <select id="dir" name="dir">

                <option selected disabled>Dir</option><option>E</option><option>W</option>

            </select>

            <select id="sec" name="sec">

                <option selected disabled>Sec</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option><option>32</option><option>33</option><option>34</option><option>35</option><option>36</option>

            </select>
        </td>
        
    </tr>
    

    <!-- <tr>
        <td><label for="f">Format (f)</label></td>
        <td>
        <select id="f" name="f">
        
            <option value="pjson" selected="true">json</option>
            
            <option value="html" >html</option>
            
        </select>
        </td>
    </tr> -->
    
    <tr>
    <td colspan="2">
        
        <input type="submit" value="Submit (GET)" />
        
        <input type="submit" value="Submit (POST)" onclick="this.form.method = 'POST';" />

    </td>
    </tr>
    </table>
    <!-- <input type="hidden" name="__ncforminfo" value="7g8qnE6mZtC2O8_LGKBmCs3uvMY8d1H7DNzFvSu3KybbJ4jBR97hMxWmF6QHWyKyKjtjzw1MBsf6mSOq3Z6rPCEvSKfIYTZDZ7zWCJDXFTyk2Bsp306BPg=="/></form> -->

    <br/><br/>



    </div>

    <br/><br/>
    </html>
<?php endif; ?>


<?php

$county_table = 'wi_county_bnds';
$municipal_table = 'scobase_wi_municipal_boundaries_spring_2019';
$plss_table = 'twpppoly';
$plss_sec_table = 'scobase_wi_plss_sections_24k';
$quad_table = 'wi_usgs_24k_quad';

// In the case of street address
if (!empty($_REQUEST["streetAddress"])) {

    // get the street address parameter from URL
    $streetAddress = $_REQUEST["streetAddress"];

        // Contruct address search url
        // $geocodeURL = "https://mapservices.legis.wisconsin.gov/arcgis/rest/services/Foundational/Address_Points_2018/GeocodeServer/findAddressCandidates?singleLine="
        $geocodeURL = "https://geolocator.legis.wisconsin.gov/api/Locate/locateAddress?singlelineaddress=";
        $geocodeURL .= $streetAddress;
        $geocodeURL .= "&accesskey=12345&runsmarty=true&nopip=false";
        $geocodeURL = str_replace(" ","%20", $geocodeURL);
    
        // Perform web query
        $data = webQuery($geocodeURL);
    
        // Create empty results object
        // $results->rows = [];   
        $results = new stdClass();
        
        // For each returned result
        for ($i=0; $i<(count($data->results)); $i++){
    
            // Check if result is in Wisconsin
            if($data->results[$i]->matchAddress->state == "WI"){
    
                // Save coordinates
                $coordinates = [$data->results[$i]->coordinates->LAT, $data->results[$i]->coordinates->LON];
    
                // Create a display name
                if($data->results[$i]->matchAddress->AddressLine == null){
                    // For now, if the address is not specific enough, just ignore it
                    break;
                    // if($data->results[$i]->mcdInfo->CNTY_NAME != null){
                    //     $display_name = ucwords(strtolower($data->results[$i]->mcdInfo->CNTY_NAME)) . " County, " . $data->results[$i]->matchAddress->LastLine; 
                    // }else{
                    //     $display_name = $data->results[$i]->matchAddress->LastLine; 
                    // }
                }else{
                    $display_name = $data->results[$i]->matchAddress->AddressLine . " " . $data->results[$i]->matchAddress->LastLine; 
                }
    
                // Create result object
                $result = new stdClass();
                // Add display name
                $result->display_name = $display_name;
                // Add coordinates
                $result->coordinates = $coordinates;
    
                if(!isset($results->rows[0])){
                    $results->rows[] = $result;
                }else{
                    // Push result to results array
                    array_push($results->rows, $result);
                }
    
            }
    
        } // End for loop

        // Add search type
        $results->searchType = 'streetAddress';
    
        // Echo result
        echo json_encode($results);

}

// In the case of gazetteer
if (!empty($_REQUEST["gazetteer"])) {

    // get the gazetteer parameter from URL
    $gazetteer = $_REQUEST["gazetteer"];

    // Contruct gazetteer search url
    // Search only for results within the bounding box of Wisconsin
    $geocodeURL = "https://nominatim.openstreetmap.org/search?format=json&limit=5&viewbox=-92.8893%2C42.4919%2C-86.8052%2C47.0808&bounded=1&q=";
    $geocodeURL .= $gazetteer;
    $geocodeURL = str_replace(" ","%20", $geocodeURL);

    // Perform web query
    $data = webQuery($geocodeURL);

    // Create empty results object
    $results = new stdClass();

    // In this case, data is returned as an array of objects
    // For each result
    for ($i=0; $i<(count($data)); $i++){

        // Check if result is in Wisconsin proper
        $parsedName = explode(",",$data[$i]->display_name);
        if(in_array(" Wisconsin",$parsedName)){ // put in check for WI

            // Access the bounding box
            $box = $data[$i]->boundingbox;
            $cor1 = [$box[0],$box[2]];
            $cor2 = [$box[1],$box[3]];

            // Save the corners to an object
            $bbox = new stdClass();
            $bbox->sw = $cor1;
            $bbox->ne = $cor2;

            // Create a display name
            $display_name = $data[$i]->display_name;

            // Create result object
            $result = new stdClass();
            // Add display name
            $result->display_name = $display_name;
            // Add bounding box
            $result->bbox = $bbox;
            // Add coordinates
            $result->coordinates = [$data[$i]->lat,$data[$i]->lon];

            if(!isset($results->rows[0])){
                $results->rows[] = $result;
            }else{
                // Push result to results array
                array_push($results->rows, $result);
            }
        }

    }

    // Add search type
    $results->searchType = 'gazetteer';

    // Echo result
    echo json_encode($results);

}


// In the case of county
if (!empty($_REQUEST["county"])) {

    // Get the county parameter from URL
    $county = str_replace(" ","%20",strtoupper($_REQUEST["county"]));

    // Contruct county search url for carto
    $cartoURL = "sco-admin.carto.com/api/v2/sql?q=SELECT%20box2d(the_geom)%20as%20bbox%20FROM%20".$county_table."%20WHERE%20county_nam%20=%20%27";
    $cartoURL .= $county; 
    $cartoURL .= "%27";

    // Perform web query
    $data = webQuery($cartoURL);

    // Create empty results object
    // $results->rows = [];    
    $results = new stdClass();    

    // Access the bounding box
    $box = $data->rows[0]->bbox;
    // Split into two corners
    $box = explode(",",$box);
    $cor1 = $box[0];
    $cor2 = $box[1];

    // Isolate the coordinates from the string
    $cor1 = explode("(",$cor1)[1];
    $cor1 = trim($cor1);
    $cor1 = explode(" ",$cor1);

    $cor2 = explode(")",$cor2)[0];
    $cor2 = trim($cor2);
    $cor2 = explode(" ",$cor2);

    // Convert from string to float and reverse ordering of coordinates
    $x = floatval($cor1[0]);
    $cor1[0] = floatval($cor1[1]);
    $cor1[1] = $x;

    $x = floatval($cor2[0]);
    $cor2[0] = floatval($cor2[1]);
    $cor2[1] = $x;

    // Save the corners to an object
    $bbox = new stdClass();
    $bbox->sw = $cor1;
    $bbox->ne = $cor2;

    // Create a display name

    // Get county name and convert to title case
    $display_name = ucwords(strtolower($county));

    // Create result object
    $result = new stdClass();
    // Add display name
    $result->display_name = $display_name;
    // Add bounding box
    $result->bbox = $bbox;


    $results->rows[] = $result;

    // Add search type
    $results->searchType = 'county';

    // Echo result
    echo json_encode($results);
}

// In the case of cityTownVillage
if (!empty($_REQUEST["cityTownVillage"])) {

    // get the cityTownVillage parameter from URL and convert to uppercase and title case and replace spaces with '%20'
    $cityTownVillageTitle = str_replace(" ","%20",ucwords(strtolower($_REQUEST["cityTownVillage"])));
    $cityTownVillageUpper = str_replace(" ","%20",strtoupper($_REQUEST["cityTownVillage"]));

    // Construct the query with upper case name and title case name
    $cartoURL = "sco-admin.carto.com/api/v2/sql?q=SELECT%20box2d(the_geom)%20as%20bbox,%20mcd_name,%20ctv,%20cnty_name%20FROM%20".$municipal_table."%20WHERE%20mcd_name%20LIKE%20%27%25";
    $cartoURL .= $cityTownVillageTitle; 
    $cartoURL .= "%25%27%20OR%20mcd_name%20LIKE%20%27%25";
    $cartoURL .= $cityTownVillageUpper;
    $cartoURL .= "%25%27";

    // Perform web query
    $data = webQuery($cartoURL);

    // Create empty results object
    // $results->rows[] = null;
    $results = new stdClass();

    // For each returned result
    for($i=0; $i<$data->total_rows; $i++){

        // Access the bounding box
        $box = $data->rows[$i]->bbox;
        // Split into two corners
        $box = explode(",",$box);
        $cor1 = $box[0];
        $cor2 = $box[1];

        // Isolate the coordinates from the string
        $cor1 = explode("(",$cor1)[1];
        $cor1 = trim($cor1);
        $cor1 = explode(" ",$cor1);

        $cor2 = explode(")",$cor2)[0];
        $cor2 = trim($cor2);
        $cor2 = explode(" ",$cor2);

        // Convert from string to float and reverse ordering of coordinates
        $x = floatval($cor1[0]);
        $cor1[0] = floatval($cor1[1]);
        $cor1[1] = $x;

        $x = floatval($cor2[0]);
        $cor2[0] = floatval($cor2[1]);
        $cor2[1] = $x;

        // Save the corners to an object
        $bbox = new stdClass();
        $bbox->sw = $cor1;
        $bbox->ne = $cor2;

        // Calculate coordinates
        $coordinates = [(($cor1[0]+$cor2[0])/2),(($cor1[1]+$cor2[1])/2)];

        // Create a display name

        // Get mcd name and convert to title case
        $display_name = ucwords(strtolower($data->rows[$i]->mcd_name));
        // Add Town, village, or city
        if($data->rows[$i]->ctv == 'T'){
            $display_name .= ' Town, ';
        } else if ($data->rows[$i]->ctv == 'V'){
            $display_name .= ' Village, ';
        } else if ($data->rows[$i]->ctv == 'C'){
            $display_name .= ' City, ';
        }
        // Add the county name
        $display_name .= $data->rows[$i]->cnty_name;
        $display_name .= ' County';

        // Create result object
        $result = new stdClass();
        // Add display name
        $result->display_name = $display_name;
        // Add bounding box
        $result->bbox = $bbox;
        // Add coordinates
        $result->coordinates = $coordinates;

        if(!isset($results->rows[0])){
            $results->rows[] = $result;
        }else{
            // Push result to results array
            array_push($results->rows, $result);
        }

    }

    // Add search type
    $results->searchType = 'municipality';

    // Echo result
    echo json_encode($results);
}

// In the case of township, range, and dir but not sec
if (!empty($_REQUEST["township"]) && !empty($_REQUEST["range"]) && !empty($_REQUEST["dir"]) && (empty($_REQUEST["sec"]))) {

    // Get the variables
    $township = $_REQUEST["township"];
    $range = $_REQUEST["range"];
    $dir = $_REQUEST["dir"];

    // Construct the URL
    $cartoURL = "sco-admin.carto.com/api/v2/sql?q=SELECT%20box2d(the_geom)%20as%20bbox%20FROM%20".$plss_table."%20WHERE%20twp%20=%20%27";
    $cartoURL .= $township;
    $cartoURL .= "%27%20AND%20rng%20=%20%27";
    $cartoURL .= $range;
    $cartoURL .= "%27%20AND%20dirchar%20=%20%27";
    $cartoURL .= $dir;
    $cartoURL .= "%27";

    // Perform web query
    $data = webQuery($cartoURL);

    // Create empty results object
    // $results->rows = [];
    $results = new stdClass();

    // Check that we got a result
    if($data->total_rows > 0) {

        // Access the bounding box
        $box = $data->rows[0]->bbox;
        // Split into two corners
        $box = explode(",",$box);
        $cor1 = $box[0];
        $cor2 = $box[1];

        // Isolate the coordinates from the string
        $cor1 = explode("(",$cor1)[1];
        $cor1 = trim($cor1);
        $cor1 = explode(" ",$cor1);

        $cor2 = explode(")",$cor2)[0];
        $cor2 = trim($cor2);
        $cor2 = explode(" ",$cor2);

        // Convert from string to float and reverse ordering of coordinates
        $x = floatval($cor1[0]);
        $cor1[0] = floatval($cor1[1]);
        $cor1[1] = $x;

        $x = floatval($cor2[0]);
        $cor2[0] = floatval($cor2[1]);
        $cor2[1] = $x;

        // Save the corners to an object
        $bbox = new stdClass();
        $bbox->sw = $cor1;
        $bbox->ne = $cor2;

        // Create a display name

        // Get county name and convert to title case
        $display_name = "WI 46 T".$township."N R".$range.$dir;

        // Create result object
        $result = new stdClass();
        // Add display name
        $result->display_name = $display_name;
        // Add bounding box
        $result->bbox = $bbox;


        $results->rows[] = $result;

    }

    // Add search type
    $results->searchType = 'PLSS';

    // Echo result
    echo json_encode($results);
        
}

// In the case of township, range dir, and sec
if (!empty($_REQUEST["township"]) && !empty($_REQUEST["range"]) && !empty($_REQUEST["dir"]) && (!empty($_REQUEST["sec"]))) {

    // Get the variables
    $township = $_REQUEST["township"];
    $range = $_REQUEST["range"];
    $dirchar = $_REQUEST["dir"];
    $sec = $_REQUEST["sec"];

    // Get corresponding direction number
    $dir;
    if($dirchar == 'W'){
        $dir = 2;
    }else if ($dirchar == 'E'){
        $dir = 4;
    }

    // Construct the URL
    $cartoURL = "sco-admin.carto.com/api/v2/sql?q=SELECT%20box2d(the_geom)%20as%20bbox%20FROM%20".$plss_sec_table."%20WHERE%20twp%20=%20%27";
    $cartoURL .= $township;
    $cartoURL .= "%27%20AND%20rng%20=%20%27";
    $cartoURL .= $range;
    $cartoURL .= "%27%20AND%20dir%20=%20%27";
    $cartoURL .= $dir;
    $cartoURL .= "%27%20AND%20sec%20=%20%27";
    // $cartoURL .= "SEC%20"
    $cartoURL .= $sec;
    $cartoURL .= "%27";

    // Perform web query
    $data = webQuery($cartoURL);

    // Create empty results object
    // $results->rows = [];
    $results = new stdClass();

    // Check that we got a result
    if($data->total_rows > 0) {

        // Access the bounding box
        $box = $data->rows[0]->bbox;
        // Split into two corners
        $box = explode(",",$box);
        $cor1 = $box[0];
        $cor2 = $box[1];

        // Isolate the coordinates from the string
        $cor1 = explode("(",$cor1)[1];
        $cor1 = trim($cor1);
        $cor1 = explode(" ",$cor1);

        $cor2 = explode(")",$cor2)[0];
        $cor2 = trim($cor2);
        $cor2 = explode(" ",$cor2);

        // Convert from string to float and reverse ordering of coordinates
        $x = floatval($cor1[0]);
        $cor1[0] = floatval($cor1[1]);
        $cor1[1] = $x;

        $x = floatval($cor2[0]);
        $cor2[0] = floatval($cor2[1]);
        $cor2[1] = $x;

        // Save the corners to an object
        $bbox = new stdClass();
        $bbox->sw = $cor1;
        $bbox->ne = $cor2;

        // Create a display name

        // Get county name and convert to title case
        $display_name = "WI 46 T".$township."N R".$range.$dirchar." SEC ".$sec;

        // Create result object
        $result = new stdClass();
        // Add display name
        $result->display_name = $display_name;
        // Add bounding box
        $result->bbox = $bbox;


        $results->rows[] = $result;

    }

    // Add search type
    $results->searchType = 'PLSS-Section';

    // Echo result
    echo json_encode($results);
        
}


// In the case of quad
if (!empty($_REQUEST["quad"])) {


    // Get the variables
    $quad = $_REQUEST["quad"];

    // Construct the URL
    $cartoURL = "sco-admin.carto.com/api/v2/sql?q=SELECT%20box2d(the_geom)%20as%20bbox%20FROM%20".$quad_table."%20WHERE%20usgs_qd_id%20=%20%27";
    $cartoURL .= $quad;
    $cartoURL .= "%27";

    // $cartoURL = str_replace("-","%2D", $cartoURL);

    // Perform web query
    $data = webQuery($cartoURL);

    // Create empty results object
    $results = new stdClass();

    // Check that we got a result
    if($data->total_rows > 0) {

        // Access the bounding box
        $box = $data->rows[0]->bbox;
        // Split into two corners
        $box = explode(",",$box);
        $cor1 = $box[0];
        $cor2 = $box[1];

        // Isolate the coordinates from the string
        $cor1 = explode("(",$cor1)[1];
        $cor1 = trim($cor1);
        $cor1 = explode(" ",$cor1);

        $cor2 = explode(")",$cor2)[0];
        $cor2 = trim($cor2);
        $cor2 = explode(" ",$cor2);

        // Convert from string to float and reverse ordering of coordinates
        $x = floatval($cor1[0]);
        $cor1[0] = floatval($cor1[1]);
        $cor1[1] = $x;

        $x = floatval($cor2[0]);
        $cor2[0] = floatval($cor2[1]);
        $cor2[1] = $x;

        // Save the corners to an object
        $bbox = new stdClass();
        $bbox->sw = $cor1;
        $bbox->ne = $cor2;

        // Create a display name

        // Get county name and convert to title case
        $display_name = $quad;

        // Create result object
        $result = new stdClass();
        // Add display name
        $result->display_name = $display_name;
        // Add bounding box
        $result->bbox = $bbox;


        $results->rows[] = $result;

    }

    // Add search type
    $results->searchType = 'usgs_24k_quad';

    // Echo result
    echo json_encode($results);

}


function webQuery ($url) {
    try {

        // Initialize cURL
        $ch = curl_init();

        //Set the URL that you want to GET by using the CURLOPT_URL option.
        curl_setopt($ch, CURLOPT_URL, $url);

        // Set CURLOPT_RETURNTRANSFER so that the content is returned as a variable.
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Set CURLOPT_FOLLOWLOCATION to true to follow redirects.
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

        curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:59.0) Gecko/20100101 Firefox/59.0");

        //Execute the request.
        $data = curl_exec($ch);

        // Check the return value of curl_exec(), too
        if ($data === false) {
            // throw new Exception(curl_error($ch), curl_errno($ch));
            echo(curl_error($ch));
            echo(curl_errno($ch));
        }

        // Decode the returned json string into an object we can use in PHP
        $data = json_decode($data);

        //Close the cURL handle.
        curl_close($ch);

    } catch(Exception $e) {

        trigger_error(sprintf(
            'Curl failed with error #%d: %s',
            $e->getCode(), $e->getMessage()),
            E_USER_ERROR);

    }

    // Return the data (object)
    return $data;
}

?>

<?php if(empty($_REQUEST["streetAddress"]) && empty($_REQUEST["gazetteer"]) && empty($_REQUEST["county"]) && empty($_REQUEST["cityTownVillage"]) && empty($_REQUEST["townshipSCO"]) && empty($_REQUEST["range"]) && empty($_REQUEST["dir"]) && empty($_REQUEST["sec"]) && empty($_REQUEST["quad"])) : ?>


</body>
</html>

<?php endif; ?>