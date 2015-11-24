Officer = {
	login : function(profile,auth_type,cb)
	{
		console.log(profile);
		console.log(auth_type);
		if (auth_type=="cas") {
			/*
			profile.username
			*/
			if (!profile.username) cb({});
			cb({
				mail: profile.username.toLowerCase(),
				profiles: Officer.getProfile(profile.username.toLowerCase().split('@')[0])
			});
		};
		
		
	}
};

module.exports = Officer;