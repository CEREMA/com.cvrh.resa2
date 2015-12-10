App.view.define('VCreateEvenement', {
    extend: "Ext.window.Window",
    alias: 'widget.VCreateEvenement',
    initComponent: function() {
        this.width = 700;
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
			flex: 1,
            border: false,
            items: [
                //------------ EVENEMENT -------------------------------------------------------
                {
                    layout: "vbox",
                    itemId: "regroupement_hboxGrid1",
                    hidden: false,
                    border: false,
                    items: [
				{
                    xtype: "combo",
					width: "100%",
                    itemId: "cboTypologie",
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
                    fieldLabel: "Descriptif",
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
                            store: App.store.create('reservation_salles://agents{Id,nom+" "+prenom=agent}', {
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
                            store: App.store.create('reservation_salles://agents{Id,nom+" "+prenom=agent}', {
                                autoLoad: true
                            })
                    },
					{
                            xtype: "combo",
                            itemId: "cboSession",
                            width: "100%",
                            fieldLabel: "Session",
                            editable: false,
                            labelAlign: "left",
                            displayField: "session",
                            valueField: "id",
                            store: App.store.create({
								fields: ["id","session"],
								data: [
								{
									id: 0,
									session: "Session 1"
								}
								],
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
			layout: "vbox",
			width: "100%",
			items: [
				{
					collapsible: true,
					width: "100%",
					title: 'Module 1',
					flex: 1
				},
				{
					collapsible: true,
					width: "100%",
					title: 'Module 2',
					flex: 1
				},			
				{
					collapsible: true,
					width: "100%",
					title: 'Module 3',
					flex: 1
				},
				{
					collapsible: true,
					width: "100%",
					title: 'Module 4',
					flex: 1
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
                    text: "Suivant",
                    itemId: "insert_evenement"
		}
        ];

        this.callParent();
    }
});