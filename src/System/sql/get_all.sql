select
	evenement.nomEvenement,evenement.descriptifEvenement,
	date(ressourcesalles.debutRessource) ddebut, date(ressourcesalles.finRessource) dfin,	time(ressourcesalles.debutRessource) tdebut, time(ressourcesalles.finRessource) tfin,
	salle.nomSalle, salle.lieu, agents.nom,agents.prenom,agents.telephone
from
	module
	join session on session.id_session=module.id_session
	join evenement on session.id_evenement=evenement.id_evenement
	join ressourcesalles on ressourcesalles.id_module=module.id_module
	join salle on salle.id_salle=ressourcesalles.id_salle
	join agents on agents.Id=session.chefProjet
WHERE 
	date(NOW()) BETWEEN date(ressourcesalles.debutRessource) AND date(ressourcesalles.finRessource)
	AND
	ressourcesalles.afficher=1
	AND
	module.status<>"D"