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
				editable: false,
				valueField: "id_site",
				store: App.store.create('reservation_salles://site',{autoLoad: true})
			},
			{
				xtype: "combo",
				margin: {
					left: 5
				},
				displayField: "nomSalle",
				editable: false,
				valueField: "id_salle",
				flex: 1,
				store: App.store.create('reservation_salles://salle')
			}
			]
		},
		{
			layout: "hbox",
			border: false,
			padding: 10,
			width: "100%",
			items: [
			{
				xtype: "datefield",
				fieldLabel: "Début",
				labelAlign: "top",
				editable: false,
				valueField: "id_site"
			},
			{
				xtype:"combo",
				width: 20,
				store: App.store.create({
					fields: ["id","value"],
					displayField: "value",
					valueField: "id",
					data: [{id:"J",value:"J"},{id:"M",value:"M"},{id:"A",value:"A"}]
				}),
				
			},
			{
				xtype: "datefield",
				margin: {
					left: 5
				},
				fieldLabel: "Fin",
				labelAlign: "top",
				editable: false,
				valueField: "id_salle"
			},
			]			
		},
		{
			xtype: "boxselect",
			itemId: "cboChoix",
			height: 50,
			padding: 10,
			width: "100%",
			fieldLabel: "Choix",
			labelAlign: "top",
			allowBlank: false,
			editable: false,
			displayField: "nomChoix",
			valueField: "id_choix",
			store: App.store.create('reservation_salles://choix',{autoLoad: true})
		}					
		];

        this.callParent();
    }
});