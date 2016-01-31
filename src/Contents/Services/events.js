/*
Events
*/

events = {
    get: function(o,cb) {
        var db = events.using('db');
        var sql='SELECT * FROM evenement WHERE id_evenement in (SELECT id_evenement FROM session WHERE chefProjet='+o.uid+' or assistant='+o.uid+')';
        db.model('reservation_salles',sql,cb);
    },
	getAll: function(o,cb) {
        var db = events.using('db');
		var sql='select e.*, agents.nom, agents.prenom, s.assistant, s.dateAvis, id_ressource Id, id_salle ResourceId, debutRessource StartDate, finRessource EndDate,clsRessource Cls, agents.initial,s.chefProjet,t.nomTypologie,site.nomsalle,s.num_session,m.num_module from ressourcesalles r left join module m on r.id_module=m.id_module left join session s on m.id_session=s.id_session left join evenement e on s.id_evenement=e.id_evenement left join site on r.id_site= site.id_site left join agents on agents.Id=s.chefProjet left join typologie t on t.id_typologie=e.id_typologie where e.status<>"D" and r.status<>"D" and m.status<>"D"';
		if (o.NumLogin) sql+=' and s.chefProjet='+o.NumLogin;
		db.model('reservation_salles', sql, function(e, r) {
            r.metaData.fields.push({
                name: "debut",
                type: "string",
                length: 10
            });
            r.metaData.fields.push({
                name: "fin",
                type: "string",
                length: 10
            });

            for (var i = 0; i < r.data.length; i++) {
                var debut = r.data[i].StartDate;
                var fin = r.data[i].EndDate;
				r.data[i].nomprenom=r.data[i].prenom+' '+r.data[i].nom;
                r.data[i].debut = debut;
                r.data[i].fin = fin;
            };

            cb(e, r);
        });		
	}
}

module.exports = events;