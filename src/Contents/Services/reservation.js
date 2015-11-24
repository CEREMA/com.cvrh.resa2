/*
Reservation
*/

reservation={
	getInfo: function()
	{
        reservation.using('db').model('reservation_salles', 'select Id,profil,LOWER(mail) as mail from agents where mail="' + o.Mail + '"', cb);	
	}
};

module.exports=reservation;