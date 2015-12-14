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
									id: 0,
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
					width: "100%",
					title: 'Module 1',
					layout: "vbox",
					items: [
					{
						layout: "hbox",
						padding: 10,
						border: false,
						width: "100%",
						height: 60,
						items: [
						{
							xtype: "datefield",
							renderer: Ext.util.Format.dateRenderer('d/m/Y'),
							itemId: "debutModule",
							allowBlank: false,
							startDay: 1,
							editable: false,
							fieldLabel: 'Début',
							labelAlign: "top",
							flex: 1,
							labelWidth: 50
						}, 
						{
							xtype: "datefield",
							margin: {
								left: 10
							},
							renderer: Ext.util.Format.dateRenderer('d/m/Y'),
							itemId: "finModule",
							startDay: 1,
							allowBlank: false,
							editable: false,
							fieldLabel: 'Fin',
							labelAlign: "top",
							flex: 1,
							labelWidth: 50
						},
						{
							xtype: 'numberfield',
							margin: {
								left: 10
							},
							itemId: "insert_numGeff",
							fieldLabel: "GEFF",
							labelAlign: "top",
							minValue: 0,
							width: 70,
							labelWidth: 50
						},
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
					{ 				
						xtype: 'radiogroup',
						fieldLabel: 'Avis de parution',
						width: 400,
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
							checked: true
						},
						{
							boxLabel: 'Oui',
							itemId: "RA0",
							name: 'ra',
							inputValue: '0'
						}
						]
					}, 
					{
						xtype: "grid",
						border: false,
						tbar: [
						{
							text: "Nouvelle ressource",
							iconCls: "plus_res",
							handler: function() {
								App.view.create('VResNew',{modal: true}).show();
							}
						}
						],
						columns: [
						{
							header: "Site",
							width: 100,
							dataIndex: "id_site",
							editor: {
								xtype: 'combobox',
								typeAhead: true,
								triggerAction: 'all',
								selectOnTab: true,
								displayField: "nomsalle",
								valueField: "id_site",
								store: App.store.create("reservation_salles://site"),
								lazyRender: true,
								listClass: 'x-combo-list-small',
								listeners: {
									select: function(combo, recs, opts){
										combo.fireEvent('blur');
									}								
								}
							}							
						},
						{
							header: "Salle",
							width: 150,
							field: {
								xtype: 'combobox',
								typeAhead: true,
								triggerAction: 'all',
								selectOnTab: true,
								displayField: "salle",
								valueField: "id_salle",
								store: App.store.create("reservation_salles://salle{id_salle,nomSalle+' ('+lieu+')'=salle}?id_site=1"),
								lazyRender: true,
								listClass: 'x-combo-list-small'
							}							
						}
						],
						plugins: [
							Ext.create('Ext.grid.plugin.CellEditing',{clicksToEdit: 1})
						],
						store: App.store.create({
						fields:[
							"id_site"
						],
						data:[
							{
								id_site: ""
							}
						]}),
						flex: 1,
						width: "100%"
					}
					]
				},
				{
					width: "100%",
					title: 'Module 2',
					flex: 1
				},			
				{
					width: "100%",
					title: 'Module 3',
					flex: 1
				},
				{
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
                    text: "Enregistrer",
                    itemId: "insert_evenement"
		}
        ];

        this.callParent();
    }
});