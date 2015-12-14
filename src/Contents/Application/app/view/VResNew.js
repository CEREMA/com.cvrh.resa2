App.view.define('VResNew', {
    extend: "Ext.window.Window",
    alias: 'widget.VResNew',
    initComponent: function() {
        this.width = 500;
        this.height = 400;

        this.layout = {
            type: 'vbox'
        };

        this.bbar = [
		'->',
		{
			text: "Enregistrer"
		}
        ];
		
        this.defaults = {
            split: true
        };

        this.items = [
		];

        this.callParent();
    }
});