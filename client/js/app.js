App = Ember.Application.create({});

App.Store = DS.Store.extend({
	revision:12,
	adapter: Auth.RESTAdapter
});

App.IndexController = Ember.ArrayController.extend({
  content: [],
  query : "Add some values to playlist"
});


App.TextField = Ember.TextField.extend({
	keyUp : function() {
		this._super();
		var query = this.get("value"),
			controller = this.get("controller");
			
		$.getJSON('http://ws.spotify.com/search/1/track.json?q='+ query, function(data) {
			controller.set("content", data["tracks"]);
		});
	}
});

var attr = DS.attr;

App.Playlist = DS.Model.extend({
	name : attr("string")
});

App.Track = DS.Model.extend({
	album : attr("raw"),
	name : attr("string"),
	popularity : attr("string"),
	href : attr("string"),
	artists : attr("raw") 
});

DS.RESTAdapter.registerTransform('raw', {
    deserialize: function(serialized) {
        return serialized;
    },  
    serialize: function(deserialized) {
        return deserialized;
    }   
});