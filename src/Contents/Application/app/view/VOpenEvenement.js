App.view.define('VOpenEvenement', {
    extend: 'Ext.window.Window',
    alias: 'widget.TOpenEvenement',

    initComponent: function() {
        this.width = 640;
        this.height = 390;
		this.closable=true;
        this.title = "Choississez un évènement";
        this.bodyCls = "white";
		this.layout="fit";
        this.items = [{
                xtype: "treepanel",
				border: false,
                itemId: "tree1",
                useArrows: true,
                rootVisible: false,
                height: "100%",
                store: App.treestore.create('TreeModel', {
                    autoLoad: true,
					root: {
                        expanded: true, 
						children: [],
						autoLoad: true
                    }
                }),
                multiSelect: false,
                singleExpand: false,
                columns: [{
					xtype: 'treecolumn', //this is so we know which column will show the tree
					text: 'Evènement',
					width: 250,
					sortable: true,
					dataIndex: 'text'
				},
				{
                text: 'Typologie',
				width: 130,
                sortable: true,
                dataIndex: 'typo'
				},
				{
              
                text: 'Statut',
				width: 60,
                //flex: 1,
				align: 'center',
                sortable: true,
                dataIndex: 'statutResa',
				renderer : function(val){
					return '<span style="background-color:#'+val+';">&nbsp;&nbsp;&nbsp;&nbsp;</span>';
				},
            },			
			{
              
                text: 'Début formation',
				width: 90,
                //flex: 1,
				align: 'center',
                sortable: true,
                dataIndex: 'debutModule'
            },
			{
              
                text: 'Fin formation',
                flex: 1,
				align: 'center',
                sortable: true,
                dataIndex: 'finModule'
            },
			
			
			] 
            }],
			 this.bbar = ['->',{
                    xtype: "button",
                    text: "Quitter",
                    itemId: "CANCEL_Open_evenement"
                },
            ],
            this.callParent(arguments);
    }
});