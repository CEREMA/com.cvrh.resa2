App.view.define('VResaModule', {
    extend: "Ext.Panel",
    alias: 'widget.VResaModule',
	
    initComponent: function() {

        this.layout = {
            type: 'vbox'
        };
		
		this.title = 'Module 1';
		
		this.width = "100%";
			
        this.items = [
				{
					layout: "hbox",
                    hidden: false,
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
						labelWidth: 50,
						listeners: {
							select: function(me) {
								App.get(me.up('window'),'datefield#finModule').setMinValue(me.getValue());
							}
						}
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
					}
					]
				},
				{
					xtype: "grid",
					itemId: "res",
					border: false,
					tbar: [
					{
						text: "Nouvelle ressource",
						iconCls: "plus_res",
                        itemId: "plus_res"
					}
					],
					columns: [
					{
						header: "Salle",
						flex: 1,
						dataIndex: "nomSalle"
					},
					{
						header: "Début",
                        type: 'date',
                        renderer: Ext.util.Format.dateRenderer('d/m/Y h:i'),
						width: 150,
						dataIndex: "d0"
					},
					{
						header: "Fin",
                        type: 'date',
                        renderer: Ext.util.Format.dateRenderer('d/m/Y h:i'),
						width: 150,
						dataIndex: "d1"
					}
					],
					store: App.store.create({
					fields:[
						"id_salle",
						"nomSalle",
						"d0",
						"d1",
						"afficher",
						"valider",
						"preparation",
						"choix"
					],
					data:[
					]
					}),
					flex: 1,
					width: "100%"
				}	
		];

        this.callParent();
    }
});