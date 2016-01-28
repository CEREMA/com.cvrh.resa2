App.view.define('VCreateEvenement', {
    extend: "Ext.window.Window",
    alias: 'widget.VCreateEvenement',
    initComponent: function() {
        this.width = 540;
        this.height = 690;

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
                //------------ EVENEMENT -------------------------------------------------------
                {
                    layout: "vbox",
                    itemId: "regroupement_hboxGrid1",
                    hidden: false,
                    border: false,
                    items: [
                    {
                        xtype: "textfield",
                        itemId: "num_evt",
                        bind: "id_evenement",
                        hidden: true
                    },
                    {
                        xtype: 'ux-searchbox',
                        width: "100%",
                        triggerCls : Ext.baseCSSPrefix + 'form-search-trigger',
                        itemId: 'searchbox',
                        width: 250,
                        itemId: "insert_numGeff",
                        fieldLabel: "GEFF",
                        bind: "num_geff",
                        margin: {
                            bottom: 10
                        }
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
                            bind: "id_typologie",
							store: App.store.create('reservation_salles://typologie', {
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
                        bind: "nomEvenement",
						allowBlank: false,
						editable: false,
					}, 
					{
						xtype: 'textarea',
						itemId: "insert_descriptif",
						width: "100%",
						fieldLabel: "Commentaires",
                        bind: "descriptifEvenement",
						editable: false
					},
					{
						xtype: 'combo',
						itemId: "cboSession",
						width: 250,
						fieldLabel: "Session",						
                        editable: false,
                        labelAlign: "left",
                        displayField: "session",
                        valueField: "session_id",
                        queryMode: 'local',
                        store: App.store.create({
                            fields: ["session_id","session"],
                            data: [
                                {
                                 session_id: "1",
                                 session: "Session 1"
                                }
                            ]
                        })
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
                    },
					{
						xtype: "numberfield",
						margin: {
							bottom: 10
						},							
						itemId: "participant",
						labelAlign: "left",
						allowBlank: false,
						minValue: 0,
						width: 200,
						labelWidth: 100,
						fieldLabel: "Participants"
					},
				{
					layout: "hbox",
					width: "100%",
					border: false,
					items: [
					{ 				
						xtype: 'radiogroup',
						fieldLabel: 'Avis de parution',						
						width: 350,
						padding: 10,
						itemId: "rdAvis",
						columns: 5,
						vertical: false,
						items: [
						{
							boxLabel: 'Non',
							itemId: "RA1",
							name: 'ra',
							inputValue: '1',
							checked: true,
							listeners: {
								change: function(me) {
									App.get(me.up('window'),'datefield#date_avis').show();
								}
							}
						},
						{
							boxLabel: 'Oui',
							itemId: "RA0",
							name: 'ra',
							inputValue: '0',
							listeners: {
								change: function(me) {
									App.get(me.up('window'),'datefield#date_avis').hide();
								}
							}
						}
						]
					},
					{
						xtype: "datefield",
						itemId: "date_avis",
						padding: 10,
						hidden: true,
						flex: 1
					}
					]
				}					
                    ]
                }
            ]
        },
        {
            layout: "hbox",
            height: 40,
            bodyStyle: "background-color:#D5E2F2",
            width: "100%",
            border: false,            
            items: [
                {
                    xtype: "button",    
                    text: "Nouveau module",
                    margin: {
                        left: 5,
                        top: 5
                    },
                    itemId: "newmodule"
                },
                {
                    xtype: "button",    
                    text: "Supprimer module",
                    margin: {
                        left: 5,
                        top: 5
                    },
                    itemId: "delmodule"
                }
            ]
        },
		//------------ MODULE -------------------------------------------------------
		{
			border: false,
			flex: 1,
			xtype: 'tabpanel',
            plugins: [
                "contextmenu"
            ],
            itemId: "modules",
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