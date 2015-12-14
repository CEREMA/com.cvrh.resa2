App.view.define('VResNew', {
    extend: "Ext.window.Window",
    alias: 'widget.VResNew',
    initComponent: function() {
        this.width = 500;
        this.height = 400;

        this.layout = {
            type: 'vbox'
        };

        this.bbar = [
		'->',
		{
			text: "Enregistrer"
		}
        ];
		
		this.bodyStyle = "background-color: #FFFFFF";
		
        this.defaults = {
            split: true
        };

        this.items = [
		{
			layout: "hbox",
			border: false,
			padding: 10,
			width: "100%",
			items: [
			{
				xtype: "combo",
				displayField: "nomsalle",
				valueField: "id_site",
				store: App.store.create('reservation_salles://site',{autoLoad: true})
			},
			{
				xtype: "combo",
				margin: {
					left: 5
				},
				displayField: "nomSalle",
				valueField: "id_salle",
				flex: 1,
				store: App.store.create('reservation_salles://salle')
			}
			]
		}
		];

        this.callParent();
    }
});