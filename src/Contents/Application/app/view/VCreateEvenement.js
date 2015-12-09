App.view.define('VCreateEvenement', {
    extend: "Ext.window.Window",
    alias: 'widget.VCreateEvenement',
    initComponent: function() {
        this.width = 1024;
        this.height = 660;

        this.layout = {
            type: 'vbox'
        };

        this.tbar = [
        ];
		
        this.defaults = {
            split: true
        };

        this.items = [
		{
            layout: "form",
            margin: 5,
            border: false,
            items: [
				{
                    xtype: "combo",
                    itemId: "cboTypologie",
                    fieldLabel: "Typologie",
                    allowBlank: false,
                    editable: false,
                    displayField: "nomTypologie",
                    valueField: "id_typologie",
                    store: App.store.create('App.reservation.typologie', {
                        autoLoad: true
                    })
                },
                {
                    xtype: 'textfield',
                    itemId: "insert_evenement",
                    fieldLabel: "Nom évènement",
                    allowBlank: false,
                    editable: false,
                }, 
				{
                    xtype: 'textarea',
                    itemId: "insert_descriptif",
                    fieldLabel: "Descriptif",
                    //allowBlank: false,
                    editable: false
                },
                //------------regroupement hbox-------------------------------------------------------
                {
                    layout: "vbox",
                    itemId: "regroupement_hboxGrid1",
                    hidden: false,
                    border: false,
                    //width: "100%",
                    items: [{
                            xtype: "combo",
                            itemId: "cboCP",
                            width: "100%",
                            fieldLabel: "Chef de projet",
                            allowBlank: false,
                            editable: false,
                            labelAlign: "left",
                            displayField: "agent",
                            valueField: "Id",
                            store: App.store.create('App.reservation.agents', {
                                autoLoad: true
                            })
                        }, 
						{
                            xtype: "combo",
                            itemId: "cboAssistant",
                            width: "100%",
                            fieldLabel: "Assistant(e)",
                            //allowBlank: false,
                            editable: true,
                            labelAlign: "left",
                            displayField: "agent",
                            valueField: "Id",
                            queryMode: 'local',
                            typeAhead: true,                            
                            store: App.store.create('reservation_salles://agents{Id,nom+" "+prenom=agent}', {
                                autoLoad: true
							})
                        }
                    ]
                },
                //------------regroupement hbox-------------------------------------------------------
                {
                    xtype: "numberfield",
                    itemId: "participant",
                    width: "100%",
                    allowBlank: false,
					minValue: 0,
                    //editable: false,
                    labelAlign: "left",
                    fieldLabel: "Nb participant"
                },
                {
                    xtype: "datefield",
                    renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                    itemId: "debutModule",
                    width: "100%",
                    allowBlank: false,
					startDay: 1,
                    editable: false,
                    fieldLabel: 'Début module',
                }, 
				{
                    xtype: "datefield",
                    renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                    itemId: "finModule",
					startDay: 1,
                    width: "100%",
                    allowBlank: false,
                    editable: false,
                    fieldLabel: 'Fin module',
                },
				{
                    xtype: 'numberfield',
                    itemId: "insert_numGeff",
                    fieldLabel: "Numéro GEFF",
					minValue: 0,
					//width:200,
					//labelWidth: 80, 
                   // editable: false,
                },
                { //--- Début zone radio bouton ---											
                    xtype: 'radiogroup',
                    fieldLabel: 'Avis de parution',
                    itemId: "rdAvis",
                    flex: 1,
                    columns: 5,
                    vertical: true,
                    items: [{
                            boxLabel: 'Oui',
                            itemId: "RA0",
                            name: 'ra',
                            inputValue: '0'
                        }, {
                            boxLabel: 'Non',
                            itemId: "RA1",
                            name: 'ra',
                            inputValue: '1',
                            checked: true
                        }
                    ]
                }, 
				{
                    xtype: "datefield",
					startDay: 1,
                    renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                    itemId: "dateAvis",
                    width: "100%",
                    allowBlank: false,
                    hidden: true,
                    editable: false,
                    fieldLabel: 'Date avis',
                }
            ]
        }];
		
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