Session.setDefault('counter', 0);

// Template.hello.helpers({
//   counter: function () {
//     return Session.get('counter');
//   }
// });
//
// Template.hello.events({
//   'click button': function () {
//     // increment the counter when button is clicked
//     Session.set('counter', Session.get('counter') + 1);
//   }
// });

Template.map.helpers({

});

Template.map.events({

});

Template.map.rendered = function(){
  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
  var map = L.map(('map'), //'map' from the map.html
  {
    doubleClickZoom: false,
    touchZoom: false
  }).setView([50.5, 30.5], 13);
  L.tileLayer.provider('OpenMapSurfer.Roads').addTo(map);
  // map.spin(true);
  // add marker to map
  var marker = L.marker([50.5, 30.5]).addTo(map);
  // wrapping node for bindPopup
  var containerNode = document.createElement('div');
  // Which template to use for the popup? Some data for it, and attach it to node
  Blaze.renderWithData(Template.popup, dataContext, containerNode);
  // Finally bind the containerNode to the popup
  marker.bindPopup(containerNode).openPopup();

  //record the location of the marker 
  map.on("click", function(e){
    console.log(e.latlng);
  });
};
