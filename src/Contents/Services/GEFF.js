GEFF = {
    get: function(o,cb) {
        var db=GEFF.using('db');
        db.model('resalia','SELECT DISTINCT NumGEFF, Titre_formation FROM geff_imports WHERE GROUP BY Titre_formation ORDER BY NumGEFF',cb);
    },
	import: function(o,cb) {
        console.log('* begin import geff')
		function doSQL(sql,ndx,cb) {
			var db=GEFF.using('db');
			if (ndx<sql.length) {
				db.query('resalia',sql[ndx],function(e,o) {
					doSQL(sql,ndx+1,cb);
				});
			} else {
                 console.log('* end import geff')
                 cb();
            }
		};
		var iconvlite = GEFF.using('iconv-lite');
		var fs = require('fs');

		function readFileSync_encoding(filename, encoding) {
			var content = fs.readFileSync(filename);
			return iconvlite.decode(content, encoding);
		};
		
		function qstr(str) {
			//if (typeof str === 'object') return "";
			try {
				var obj='\''+str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
					switch (char) {
						case "\0":
							return "\\0";
						case "\x08":
							return "\\b";
						case "\x09":
							return "\\t";
						case "\x1a":
							return "\\z";
						case "\n":
							return "\\n";
						case "\r":
							return "\\r";
						case "%":
							return "%";
						case "\"":
						case "'":
						case "\\":
							return "\\"+char; // prepends a backslash to backslash, percent,
											  // and double/single quotes
					}
				})+'\'';
			} catch(e) {
				return '\''+str+'\'';
			};
			return obj;
		};
	
		var db=GEFF.using('db');
		db.query('resalia','select * from geff_imports where date(geff_imports.createdAt)=date(NOW())',function(e,o) {
			if (o.length==0) {
				var fs=require('fs');
				var o=readFileSync_encoding(__dirname+'/../extraction_stagiaire.csv','latin1').split('\n');
				var sql=[];
				var len=o[0].split(';');
				for (var i=0;i<len.length;i++) {
					if (len[i]=="") break;
				};
				len=i;
				sql.push("TRUNCATE geff_imports;");
				for (var i=1;i<o.length;i++) {
					var items=o[i].split(';');
					var str="INSERT INTO geff_imports (CVRH,NumGEFF,Titre_formation,session,module,CP,Assistant,nomenclature_CVRH_theme,nomenclature_CVRH_ss_theme,TypeMO,MO,LOLF,Typologie,Type_formation,Date_debut,Date_fin,Nom_salle,Adresse_Salle,Module_delocalise,Module_annule,Duree_formation,Nom_stagiaire,Prenom_stagiaire,Mail_stagiaire,Presence,Categorie_statutaire,Sexe,Accepte,Motif_refus,Jours_de_presence,Situation_statutaire_stagiaire,Hebergement,Restauration,Nom_service_stagiaire,region,interregion,Numero_departement,Typologie_service,Champ1,Champ2,ORAS,createdAt,updatedAt) VALUES (";
					for (var j=0;j<len;j++) {
						if (j>=14 && j<=15) {
							try {
								var p=items[j].split('-');
								str=str+qstr(p[2]+'-'+p[1]+'-'+p[0])+',';
							}catch(e) {};
						} else	str=str+qstr(items[j])+',';
					};
					str=str+'NOW(),NOW());';
					sql.push(str);		
				};
				doSQL(sql,0,cb);			
			} else cb();
		});
	},
	
	 stagiaire: function(o, cb) {
        var db = reservation.using('db');
         db.get('resalia://geff_imports?NumGEFF='+o.NumGEFF+'&session='+o.Session+'&module='+o.Module,cb);
    },
};

module.exports=GEFF;