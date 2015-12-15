App.view.define('VCreateEvenement', {
    extend: "Ext.window.Window",
    alias: 'widget.VCreateEvenement',
    initComponent: function() {
        this.width = 540;
        this.height = 660;

        this.layout = {
            type: 'vbox'
        };

        this.tbar = [
		{
			text: "Nouvelle session",
			hidden: true
		}
        ];
		
        this.defaults = {
            split: true
        };
		
		this.title = "Nouvel évènement";
		
		this.padding = 10;
		
		this.bodyStyle="background-color: #FFFFFF";

        this.items = [
		{
            layout: "anchor",
            margin: 15,
			width: "100%",
            border: false,
            items: [
                { 
                    layout: "hbox",
                    border: false,
                    width: "100%",
                    items: [
					{
						xtype: "numberfield",
						margin: {
							left: 10
						},							
						itemId: "participant",
						labelAlign: "top",
						allowBlank: false,
						minValue: 0,
						width: 100,
						labelWidth: 100,
						fieldLabel: "Nb participants"
					}
                    ]
                },
                //------------ EVENEMENT -------------------------------------------------------
                {
                    layout: "vbox",
                    itemId: "regroupement_hboxGrid1",
                    hidden: false,
                    border: false,
                    items: [
					{
						layout: "hbox",
						border: false,
						width: "100%",
						items: [
						{
							xtype: 'numberfield',
							width: "100%",
							itemId: "cboTypologie",
							margin: {
								bottom: 10
							},
							flex: 1,
							fieldLabel: "Typologie",
							itemId: "insert_numGeff",
							fieldLabel: "GEFF",
							minValue: 0/*,
							width: 70,
							labelWidth: 50*/
							
						}
						]
					},
					{
						layout: "hbox",
						border: false,
						width: "100%",
						items: [
						{
							xtype: "combo",
							width: "100%",
							itemId: "cboTypologie",
							margin: {
								bottom: 10
							},
							flex: 1,
							fieldLabel: "Typologie",
							allowBlank: false,
							editable: false,
							displayField: "nomTypologie",
							valueField: "id_typologie",
							store: App.store.create('reservation_salles://typologie', {
								autoLoad: true
							})
						},
						{
							xtype: "combo",
							itemId: "cboSession",
							flex: 1,
							margin: {
								bottom: 10,
								left: 10
							},
							fieldLabel: "Session",
							labelWidth: 50,
							editable: false,
							labelAlign: "left",
							displayField: "session",
							valueField: "id",
							store: App.store.create({
								fields: ["id","session"],
								data: [
								{
									id: 1,
									session: "Session 1"
								}
								],
								autoLoad: true
							})
						}						
						]
					},
					{
						xtype: 'textfield',
						itemId: "insert_evenement",
						width: "100%",
						fieldLabel: "Nom évènement",
						allowBlank: false,
						editable: false,
					}, 
					{
						xtype: 'textarea',
						itemId: "insert_descriptif",
						width: "100%",
						fieldLabel: "Commentaires",
						editable: false
					},
					{
						xtype: "combo",
						itemId: "cboCP",
						width: "100%",
						fieldLabel: "Chef de projet",
						allowBlank: false,
						editable: false,
						labelAlign: "left",
						displayField: "agent",
						valueField: "Id",
						store: App.store.create('reservation_salles://agents{Id,nom+" "+prenom=agent+}', {
							autoLoad: true
						})
					}, 
					{
						xtype: "combo",
						itemId: "cboAssistant",
						width: "100%",
						fieldLabel: "Assistant(e)",
						//allowBlank: false,
						editable: false,
						labelAlign: "left",
						displayField: "agent",
						valueField: "Id",
						store: App.store.create('reservation_salles://agents{Id,nom+" "+prenom=agent+}', {
							autoLoad: true
						})
                    }
                    ]
                }
            ]
        },
		//------------ MODULE -------------------------------------------------------
		{
			border: false,
			flex: 1,
			layout: "accordion",
			width: "100%",
			items: [
				{
					xtype: "VResaModule"
				}			
			]
		}
		];
		
        this.bbar = [
		{
                    xtype: "button",
                    text: "Annuler",
                    itemId: "CANCEL_evenement"
        },
        '->', 
		{
                    xtype: "button",
                    text: "Enregistrer",
                    itemId: "insert_evenement"
		}
        ];

        this.callParent();
    }
});