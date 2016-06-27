FIRST_TIME=1;

function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};

App.controller.define('CMain', {

	views: [
		"VMain",
		"VOpenEvenement",
		"VCreateEvenement",
		"VResaModule",
        "VGeff",
		"admin.VDayOff",
		"admin.VBackoffice",
        "VResNew"
	],
	
	models: [

	],
	
	init: function()
	{

		this.control({
			"menu>menuitem": {
				click: "Menu_onClick"
			},
			
			/*
			Main Screen
			*/            
            
			"mainform": {
				render: "onShow"
			},
			"mainform button#create_event": {
				click: "do_new_evt"
			},
			"mainform button#open_event": {
				click: "do_open_evt"
			},			
            "mainform combo#selectMonth": {
                select: "select_month"
            },
            "mainform combo#selectAgent": {
                select: "select_agent"
            },
            "mainform combo#selectAnnee": {
                select: "select_year"
            },
            "mainform schedulergrid#schedule": {
                /*itemcontextmenu: "resource_context",*/
				/*eventcontextmenu: "event_context",*/
				beforeeventresize: "no_event_resize",
				beforedragcreate: "no_drag_create",
                dragcreateend: "no_grid_drag_end",
                eventdrop: "no_grid_drop",
                eventmouseleave: "grid_mouse_leave",
                eventmouseenter: "grid_mouse_enter",
                eventdblclick: "grid_dblclick"
            },
			/*
			OpenEvenement
			*/ 
			"TOpenEvenement": {
				render: "TOpenEvenement_onShow"
			},
			/*
			VCreateEvenement
			*/
			"VCreateEvenement": {
				show: "VCreateEvenement_onshow"
			},
            "VCreateEvenement combo#cboTypologie": {
                select: "cboTypologie_select"  
            },
            "VCreateEvenement button#newSession": {
                click: "new_session_click"  
            },
            "VCreateEvenement combo#cboSession": {
                select: "cboSessionSelect"  
            },
			"VCreateEvenement ux-searchbox#insert_numGeff" : {
				click: "onGEFF"
			},
            "VCreateEvenement button#insert_evenement": {
                click: "insert_evenement"                  
            },
            "VCreateEvenement button#newmodule": {
                click: "new_module"
            },            
            "VCreateEvenement button#delmodule": {
                click: "del_module"
            },                   
            "VCreateEvenement panel#modules": {
                add: "resamodule_onshow"
            },     
            "VCreateEvenement button#delSession": {
                click: "del_session"
            },
            "VCreateEvenement button#delEvent": {
                click: "del_event"         
            }, 
            "VCreateEvenement datefield#debutModule": {
                select: "debutModule_click" 
            },
            "VCreateEvenement datefield#finModule": {
                select: "finModule_click"
            },            
            "VCreateEvenement radio#RA0": {
                change: "RA_change"
            },
            /*
            VGeff
            */
            "VGeff grid#geff": {
                itemdblclick: "geff_select"
            },
			/*
			VResNew
			*/
			"VResNew": {
				show: "VResNew_onshow"
			},
			"VResNew combo#site": {
				select: "site_onselect"
			},
			"VResNew datefield#d0": {
				select: "d0_select"
			},
			"VResNew datefield#d1": {
				select: "d1_select"
			},
			"VResNew combo#p0": {
				select: "p0_select"
			},
			"VResNew combo#p1": {
				select: "p1_select"
			},
            "VResNew button#record": {
                click: "resa_record"  
            },
            /*
            TOpenEvenement
            */
            "TOpenEvenement":{
                show: "TOpenEvenement_onshow"
            },
            "TOpenEvenement grid": {
                itemdblclick: "openevent_click"  
            },
            /*
            VResaModule
            */
            "VResaModule": {
                beforeclose: "module_beforeclose"
            },
            "VResaModule datefield": {
                select: "resamodule_onchange"  
            },
            "VResaModule button#plus_res": {
                click: "resplus"
            },
            "VResaModule grid": {
                itemdblclick: "resamodule_click",
                itemcontextmenu: "module_context",
            }
		});
		
		App.init('VMain',this.onLoad);
		
	},
	
    // init variables
    
    EVT_CURRENT: {},
    cboTypologie_select: function(p)
    {
        if (p.getValue()>1) {
            App.get(p.up('window'),'ux-searchbox#insert_numGeff').hide(); 
            App.get(p.up('window'),'panel#avisparution').hide();
        } else {
            App.get(p.up('window'),'panel#avisparution').show();
            App.get(p.up('window'),'ux-searchbox#insert_numGeff').show();   
        }
    },
    debutModule_click: function(p)
    {
		App.get(p.up('window'),'datefield#finModule').setMinValue(p.getValue());
        if (p.getValue()>App.get(p.up('window'),'datefield#finModule').getValue()) App.get(p.up('window'),'datefield#finModule').setValue(p.getValue());
    },
    finModule_click: function(p)
    {
        
    },
    RA_change: function(p) {
        if (App.get(p.up('window'),'datefield#date_avis').getValue()=="") App.get(p.up('window'),'datefield#date_avis').setValue(new Date());
        if (!App.get(p.up('window'),'datefield#date_avis').getValue()) App.get(p.up('window'),'datefield#date_avis').setValue(new Date());      
    },
    module_beforeclose: function(panel) {
        var me=this;
        var panels=App.get('VCreateEvenement tabpanel').items.items;
        var activeTabIndex = App.get('VCreateEvenement tabpanel').items.findIndex('id', panel.id)+1;
        if (activeTabIndex!=panels.length) {
            alert('Vous ne pouvez supprimer que le dernier module !');
            return false;                        
        };
        if (activeTabIndex==1) {
            alert('Vous ne pouvez pas supprimer module 1 !');
            return false;                        
        };
        var title='Suppression d\'un module';
        var msg='Vous êtes sur le point de supprimer un module. Voulez vous continuer ?';
        Ext.MessageBox.confirm(title, msg, function(btn){
            if(btn === 'yes'){
                // on delete toutes les ressources associées au module
                App.DB.get('resalia://ressourcesalles{id_ressource}?id_module='+panel.moduleID,function(e,r) {
                    var res=[];
                    for (var i=0;i<r.result.data.length;i++) res.push(r.result.data[i].id_ressource);
                    App.DB.del('resalia://ressourcesalles',res,function(e,r) {
                        App.DB.del('resalia://module?id_module='+panel.moduleID,function(e,r) {
                            // on met à jour la session
                            me.updateSession(panel.up('window'));
                        });
                    });
                });
            }                
        });
        return false;
    },  
    
    // VResaModule
    addMe: function(p,item)
    {
        this.new_module(App.get('VCreateEvenement'));
    },
    delMe: function(p,item)
    {
        
    },
    resamodule_onchange: function(p)
    {
        var obj={
            id_module: p.up('panel').up('panel').moduleID,
            debutModule: App.get(p.up('panel'),"datefield#debutModule").getValue(),
            finModule: App.get(p.up('panel'),"datefield#finModule").getValue()
        };        
        App.DB.post('resalia://module',obj,function(e,r) {
            
        });
    },
    resamodule_click: function(grid)
    {
        var s=grid.getSelectionModel().getSelection();
        var obj=s[0].data;
        obj.dd0=App.get(grid.up('panel').up('panel'),'datefield#debutModule').getValue();
        obj.dd1=App.get(grid.up('panel').up('panel'),'datefield#finModule').getValue();
        obj.grid=grid;
        App.view.create('VResNew',obj).show();
    },
    resamodule_onshow: function(p)
    {
        p.items.items[p.items.items.length-1].setTitle('Module '+p.items.items.length);
    },
    
    // VGeff
    geff_select: function(p,store)
    {
        App.get('VCreateEvenement ux-searchbox#insert_numGeff').setValue(store.data.NumGEFF);
        App.get('VCreateEvenement textfield#insert_evenement').setValue(store.data.Titre_formation);
        p.up('window').close();
    },
    
	// VCreateEvenement
    del_session: function(p,cb)
    {
        var me=this;
        var title='Suppression d\'une session';
        if (p.up('window').session==1) {
            alert("Vous ne pouvez pas supprimer la session 1");
            return;
        };
        if (p.up('window').session!=App.get(p.up('window'),'combo#cboSession').getStore().getCount()) {
            alert("Vous ne pouvez pas supprimer de session intermédiaire");
            return;
        };
        var msg="<b>Vous êtes sur le point de supprimer une session.</b><br><br>Cette action aura pour effet de supprimer tous les modules et toutes les ressources associés à cette session.<br>Cette action est irréversible.<br><br>Voulez vous continuer ?";
        Ext.MessageBox.confirm(title, msg, function(btn){
                if(btn === 'yes'){
                    // on delete toutes les ressources associées au module
                    App.DB.del('resalia://session?id_session='+p.up('window').id_session,function(e,r) {
                        App.get('mainform schedulergrid#schedule').getEventStore().load(); 
                        p.up('window').close();
                    });
                }                
        });        
    },
    del_event: function(p,cb)
    {
        var title='Suppression d\'un évènement';
        var msg="<b>Vous êtes sur le point de supprimer un évènement.</b><br><br>Cette action aura pour effet de supprimer toutes les sessions, tous les modules et toutes les ressources associés à cet évènement.<br>Cette action est irréversible.<br><br>Voulez vous continuer ?";
        Ext.MessageBox.confirm(title, msg, function(btn){
                if(btn === 'yes'){
                    // on delete toutes les ressources associées au module
                    App.DB.del('resalia://evenement?id_evenement='+p.up('window').id_evenement,function(e,r) {
                        App.get('mainform schedulergrid#schedule').getEventStore().load(); 
                        p.up('window').close();
                    });
                }                
        });
    },
    insert_evenement: function(p,cb)
    {
        var me=this;
        p.setDisabled(true);
        if ((App.get(p.up('window'),'ux-searchbox#insert_numGeff').getValue()=="") && (App.get('VCreateEvenement combo#cboTypologie').getValue()==1)) {
            alert('Vous devez donner un numéro GEFF à une formation.');
            p.setDisabled(false);
            return;
        };
        if (App.get(p.up('window'),'textfield#num_evt').getValue()) {
            // UPDATE
            var obj={
                id_evenement: App.get(p.up('window'),'textfield#num_evt').getValue(),
                id_site: 3,
                id_typologie: App.get('VCreateEvenement combo#cboTypologie').getValue(),
                status: 'I',
                nomEvenement: App.get('VCreateEvenement textfield#insert_evenement').getValue(),
                descriptifEvenement: App.get('VCreateEvenement textfield#insert_descriptif').getValue(),
                num_geff: App.get('VCreateEvenement ux-searchbox#insert_numGeff').getValue()
            };  
            if (App.get('VCreateEvenement textfield#insert_evenement').getValue()=="") {
                alert("Le titre de l'évènement n'est pas renseigné");  
                p.setDisabled(false);
                return;
            };
            // on met à jour l'évènement
            App.DB.post('resalia://evenement',obj,function(r){
                var session=p.up('window').session;
                App.DB.get('resalia://session{id_session}?id_evenement='+App.get(p.up('window'),'textfield#num_evt').getValue()+'&num_session='+session,function(e,r) {
                    if (r.result.data.length>0) {
                        var id_session=r.result.data[0].id_session;
                    };
                    p.up('window').id_session=id_session;
                    var obj={
                        id_evenement: App.get(p.up('window'),'textfield#num_evt').getValue(),
                        num_session: session,
                        chefProjet: App.get('VCreateEvenement combo#cboCP').getValue(),
                        assistant: App.get('VCreateEvenement combo#cboAssistant').getValue(),
                        participant: App.get('VCreateEvenement numberfield#participant').getValue(),
                        status: 'I',
                        dateAvis: App.get('VCreateEvenement datefield#date_avis').getValue(),
                        statutResaSession: "FFFF00"
                    };
                    if (id_session) {
                        obj.id_session=id_session;
                        delete obj.num_session;
                        if (App.get('VCreateEvenement datefield#date_avis').getValue()) {
                            // s'il y a un avis, on met à jour les couleurs de toutes les ressources 
                            App.resources.update({session: id_session},function(e,r){
                                console.log(e);   
                                console.log(r);
                            });
                        };
                    };
                    App.DB.post('resalia://session',obj,function(r){
                        // update modules !
                        var panels=App.get('VCreateEvenement panel#modules').items.items;
                        
                        if (!r.insertId) r.insertId=id_session;
                        
                        me.updateModules(panels,r,0,function() {
                            if (isFunction(cb)) {
                                // on raffraichit la grid
                                App.get('mainform schedulergrid#schedule').getEventStore().load();                                
                                p.setDisabled(false);
                                cb(); 
                            } else {
                                p.up('window').close();   
                                // on raffraichit la grid
                                App.get('mainform schedulergrid#schedule').getEventStore().load();                                
                            }
                        });
                    });
                });
            });
            
        }
       
    },
    new_session_click: function(p)
    {
        var count=App.get(p.up('window'),'combo#cboSession').getStore().getCount();
        var me=this;
        // Attention ! Il faut enregistrer la session courante sinon c'est perdu !!!
        this.insert_evenement(App.get("VCreateEvenement button#insert_evenement"),function() {
            App.DB.post('resalia://session',{
                id_evenement: p.up('window').id_evenement,
                num_session: count+1,
                status: "I",
                chefProjet: Auth.User.id
            },function(x) {
                var data=[];
                App.DB.get('resalia://session{num_session+}?id_evenement='+p.up('window').id_evenement,function(e,r) {
                    for (var i=0;i<r.result.data.length;i++) data.push({
                        session_id: r.result.data[i].num_session,
                        session: "Session "+r.result.data[i].num_session
                    }); 
                    App.get(p.up('window'),'combo#cboSession').getStore().loadData(data);
                    App.get(p.up('window'),'combo#cboSession').setValue(count+1);
                    p.up('window').id_session=x.insertId;
                    p.up('window').session=count+1;
                    me.updateSession(p.up('window'));
                });            
            });            
        });
        
    },
    cboSessionSelect: function(p)
    {
        var me=this;
        // On enregistre la session courante avant
        this.insert_evenement(App.get("VCreateEvenement button#insert_evenement"),function() {
            p.up('window').session=p.getValue();
            me.updateSession(p.up('window'));    
        });
    },
    tab_context: function(view,record,item,index,e)
    {
        e.stopEvent();
        var me=this;
        Ext.create('Ext.menu.Menu', {
            items: [
			{
				text: "Supprimer",
                handler: function(p) {       

                    /*var record = view.getStore().getAt(index);                    
                    App.DB.del("resalia://ressourcesalles?id_ressource="+record.data.id_res,function(e) {
                        view.getStore().remove(record);
                    });                    */
                }
			}]
        }).showAt(e.getXY());        
    },
    new_module: function(p)
    {
        var debutModule=new Date();
        debutModule.setDate(debutModule.getDate()-1);
        var finModule=debutModule.addDays(1);        
        App.DB.post('resalia://module',{
            id_session: p.up('window').id_session,
            status: "I",
            num_module: App.get('VCreateEvenement panel#modules').items.items.length+1,
            debutModule: debutModule,
            finModule: finModule
        },function(r) {
            var mod=App.view.create('VResaModule',{moduleID: r.insertId,ID:App.get('VCreateEvenement panel#modules').items.items.length});
            App.get(mod,"datefield#debutModule").setValue(debutModule);
            App.get(mod,"datefield#finModule").setValue(finModule);
            App.get(mod,'datefield#finModule').setMinValue(debutModule);
            App.get('VCreateEvenement panel#modules').add(mod);              
        });
    },
    del_module: function(p)
    {
        var me=this;
        var panels=App.get('VCreateEvenement tabpanel').items.items;
        var panel=App.get('VCreateEvenement tabpanel').getActiveTab();
        var activeTabIndex = App.get('VCreateEvenement tabpanel').items.findIndex('id', panel.id)+1;
        if (activeTabIndex==panels.length) {
            // on delete toutes les ressources associées au module
            App.DB.del('resalia://ressourcesalles?id_module='+panel.moduleID,function(e,r) {
                App.DB.del('resalia://module?id_module='+panel.moduleID,function(e,r) {
                    // on met à jour la session
                    me.updateSession(p.up('window'));
                });
            });
        } else {
            alert('Vous ne pouvez supprimer que le dernier module !');
        }
        
    },
    updateResources: function(data,r,ndx,cb)
    {
        var me=this;
        var dta=data[ndx].data;
        // on poste les évènements dans le scheduler
        var obj={
            id_ressource: dta.id_res,
            id_module: r.insertId,
            id_site: dta.id_site,
            debutRessource: dta.d0,
            finRessource: dta.d1,
            periode: dta.p0,
            periodef: dta.p1,
            afficher: dta.afficher,
            valider: dta.valider,
            preparation: dta.preparation,
            id_choix: dta.choix,
            commentaire: dta.comments
        };
        App.DB.get('resalia://ressourcesalles?id_ressource='+dta.id_res,function(e,r) {
            if (r.result.data.length==0) delete obj.id_ressource;
            App.DB.post('resalia://ressourcesalles',obj,function(e) {
                if (ndx+1<data.length) me.updateResources(data,r,ndx+1,cb); else cb();
            });            
        });
    },
    updateModules: function(panels,r,ndx,cb)
    {
        var me=this;
        var panel=panels[ndx];  
        var obj={
            id_session: r.insertId,
            num_module: panel.title.split('Module ')[1],
            debutModule: App.get(panel,'datefield#debutModule').getValue(),
            finModule: App.get(panel,'datefield#finModule').getValue(),
            status: "I",
            statutResa: "FFFF00"
        };
        if (panel.moduleID) obj.id_module=panel.moduleID;
        var data=App.get(panel,'grid').getStore().data.items;
        var x={
            insertId: panel.moduleID
        };
        if (data.length>0) {
            me.updateResources(data,x,0,function() {
                if (ndx+1<panels.length) me.updateModules(panels,r,ndx+1,cb); else cb();
            });
        } else {
            if (ndx+1<panels.length) me.updateModules(panels,r,ndx+1,cb); else cb();
        }
    },

    updateSession: function(p)
    {
        
        var me=this;

        App.get(p,'combo#cboCP').setValue("");
        App.get(p,'combo#cboAssistant').setValue("");
        App.get(p,'numberfield#participant').setValue("");
        App.get(p,'datefield#date_avis').setValue('');
        App.get(p,'datefield#date_avis').hide();
        
        App.get(p,'radio#RA1').setValue(true);
        
        // on grab la session_id
        App.DB.get('resalia://session{id_session}?num_session='+App.get('VCreateEvenement combo#cboSession').getValue()+'&id_evenement='+p.id_evenement, function(e,r) {
            // on fait remonter au niveau de la fenêtre l'information
            p.id_session=r.result.data[0].id_session;
            p.session=App.get('VCreateEvenement combo#cboSession').getValue();
            
            // on met à jour les modules
            var modules=[];
            var module=[];
            // on clear le panel modules
            while(f = App.get('VCreateEvenement panel#modules').items.first()){
                App.get('VCreateEvenement panel#modules').remove(f, true);
            };
            App.get('VCreateEvenement panel#modules').doLayout();        
            App.DB.get('resalia://module{num_module+,id_module,debutModule,finModule,session.id_session}?session.num_session='+p.session+'&session.id_evenement='+p.id_evenement,function(e,xx) {
                
                if (xx.result.data.length==0) {
                    // pas de module !!! on en crée un !
                    var debutModule=new Date();
                    var finModule=debutModule.addDays(1);
                    App.DB.post('resalia://module',{
                        id_session: p.id_session,
                        status: "I",
                        num_module: 1,
                        debutModule: debutModule,
                        finModule: finModule
                    },function(r) {
                        modules.push(1);
                        module.push({
                            date_debut: debutModule,
                            date_fin: finModule,
                            id_module: r.insertId
                        });                         
                        var session=p.id_session;
                        App.DB.get('resalia://ressourcesalles{*,module.*,session.*}?session.id_session='+session,function(e,r) {                                 if (r.result.data.length>0) {
                                r.result.data.sort(sort_by('num_module'));    
                                // on met à jour le chef de projet et l'assistant
                                App.get(p,'combo#cboCP').setValue(r.result.data[0].chefProjet);
                                App.get(p,'combo#cboAssistant').setValue(r.result.data[0].assistant);
                                App.get(p,'numberfield#participant').setValue(r.result.data[0].participant);
                                App.get(p,'combo#cboCP').disable();
                                if (r.result.data[0].dateAvis) {
                                    App.get(p,'datefield#date_avis').setValue(r.result.data[0].dateAvis.toDate());
                                    App.get(p,'datefield#date_avis').show();
                                    App.get(p,'radio#RA0').setValue(true);                                    
                                }
                            } else {
                                App.get(p,'combo#cboCP').setValue(Auth.User.id);
                                App.get(p,'combo#cboCP').disable();
                            };
                            // on ajoute les modules
                            for (var i=0;i<modules.length;i++) {
                                var mod=App.view.create('VResaModule',{ID: modules[i]});
                                mod.moduleID=module[i].id_module;
                                try {
                                    App.get(mod,'datefield#debutModule').setValue(module[i].date_debut.toDate());
                                    App.get(mod,'datefield#finModule').setValue(module[i].date_fin.toDate());
                                    App.get(mod,'datefield#finModule').setMinValue(module[i].date_debut.toDate());
                                }catch(e){
                                    App.get(mod,'datefield#debutModule').setValue(new Date());
                                    App.get(mod,'datefield#finModule').setValue(new Date());
                                    var d=new Date();
                                    d.setDate(d.getDate() - 1);
                                    App.get(mod,'datefield#finModule').setMinValue(d);
                                };
                                var grid=App.get(mod,'grid');
                                var data=[];
                                for (var j=0;j<r.result.data.length;j++) {
                                    if (r.result.data[j].num_module==modules[i]) {
                                        // on ajoute les éléments à la grid
                                        data.push({
                                              "id_res": r.result.data[j].id_ressource,
                                              "id_site": r.result.data[j].id_site,
                                              "id_salle": r.result.data[j].id_salle,
                                              "nomSalle": r.result.data[j].nom_salle,
                                              "d0": r.result.data[j].debutRessource.toDate(),
                                              "d1": r.result.data[j].finRessource.toDate(),
                                              "p0": r.result.data[j].periode,
                                              "p1": r.result.data[j].periodef,
                                              "afficher": r.result.data[j].afficher,
                                              "valider": r.result.data[j].salleValide,
                                              "preparation": r.result.data[j].preparation,
                                              "choix": r.result.data[j].id_choix,
                                              "comments": r.result.data[j].commentaire
                                        })
                                    }                        
                                }
                                // on bind data a la grid
                                grid.getStore().loadData(data);
                                App.get('VCreateEvenement panel#modules').add(mod);                    
                            }
                        });
                    }); 
                    return;
                };
                console.log(xx.result.data);
                for (var i=0;i<xx.result.data.length;i++) {
                    if (modules.indexOf(xx.result.data[i].num_module)==-1) {
                        modules.push(xx.result.data[i].num_module);
                        module.push({
                            date_debut: xx.result.data[i].debutModule,
                            date_fin: xx.result.data[i].finModule,
                            id_module: xx.result.data[i].id_module
                        });                
                    }
                }; 
                
                var session=xx.result.data[0].id_session;
                App.DB.get('resalia://ressourcesalles{*,module.*,session.*}?session.id_session='+session,function(e,r) {           
                    if (r.result.data.length>0) {
                        r.result.data.sort(sort_by('num_module'));    
                        // on met à jour le chef de projet et l'assistant
                        App.get(p,'combo#cboCP').setValue(r.result.data[0].chefProjet);
                        App.get(p,'combo#cboAssistant').setValue(r.result.data[0].assistant);
                        App.get(p,'numberfield#participant').setValue(r.result.data[0].participant);
                        App.get(p,'combo#cboCP').disable();
                        if (r.result.data[0].dateAvis) {
                            App.get(p,'datefield#date_avis').setValue(r.result.data[0].dateAvis.toDate());
                            App.get(p,'datefield#date_avis').show();
                            App.get(p,'radio#RA0').setValue(true);                                    
                        }
                    } else {
                        App.DB.get('resalia://session?id_session='+session,function(e,x) {
                            // on met à jour le chef de projet et l'assistant
                            App.get(p,'combo#cboCP').setValue(x.result.data[0].chefProjet);
                            App.get(p,'combo#cboAssistant').setValue(x.result.data[0].assistant);
                            App.get(p,'numberfield#participant').setValue(x.result.data[0].participant);
                            App.get(p,'combo#cboCP').disable();                            
                            if (x.result.data[0].dateAvis) {
                                App.get(p,'datefield#date_avis').setValue(x.result.data[0].dateAvis.toDate());
                                App.get(p,'datefield#date_avis').show();
                                App.get(p,'radio#RA0').setValue(true);                                    
                            }
                        });
                    };
                    // on ajoute les modules
                    for (var i=0;i<modules.length;i++) {
                        var mod=App.view.create('VResaModule',{ID: modules[i]});
                        mod.moduleID=module[i].id_module;
                        App.get(mod,'datefield#debutModule').setValue(module[i].date_debut.toDate());
                        App.get(mod,'datefield#finModule').setValue(module[i].date_fin.toDate());
                        App.get(mod,'datefield#finModule').setMinValue(module[i].date_debut.toDate());
                        var grid=App.get(mod,'grid');
                        var data=[];
                        for (var j=0;j<r.result.data.length;j++) {
                            if (r.result.data[j].num_module==modules[i]) {
                                // on ajoute les éléments à la grid
                                data.push({
                                      "id_res": r.result.data[j].id_ressource,
                                      "id_site": r.result.data[j].id_site,
                                      "id_salle": r.result.data[j].id_salle,
                                      "nomSalle": r.result.data[j].nom_salle,
                                      "d0": r.result.data[j].debutRessource.toDate(),
                                      "d1": r.result.data[j].finRessource.toDate(),
                                      "p0": r.result.data[j].periode,
                                      "p1": r.result.data[j].periodef,
                                      "afficher": r.result.data[j].afficher,
                                      "valider": r.result.data[j].salleValide,
                                      "preparation": r.result.data[j].preparation,
                                      "choix": r.result.data[j].id_choix,
                                      "comments": r.result.data[j].commentaire
                                })
                            }                        
                        }
                        // on bind data a la grid
                        grid.getStore().loadData(data);
                        App.get('VCreateEvenement panel#modules').add(mod);                    
                    }
                });
            });        
            
        });
    },
	VCreateEvenement_onshow: function(p)
	{
        var me=this;
        if (p.id_evenement) {            
            App.DB.get('resalia://evenement?id_evenement='+p.id_evenement,p,function(o) {
                App.DB.get('resalia://session{id_session,participant,num_session+}?id_evenement='+p.id_evenement,function(e,r)                       {
                    var data=[];    
                    if (App.get(p,'combo#cboTypologie').getValue()>1) {
                        App.get(p,'ux-searchbox#insert_numGeff').hide(); 
                        App.get(p,'panel#avisparution').hide();
                    } else {
                        App.get(p,'panel#avisparution').show();
                        App.get(p,'ux-searchbox#insert_numGeff').show();   
                    };                    
                    for (var i=0;i<r.result.data.length;i++) data.push({
                        session_uid: r.result.data[i].id_session,
                        session_id: r.result.data[i].num_session,
                        session: 'Session '+r.result.data[i].num_session
                    });                    
                    App.get(p,'combo#cboSession').getStore().loadData(data);
                    App.get(p,'combo#cboSession').setValue(p.session);  
                    for (var i=0;i<data.length;i++) {
                        if (data[i].session_id==p.session) p.id_session=data[i].session_uid;  
                    };
                    // ensuite on met à jour la session
                    me.updateSession(p);
                });
            });
        } else {
            // C'est un nouvel évènement
            App.get(p,'combo#cboTypologie').setValue(1);
            App.get(p,'combo#cboCP').setValue(Auth.User.id);
            App.get(p,'combo#cboCP').disable();
            // on insère ce nouvel évènement provisoire
            App.DB.post('resalia://evenement',{
                id_typologie: 1,
                nomEvenement: "XXX",
                status: "A"
            },function(r) {
                // On crée la nouvelle session attachée a cet évènement
                App.DB.post('resalia://session',{
                    id_evenement: r.insertId,
                    num_session: 1,
                    chefProjet: Auth.User.id
                },function(s) {
                    App.get(p,'textfield#num_evt').setValue(r.insertId);
                    App.get(p,'combo#cboSession').setValue(p.session);
                    p.session=1;
                    p.id_session=s.insertId;
                    p.id_evenement=r.insertId;
                    me.new_module(App.get(p,'combo#cboCP'));
                });
            });
        }
	},
	onGEFF: function(p)
    {
        var value="";
        if (typeof p=="string") value=p; else value=p.getValue();
        App.view.create('VGeff',{
            modal: true            
        }).show();
    },
	// VResNew
	resa_record: function(p) {
        if (App.get(p.up('window'),"combo#salle").getValue()=="") {
            alert("Vous devez sélectionner une salle pour continuer.");
            return;
        };
        if (!App.get(p.up('window'),"combo#salle").getValue()) {
            alert("Vous devez sélectionner une salle pour continuer.");
            return;
        };
        var grid=p.up('window').grid;
        var s=grid.getSelectionModel().getSelection()
        if (s.length>0) {
            var old_obj=s[0].data;
            var row = grid.getStore().indexOf(s[0]);
        };
                    
        var dta=App.getData(p.up('window'));
        if (dta.p0=="J") dta.d0.setHours(8);
        if (dta.p0=="M") dta.d0.setHours(8);
        if (dta.p0=="A") dta.d0.setHours(14);
        if (dta.p1=="J") dta.d1.setHours(18);
        if (dta.p1=="M") dta.d1.setHours(12);
        if (dta.p1=="A") dta.d1.setHours(18);
        
        
        dta.afficher=App.get(p.up('window'),'checkbox#check_valider').getValue();
        dta.valider=App.get(p.up('window'),'checkbox#check_afficher').getValue();
        dta.preparation=App.get(p.up('window'),'checkbox#check_preparation').getValue();
        
        var data=[
        {
            id_site: App.get(p.up('window'),'combo#site').getValue(),
            d0: dta.d0,
            d1: dta.d1,
            p0: dta.p0,
            p1: dta.p1,
            afficher: dta.afficher,
            valider: dta.valider,
            preparation: dta.preparation,
            choix: dta.choix.join(','),
            comments: dta.comment
        }
        ];
        if (old_obj) {
            data[0].id_salle=old_obj.id_salle;
            data[0].nomSalle=old_obj.nomSalle;
        } else {
            data[0].id_salle=App.get(p.up('window'),'combo#salle').getValue();
            data[0].nomSalle=App.get(p.up('window'),'combo#salle').getRawValue();
        };

        var dta=data[0];

        // on poste les évènements dans le scheduler
        var obj={
            id_choix: dta.choix,
            nom_salle: App.get(p.up('window'),'combo#salle').getRawValue(),
            debutRessource: dta.d0,
            periode: dta.p0,
            finRessource: dta.d1,
            periodef: dta.p1,
            preparation: dta.preparation,
            salleValide: dta.valider,
            status: "I",
            commentaire: dta.comments,
            clsRessource: "#EEEEEE",
            afficher: dta.afficher,
            id_module: p.up('window').moduleID
        };
        if (App.get('VCreateEvenement combo#cboTypologie').getValue()==4) obj.clsRessource="red";
        if (old_obj) {
            grid.getStore().removeAt(row);
            obj.id_res=old_obj.id_res;
        } else {
            obj.id_salle=dta.id_salle;
            obj.id_site=dta.id_site;         
        };  
        
        App.DB.post('resalia://ressourcesalles',obj,function(e) {            
            if (old_obj) data[0].id_res=old_obj.id_res; else data[0].id_res=e.insertId;
            grid.getStore().add(data);    
            p.up('window').close();            
        });        
    },
    resplus: function(me) {
        if (App.get(me.up('panel').up('panel'),'datefield#debutModule').getValue()===null) {
            alert('Vous devez sélectionner une date de début et de fin du module');
            return;
        };
        if (App.get(me.up('panel').up('panel'),'datefield#finModule').getValue()===null) {
            alert('Vous devez sélectionner une date de début et de fin du module');
            return;
        };
        
        App.view.create('VResNew',{
            modal: true,
            dd0: App.get(me.up('panel').up('panel'),'datefield#debutModule').getValue(),
            dd1: App.get(me.up('panel').up('panel'),'datefield#finModule').getValue(),
            isNew: true,
            moduleID: me.up('panel').up('panel').moduleID,
            grid: App.get(me.up('panel').up('panel'),'grid#res')
        }).show();
        
    },
	d0_select: function(p)
	{
        var obj={
			DebutRessource: App.get(p.up('window'),'datefield#d0').getValue(),
			FinRessource: App.get(p.up('window'),'datefield#d1').getValue(),
			id_site: App.get(p.up('window'),'combo#site').getValue(),
            d: App.get(p.up('window'),'combo#p0').getValue(),
            f: App.get(p.up('window'),'combo#p1').getValue()
		};
        App.get(p.up('window'),'panel#resa_site').show();
		App.get(p.up('window'),'combo#salle').setValue('');
        App.get(p.up('window'),'combo#salle').getStore().getProxy().extraParams=obj;	
		App.get(p.up('window'),'combo#salle').getStore().load();
	},
	d1_select: function(p)
	{
        var obj={
			DebutRessource: App.get(p.up('window'),'datefield#d0').getValue(),
			FinRessource: App.get(p.up('window'),'datefield#d1').getValue(),
			id_site: App.get(p.up('window'),'combo#site').getValue(),
            d: App.get(p.up('window'),'combo#p0').getValue(),
            f: App.get(p.up('window'),'combo#p1').getValue()
		};
        App.get(p.up('window'),'panel#resa_site').show();
		App.get(p.up('window'),'combo#salle').setValue('');
		App.get(p.up('window'),'combo#salle').getStore().getProxy().extraParams=obj;	        
		App.get(p.up('window'),'combo#salle').getStore().load();
	},
	p0_select: function(p)
	{
        var obj={
			DebutRessource: App.get(p.up('window'),'datefield#d0').getValue(),
			FinRessource: App.get(p.up('window'),'datefield#d1').getValue(),
			id_site: App.get(p.up('window'),'combo#site').getValue(),
            d: App.get(p.up('window'),'combo#p0').getValue(),
            f: App.get(p.up('window'),'combo#p1').getValue()
		};
        if (App.get(p.up('window'),'combo#p0').getValue()=='A') App.get(p.up('window'),'combo#p1').setValue('A');
        if (App.get(p.up('window'),'combo#p0').getValue()=='J') App.get(p.up('window'),'combo#p1').setValue('J');
        App.get(p.up('window'),'panel#resa_site').show();
		App.get(p.up('window'),'combo#salle').setValue('');
        App.get(p.up('window'),'combo#salle').getStore().getProxy().extraParams=obj;	
		App.get(p.up('window'),'combo#salle').getStore().load();
	},
	p1_select: function(p)
	{
        var obj={
			DebutRessource: App.get(p.up('window'),'datefield#d0').getValue(),
			FinRessource: App.get(p.up('window'),'datefield#d1').getValue(),
			id_site: App.get(p.up('window'),'combo#site').getValue(),
            d: App.get(p.up('window'),'combo#p0').getValue(),
            f: App.get(p.up('window'),'combo#p1').getValue()
		};
        if (App.get(p.up('window'),'combo#p1').getValue()=='M') App.get(p.up('window'),'combo#p0').setValue('M');
        if (App.get(p.up('window'),'combo#p1').getValue()=='J') App.get(p.up('window'),'combo#p0').setValue('J');
        App.get(p.up('window'),'panel#resa_site').show();
		App.get(p.up('window'),'combo#salle').setValue('');
		App.get(p.up('window'),'combo#salle').getStore().getProxy().extraParams=obj;	        
		App.get(p.up('window'),'combo#salle').getStore().load();
	},
	VResNew_onshow: function(p)
	{
        var s=p.grid.getSelectionModel().getSelection();        
        if (!p.isNew) {
            App.get(p,'panel#resa_site').hide();  
        };
        if (App.get('combo#cboTypologie').getValue()==1) {
            App.get(p,'checkboxfield#check_valider').hide();
            App.get(p,'checkboxfield#check_afficher').setValue(true);
        };
        if (p.id_site)
        App.get(p,'combo#site').setValue(p.id_site);
        else
		App.get(p,'combo#site').setValue(1);
        if (p.p0)
        App.get(p,'combo#p0').setValue(p.p0);
        else
		App.get(p,'combo#p0').setValue('J');
        if (p.p1)
        App.get(p,'combo#p1').setValue(p.p1);
        else
		App.get(p,'combo#p1').setValue('J');
		App.get(p,'combo#site').getStore().load();		
        
        if (p.valider) App.get(p,'checkboxfield#check_valider').setValue(true);
		if (p.afficher) App.get(p,'checkboxfield#check_afficher').setValue(true);
        if (p.preparation) App.get(p,'checkboxfield#check_preparation').setValue(true);
		App.get(p,'datefield#d0').setMinValue(p.dd0);	
		App.get(p,'datefield#d0').setMaxValue(p.dd1);
		App.get(p,'datefield#d1').setMinValue(p.dd0);		
		App.get(p,'datefield#d1').setMaxValue(p.dd1);
        if (p.d0)
		App.get(p,'datefield#d0').setValue(p.d0);		
        else
        App.get(p,'datefield#d0').setValue(p.dd0);		
        if (p.d1)
		App.get(p,'datefield#d1').setValue(p.d1);
        else
        App.get(p,'datefield#d1').setValue(p.dd1);
        if (p.comments) App.get(p,'textarea#comment').setValue(p.comments);
        if (p.choix) {
            var tab=p.choix.split(',');
            for (var z=0;z<tab.length;z++) tab[z]=tab[z]*1;
            App.get(p,'boxselect#cboChoix').setValue(tab);
        };        
        if (p.id_salle) App.get(p,'combo#salle').setValue(p.id_salle);
        
        var obj={
			DebutRessource: App.get(p,'datefield#d0').getValue(),
			FinRessource: App.get(p,'datefield#d1').getValue(),
			id_site: App.get(p,'combo#site').getValue(),
            d: App.get(p,'combo#p0').getValue(),
            f: App.get(p,'combo#p1').getValue()
		};
        App.get(p,'combo#salle').getStore().getProxy().extraParams=obj;	
		App.get(p,'combo#salle').getStore().load();
	},
	site_onselect: function(p)
	{
		App.get(p.up('window'),'combo#salle').setValue('');
		App.get(p.up('window'),'combo#salle').getStore().getProxy().extraParams.id_site=p.getValue();
		App.get(p.up('window'),'combo#salle').getStore().load();
		/*App.get(p.up('window'),'combo#salle').getStore().getProxy().extraParams={
			DebutRessource: App.get(p.up('window'),'datefield#d0').getValue(),
			FinRessource: App.get(p.up('window'),'datefield#d1').getValue(),
			id_site: p.getValue()
		};
		App.get(p.up('window'),'combo#salle').getStore().load();		*/
	},
	
	// TOpenEvenement
	
	TOpenEvenement_onShow: function()
	{
		App.get('TOpenEvenement treepanel#tree1').getStore().getProxy().extraParams.userId = 7;
        App.get('TOpenEvenement treepanel#tree1').getStore().load();
		App.get('TOpenEvenement treepanel#tree1').getStore().on('load',function() {
			App.get('TOpenEvenement treepanel#tree1').getRootNode().expand(true);	
		});		
	},
	openevent_click: function(p,rec)
    {
        App.view.create('VCreateEvenement',{
            id_evenement: rec.data.id_evenement,
            session: 1,
            module: 1,
            modal: true
        }).show();   
        p.up('window').close();
    },
	// Main Screen events ///////////////////////////////////////////////////////
    
	grid_dblclick: function(v,rec)
    {
        if ((rec.data.assistant==Auth.User.id) || (rec.data.chefProjet==Auth.User.id)) {
            App.view.create('VCreateEvenement',{
                id_evenement: rec.data.id_evenement,
                id_res: rec.data.Id,
                session: rec.data.num_session,
                module: rec.data.num_module,
                chefProjet: rec.data.chefProjet,
                assitant: rec.data.assistant,
                modal: true
            }).show();
            return;
        };
        if (Auth.User.profiles.indexOf('ADMIN')>-1) {
            App.view.create('VCreateEvenement',{
                id_evenement: rec.data.id_evenement,
                id_res: rec.data.Id,
                session: rec.data.num_session,
                module: rec.data.num_module,
                chefProjet: rec.data.chefProjet,
                assitant: rec.data.assistant,
                modal: true
            }).show();            
        };
    },
	select_month: function(p)
	{
		this.display_scheduler(new Date(App.get('combo#selectAnnee').getValue(),p.getValue(),1));
	},
	select_agent: function(p)
	{
		this.display_scheduler(new Date(App.get('combo#selectAnnee').getValue(),App.get('combo#selectMonth').getValue(),1),0,App.get('combo#selectAgent').getValue());
	},
	select_year: function(p)
	{
		this.display_scheduler(new Date(p.getValue(),App.get('combo#selectMonth').getValue(),1));
	},
    module_context: function(view,record,item,index,e) {
        e.stopEvent();
        var me=this;
        Ext.create('Ext.menu.Menu', {
            items: [
			{
				text: "Supprimer la ressource",
                handler: function(p) {                    
                    var record = view.getStore().getAt(index);                    
                    App.DB.del("resalia://ressourcesalles?id_ressource="+record.data.id_res,function(e) {
                        view.getStore().remove(record);
                    });                    
                }
			}]
        }).showAt(e.getXY());        
    },
    resource_context: function(view, record, item, index, e) {
        e.stopEvent();
        Ext.create('Ext.menu.Menu', {
            items: [
			{
				text: "Ajouter évènement"
			},
			{
				text: "Voir la ressource"
			}]
        }).showAt(e.getXY());
    },
    event_context: function(s, rec, e) {
        e.stopEvent();
        Ext.create('Ext.menu.Menu', {
            items: [
			{
				text: "Ajouter évènement"
			},
			{
				text: "Editer évènement"
			}			
			]
        }).showAt(e.getXY());
    },
    no_event_resize: function(p) {
        return false;
    },	
	no_drag_create: function(p) {
		return false;
	},
	no_event_resize: function(p) {
		return false;
	},
	no_drag_create: function(p) {
		return false;	
	},
	no_grid_drag_end: function(p) {
		return false;	
	},
	no_grid_drop: function(p) {
		return false;	
	},
    grid_mouse_leave: function() {
        $('.x-tip').hide();
    },
    grid_mouse_enter: function(view, r, e, eOpts) {
		Ext.create('Ext.tip.ToolTip', {
            html: '',
            listeners: {
                beforeshow: function updateTipBody(tip) {
                    if (r.data.id_typologie != 1) {
						var str= [
							'<div class=typeInfo><span style="font-weight:bold;color:navy">{nomTypologie}</span>',
                            '<div class=typeInfoTitle>{nomEvenement}<br><small>{initial}</small></div>',
                            '<div class=typeInfoDebut><table><tr><td>du <b>{debut}</b> au <b>{fin}</b></table></div>',
							'<div class=typeInfoSalle>{prenom} {nom}</div>',
                            '<div class=typeInfoSalle2>{prenom_assistant} {nom_assistant}</div>',
                            '<div class=typeInfoDebut><table><tr><td>Affichage : <b>{affichage}</b></td></tr></table></div>',
							'</div>'
						];
                    } else {
						var str= [
							'<div class=typeInfo><span style="font-weight:bold;color:navy">{nomTypologie}</span>',
                            '<div class=typeInfoTitle>{nomEvenement}<br><small>{initial}</small></div>',
                            '<div class=typeInfoSession><table><tr><td>session</td><td><b>{num_session}</b></td></tr></table></div>',
                            '<div class=typeInfoSessionModule><table><tr><td>module</td><td><b>{num_module}</b></td></tr></table></div>',
                            '<div class=typeInfoDebut><table><tr><td>du <b>{debut}</b> au <b>{fin}</b></td></tr></table></div>',
                            '<div class=typeInfoDebut><table><tr><td>{dateAvis}</td></tr></table></div>',
                            '<div class=typeInfoDebut><table><tr><td>Nb participants : <b>{nbparticipants}</b></td></tr></table></div>',
                            '<div class=typeInfoDebut><table><tr><td>Affichage : <b>{affichage}</b></td></tr></table></div>',
							'<div class=typeInfoSalle>{prenom} {nom}</div>',
                            '<div class=typeInfoSalle2>{prenom_assistant} {nom_assistant}</div>',                            
							'</div>'
						];
                    };
                    App.DB.get('resalia://agents?Id='+r.data.assistant,function(r2) {                        
                        str = str.join('');
                        str = str.replace('{nomTypologie}', r.data.nomTypologie);
                        str = str.replace('{nomsalle}', r.data.nomsalle);
                        str = str.replace('{nomEvenement}', r.data.nomEvenement);
                        str = str.replace('{num_session}', r.data.num_session);
                        str = str.replace('{num_module}', r.data.num_module);
                        str = str.replace('{initial}', r.data.initial);
                        str = str.replace('{debut}', r.data.debut.toDate().toString('dd/MM/yyyy'));
                        str = str.replace('{fin}', r.data.fin.toDate().toString('dd/MM/yyyy'));
                        str = str.replace('{nom}', r.data.nom);
                        str = str.replace('{prenom}', r.data.prenom);
                        str = str.replace('{nbparticipants}', r.data.participant);
                        if (r.data.afficher==1) 
                        str = str.replace('{affichage}', 'Oui');
                        else
                        str = str.replace('{affichage}', 'Non');
                        if (r.data.dateAvis)
                        str = str.replace('{dateAvis}', '<b>Date avis: </b>'+r.data.dateAvis.toString('d MMMM yyyy'));
                        else
                        str = str.replace("{dateAvis}", "<i>Pas de date d'avis</i>");
                        if (r2.data.length>0) {
                            str = str.replace('{nom_assistant}', r2.data[0].nom);
                            str = str.replace('{prenom_assistant}', r2.data[0].prenom);
                        } else {
                            str = str.replace('{nom_assistant}', "");
                            str = str.replace('{prenom_assistant}', "");
                        }
                        tip.update(str);                        
                    });					
                }
            }
        }).showAt(e.getXY());     
    },
    // VOpenEvenement
    TOpenEvenement_onshow: function(p)
    {
        App.get(p,'grid').getStore().getProxy().extraParams={
            uid: Auth.User.id
        };
        App.get(p,'grid').getStore().load();
    },
	// Menu ////////////////////////////////////////////////////////////////////
	
	do_new_evt: function()
	{
		App.view.create('VCreateEvenement',{
			modal: true,
			session: 1,
            creation: true
		}).show();
	},
	do_open_evt: function()
	{
        App.view.create('VOpenEvenement', {
            modal: true
        }).show();
	},
	do_open_planning: function()
	{
        App.get('schedulergrid#schedule').columns[0].setText("Salles");
		this.display_scheduler(new Date(App.get('mainform combo#selectAnnee').getValue(),App.get('mainform combo#selectMonth').getValue(),1),1);
	},
	do_open_cvrh: function()
	{
        App.get('schedulergrid#schedule').columns[0].setText("Salles");
		this.display_scheduler(new Date(App.get('mainform combo#selectAnnee').getValue(),App.get('mainform combo#selectMonth').getValue(),1),0);
	},
	do_open_mesReservations: function()
	{        
        App.get('schedulergrid#schedule').columns[0].setText("Salles");
		App.get('mainform combo#selectAgent').setValue(this.EVT_CURRENT.login);
		this.display_scheduler(new Date(App.get('mainform combo#selectAnnee').getValue(),App.get('mainform combo#selectMonth').getValue(),1),0,this.EVT_CURRENT.login);
	},
	do_admin_off: function()
	{
		App.view.create('admin.VDayOff', {
            modal: true
        }).show();
	},
	do_admin_db: function()
	{
		App.view.create('admin.VBackoffice', {
            modal: true
        }).show();
	},
	do_display: function()
	{
		$('.my_display').attr('src', "/display");
		App.get('schedulergrid#schedule').hide();	
	},
    do_display2: function()
    {
		window.open(
            "/display2",
            '_blank'
        );
    },
	Menu_onClick: function(p,i,item)
	{        
        if (p.itemId) {
            App.get('schedulergrid#schedule').show();
			switch (p.itemId) {
                case "addMe" :
                    this.addMe(p,item);
                    break;
                case "delMe" :
                    this.delMe(p,item);
                    break;
				case "MNU_DISPLAY" :
					this.do_display();
					break;
				case "MNU_EVT_NEW":
					this.do_new_evt();
					break;
				case "MNU_EVT_OPEN":
					this.do_open_evt();
					break;
				case "MNU_PLANNING":
					this.do_open_planning();
					break;	
				case "MNU_CVRH":
					this.do_open_cvrh();
					break;
				case "MNU_MES_SALLES":
					this.do_open_mesReservations();
					break;
				case "MNU_ADMIN_JF":
					this.do_admin_off();
					break;
				case "MNU_ADMIN_DB":
					this.do_admin_db();
					break;
                case "MNU_DISPLAY2":
                    this.do_display2();
                    break;
				default:
					break;
			};
        };
	},
	
	// Display Scheduler /////////////////////////////////////////////////////////////
	display_scheduler: function(now,salle,agent)
	{
	    // Private methods
        App.now=now;
		function isWeekend(d) {
			return (d.getDay() == 6);
		};
		function days_in_month(month, year) {
			var m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			if (month != 2) return m[month - 1]; //tout sauf février
			if (year % 4 != 0) return m[1]; //février normal non bissextile
			if (year % 100 == 0 && year % 400 != 0) return m[1]; //février bissextile siècle non divisible par 400
			return m[1] + 1; //tous les autres févriers = 29 jours
		};

		var scheduler=App.get('schedulergrid#schedule');		
		scheduler.setTimeColumnWidth(10);
		
		var year=now.getFullYear();
		    
		if (!salle) var salle=0; else {
            
            if (salle!=0) {
                if (salle==1) App.get('schedulergrid#schedule').columns[0].setText("Salles Campus");                
                var mmm=App.get('combo#selectMonth').getValue()+1;
                if (mmm<10) mmm="0"+mmm;
                var debut = now.getFullYear() +'-'+ mmm  + "-01";
                var fin = now.getFullYear() +'-'+ mmm + "-" + days_in_month(App.get('combo#selectMonth').getValue(),year);
                scheduler.getResourceStore().getProxy().extraParams._cfg = salle;
                scheduler.getResourceStore().getProxy().extraParams.debut = debut;
                scheduler.getResourceStore().getProxy().extraParams.fin = fin;
                scheduler.getResourceStore().getProxy().extraParams.NumLogin = agent;
                scheduler.getResourceStore().load();
                scheduler.getEventStore().getProxy().extraParams.NumLogin = agent;
                scheduler.getEventStore().load();
            }
		};
		
        if (!agent) App.get('combo#selectAgent').setValue(0);
		
		scheduler.getResourceStore().getProxy().extraParams._cfg = salle;
		scheduler.getResourceStore().load();	

		var mm = ((now.getMonth() + 1) >= 10) ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
		
		App.get('combo#selectMonth').setValue(parseInt(mm)-1);
		
		var month = App.get('combo#selectMonth').getValue();

		var resultat = days_in_month(mm, year) + 1;
		this.EVT_CURRENT.resultat = resultat - 1;

		scheduler.setStart(new Date(year, month, 1));
		scheduler.setEnd(new Date(year, month, resultat));
        
        if (FIRST_TIME==1) {
            scheduler.scrollToDateCentered( new Date(), true );
            FIRST_TIME=0;
        };
		
		// load "off" day
		App.DB.get('resalia://off', function(p,r) {
			// add weekends to off day
			var weekends = [];
			for (var i=0;i<r.result.data.length;i++) {
				r.result.data[i].StartDate=r.result.data[i].StartDate.toDate();
				r.result.data[i].EndDate=r.result.data[i].EndDate.toDate();
			};
			for (var i = 1; i < resultat; i++) {
				var d = new Date(year, month, i);
				if (isWeekend(d)) r.result.data.push({
					StartDate: new Date(year, month, i),
					EndDate: new Date(year, month, i + 2),
					Type: "Week-end"
				});
			};
			scheduler.plugins[0].store.loadData(r.result.data);
            if (agent) scheduler.getEventStore().getProxy().extraParams.NumLogin=agent; else delete(scheduler.getEventStore().getProxy().extraParams.NumLogin);
            scheduler.getEventStore().load();
		});
        
	},
	
    
	// Authentication ////////////////////////////////////////////////////////////////
	
	onAuth: function(p,user) {
		
		var now = new Date();
		
		// EVT_CURRENT = Current user
		this.EVT_CURRENT.user = user.mail;
        this.EVT_CURRENT.login = user.id;
		
		// Profiles
		if (user.profiles.indexOf('ADMIN')>-1) Ext.getCmp('MNU_ADMIN').setVisible(true);		
		App.get('Menu#MenuPanel').update();
		
		// Combo Agents
		
		var o = {
			Mail: this.EVT_CURRENT.user,
		};
		
		var store=App.store.create("resalia://agents{Id,prenom+' '+nom=agent+}");
		store.on('load',function(p,r) {
			var rec = { Id: 0, agent: '-- Tous les agents' };
            store.insert(0,rec);			
		});
		App.get("mainform combo#selectAgent").bindStore(store);		
		store.load();
			
		// Combo year
		
		var tab=[];
		var year = now.getFullYear();		
		for (var i=-3;i<=3;i++) tab.push({year:year+i});
		
		var store_year = App.store.create({
			fields: [
				"year"
			],
			data: tab
		});

		App.get('mainform combo#selectAnnee').bindStore(store_year);
		App.get('mainform combo#selectAnnee').setValue(now.getFullYear());		

		// init Scheduler
		
		this.display_scheduler(new Date());
        
				
	},
	
	// Mainform SHOW //////////////////////////////////////////////////////////////////
	
	onShow: function(p)
	{
		var me=this;

		Auth.login(function(user) {
			me.onAuth(p, user);
		});	
	},
	onLoad: function(p)
	{

    }
	
	
});
