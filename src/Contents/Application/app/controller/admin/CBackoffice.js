App.controller.define('admin.CBackoffice', {

	views: [
		"admin.VBackoffice"
	],
	
	models: [
		
	],
	
	init: function()
	{

		this.control({
            "TAdmin combo#combo_db": {
				select: "selectDB"
			},
			"TAdmin button#add": {
				click: "admin_add_click"
			},
			"TAdmin button#remove": {
				click: "admin_remove_click"
			},
			"TAdmin grid#dbgrid": {
				itemclick: "dbgrid_click",
				edit: "dbgrid_edit"
			}
		});
				
	},
	admin_add_click: function()
	{
		var rowEditing=App.get('TAdmin grid#dbgrid').plugins[0];
		App.DB.get('reservation_salles://@'+App.get('TAdmin combo#combo_db').getValue(),function(r) {
			var e={};
			for (var i=0;i<r.data.length;i++) {
				e[r.data[i].COLUMN_NAME]='';
			};
			App.get('TAdmin grid#dbgrid').getStore().insert(0, e);
		});	
	},
	admin_remove_click: function()
	{
		var grid=App.get('TAdmin grid#dbgrid');
		var rowEditing=App.get('TAdmin grid#dbgrid').plugins[0];
		var sm = grid.getSelectionModel();

		App.DB.get('reservation_salles://@'+App.get('TAdmin combo#combo_db').getValue(),function(r) {
			var key="";
			for (var i=0;i<r.data.length;i++) {
				if (r.data[i].COLUMN_KEY=="PRI") key=r.data[i].COLUMN_NAME;
			};
			Ext.MessageBox.confirm('Admin', 'Voulez vous vraiment supprimer cet enregistrement ?', function(btn){
				if (btn === 'yes') App.DB.del('reservation_salles://'+App.get('TAdmin combo#combo_db').getValue(),[sm.selected.items[0].data[key]],function(e,r) {
					App.get('TAdmin grid#dbgrid').getStore().load();
				});
			});	
		});
	},
	selectDB: function(p) {
		var store=App.store.create('reservation_salles://'+p.getValue());
		var grid=App.get('TAdmin grid#dbgrid');
		grid.bindStore(store);
		store.load();
		App.store.createEditorColumns(grid);
	},
	dbgrid_edit: function(e)
	{	
		var records = App.get('TAdmin grid#dbgrid').getStore().getRange();
		App.DB.get('reservation_salles://@'+App.get('TAdmin combo#combo_db').getValue(),function(r) {
			var key="";
			for (var i=0;i<r.data.length;i++) {
				if (r.data[i].COLUMN_KEY=="PRI") key=r.data[i].COLUMN_NAME;
			};	
			for(var i =0; i < records.length; i++){
				var rec = records[i];
				if(rec.dirty == true){
					if (rec.data[key]==0) delete rec.data[key];
					console.log(rec.data);
					App.DB.post('reservation_salles://'+App.get('TAdmin combo#combo_db').getValue(),rec.data,function(e,r) {
						App.get('TAdmin grid#dbgrid').getStore().load();
					});
				}
			}			
		});		
	},
	dbgrid_click: function()
	{
		App.get("TAdmin button#remove").enable();
	}		
});
