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
		function onAuth(p,user) {
            EVT_CURRENT.user = user.mail;
			if (user.profiles.indexOf('ADMIN')>-1) Ext.getCmp('MNU_ADMIN').setVisible(true);
			App.get('Menu#MenuPanel').update();
            var o = {
                Mail: EVT_CURRENT.user,
            };
			App.get("mainform combo#selectAgent").setValue(0);
            App.reservation.getInfo(o, function(err, result) {	
                numLogin = result.result.data[0].Id;
                EVT_CURRENT.numLogin = numLogin;
                App.get('schedulergrid#schedule').getEventStore().load();
            });

            var now = new Date();
            App.get('schedulergrid#schedule').getResourceStore().getProxy().extraParams._cfg = 0;
            App.get('schedulergrid#schedule').getResourceStore().load();
			App.get('schedulergrid#schedule').getResourceStore().on('load',function() {
				alert('bravo');
			});
		
		};
		
		Auth.login(function(user) {
			onAuth(p, user);
		});
	}
	
	
});
