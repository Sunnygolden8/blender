var callCount = 1000;
var key = 'AIzaSyBi-7Mphqp8TjX5KhYE-r-rGRYByt_3qZk';
var minPrice = 0;
var maxPrice = 4;
var response = "";

Meteor.methods({
  pullPlaces: function(location, token){
    if (token !== null) {
      response = HTTP.call("GET", "https://maps.googleapis.com/maps/api/place/nearbysearch/json?",
        {params:
          {
            key: key,
            pagetoken: token
          }
        }
      );
    } else {
      response = HTTP.call("GET", "https://maps.googleapis.com/maps/api/place/nearbysearch/json?",
        {params:
          {
            key: key,
            location: location.lat+","+location.lng,
            rankby: 'distance',
            minPrice: minPrice,
            maxPrice: maxPrice,
            types: "food|restaurant|point_of_interest|meal_takeaway|establishment",
            keyword: "fast food"
          }
        }
      );
    }
    token = response.data.next_page_token;
    var data = response.data.results;
    for (var i = 0; i < data.length; i++) {
      _.extend(data[i], {loc: {type: "Point", coordinates: [data[i].geometry.location.lng, data[i].geometry.location.lat]}});
      _.extend(data[i], {lastAccessed: Date.now()});
      Places.upsert({place_id: data[i].place_id}, {$set: data[i]});
    }

    if (token !== undefined && token !== null) {
      Meteor.setTimeout(function(){
        Meteor.call("pullPlaces", location, token);
      }, 2000);
    }
  },
  measureDistance: function(lat1, lon1, lat2, lon2){
    // TODO: Make this work
    // this.unblock();
    // Formula found at: http://www.movable-type.co.uk/scripts/latlong.html
    // gives distance in meters
    return Math.acos( Math.sin(lat1 * (Math.PI / 180))*Math.sin(lat2 *
      (Math.PI / 180)) + Math.cos(lat1 * (Math.PI / 180))*Math.cos(lat2 *
        (Math.PI / 180)) * Math.cos((lon2-lon1) * (Math.PI / 180)) ) * 6371000;
    // console.log(d / 1000);
    // return d;
  }
});
