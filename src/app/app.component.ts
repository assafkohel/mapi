import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var govmap: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Assaf Kohel Assignment';

  // holds all menu's layers
  allLayers: Array<string>=[];

  constructor(private http:HttpClient){}

  ngOnInit(){
    this.initiateMap();    
  }

  // initiate map function
  initiateMap()
  {
    // gets all layers from mapi server and adding them to layers array
    this.http.post<any>("https://ags.govmap.gov.il/Layers/GetTocLayers",{}).subscribe(data => 
    {
        var dataLayers =  data['data']['שכבות ממשלה ומוסדות ציבור']['layers'];
        for (var layer in dataLayers) {
          this.allLayers.push(layer);
        }

        // init map params
        govmap.createMap('map', 
        {
          onClick: function (e)
          {//showResult(e);
          },
          onPan: function (e)
          {//showResult(e);            
          },
          // token I got from GOVMAP
          token: 'AIzaSyD4XqMPyJcZ2pdOhj_cmcy5wbWGmhWF5yk',
          layers: this.allLayers,
          showXY: true,
          identifyOnClick: true,
          isEmbeddedToggle: false,
          background: "1",
          layersMode: 1,
          zoomButtons:false
        });
    });
  }
  
}
