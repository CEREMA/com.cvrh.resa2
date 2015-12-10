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