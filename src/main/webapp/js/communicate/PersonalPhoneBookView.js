Ext.ns("PersonalPhoneBookView");var PersonalPhoneBookView=function(){var e;var f=new PhoneBookView();var c=new Ext.tree.TreePanel({region:"west",id:"leftBookPanel",title:"我的通讯分组",collapsible:true,split:true,width:160,height:800,tbar:new Ext.Toolbar({items:[{xtype:"button",iconCls:"btn-refresh",text:"刷新",handler:function(){c.root.reload();}},{xtype:"button",text:"展开",iconCls:"btn-expand",handler:function(){c.expandAll();}},{xtype:"button",text:"收起",iconCls:"btn-collapse",handler:function(){c.collapseAll();}}]}),loader:new Ext.tree.TreeLoader({url:__ctxPath+"/communicate/listPhoneGroup.do"}),root:new Ext.tree.AsyncTreeNode({expanded:true}),rootVisible:false,listeners:{"click":function(p){if(p!=null){var o=Ext.getCmp("PhoneBookView");if(p.id==0){o.setTitle("所有联系人");}else{o.setTitle(p.text+"组列表");}var n=Ext.getCmp("PhoneBookView").dataView.getStore();n.url=__ctxPath+"/communicate/listPhoneBook.do";n.baseParams={groupId:p.id};n.reload({params:{start:0,limit:9}});}}}});function b(n,o){e=new Ext.tree.TreeNode({id:n.id,text:n.text});g.showAt(o.getXY());}c.on("contextmenu",b,c);var g=new Ext.menu.Menu({tbar:new Ext.Toolbar({items:[{text:"刷新",handler:function(){c.root.reload();}}]}),id:"PhoneBookTreeMenu",items:[{text:"新建组",scope:this,iconCls:"btn-add",handler:m},{text:"修改组",scope:this,iconCls:"btn-edit",handler:k},{text:"删除组",scope:this,iconCls:"btn-delete",handler:d},{text:"上移",scope:this,iconCls:"btn-up",handler:h},{text:"下移",scope:this,iconCls:"btn-last",handler:j},{text:"置顶",scope:this,iconCls:"btn-top",handler:l},{text:"置底",scope:this,iconCls:"btn-down",handler:i}]});function m(){new PhoneGroupForm(null);}function k(){var n=e.id;if(n>0){new PhoneGroupForm(n);}else{Ext.MessageBox.show({title:"操作信息",msg:"该处不能被修改",buttons:Ext.MessageBox.OK,icon:"ext-mb-error"});}}function d(){var n=e.id;Ext.Ajax.request({url:__ctxPath+"/communicate/countPhoneGroup.do",params:{"Q_phoneGroup.groupId_L_EQ":n},method:"post",success:function(o,q){var p=Ext.util.JSON.decode(o.responseText).count;Ext.Msg.confirm("删除操作","组里还有"+p+"个联系人，你确定删除目录组吗?",function(r){if(r=="yes"){Ext.Ajax.request({url:__ctxPath+"/communicate/multiDelPhoneGroup.do",params:{ids:n},method:"post",success:function(s,u){Ext.ux.Toast.msg("操作信息","成功删除目录！");c.root.reload();var t=Ext.getCmp("PhoneBookView").dataView.getStore();t.reload({params:{start:0,limit:9}});},failure:function(s,t){Ext.MessageBox.show({title:"操作信息",msg:"信息保存出错，请联系管理员！",buttons:Ext.MessageBox.OK,icon:"ext-mb-error"});}});}});},failure:function(o,p){}});}function h(){var n=e.id;Ext.Ajax.request({url:__ctxPath+"/communicate/movePhoneGroup.do",params:{groupId:n,optId:1},method:"post",success:function(o,p){c.root.reload();},failure:function(o,p){}});}function j(){var n=e.id;Ext.Ajax.request({url:__ctxPath+"/communicate/movePhoneGroup.do",params:{groupId:n,optId:2},method:"post",success:function(o,p){c.root.reload();},failure:function(o,p){}});}function l(){var n=e.id;Ext.Ajax.request({url:__ctxPath+"/communicate/movePhoneGroup.do",params:{groupId:n,optId:3},method:"post",success:function(o,p){c.root.reload();},failure:function(o,p){}});}function i(){var n=e.id;Ext.Ajax.request({url:__ctxPath+"/communicate/movePhoneGroup.do",params:{groupId:n,optId:4},method:"post",success:function(o,p){c.root.reload();},failure:function(o,p){}});}var a=new Ext.Panel({title:"我的通讯薄",iconCls:"menu-personal-phoneBook",layout:"border",id:"PersonalPhoneBookView",height:800,items:[c,f]});return a;};