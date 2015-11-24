select distinct nomSalle, lieu 
	from salle 
	where 
	id_salle in (select id_salle from ressourcesalles where ressourcesalles.id_module in (select id_module from module where finModule >= DATE_SUB(CONCAT(CURDATE(), ' 00:00:00'), INTERVAL 1 DAY) and finModule < NOW() and status<>"D")) 
	and 
	id_site=1