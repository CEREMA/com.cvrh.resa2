App.view.define('VResNew', {
    extend: "Ext.window.Window",
    alias: 'widget.VResNew',
    initComponent: function() {
        this.width = 500;
        this.height = 400;
		
		this.title="Ressource";
		
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
				fieldLabel: "Site",
				labelAlign: "top",
				displayField: "nomsalle",
				editable: false,
				valueField: "id_site",
				store: App.store.create('reservation_salles://site',{autoLoad: true})
			},
			{
				xtype: "combo",
				fieldLabel: "Salle",
				labelAlign: "top",
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
				valueField: "id_site",
				flex: 1
			},
			{
				xtype:"combo",
				editable: false,
				fieldLabel: "Période",
				labelAlign: "top",
				margin: {
					left: 5
				},
				width: 60,
				displayField: "value",
				valueField: "id",
				store: App.store.create({
					fields: ["id","value"],
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
				valueField: "id_salle",
				flex: 1
			},
			{
				xtype:"combo",
				editable: false,
				fieldLabel: "Période",
				labelAlign: "top",
				margin: {
					left: 5
				},
				width: 60,
				displayField: "value",
				valueField: "id",
				store: App.store.create({
					fields: ["id","value"],
					data: [{id:"J",value:"J"},{id:"M",value:"M"},{id:"A",value:"A"}]
				}),
				
			}
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
		},
		{
			xtype: "textarea",
			flex: 1,
			fieldLabel: "Commentaires",
			labelAlign: "top",
			width: "100%",
			padding: 10
		},
		{
			layout: "hbox",
			width: "100%",
			padding: 10,
			border: false,
			items: [
			{
				xtype: "checkboxfield",
				boxLabel: 'Préparation',
				labelWidth: 65,
				flex: 1,
				itemId: "check_preparation"
            },
			{
				xtype: "checkboxfield",
				boxLabel: 'Valider',
				labelWidth: 65,
				flex: 1,
				itemId: "check_valider"
            },
			{
				xtype: "checkboxfield",
				boxLabel: 'Afficher',
				labelWidth: 65,
				flex: 1,
				itemId: "check_afficher"
            }
			]
		}
		];

        this.callParent();
    }
});