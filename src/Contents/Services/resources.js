/*
Resources
*/

resources = {
	getAll: function(o,cb) {
		if (o.NumLogin=='0') o._cfg=0;
		if (o._cfg==0){ 
			resources.using('db').model('reservation_salles', 'select id_salle Id,salle.nomSalle Name from salle left join site on site.id_site=salle.id_site where salle.id_site=1 order by salle.nomSalle', cb); 
		}
		else if(o._cfg==2){
				resources.using('db').model('reservation_salles', 'select distinct salle.id_salle Id, concat(site.nomsalle,": ",salle.nomSalle) Name ,s.chefProjet from ressourcesalles r left join module m on r.id_module=m.id_module left join session s on m.id_session=s.id_session left join evenement e on s.id_evenement=e.id_evenement left join site on r.id_site= site.id_site left join agents on agents.Id=s.chefProjet left join salle on salle.id_salle=r.id_salle where s.chefProjet="' + o.NumLogin + '" and ((debutRessource between "' + o.debut + '" and "' + o.fin + '") or (finRessource between  "' + o.debut + '" and "' + o.fin + '") or ( "' + o.debut + '" between debutRessource and finRessource) or ("' + o.fin + '" between debutRessource and finRessource)) and r.status<>"D" order by salle.nomSalle', cb); 
		} else resources.using('db').model('reservation_salles', 'select distinct salle.id_salle Id, concat(site.nomsalle,": ",salle.nomSalle) Name from ressourcesalles,salle,site where salle.id_salle= ressourcesalles.id_salle and site.id_site=salle.id_site and((debutRessource between "' + o.debut + '" and "' + o.fin + '") or (finRessource between  "' + o.debut + '" and "' + o.fin + '") or ( "' + o.debut + '" between debutRessource and finRessource) or ("' + o.fin + '" between debutRessource and finRessource)) order by salle.nomSalle', cb); 
	}
}

module.exports = resources;
