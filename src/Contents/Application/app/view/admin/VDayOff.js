App.view.define('admin.VDayOff', {
    extend: 'Ext.window.Window',
    alias: 'widget.TAdminJF',

    initComponent: function() {
        this.width = 640;
        this.height = 390;
		this.closable=true;
        this.title = "Jours fériés";
        this.bodyCls = "white";
		this.layout="vbox";
        this.items = [
			{
				layout: "hbox",
				width: "100%",
				border: false,
				items: [
				{
					xtype: "textfield",
					itemId: "id",
					hidden: true
				},
				{
					xtype: "datefield",
					itemId: "dd"
				},
				{
					xtype: "datefield",
					itemId: "df"
				},
				{
					xtype: "textfield",
					itemId: "type",
					flex: 1
				},
				{
					xtype: "button",
					text: "Nouveau",
					width: 100,
					height: "100%",
					itemId: "new_jf"
				},
				{
					xtype: "button",
					width: 20,
					height: "100%",
					cls: "checkmark",
					itemId: "del_jf"
				},
				{
					xtype: "button",
					width: 20,
					height: "100%",
					cls: "trashmark",
					itemId: "rec_jf"
				}
				]
			},
			{
				xtype: "grid",
				itemId: "jf",
				width: "100%",
				flex: 1,
				store: App.store.create("reservation_salles://off",{autoLoad: true}),
				columns: [
				{
					text: "Début",
					dataIndex: "StartDate",
					format: 'd/m/Y',
					renderer:Ext.util.Format.dateRenderer('d/m/Y')
				},
				{
					text: "Fin",
					dataIndex: "EndDate",
					format: 'd/m/Y',
					renderer:Ext.util.Format.dateRenderer('d/m/Y')
				},
				{
					text: "Motif",
					flex: 1,
					dataIndex: "Type"
				}				
				]
			}
		];
		this.bbar = [
			'->',
			{
				text: "Fermer",
				itemId: "close_jf"
            }
        ];
        this.callParent(arguments);
    }
});