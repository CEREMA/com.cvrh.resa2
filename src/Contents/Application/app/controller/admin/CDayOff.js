App.controller.define('admin.CDayOff', {

	views: [
		"admin.VDayOff"
	],
	
	models: [
		
	],
	
	init: function()
	{

		this.control({
            "TAdminJF button#del_jf": {
				click: "do_del_jf"
			},
			"TAdminJF button#rec_jf": {
				click: "do_rec_jf"
			},
			"TAdminJF grid#jf": {
				itemclick: "do_select_jf"
			},
			"TAdminJF button#new_jf": {
				click: "do_new_jf"
			}
		});
				
	},
	do_new_jf: function() {
		App.get('TAdminJF textfield#id').setValue("");
		App.get('TAdminJF datefield#dd').setValue("");
		App.get('TAdminJF datefield#df').setValue("");
		App.get('TAdminJF textfield#type').setValue("");	
	},
	do_select_jf: function(p,store) {
		App.get('TAdminJF textfield#id').setValue(store.data.id);
		App.get('TAdminJF datefield#dd').setValue(store.data.StartDate);
		App.get('TAdminJF datefield#df').setValue(store.data.EndDate);
		App.get('TAdminJF textfield#type').setValue(store.data.Type);
	},
	do_rec_jf: function(p) {
		var obj={
			StartDate: App.get('TAdminJF datefield#dd').getValue(),
			EndDate: App.get('TAdminJF datefield#df').getValue(),
			Type: App.get('TAdminJF textfield#type').getValue(),
			Cls: "yellow"		
		};
		if (App.get('TAdminJF textfield#id').getValue()!="") obj.id=App.get('TAdminJF textfield#id').getValue();
		App.DB.post('reservation_salles://off',obj,function(e,r) {
			App.get('TAdminJF textfield#id').setValue("");
			App.get('TAdminJF datefield#dd').setValue("");
			App.get('TAdminJF datefield#df').setValue("");
			App.get('TAdminJF textfield#type').setValue("");
			App.notify('Enregistrement OK.');
			App.get('TAdminJF grid#jf').getStore().load();
		});
	},
	do_del_jf: function(p) {
		var grid=App.get('TAdminJF grid#jf');
		var selected=grid.getSelectionModel().selected.items;
		Ext.MessageBox.confirm('Resa', 'Voulez vous vraiment supprimer cet enregistrement ?', function(btn){
			if(btn === 'yes'){
				if (selected.length<=0) return;
				App.DB.del("reservation_salles://off",[selected[0].data.id],function(e,r) {
					App.notify('Enregistrement supprimé');
					grid.getStore().load();
					App.get('TAdminJF textfield#id').setValue("");
					App.get('TAdminJF datefield#dd').setValue("");
					App.get('TAdminJF datefield#df').setValue("");
					App.get('TAdminJF textfield#type').setValue("");					
				});
			} else {
				App.notify('Action annulée');
				App.get('TAdminJF textfield#id').setValue("");
				App.get('TAdminJF datefield#dd').setValue("");
				App.get('TAdminJF datefield#df').setValue("");
				App.get('TAdminJF textfield#type').setValue("");				
			}
		});
	}    		
});