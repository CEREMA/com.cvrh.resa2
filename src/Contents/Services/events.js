/*
Events
*/

events = {
	getAll: function(o,cb) {
        var db = events.using('db');
		var sql='select e.*, agents.nom, agents.prenom, s.assistant, s.dateAvis, id_ressource Id, id_salle ResourceId, debutRessource StartDate, finRessource EndDate,clsRessource Cls, agents.initial,s.chefProjet,t.nomTypologie,site.nomsalle,s.num_session,m.num_module from ressourcesalles r left join module m on r.id_module=m.id_module left join session s on m.id_session=s.id_session left join evenement e on s.id_evenement=e.id_evenement left join site on r.id_site= site.id_site left join agents on agents.Id=s.chefProjet left join typologie t on t.id_typologie=e.id_typologie where e.status<>"D" and r.status<>"D" and m.status<>"D"';
		if (o.NumLogin) sql+=' and s.chefProjet='+o.NumLogin;
        console.log('-+++++++++++++++++++++++++++++++++-');
        console.log(sql);
        console.log('-+++++++++++++++++++++++++++++++++-');
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
                /*var mm = ((debut.getMonth() + 1) >= 10) ? (debut.getMonth() + 1) : '0' + (debut.getMonth() + 1);
                var dd = ((debut.getDate()) >= 10) ? (debut.getDate()) : '0' + (debut.getDate());
                var yyyy = debut.getFullYear();
                var h = debut.getHours()
                var dateDebut = dd + "/" + mm + "/" + yyyy + " " + h + " h"; //yyyy-mm-dd
                */
                var fin = r.data[i].EndDate;
                /*
                var mm = ((fin.getMonth() + 1) >= 10) ? (fin.getMonth() + 1) : '0' + (fin.getMonth() + 1);
                var dd = ((fin.getDate()) >= 10) ? (fin.getDate()) : '0' + (fin.getDate());
                var yyyy = fin.getFullYear();
                var h = fin.getHours()
                var dateFin = dd + "/" + mm + "/" + yyyy + " " + h + " h"; //yyyy-mm-dd*/
				r.data[i].nomprenom=r.data[i].prenom+' '+r.data[i].nom;
                r.data[i].debut = debut;
                r.data[i].fin = fin;
            };

            cb(e, r);
        });		
	}
}

module.exports = events;