App.controller.define('CMain', {

	views: [
		"VMain",
		"VOpenEvenement",
		"admin.VDayOff",
		"admin.VBackoffice"
	],
	
	models: [

	],
	
	init: function()
	{

		this.control({
			"menu>menuitem": {
				click: "Menu_onClick"
			},
			
			/*
			Main Screen
			*/            
            
			"mainform": {
				render: "onShow"
			},
            "mainform combo#selectMonth": {
                select: "select_month"
            },
            "mainform combo#selectAgent": {
                select: "select_agent"
            },
            "mainform combo#selectAnnee": {
                select: "select_year"
            },
            "mainform schedulergrid#schedule": {
                itemcontextmenu: "resource_context",
				eventcontextmenu: "event_context",
				beforeeventresize: "no_event_resize",
				beforedragcreate: "no_drag_create",
                dragcreateend: "no_grid_drag_end",
                eventdrop: "no_grid_drop",
                eventmouseleave: "grid_mouse_leave",
                eventmouseenter: "grid_mouse_enter"                
                /*
                eventdblclick: "grid_dblclick",
				*/
            },
			/*
			OpenEvenement
			*/ 
			"TOpenEvenement": {
				render: "TOpenEvenement_onShow"
			}			
		});
		
		App.init('VMain',this.onLoad);
		
	},
	
    // init variables
    
    EVT_CURRENT: {},
    
	// TOpenEvenement
	
	TOpenEvenement_onShow: function()
	{
		App.get('TOpenEvenement treepanel#tree1').getStore().getProxy().extraParams.userId = 7;
        App.get('TOpenEvenement treepanel#tree1').getStore().load();
		App.get('TOpenEvenement treepanel#tree1').getStore().on('load',function() {
			App.get('TOpenEvenement treepanel#tree1').getRootNode().expand(true);	
		});		
	},
	
	// Main Screen events ///////////////////////////////////////////////////////
	
	select_month: function(p)
	{
		this.display_scheduler(new Date(App.get('combo#selectAnnee').getValue(),p.getValue(),1));
	},
	select_agent: function(p)
	{
		this.display_scheduler(new Date(App.get('combo#selectAnnee').getValue(),App.get('combo#selectMonth').getValue(),1),2,App.get('combo#selectAgent').getValue());
	},
	select_year: function(p)
	{
		this.display_scheduler(new Date(p.getValue(),App.get('combo#selectMonth').getValue(),1));
	},
    resource_context: function(view, record, item, index, e) {
        e.stopEvent();
        Ext.create('Ext.menu.Menu', {
            items: [
			{
				text: "Ajouter évènement"
			},
			{
				text: "Voir la ressource"
			}]
        }).showAt(e.getXY());
    },
    event_context: function(s, rec, e) {
        e.stopEvent();
        Ext.create('Ext.menu.Menu', {
            items: [
			{
				text: "Ajouter évènement"
			},
			{
				text: "Editer évènement"
			}			
			]
        }).showAt(e.getXY());
    },
    no_event_resize: function(p) {
        return false;
    },	
	no_drag_create: function(p) {
		return false;
	},
	no_event_resize: function(p) {
		return false;
	},
	no_drag_create: function(p) {
		return false;	
	},
	no_grid_drag_end: function(p) {
		return false;	
	},
	no_grid_drop: function(p) {
		return false;	
	},
    grid_mouse_leave: function() {
        $('.x-tip').hide();
    },
    grid_mouse_enter: function(view, r, e, eOpts) {
		Ext.create('Ext.tip.ToolTip', {
            html: '',
            listeners: {
                beforeshow: function updateTipBody(tip) {
                    if (r.data.id_typologie != 1) {
						var str= [
							'<div class=typeInfo><span style="font-weight:bold;color:navy">{nomTypologie}</span>',
                            '<div class=typeInfoTitle>{nomEvenement}<br><small>{initial}</small></div>',
                            '<div class=typeInfoDebut><table><tr><td>du <b>{debut}</b> au <b>{fin}</b></table></div>',
							'<div class=typeInfoSalle>{prenom} {nom}</div>',
                            '<div class=typeInfoSalle2>{prenom_assistant} {nom_assistant}</div>',
							'</div>'
						];
                    } else {
						var str= [
							'<div class=typeInfo><span style="font-weight:bold;color:navy">{nomTypologie}</span>',
                            '<div class=typeInfoTitle>{nomEvenement}<br><small>{initial}</small></div>',
                            '<div class=typeInfoSession><table><tr><td>session</td><td><b>{num_session}</b></td></tr></table></div>',
                            '<div class=typeInfoSessionModule><table><tr><td>module</td><td><b>{num_module}</b></td></tr></table></div>',
                            '<div class=typeInfoDebut><table><tr><td>du <b>{debut}</b> au <b>{fin}</b></td></tr></table></div>',
                            '<div class=typeInfoDebut><table><tr><td>{dateAvis}</td></tr></table></div>',
							'<div class=typeInfoSalle>{prenom} {nom}</div>',
                            '<div class=typeInfoSalle2>{prenom_assistant} {nom_assistant}</div>',
                            /*'<div class=typeInfoSalle2>{dateAvis}</div>',*/
							'</div>'
						];
                    };
                    App.DB.get('reservation_salles://agents?Id='+r.data.assistant,function(r2) {                        
                        str = str.join('');
                        str = str.replace('{nomTypologie}', r.data.nomTypologie);
                        str = str.replace('{nomsalle}', r.data.nomsalle);
                        str = str.replace('{nomEvenement}', r.data.nomEvenement);
                        str = str.replace('{num_session}', r.data.num_session);
                        str = str.replace('{num_module}', r.data.num_module);
                        str = str.replace('{initial}', r.data.initial);
                        str = str.replace('{debut}', r.data.debut);
                        str = str.replace('{fin}', r.data.fin);
                        str = str.replace('{nom}', r.data.nom);
                        str = str.replace('{prenom}', r.data.prenom);
                        if (r.data.dateAvis)
                        str = str.replace('{dateAvis}', '<b>Date avis: </b>'+r.data.dateAvis.toString('d MMMM yyyy'));
                        else
                        str = str.replace("{dateAvis}", "<i>Pas de date d'avis</i>");
                        if (r2.data.length>0) {
                            str = str.replace('{nom_assistant}', r2.data[0].nom);
                            str = str.replace('{prenom_assistant}', r2.data[0].prenom);
                        } else {
                            str = str.replace('{nom_assistant}', "");
                            str = str.replace('{prenom_assistant}', "");
                        }
                        tip.update(str);                        
                    });					
                }
            }
        }).showAt(e.getXY());     
    },
    
	// Menu ////////////////////////////////////////////////////////////////////
	
	do_new_evt: function()
	{
		alert('non implémenté');
	},
	do_open_evt: function()
	{
        App.view.create('VOpenEvenement', {
            modal: true
        }).show();
	},
	do_open_planning: function()
	{
		this.display_scheduler(new Date(App.get('mainform combo#selectAnnee').getValue(),App.get('mainform combo#selectMonth').getValue(),1),1);
	},
	do_open_cvrh: function()
	{
		this.display_scheduler(new Date(App.get('mainform combo#selectAnnee').getValue(),App.get('mainform combo#selectMonth').getValue(),1),0);
	},
	do_open_mesReservations: function()
	{        
		App.get('mainform combo#selectAgent').setValue(this.EVT_CURRENT.login);
		this.display_scheduler(new Date(App.get('mainform combo#selectAnnee').getValue(),App.get('mainform combo#selectMonth').getValue(),1),2,this.EVT_CURRENT.login);
	},
	do_admin_off: function()
	{
		App.view.create('admin.VDayOff', {
            modal: true
        }).show();
	},
	do_admin_db: function()
	{
		App.view.create('admin.VBackoffice', {
            modal: true
        }).show();
	},
	do_display: function()
	{
		App.get('panel#DISPLAY').show();
		$('.my_display').attr('src', "/display");
		App.get('schedulergrid#schedule').hide();	
	},
	Menu_onClick: function(p)
	{
        if (p.itemId) {
            App.get('panel#DISPLAY').hide();
            App.get('schedulergrid#schedule').show();
			switch (p.itemId) {
				case "MNU_DISPLAY" :
					this.do_display();
					break;
				case "MNU_EVT_NEW":
					this.do_new_evt();
					break;
				case "MNU_EVT_OPEN":
					this.do_open_evt();
					break;
				case "MNU_PLANNING":
					this.do_open_planning();
					break;	
				case "MNU_CVRH":
					this.do_open_cvrh();
					break;
				case "MNU_MES_SALLES":
					this.do_open_mesReservations();
					break;
				case "MNU_ADMIN_JF":
					this.do_admin_off();
					break;
				case "MNU_ADMIN_DB":
					this.do_admin_db();
					break;
				default:
					break;
			};
        };
	},
	
	// Display Scheduler /////////////////////////////////////////////////////////////
	display_scheduler: function(now,salle,agent)
	{
	    // Private methods
        
		function isWeekend(d) {
			return (d.getDay() == 6);
		};
		function days_in_month(month, year) {
			var m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			if (month != 2) return m[month - 1]; //tout sauf février
			if (year % 4 != 0) return m[1]; //février normal non bissextile
			if (year % 100 == 0 && year % 400 != 0) return m[1]; //février bissextile siècle non divisible par 400
			return m[1] + 1; //tous les autres févriers = 29 jours
		};

		var scheduler=App.get('schedulergrid#schedule');		
		scheduler.setTimeColumnWidth(70);
		
		var year=now.getFullYear();
		
		if (!salle) var salle=0; else {
			if (salle==1) App.get('schedulergrid#schedule').columns[0].setText("Salles Campus");
			var mmm=App.get('combo#selectMonth').getValue()+1;
			if (mmm<10) mmm="0"+mmm;
            var debut = now.getFullYear() +'-'+ mmm  + "-01";
            var fin = now.getFullYear() +'-'+ mmm + "-" + days_in_month(App.get('combo#selectMonth').getValue(),year);
			scheduler.getResourceStore().getProxy().extraParams._cfg = salle;
	        scheduler.getResourceStore().getProxy().extraParams.debut = debut;
			scheduler.getResourceStore().getProxy().extraParams.fin = fin;
			scheduler.getResourceStore().getProxy().extraParams.NumLogin = agent;
			scheduler.getResourceStore().load();
			scheduler.getEventStore().getProxy().extraParams.NumLogin = agent;
			scheduler.getEventStore().load();			
		};
		if (!agent) App.get('combo#selectAgent').setValue(0);
		
		scheduler.getResourceStore().getProxy().extraParams._cfg = salle;
		scheduler.getResourceStore().load();	

		var mm = ((now.getMonth() + 1) >= 10) ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
		
		App.get('combo#selectMonth').setValue(parseInt(mm)-1);
		
		var month = App.get('combo#selectMonth').getValue();

		days_in_month(mm, year);
		var resultat = days_in_month(mm, year) + 1;
		this.EVT_CURRENT.resultat = resultat - 1;

		scheduler.setStart(new Date(year, month, 1));
		scheduler.setEnd(new Date(year, month, resultat));
		
		// load "off" day
		App.DB.get('reservation_salles://off', function(p,r) {
			// add weekends to off day
			var weekends = [];
			for (var i=0;i<r.result.data.length;i++) {
				r.result.data[i].StartDate=r.result.data[i].StartDate.toDate();
				r.result.data[i].EndDate=r.result.data[i].EndDate.toDate();
			};
			for (var i = 1; i < resultat; i++) {
				var d = new Date(year, month, i);
				if (isWeekend(d)) r.result.data.push({
					StartDate: new Date(year, month, i),
					EndDate: new Date(year, month, i + 2),
					Type: "Week-end"
				});
			};
			scheduler.plugins[0].store.loadData(r.result.data);
		});
	},
	
	// Authentication ////////////////////////////////////////////////////////////////
	
	onAuth: function(p,user) {
		
		var now = new Date();
		
		// EVT_CURRENT = Current user
		this.EVT_CURRENT.user = user.mail;
        this.EVT_CURRENT.login = user.id;
		
		// Profiles
		if (user.profiles.indexOf('ADMIN')>-1) Ext.getCmp('MNU_ADMIN').setVisible(true);		
		App.get('Menu#MenuPanel').update();
		
		// Combo Agents
		
		var o = {
			Mail: this.EVT_CURRENT.user,
		};
		
		var store=App.store.create("reservation_salles://agents{Id,prenom+' '+nom=agent+}");
		store.on('load',function(p,r) {
			var rec = { Id: 0, agent: '-- Tous les agents' };
            store.insert(0,rec);			
		});
		App.get("mainform combo#selectAgent").bindStore(store);		
		store.load();
			
		// Combo year
		
		var tab=[];
		var year = now.getFullYear();		
		for (var i=-3;i<=3;i++) tab.push({year:year+i});
		
		var store_year = App.store.create({
			fields: [
				"year"
			],
			data: tab
		});

		App.get('mainform combo#selectAnnee').bindStore(store_year);
		App.get('mainform combo#selectAnnee').setValue(now.getFullYear());		

		// init Scheduler
		
		this.display_scheduler(new Date());
				
	},
	
	// Mainform SHOW //////////////////////////////////////////////////////////////////
	
	onShow: function(p)
	{
		var me=this;
		Auth.login(function(user) {
			me.onAuth(p, user);
		});	
	},
	onLoad: function(p)
	{
				
	}
	
	
});
