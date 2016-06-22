App = {
	getResa: function(day,cb) {
		var db=App.using('db');
		var date=new Date();
		date.setTime( date.getTime() + day * 86400000 );
		var jour=date.getDay();
		if (jour==0) jour=7;
		db.query('resalia',db.sql('get_all_xml',{days:day}),function(err,response) {
			var result=[];
			for (var i=1;i<8;i++) {
				var status=-1;
				for (var j=0;j<response.length;j++) {
					if (response[j].id_salle==i) status=j;
				};
				if (status==-1) {
					line='<ORDER day="'+jour+'" room="'+i+'" status="0" from="08:00" to="17:00" />';
				} else {
					line='<ORDER day="'+jour+'" room="'+i+'" status="1" from="'+response[status].tdebut+'" to="'+response[status].tfin+'" />';
				};
				result.push(line);
			};
			cb(result);
		});	
	},
	getResaAll: function(day,lines,cb) {
		App.getResa(day,function(response) {
			lines.push(response);
			if (day<7) App.getResaAll(day+1,lines,cb); else cb(lines);
		});
	},
	init: function(app,server) {
		app.use('/tmp',server.static(__dirname + require('path').sep+'tmp'));		
		app.use('/display',server.static(__dirname+require('path').sep+'html'));
		app.use('/participants',function(req,res) {
			// a voir 
		});
		app.use('/display2',function(req,res) {
			var html=[];
			html.push("<html>");
			html.push("<head>");
			html.push("<title>Réservation</title>");
			html.push("</head>");
			html.push('<body style="padding:0px;margin:0px"><table style="width:100%" cellspacing=0 cellpadding=5>');
			var db=App.using('db');
			res.header("Content-Type", "text/html; charset=utf-8");
			db.query('resalia',db.sql('get_all'),function(err,response) {
				if (response.length==0) {
					res.redirect('http://intra.cvrh-aix.i2/');
					return;
				};
				for (var i=0;i<response.length;i++) {
					if (response[i].dfin!=response[i].ddebut) response[i].tfin="18:00:00";
				};		
				var temoin=1;
				for (var i=0;i<response.length;i++) {
					if (temoin==1) {
						var bgcolor="green";
						var color="white";
					} else {
						var bgcolor="lightgreen";
						var color="black";					
					};
					var moment="";
					if (response[i].tdebut.substr(0,5)=="08:00") {
						if (response[i].tfin.substr(0,5)=="18:00") moment="Journée"; else moment="Matin"
					} else moment="Après-midi";
					html.push('<tr>');
					html.push('<td bgcolor='+bgcolor+'><div style="color:'+color+';font-family:tahoma;font-size:24px">'+moment+'<br>'/*+response[i].tfin.substr(0,5)*/+'</div></td>');
					html.push('<td bgcolor='+bgcolor+'><div style="color:'+color+';font-family:tahoma;font-size:24px">'+response[i].nomEvenement+'</div></td>');
					html.push('<td bgcolor='+bgcolor+'><div style="color:'+color+';font-family:tahoma;font-size:24px">'+response[i].nomSalle+'<br><small>'+response[i].lieu+'</small></div></td>');
					html.push('<td bgcolor='+bgcolor+'><div style="color:'+color+';font-family:tahoma;font-size:24px">'+response[i].prenom+' '+response[i].nom+'<br><small>'+response[i].telephone+'</small></div></td>');				
					html.push('</tr>');
					if (temoin==1) temoin=0; else temoin=1;
				};
				html.push("</table></body>");
				html.push("</html>");
				res.end(html.join(''));
			});
		});		
		app.use('/display3',function(req,res) {
			var html=[];
			html.push("<html>");
			html.push("<head>");
			html.push("<title>Réservation</title>");
			html.push("</head>");
			html.push('<body style="padding:0px;margin:0px"><table style="width:100%" cellspacing=0 cellpadding=5>');
			var db=App.using('db');
			res.header("Content-Type", "text/html; charset=utf-8");
			db.query('resalia',db.sql('get_menage'),function(err,response) {
				for (var i=0;i<response.length;i++) {
					if (response[i].dfin!=response[i].ddebut) response[i].tfin="18:00:00";
				};		
				var temoin=1;
				for (var i=0;i<response.length;i++) {
					if (temoin==1) {
						var bgcolor="blue";
						var color="white";
					} else {
						var bgcolor="lightblue";
						var color="black";					
					};
					html.push('<tr>');
					html.push('<td bgcolor='+bgcolor+'><div style="color:'+color+';font-family:tahoma;font-size:24px">'+response[i].nomSalle+'<br>'+response[i].lieu+'</div></td>');
					/*html.push('<td bgcolor='+bgcolor+'><div style="color:'+color+';font-family:tahoma;font-size:24px">'+response[i].nomEvenement+'</div></td>');
					html.push('<td bgcolor='+bgcolor+'><div style="color:'+color+';font-family:tahoma;font-size:24px">'+response[i].nomSalle+'<br><small>'+response[i].lieu+'</small></div></td>');
					html.push('<td bgcolor='+bgcolor+'><div style="color:'+color+';font-family:tahoma;font-size:24px">'+response[i].prenom+' '+response[i].nom+'<br><small>'+response[i].telephone+'</small></div></td>');				*/
					html.push('</tr>');
					if (temoin==1) temoin=0; else temoin=1;
				};
				html.push("</table></body>");
				html.push("</html>");
				res.end(html.join(''));
			});
		});		
		app.get('/get',function(req,res) {
			var db=App.using('db');
			res.header("Content-Type", "application/json; charset=utf-8");
			db.query('resalia',db.sql('get_all'),function(err,response) {
				for (var i=0;i<response.length;i++) {
					if (response[i].dfin!=response[i].ddebut) response[i].tfin="18:00:00";
				};
				res.end(JSON.stringify(response,null,4));
			});
		});
		app.get('/export',function(req,res) {			
			res.header("Content-Type", "text/xml; charset=utf-8");
			var now=JSON.stringify(new Date());
			var header='<?xml version="1.0"?>\n<RESALIA stamp='+now+'>';
			var footer='</RESALIA>';
			var body=[];
			var day=new Date();
			day=day.getDay();
			App.getResaAll(0,[],function(response) {
				for (var i=0;i<response.length;i++) {
					var lines=response[i];
					for (var j=0;j<lines.length;j++) body.push('\t'+lines[j]);
				};
				res.end(header+body.join('\n')+footer);
			});
		});		
	}
};

module.exports = App;