App.view.define('VGeff', {
    extend: "Ext.window.Window",
    alias: 'widget.VGeff',
    initComponent: function() {
        this.width = 1024;
        this.height = 660;

        this.layout = {
            type: 'fit'
        };

        this.bbar = [
        ];

        this.tbar = [
        ];
		
        this.defaults = {
            split: true
        };

        this.items = [
            {
                xtype: "grid",
                columns: [
                    {
                        text: "GEFF",
                        dataIndex: "NumGEFF"
                    },
                    {
                        text: "Titre formation",
                        dataIndex: "Titre_formation"
                    },
                    {
                        text: "Session",
                        dataIndex: "session"
                    },
                    {
                        text: "Module",
                        dataIndex: "module"
                    }
                ],
                plugins: ["bufferedrenderer"],
                store: App.store.create('reservation_salles://geff_imports{NumGEFF,Titre_formation,session,module}?YEAR(Date_debut)=2016',{autoLoad: true})
            }
		];

        this.callParent();
    }
});