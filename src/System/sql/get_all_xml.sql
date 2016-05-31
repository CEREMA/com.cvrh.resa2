select
	corresp.id_salle, evenement.nomEvenement,evenement.descriptifEvenement,
	date(ressourcesalles.debutRessource) ddebut, date(ressourcesalles.finRessource) dfin,	DATE_FORMAT(ressourcesalles.debutRessource, '%H:%i') tdebut, DATE_FORMAT(ressourcesalles.finRessource, '%H:%i') tfin,
	salle.nomSalle, salle.lieu, agents.nom,agents.prenom,agents.telephone
from
	module
	join session on session.id_session=module.id_session
	join evenement on session.id_evenement=evenement.id_evenement
	join ressourcesalles on ressourcesalles.id_module=module.id_module
	join salle on salle.id_salle=ressourcesalles.id_salle
	join agents on agents.Id=session.chefProjet
	join corresp on corresp.id_resalia=salle.id_salle	
WHERE 
	date(DATE_ADD(NOW(), INTERVAL 0 DAY)) BETWEEN date(ressourcesalles.debutRessource) AND date(ressourcesalles.finRessource)
	AND
	module.status<>"D"