Ext.define('MyTimeAxis', {
    extend     : "Ext.ux.Scheduler.data.TimeAxis",
    continuous : false,

    generateTicks : function (start, end, unit, increment) {
        // Use our own custom time intervals for day time-axis
        if (unit === Ext.ux.Scheduler.util.Date.DAY) {
            var ticks = [],
                intervalEnd;

            while (start < end) {
                if (start.getDay() === 5) {
                    // Fridays are lazy days, working 10am - 4pm
                    start.setHours(8);
                    intervalEnd = Ext.ux.Scheduler.util.Date.add(start, Ext.ux.Scheduler.util.Date.HOUR, 10);
                } else {
                    start.setHours(8);
                    intervalEnd = Ext.ux.Scheduler.util.Date.add(start, Ext.ux.Scheduler.util.Date.HOUR, 10);
                }

                ticks.push({
                    start : start,
                    end   : intervalEnd
                });
                start = Ext.ux.Scheduler.util.Date.add(start, Ext.ux.Scheduler.util.Date.DAY, 1);
            }
            return ticks;
        } else {
            return this.callParent(arguments);
        }
    }
});

Ext.ux.Scheduler.preset.Manager.registerPreset("CVRH_VIEW", {
        displayDateFormat : 'd/m/Y',
        shiftIncrement    : 1,
        shiftUnit         : "WEEK",
        timeColumnWidth   : 90,
        timeResolution    : {
            unit      : "HOUR",
            increment : 1
        },
        headerConfig      : {
            middle : {
                unit     : "DAY",
                align    : 'center',
                renderer : function (start, end, cfg) {
                    return start.getDayName()+' '+start.getDate();
                }
            },
            top    : {
                unit     : "WEEK",
                align    : 'center',
                renderer : function (start, end, cfg) {
                    return 'Semaine ' + Ext.Date.format(start, 'W');
                }
            }
        }
}); 

App.view.define('VMain', {

    extend: 'Ext.Panel',
    alias: 'widget.mainform',
    border: false,

    layout: "border",

    items: [
	{
        region: 'north',
        height: 25,
        minHeight: 25,
        border: false,
        baseCls: 'cls-header',
        xtype: "Menu",
        itemId: "MenuPanel",
        menu: [{
            text: "Evènement",
            menu: [{
                itemId: "MNU_EVT_NEW",
                text: "Nouveau"
            }, {
                itemId: "MNU_EVT_OPEN",
                text: "Ouvrir"
            }]
        },
		{
		text: "Planning",
            menu: [{
                itemId: "MNU_PLANNING",
                text: "Salles campus"
            },
			{
                itemId: "MNU_CVRH",
                text: "Salles CVRH"
            },{
                itemId: "MNU_MES_SALLES",
                text: "Mes réservations"
            }]
		},{
			text: "Affichage",
			menu: [
				{
					itemId: "MNU_DISPLAY",
					text: "Tableau d'affichage"
				}
			]
		},{
			text: "Administration",
			hidden: true,
			id: "MNU_ADMIN",
			menu: [
				{
					text: "Jours fériés",
					itemId: "MNU_ADMIN_JF"
				},
				{
					text: "Base de données",
					itemId: "MNU_ADMIN_DB"
				}
			]
		}]
    }, 
	{
		region: "north",
		height: 64,
		border: false,
		layout: "hbox",		
		width: "100%",
		items: [
			{
				xtype:"button",
				itemId: "ajouter_modification",
				text: "Evènement",
				padding: 5,
				height: "100%",
				scale: "large",
				iconAlign: "top",
				iconCls: "add"
			}	
		]
	},
	{
        region: "center",
        split: true,
		layout:"fit",
        items: [{
			xtype: "panel",
			itemId: "DISPLAY",
			width: "100%",
			height: "100%",
			html: '<iframe class="my_display" src="about:blank" style="width:100%;height:100%"></iframe>',
			hidden: true
		},
		{
            xtype: "schedulergrid",
            itemId: "schedule",
			timeAxis: new MyTimeAxis(),
			enableEventDragDrop:false,
            columnWidth: 2,
            viewPreset:'CVRH_VIEW',
            rowHeight: 32,
			allowOverlap: false,
            tbar: [
			{
                xtype: "combo",
                itemId: "selectMonth",
				width: 100,
				editable:false,
                store: App.store.create({
                    fields: [
                        "id",
                        "month"
                    ],
                    data: [{
                        id: 0,
                        month: "Janvier"
                    }, {
                        id: 1,
                        month: "Février"
                    }, {
                        id: 2,
                        month: "Mars"
                    }, {
                        id: 3,
                        month: "Avril"
                    }, {
                        id: 4,
                        month: "Mai"
                    }, {
                        id: 5,
                        month: "Juin"
                    }, {
                        id: 6,
                        month: "Juillet"
                    }, {
                        id: 7,
                        month: "Aout"
                    }, {
                        id: 8,
                        month: "Septembre"
                    }, {
                        id: 9,
                        month: "Octobre"
                    }, {
                        id: 10,
                        month: "Novembre"
                    }, {
                        id: 11,
                        month: "Décembre"
                    }]
                }),
                displayField: "month",
                valueField: "id"
            }, {			
                 xtype: "combo",
                 itemId: "selectAnnee",
				 width: 70,
				 editable: false,
                 displayField: "year",
                 valueField: "year",
				 store: App.store.create({
                    fields: [
                        "year"
                    ],
                    data: []
                })
            },{			
                xtype: "combo",
                itemId: "selectAgent",
				width: 200,
				editable: false,
                displayField: "agent",
                valueField: "Id",
				store: App.store.create({fields:[],data:[]})
            },
			],
			bbar: [
				'->',
				{
					xtype: "panel",
					border: false,
					height: 35,
					html: '<table><tr><td><div style="background-color:yellow;height:15px;width:15px;margin:5px">&nbsp;&nbsp;&nbsp;&nbsp;</div></td><td>Option</td><td><div style="background-color:orange;height:15px;width:15px;margin:5px">&nbsp;&nbsp;&nbsp;&nbsp;</div></td><td>Pré-réservation</td><td><div style="background-color:green;height:15px;width:15px;margin:5px">&nbsp;&nbsp;&nbsp;&nbsp;</div></td><td>Réservation</td><td><div style="background-color:red;height:15px;width:15px;margin:5px">&nbsp;&nbsp;&nbsp;&nbsp;</div></td><td>Maintenance</td></tr></table>',
					bodyStyle: "background-color:transparent",
					itemId: "Legendes"
				}
			],
            plugins: [
                Ext.create("Ext.ux.Scheduler.plugin.Zones", {
                    showHeaderElements: true,
                    innerTpl: '<span class="zone-type">{Type}</span>',
                    store: App.store.create({
                        model: App.model.create({
                            extend: 'Ext.ux.Scheduler.model.Range',
                            fields: [
                                'Type'
                            ]
                        })
                    })
                })
            ],
            heigth: 2000,
            columns: [{
                header: 'Salles',
                dataIndex: 'Name',
                width: 150,
                tdCls: 'user',
                sortable: true,
                field: new Ext.form.TextField()
            }],
            eventStore: App.eventstore.create("App.events.getAll",{autoLoad: true}),
            resourceStore: App.resourcestore.create("App.resources.getAll",{autLoad: true})
        }]
    }]

});