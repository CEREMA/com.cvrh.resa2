/*
Reservation
*/

reservation={
	getInfo: function(o,cb)
	{
        reservation.using('db').model('resalia', 'select Id,profil,LOWER(mail) as mail from agents where mail="' + o.Mail + '"', cb);	
	},
	getFree: function(o,cb)
	{
        if (o.d=="M") o.d="08:00:00";
        if (o.d=="J") o.d="08:00:00";
        if (o.d=="A") o.d="14:00:00";
        if (o.f=="J") o.f="18:00:00";
        if (o.f=="A") o.f="18:00:00";
        if (o.f=="M") o.f="12:00:00";
		o.DebutRessource=o.DebutRessource.split('T')[0]+' '+o.d;
		o.FinRessource=o.FinRessource.split('T')[0]+' '+o.f;
        console.log("select id_salle, nomSalle from salle where id_site="+o.id_site+" and salle.id_salle not in (select id_salle FROM ressourcesalles WHERE status<>'D' and '"+o.DebutRessource+"' <= finRessource AND '"+o.FinRessource+"' >= debutRessource) order by nomSalle");
        reservation.using('db').model('resalia',"select id_salle, nomSalle from salle where id_site="+o.id_site+" and salle.id_salle not in (select id_salle FROM ressourcesalles WHERE status<>'D' and '"+o.DebutRessource+"' <= finRessource AND '"+o.FinRessource+"' >= debutRessource) order by nomSalle", cb);
	},
	getAllFormations: function(o,cb) {

		var _queryTreeSort;

		_queryTreeSort = function(options) {
		  var cfi, e, i, id, j, k, len, len1, o, pid, ref, ref1, rfi, ri, thisid;
		  id = options.id || "id";
		  pid = options.parentid || "parentid";
		  ri = [];
		  rfi = {};
		  cfi = {};
		  o = [];
		  ref = options.q;
		  for (i = j = 0, len = ref.length; j < len; i = ++j) {
			e = ref[i];
			rfi[e[id]] = i;
			if (cfi[e[pid]] == null) {
			  cfi[e[pid]] = [];
			}
			cfi[e[pid]].push(options.q[i][id]);
		  }
		  ref1 = options.q;
		  for (k = 0, len1 = ref1.length; k < len1; k++) {
			e = ref1[k];
			if (rfi[e[pid]] == null) {
			  ri.push(e[id]);
			}
		  }
		  while (ri.length) {
			thisid = ri.splice(0, 1);
			o.push(options.q[rfi[thisid]]);
			if (cfi[thisid] != null) {
			  ri = cfi[thisid].concat(ri);
			}
		  }
		  return o;
		};
		_makeTree = function(options) {
		  var children, e, i, id, len, o, pid, ref, temp;
		  id = options.id || "id";
		  pid = options.parentid || "parentid";
		  children = options.children || "children";
		  temp = {};
		  o = [];
		  ref = options.q;
		  for (i = 0, len = ref.length; i < len; i++) {
			e = ref[i];
			e[children] = [];
			temp[e[id]] = e;
			if (temp[e[pid]] != null) {
			  temp[e[pid]][children].push(e);
			} else {
			  o.push(e);
			}
		  }
		  return o;
		};		
		var userId=o.userId;
		if (!userId) userId=-1;
		o=o.node;
        var db = reservation.using('db');
		var t=[];
		console.log('select * from evenement left join typologie on typologie.id_typologie=evenement.id_typologie left join session on session.id_evenement=evenement.id_evenement where evenement.status="I" and session.chefProjet='+userId+' and (evenement.id_evenement in (select id_evenement from session where id_session in (select id_session from module where finModule>=NOW()))) order by evenement.id_evenement');
        db.query('resalia', 'select * from evenement left join typologie on typologie.id_typologie=evenement.id_typologie left join session on session.id_evenement=evenement.id_evenement where evenement.status="I" and session.chefProjet='+userId+' and (evenement.id_evenement in (select id_evenement from session where id_session in (select id_session from module where finModule>=NOW()))) order by evenement.id_evenement', function(err, result) {
			console.log(result);
			db.query('resalia', 'select * from session left join evenement on evenement.id_evenement=session.id_evenement left join typologie on typologie.id_typologie=evenement.id_typologie where session.chefProjet='+userId+' and session.status="I" and id_session in (select id_session from module where module.finModule>=NOW()) order by id_session', function(err2, result2) {
				db.query('resalia', 'select module.*,evenement.id_typologie,evenement.id_evenement from module left join session on session.id_session=module.id_session left join evenement on evenement.id_evenement=session.id_evenement where session.chefProjet='+userId+' and module.status="I" and finModule>=NOW() order by id_module', function(err3, result3) {
					
					for (var i = 0; i < result.length; i++) {
				
						t.push({
							id: "E" + result[i].id_evenement,
							parentid: ".",
							text: result[i].nomEvenement,
							typo:result[i].nomTypologie,
							leaf: false,
							statutResa: result[i].statutResaEvenement
						});
						
					};
					
					var sessions={};
					
					for (var i = 0; i < result2.length; i++) {
						if (!sessions["E" + result2[i].id_evenement]) {
							sessions["E" + result2[i].id_evenement]=1;
						} else sessions["E" + result2[i].id_evenement]++;
						t.push({
							parentid: "E" + result2[i].id_evenement,
							id: "S" + result2[i].id_session,
							text: 'Session ' + sessions["E" + result2[i].id_evenement],
							session: parseInt(sessions["E" + result2[i].id_evenement]),
							statutResa: "FFFF00",
							typo: result2[i].nomTypologie,
							leaf: false							
						});
						
					};		
					
					var modules={};
					
					for (var i = 0; i < result3.length; i++) {
						if (!modules["M" + result3[i].id_module]) {
							modules["M" + result3[i].id_module]=1;
						} else modules["M" + result3[i].id_module]++;					
						var debut=result3[i].debutModule;
						var  mm = ((debut.getMonth() + 1) >= 10) ? (debut.getMonth() + 1) : '0' + (debut.getMonth() + 1);
						var dd = ((debut.getDate()) >= 10) ? (debut.getDate()) : '0' + (debut.getDate());
						var yyyy = debut.getFullYear();
						var dateDebut = dd + "/" + mm + "/" + yyyy; //yyyy-mm-dd
					  
						var fin=result3[i].finModule;
						var  mm = ((fin.getMonth() + 1) >= 10) ? (fin.getMonth() + 1) : '0' + (fin.getMonth() + 1);
						var dd = ((fin.getDate()) >= 10) ? (fin.getDate()) : '0' + (fin.getDate());
						var yyyy = fin.getFullYear();
						var dateFin = dd + "/" + mm + "/" + yyyy; //yyyy-mm-dd
						
						
						if(result3[i].statutResaSession=="99CC00" && result3[i].num_geff!="null"){						
							t.push({
								id: "M" + result3[i].id_module,
								parentid: 'S'+result3[i].id_session,
								text: 'Module ' + modules["M" + result3[i].id_module],
								leaf: true,
								module: parseInt(modules["M" + result3[i].id_module]),
								session:result3[i].id_session,
								evenement: result3[i].id_evenement,
								typologie: result3[i].id_typologie,
								statutResa: "99CC00",
								debutModule:dateDebut,
								finModule:dateFin,
								numSession:result3[i].num_session
							});
							db.query('resalia', 'update module set statutResa="99CC00" where id_module="' + result3[i].id_module + '"', cb);
						}

						else
						t.push({
							id: "M" + result3[i].id_module,
							parentid: 'S'+result3[i].id_session,
							text: 'Module ' + modules["M" + result3[i].id_module],
							leaf: true,
							module: parseInt(modules["M" + result3[i].id_module]),
							session:result3[i].id_session,
							typologie: result3[i].id_typologie,
							evenement:result3[i].id_evenement,
							statutResa: result3[i].statutResa,
							debutModule:dateDebut,
							finModule:dateFin,
							numSession:result3[i].num_session
						});
					};
					var response=_queryTreeSort({q:t});
					response=_makeTree({q:response});
					cb(null, response);
				});
			});
		});
	
	}	
};

module.exports=reservation;