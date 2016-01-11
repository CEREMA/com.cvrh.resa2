App.view.define('admin.VBackoffice', {
    extend: 'Ext.window.Window',
    alias: 'widget.TAdmin',

    initComponent: function() {
        this.width = 640;
        this.height = 390;
		this.closable=true;
        this.title = "Administration";
        this.bodyCls = "white";
		this.layout="vbox";
        this.items = [
			{
				xtype: "grid",
				itemId: "dbgrid",
				width: "100%",
				flex: 1,
				store: App.store.create({
					fields: [],
					data: []
				}),
				columns: [
				
				],
				plugins: [
					"bufferedrenderer",
					Ext.create('Ext.ux.grid.plugin.RowEditing', {
						clicksToMoveEditor: 1,
						autoCancel: false
					})
				]
			}
		];
		this.tbar = [
		{
			text: 'Ajouter',
			itemId: 'add',
			iconCls: 'add'
		}, 
		{
			itemId: 'remove',
			text: 'Supprimer',
			iconCls: 'remove',
			disabled: true
		},
		'->',
		{
				xtype: "combo",
				fieldLabel: "Table",
				itemId: "combo_db",
                editable: false,
				store: App.store.create('reservation_salles://*'),
				displayField: "TABLE_NAME",
				valueField: "TABLE_NAME"
        }			
        ];
        this.callParent(arguments);
    }
});