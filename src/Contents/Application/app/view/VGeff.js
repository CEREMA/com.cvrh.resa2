App.view.define('VGeff', {
    extend: "Ext.window.Window",
    alias: 'widget.VGeff',
    initComponent: function() {
        this.width = 800;
        this.height = 460;

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
                itemId: "geff",
                columns: [
                    {
                        text: "GEFF",
                        dataIndex: "NumGEFF"
                    },
                    {
                        text: "Titre formation",
                        dataIndex: "Titre_formation",
                        flex: 1
                    }
                ],
                plugins: ["bufferedrenderer"],
                store: App.store.create('App.GEFF.get',{autoLoad: true})
            }
		];

        this.callParent();
    }
});