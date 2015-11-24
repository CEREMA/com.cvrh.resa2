App.model.define('TreeModel', {
	extend: 'Ext.data.Model',
    fields: [
		{name: 'id',     			type: 'string'},
        {name: 'text',     			type: 'string'},
		{name: 'statutResa',     	type: 'string'},
		{name: 'debutModule',     	type: 'string'},
		{name: 'finModule',     	type: 'string'},
		{name: 'typo',     			type: 'string'},
		{name: 'numSession',     	type: 'string'},	
    ],
	api: {
		read: "App.reservation.getAllFormations"
	}
});