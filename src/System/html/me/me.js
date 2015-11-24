function init()
{
	window.setInterval(function() {
		var d=new Date();
		var h=d.getHours();
		var m=d.getMinutes();
		var s=d.getSeconds();
		if (h*1<10) h='0'+h;
		if (m*1<10) m='0'+m;
		if (s*1<10) s='0'+s;
		$('#heure').html(h+':'+m+':'+s);
		$('#date').html(d.toString('dddd dd MMMM yyyy'));
	},1000);
	$.ajax({
	  url: "/get"
	}).done(function( data ) {
		for (var i=0;i<data.length;i++) {
			var j=i+1;
			var o=data[i];
			console.log(o);
			$('#t'+j+'c1a').html(o.tdebut.substr(0,5));
			$('#t'+j+'c1b').html(o.tfin.substr(0,5));
			$('#t'+j+'c3a').html(o.nomEvenement);
			//$('#t'+j+'c3b').html(o.descriptifEvenement);
			$('#t'+j+'c4').html('<small>'+o.prenom+' '+o.nom+'</small><br><small><small>'+o.telephone+'</small></small>');
			$('#t'+j+'c2').html('salle '+o.nomSalle+'<br><br><small>'+o.lieu+'</small>');
		}
	});
};

