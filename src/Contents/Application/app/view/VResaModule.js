App.view.define('VResaModule', {
    extend: "Ext.Panel",
    alias: 'widget.VResaModule',
	
    initComponent: function() {

        this.layout = {
            type: 'vbox'
        };
		
		this.title = 'Module 1';
		
		this.width = "100%";
        
        this.closable = true;
        
        this.listeners={
            beforeclose: function(panel){
                var me=this;
                console.log(panel);
                /*alert(p.up('window').id_session);
                alert(App.get(p.up('window'),'combo#cboSession').getValue());*/
                var panels=App.get('VCreateEvenement tabpanel').items.items;
                var activeTabIndex = App.get('VCreateEvenement tabpanel').items.findIndex('id', panel.id)+1;
                if (activeTabIndex==panels.length) {
                    // on delete toutes les ressources associées au module
                    App.DB.del('reservation_salles://ressourcesalles?id_module='+panel.moduleID,function(e,r) {
                        alert('x');
                        App.DB.del('reservation_salles://module?id_module='+panel.moduleID,function(e,r) {
                            // on met à jour la session
                            me.updateSession(panel.up('window'));
                            alert('z');
                        });
                    });
                    return false;
                } else {
                    alert('Vous ne pouvez supprimer que le dernier module !');
                    return false;
                }                
            }
        };
        
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
                        "id_res",
                        "id_site",
						"id_salle",
						"nomSalle",
						"d0",
						"d1",
                        "p0",
                        "p1",
						"afficher",
						"valider",
						"preparation",
						"choix",
                        "comments"
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