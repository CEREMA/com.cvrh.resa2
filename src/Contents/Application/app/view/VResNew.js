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
			text: "Enregistrer",
			handler: function(p)
			{
				var grid=p.up('window').grid;
				var dta=App.getData(p.up('window'));
				console.log(dta);
				if (dta.p0=="J") dta.d0.setHours(8);
				if (dta.p0=="M") dta.d0.setHours(8);
				if (dta.p0=="A") dta.d0.setHours(14);
				if (dta.p1=="J") dta.d1.setHours(8);
				if (dta.p1=="M") dta.d1.setHours(8);
				if (dta.p1=="A") dta.d1.setHours(14);
				var data=[
				{
					id_salle: dta.id_salle,
					nomSalle: App.get(p.up('window'),'combo#salle').getRawValue(),
					d0: dta.d0,
					d1: dta.d1/*,
					afficher: dta.,
					valider: ,
					preparation:,
					choix: */
				}
				];
				console.log(data);
				grid.getStore().add(data);
				p.up('window').close();
			}
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
				itemId: "site",
				fieldLabel: "Site",
				labelAlign: "top",
				displayField: "nomsalle",				
				editable: false,
				valueField: "id_site",
				store: App.store.create('reservation_salles://site',{autoLoad: true})
			},
			{
				xtype: "combo",
				itemId: "salle",
				fieldLabel: "Salle",
				bind: "id_salle",
				labelAlign: "top",
				margin: {
					left: 5
				},
				displayField: "nomSalle",
				editable: false,
				valueField: "id_salle",
				flex: 1,
				store: App.store.create('App.reservation.getFree')
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
				itemId: "d0",
				bind: "d0",
				fieldLabel: "Début",
				labelAlign: "top",
				editable: false,
				valueField: "id_site",
				flex: 1
			},
			{
				xtype:"combo",
				itemId: "p0",
				bind: "p0",
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
				itemId: "d1",
				bind: "d1",
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
				itemId: "p1",
				bind: "p1",
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
			bind: "choix",
			labelAlign: "top",
			editable: false,
			displayField: "nomChoix",
			valueField: "id_choix",
			store: App.store.create('reservation_salles://choix',{autoLoad: true})
		},
		{
			xtype: "textarea",
			flex: 1,
			bind: "comment",
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
				allowBlank: true,
				bind: "preparation",
				flex: 1,
				itemId: "check_preparation"
            },
			{
				xtype: "checkboxfield",
				boxLabel: 'Valider',
				bind: "valider",
				allowBlank: true,
				flex: 1,
				itemId: "check_valider"
            },
			{
				xtype: "checkboxfield",
				boxLabel: 'Afficher',
				bind: "afficher",
				allowBlank: true,
				flex: 1,
				itemId: "check_afficher"
            }
			]
		}
		];

        this.callParent();
    }
});