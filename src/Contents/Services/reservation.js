/*
Reservation
*/

reservation={
	getInfo: function(o,cb)
	{
        reservation.using('db').model('reservation_salles', 'select Id,profil,LOWER(mail) as mail from agents where mail="' + o.Mail + '"', cb);	
	},
	getFree: function(o,cb)
	{
		o.DebutRessource=o.DebutRessource.replace(/T/g,' ');
		o.FinRessource=o.FinRessource.replace(/T/g,' ');
		console.log('select debutRessource,finRessource from ressourcesalles r left join module m on r.id_module=m.id_module left join session s on m.id_session=s.id_session left join evenement e on s.id_evenement=e.id_evenement left join site on r.id_site= site.id_site left join agents on agents.Id=s.chefProjet left join typologie t on t.id_typologie=e.id_typologie where e.status<>"D" and r.status<>"D" and m.status<>"D" and id_salle="' + o.Salle + '" and ((debutRessource between "' + o.DebutRessource + '" and "' + o.FinRessource + '") or (finRessource between "' + o.DebutRessource + '" and "' + o.FinRessource + '") or ("' + o.DebutRessource + '" between debutRessource and finRessource) or ("' + o.FinRessource + '" between debutRessource and finRessource))');
        reservation.using('db').model('reservation_salles', 'select debutRessource,finRessource from ressourcesalles r left join module m on r.id_module=m.id_module left join session s on m.id_session=s.id_session left join evenement e on s.id_evenement=e.id_evenement left join site on r.id_site= site.id_site left join agents on agents.Id=s.chefProjet left join typologie t on t.id_typologie=e.id_typologie where e.status<>"D" and r.status<>"D" and m.status<>"D" and id_salle="' + o.Salle + '" and ((debutRessource between "' + o.DebutRessource + '" and "' + o.FinRessource + '") or (finRessource between "' + o.DebutRessource + '" and "' + o.FinRessource + '") or ("' + o.DebutRessource + '" between debutRessource and finRessource) or ("' + o.FinRessource + '" between debutRessource and finRessource))', cb);	
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
        db.query('reservation_salles', 'select * from evenement left join typologie on typologie.id_typologie=evenement.id_typologie left join session on session.id_evenement=evenement.id_evenement where evenement.status="I" and session.chefProjet='+userId+' and (evenement.id_evenement in (select id_evenement from session where id_session in (select id_session from module where finModule>=NOW()))) order by evenement.id_evenement', function(err, result) {
			console.log(result);
			db.query('reservation_salles', 'select * from session left join evenement on evenement.id_evenement=session.id_evenement left join typologie on typologie.id_typologie=evenement.id_typologie where session.chefProjet='+userId+' and session.status="I" and id_session in (select id_session from module where module.finModule>=NOW()) order by id_session', function(err2, result2) {
				db.query('reservation_salles', 'select module.*,evenement.id_typologie,evenement.id_evenement from module left join session on session.id_session=module.id_session left join evenement on evenement.id_evenement=session.id_evenement where session.chefProjet='+userId+' and module.status="I" and finModule>=NOW() order by id_module', function(err3, result3) {
					
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
							db.query('reservation_salles', 'update module set statutResa="99CC00" where id_module="' + result3[i].id_module + '"', cb);
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