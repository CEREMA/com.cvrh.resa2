App.controller.define('CMain', {

	views: [
		"VMain"
	],
	
	models: [
		"TreeModel"
	],
	
	init: function()
	{

		this.control({
			"menu>menuitem": {
				click: "Menu_onClick"
			}
		});
		
		App.init('VMain',this.onLoad);
		
	},
	Menu_onClick: function(p)
	{
		if (p.itemId) {
			Ext.Msg.alert('Status', 'Click event on '+p.itemId);
		};			
	},
	onLoad: function()
	{
		
	}
	
	
});
