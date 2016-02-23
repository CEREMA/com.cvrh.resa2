Officer = {
	login : function(profile,auth_type,cb)
	{
		console.log(profile);
		console.log(auth_type);
		if (auth_type=="cas") {
			/*
			profile.username
			*/
			if (!profile.username) {
				cb({});
				return;
			};
			console.log(profile);
			Officer.using('db').query('reservation_salles','select Id from agents where mail="'+profile.username.toLowerCase()+'"',function(e,r) {
				if (r.length==0) {
					cb({});
					return;
				};
				cb({
					id: r[0].Id,
					mail: profile.username.toLowerCase(),
					profiles: Officer.getProfile(profile.username.toLowerCase().split('@')[0])
				});			
			});
		};
		
		
	}
};

module.exports = Officer;