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
		
		this.title = "Nouvel évènement";
		
		this.padding = 10;

        this.items = [
		{
            layout: "form",
            margin: 15,
			width: "100%",
			flex: 1,
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
                    store: App.store.create('reservation_salles://typologie', {
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
                    editable: false
                },
                //------------regroupement hbox-------------------------------------------------------
                {
                    layout: "vbox",
                    itemId: "regroupement_hboxGrid1",
                    hidden: false,
                    border: false,
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
                            store: App.store.create('reservation_salles://agents{Id,nom+" "+prenom=agent}', {
                                autoLoad: true
                            })
                        }, {
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
                },
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