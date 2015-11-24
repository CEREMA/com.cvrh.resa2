/*
Resources
*/

resources = {
	getAll: function(o,cb) {
		resources.using('db').model('reservation_salles', 'select distinct salle.id_salle Id, concat(site.nomsalle,": ",salle.nomSalle) Name from ressourcesalles,salle,site where salle.id_salle= ressourcesalles.id_salle and site.id_site=salle.id_site and((debutRessource between "' + o.debut + '" and "' + o.fin + '") or (finRessource between  "' + o.debut + '" and "' + o.fin + '") or ( "' + o.debut + '" between debutRessource and finRessource) or ("' + o.fin + '" between debutRessource and finRessource)) order by salle.nomSalle', cb); 
	}
}

module.exports = resources;
