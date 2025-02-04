/**
 * Plugin for adding a close context menu to tabs. Note that the menu respects
 * the closable configuration on the tab. As such, commands like remove others
 * and remove all will not remove items that are not closable.
 */
Ext.define('Ext.ux.TabCloseMenu', {
    alias: 'plugin.tabclosemenu',
    mixins: {
        observable: 'Ext.util.Observable'
    },
    /**
     * @cfg {String} closeTabText
     * The text for closing the current tab.
     */
    closeTabText: 'Fermer',
    /**
     * @cfg {Boolean} showCloseOthers
     * Indicates whether to show the 'Close Others' option.
     */
    showCloseOthers: false,
    /**
     * @cfg {String} closeOthersTabsText
     * The text for closing all tabs except the current one.
     */
    closeOthersTabsText: 'Close Other Tabs',
    /**
     * @cfg {Boolean} showCloseAll
     * Indicates whether to show the 'Close All' option.
     */
    showCloseAll: false,
    /**
     * @cfg {String} closeAllTabsText
     * The text for closing all tabs.
     */
    closeAllTabsText: 'Close All Tabs',
    /**
     * @cfg {Array} extraItemsHead
     * An array of additional context menu items to add to the front of the context menu.
     */
    extraItemsHead: null,
    /**
     * @cfg {Array} extraItemsTail
     * An array of additional context menu items to add to the end of the context menu.
     */
    extraItemsTail: null,
    //public
    constructor: function (config) {
        this.addEvents(
            'aftermenu',
            'beforemenu');
        this.mixins.observable.constructor.call(this, config);
    },
    init : function(tabpanel){
        this.tabPanel = tabpanel;
        this.tabBar = tabpanel.down("tabbar");
        this.mon(this.tabPanel, {
            scope: this,
            afterlayout: this.onAfterLayout,
            single: true
        });
    },
    onAfterLayout: function() {
        this.mon(this.tabBar.el, {
            scope: this,
            contextmenu: this.onContextMenu,
            delegate: '.x-tab'
        });
    },
    onBeforeDestroy : function(){
        Ext.destroy(this.menu);
        this.callParent(arguments);
    },
    // private
    onContextMenu : function(event, target){
        var me = this,
            menu = me.createMenu(),
            disableAll = true,
            disableOthers = true,
            tab = me.tabBar.getChildByElement(target),
            index = me.tabBar.items.indexOf(tab);
        me.item = me.tabPanel.getComponent(index);
        me.ctab=me.item;
        //menu.child('*[text="' + me.closeTabText + '"]').setDisabled(!me.item.closable);
        if (me.showCloseAll || me.showCloseOthers) {
            me.tabPanel.items.each(function(item) {
                if (item.closable) {
                    disableAll = false;
                    if (item != me.item) {
                        disableOthers = false;
                        return false;
                    }
                }
                return true;
            });
            if (me.showCloseAll) {
                menu.child('*[text="' + me.closeAllTabsText + '"]').setDisabled(disableAll);
            }
            if (me.showCloseOthers) {
                menu.child('*[text="' + me.closeOthersTabsText + '"]').setDisabled(disableOthers);
            }
        }
        event.preventDefault();
        me.fireEvent('beforemenu', menu, me.item, me);
        menu.showAt(event.getXY());
    },
    createMenu : function() {
        var me = this;
        if (!me.menu) {
            /*var items = [{
                text: me.closeTabText,
                scope: me,
                handler: me.onClose
            }];*/
            var items=[];
            if (me.showCloseAll || me.showCloseOthers) {
                items.push('-');
            }
            if (me.showCloseOthers) {
                items.push({
                    text: me.closeOthersTabsText,
                    scope: me,
                    handler: me.onCloseOthers
                });
            }
            if (me.showCloseAll) {
                items.push({
                    text: me.closeAllTabsText,
                    scope: me,
                    handler: me.onCloseAll
                });
            }
            if (me.extraItemsHead) {
                items = me.extraItemsHead.concat(items);
            }
            if (me.extraItemsTail) {
                items = items.concat(me.extraItemsTail);
            }
            me.menu = Ext.create('Ext.menu.Menu', {
                items: items,
                listeners: {
                    hide: me.onHideMenu,
                    scope: me
                }
            });
        }
        return me.menu;
    },
    onHideMenu: function () {
        var me = this;
        me.item = null;
        me.fireEvent('aftermenu', me.menu, me);
    },
    onClose : function(){
//        this.tabPanel.remove(this.item);
        this.tabPanel.remove(this.ctab);
    },
    onCloseOthers : function(){
        this.doClose(true);
    },
    onCloseAll : function(){
        this.doClose(false);
    },
    doClose : function(excludeActive){
        var items = [];
        this.tabPanel.items.each(function(item){
            if(item.closable){
                /*if(!excludeActive || item != this.item){
                    items.push(item);
                }*/
                if(!excludeActive || item != this.ctab){
                    items.push(item);
                }
            }
        }, this);
        Ext.each(items, function(item){
            this.tabPanel.remove(item);
        }, this);
    }
});

