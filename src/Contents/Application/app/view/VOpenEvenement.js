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
        this.items = [
            {
                xtype: "grid",
                columns: [
                    {
                        text: "Evènement"
                    }
                ],
                store: App.store.create("App.events.get")
            }
        ];
        this.bbar = [
            '->',
            {
                xtype: "button",
                text: "Quitter",
                handler: function(p) {
                    p.up('window').close();   
                }
            }
        ];
        this.callParent(arguments);
    }
});