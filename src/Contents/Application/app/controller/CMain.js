var EVT_CURRENT="";

App.controller.define('CMain', {

	views: [
		"VMain"
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
            }			
		});
		
		App.init('VMain',this.onLoad);
		
	},
	
	// Main Screen events ///////////////////////////////////////////////////////
	
	select_month: function(p)
	{
		this.display_scheduler(new Date(App.get('combo#selectAnnee').getValue(),p.getValue(),1));
	},
	select_agent: function(p)
	{
	
	},
	select_year: function(p)
	{
		this.display_scheduler(new Date(p.getValue(),App.get('combo#selectMonth').getValue(),1));
	},
	
	// Menu ////////////////////////////////////////////////////////////////////
	
	do_new_evt: function()
	{
	
	},
	do_open_evt: function()
	{
	
	},
	do_open_planning: function()
	{
	
	},
	do_open_cvrh: function()
	{
	
	},
	do_open_mesReservations: function()
	{
	
	},
	do_open_jf: function()
	{
	
	},
	do_admin_db: function()
	{
	
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
					this.do_open_jf();
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
		var scheduler=App.get('schedulergrid#schedule');		
		
		var year=now.getFullYear();
		
		if (!salle) var salle=0;
		scheduler.getResourceStore().getProxy().extraParams._cfg = salle;
		scheduler.getResourceStore().load();	

		var mm = ((now.getMonth() + 1) >= 10) ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
		
		App.get('combo#selectMonth').setValue(parseInt(mm)-1);

		function isWeekend(d) {
			return (d.getDay() == 6);
		};
		
		var month = App.get('combo#selectMonth').getValue();

		function days_in_month(month, year) {
			var m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			if (month != 2) return m[month - 1]; //tout sauf février
			if (year % 4 != 0) return m[1]; //février normal non bissextile
			if (year % 100 == 0 && year % 400 != 0) return m[1]; //février bissextile siècle non divisible par 400
			return m[1] + 1; //tous les autres févriers = 29 jours
		}

		days_in_month(mm, year);
		var resultat = days_in_month(mm, year) + 1;
		EVT_CURRENT.resultat = resultat - 1;

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
		EVT_CURRENT.user = user.mail;
		
		// Profiles
		if (user.profiles.indexOf('ADMIN')>-1) Ext.getCmp('MNU_ADMIN').setVisible(true);		
		App.get('Menu#MenuPanel').update();
		
		// Combo Agents
		
		var o = {
			Mail: EVT_CURRENT.user,
		};
		
		var store=App.store.create("reservation_salles://agents{Id,prenom+' '+nom=agent+}");
		store.on('load',function(p,r) {
			var rec = { Id: 0, agent: '-----------' };
            store.insert(0,rec);
		});
		App.get("mainform combo#selectAgent").bindStore(store);		
		store.load();
		
		// ???
		
		App.reservation.getInfo(o, function(err, result) {	
			numLogin = result.result.data[0].Id;
			EVT_CURRENT.numLogin = numLogin;
			App.get('schedulergrid#schedule').getEventStore().load();
		});
		
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