App.view.define('VCreateEvenement', {
    extend: "Ext.window.Window",
    alias: 'widget.VCreateEvenement',
    initComponent: function() {
        this.width = 540;
        this.height = 640;

        this.layout = {
            type: 'vbox'
        };

        this.tbar = [
		{
			text: "Nouvelle session",
            itemId: "newSession",
            iconCls: "new",
			hidden: false
		},
        {
            text: "Supprimer la session",
            iconCls: "minus",
            itemId: "delSession"
        },
        '->',
        {
            text: "Supprimer Evènement",
            iconCls: "del",
            itemId: "delEvent"
        }
        ];
		
        this.defaults = {
            split: true
        };
		
		this.title = "Nouvel évènement";
		
		this.padding = 10;
		
		this.bodyStyle="background-color: #FFFFFF";

        this.items = [
		{
            layout: "anchor",
            margin: 15,
			width: "100%",
            border: false,
            items: [
                //------------ EVENEMENT -------------------------------------------------------
                {
                    layout: "vbox",
                    itemId: "regroupement_hboxGrid1",
                    hidden: false,
                    border: false,
                    items: [
                    {
                        xtype: "textfield",
                        itemId: "num_evt",
                        bindTo: "id_evenement",
                        hidden: true
                    },
                    {
                        xtype: 'ux-searchbox',
                        width: "100%",
                        triggerCls : Ext.baseCSSPrefix + 'form-search-trigger',
                        width: 250,
                        itemId: "insert_numGeff",
                        fieldLabel: "GEFF",
                        bindTo: "num_geff",
                        margin: {
                            bottom: 10
                        }
                    },                        
					{
						layout: "hbox",
						border: false,
						width: "100%",
						items: [
						{
							xtype: "combo",
							width: "100%",
							itemId: "cboTypologie",
							margin: {
								bottom: 10
							},
							flex: 1,
							fieldLabel: "Typologie",
							allowBlank: false,
							editable: false,
							displayField: "nomTypologie",
							valueField: "id_typologie",
                            bindTo: "id_typologie",
							store: App.store.create('resalia://typologie', {
								autoLoad: true
							})
						}
						]
					},
					{
						xtype: 'textfield',
						itemId: "insert_evenement",
						width: "100%",
						fieldLabel: "Nom évènement",
                        bindTo: "nomEvenement",
						allowBlank: false,
						editable: false,
					}, 
					{
						xtype: 'textarea',
						itemId: "insert_descriptif",
						width: "100%",
						fieldLabel: "Commentaires",
                        bindTo: "descriptifEvenement",
                        height: 40,
						editable: false
					},
					{
						xtype: 'combo',
						itemId: "cboSession",
						width: 250,
						fieldLabel: "Session",						
                        editable: false,
                        labelAlign: "left",
                        displayField: "session",
                        valueField: "session_id",
                        queryMode: 'local',
                        store: App.store.create({
                            fields: ["session_id","session"],
                            data: [
                                {
                                 session_id: 1,
                                 session: "Session 1"
                                }
                            ]
                        })
					},                        
					{
						xtype: "combo",
						itemId: "cboCP",
						width: "100%",
						fieldLabel: "Chef de projet",
						allowBlank: false,
						editable: false,
						labelAlign: "left",
						displayField: "agent",
						valueField: "Id",
						store: App.store.create('resalia://agents{Id,nom+" "+prenom=agent+}', {
							autoLoad: true
						})
					}, 
					{
						xtype: "combo",
						itemId: "cboAssistant",
						width: "100%",
						fieldLabel: "Assistant(e)",
						//allowBlank: false,
						editable: false,
						labelAlign: "left",
						displayField: "agent",
						valueField: "Id",
						store: App.store.create('resalia://agents{Id,nom+" "+prenom=agent+}', {
							autoLoad: true
						})
                    },
					{
						xtype: "numberfield",
						margin: {
							bottom: 10
						},							
						itemId: "participant",
						labelAlign: "left",
						allowBlank: false,
						minValue: 0,
						width: 200,
						labelWidth: 100,
						fieldLabel: "Participants"
					},
				{
					layout: "hbox",
					width: "100%",
					border: false,
                    itemId: "avisparution",
					items: [
					{ 				
						xtype: 'radiogroup',
						fieldLabel: 'Avis de parution',						
						width: 350,
						padding: 10,
						itemId: "rdAvis",
						columns: 5,
						vertical: false,
						items: [
						{
							boxLabel: 'Non',
							itemId: "RA1",
							name: 'ra',
							inputValue: '1',
							checked: true,
							listeners: {
								change: function(me) {
									App.get(me.up('window'),'datefield#date_avis').show();
								}
							}
						},
						{
							boxLabel: 'Oui',
							itemId: "RA0",
							name: 'ra',
							inputValue: '0',
							listeners: {
								change: function(me) {
									App.get(me.up('window'),'datefield#date_avis').hide();
								}
							}
						}
						]
					},
					{
						xtype: "datefield",
						itemId: "date_avis",
						padding: 10,
						hidden: true,
						flex: 1
					}
					]
				}					
                    ]
                }
            ]
        },
        {
            layout: "hbox",
            height: 33,
            bodyStyle: "background-color:#D5E2F2",
            width: "100%",
            border: false,            
            items: [
                {
                    bodyStyle: "background-color:#D5E2F2",
                    html: '<div class="modules">Modules</div>',
                    flex: 1,
                    border: false
                },
                {
                    xtype: "button",    
                    text: "Nouveau module",
                    margin: {
                        right: 5,
                        top: 5
                    },
                    itemId: "newmodule"
                }
            ]
        },
		//------------ MODULE -------------------------------------------------------
		{
			border: false,
			flex: 1,
			xtype: 'tabpanel',
            plugins: new Ext.create('Ext.ux.TabCloseMenu', {
                extraItemsTail: [
                    {
                        text: 'Ajouter',
                        itemId: "addMe"
                    },
                    {
                        text: 'Supprimer',
                        itemId: "delMe"
                    }
                ],
                listeners: {
                    aftermenu: function () {
                        //currentItem = null;
                    },
                    beforemenu: function (menu, item) {
                        /*menu.child('[text="Closable"]').setChecked(item.closable);
                        menu.child('[text="Enabled"]').setChecked(!item.tab.isDisabled());
                        currentItem = item;*/
                    }
                }
            }),
            itemId: "modules",
			width: "100%",
			items: [
		
			]
		}
		];
		
        this.bbar = [
		{
                    xtype: "button",
                    text: "Annuler",
                    itemId: "CANCEL_evenement",
                    handler: function(p) {
                        // on raffraichit la grid
                        App.get('mainform schedulergrid#schedule').getEventStore().load();                         
                        p.up('window').close();
                    }
        },
        '->', 
		{
                    xtype: "button",
                    text: "Enregistrer",
                    itemId: "insert_evenement"
		}
        ];

        this.callParent();
    }
});