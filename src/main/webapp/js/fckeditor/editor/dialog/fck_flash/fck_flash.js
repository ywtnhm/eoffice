var dialog=window.parent;var oEditor=dialog.InnerDialogLoaded();var FCK=oEditor.FCK;var FCKLang=oEditor.FCKLang;var FCKConfig=oEditor.FCKConfig;var FCKTools=oEditor.FCKTools;dialog.AddTab("Info",oEditor.FCKLang.DlgInfoTab);if(FCKConfig.FlashUpload){dialog.AddTab("Upload",FCKLang.DlgLnkUpload);}if(!FCKConfig.FlashDlgHideAdvanced){dialog.AddTab("Advanced",oEditor.FCKLang.DlgAdvancedTag);}function OnDialogTabChange(a){ShowE("divInfo",(a=="Info"));ShowE("divUpload",(a=="Upload"));ShowE("divAdvanced",(a=="Advanced"));}var oFakeImage=dialog.Selection.GetSelectedElement();var oEmbed;if(oFakeImage){if(oFakeImage.tagName=="IMG"&&oFakeImage.getAttribute("_fckflash")){oEmbed=FCK.GetRealElement(oFakeImage);}else{oFakeImage=null;}}window.onload=function(){oEditor.FCKLanguageManager.TranslatePage(document);LoadSelection();GetE("tdBrowse").style.display=FCKConfig.FlashBrowser?"":"none";if(FCKConfig.FlashUpload){GetE("frmUpload").action=FCKConfig.FlashUploadURL;}dialog.SetAutoSize(true);dialog.SetOkButton(true);SelectField("txtUrl");};function LoadSelection(){if(!oEmbed){return;}GetE("txtUrl").value=GetAttribute(oEmbed,"src","");GetE("txtWidth").value=GetAttribute(oEmbed,"width","");GetE("txtHeight").value=GetAttribute(oEmbed,"height","");GetE("txtAttId").value=oEmbed.id;GetE("chkAutoPlay").checked=GetAttribute(oEmbed,"play","true")=="true";GetE("chkLoop").checked=GetAttribute(oEmbed,"loop","true")=="true";GetE("chkMenu").checked=GetAttribute(oEmbed,"menu","true")=="true";GetE("cmbScale").value=GetAttribute(oEmbed,"scale","").toLowerCase();GetE("txtAttTitle").value=oEmbed.title;if(oEditor.FCKBrowserInfo.IsIE){GetE("txtAttClasses").value=oEmbed.getAttribute("className")||"";GetE("txtAttStyle").value=oEmbed.style.cssText;}else{GetE("txtAttClasses").value=oEmbed.getAttribute("class",2)||"";GetE("txtAttStyle").value=oEmbed.getAttribute("style",2)||"";}UpdatePreview();}function Ok(){if(GetE("txtUrl").value.length==0){dialog.SetSelectedTab("Info");GetE("txtUrl").focus();alert(oEditor.FCKLang.DlgAlertUrl);return false;}oEditor.FCKUndo.SaveUndoStep();if(!oEmbed){oEmbed=FCK.EditorDocument.createElement("EMBED");oFakeImage=null;}UpdateEmbed(oEmbed);if(!oFakeImage){oFakeImage=oEditor.FCKDocumentProcessor_CreateFakeImage("FCK__Flash",oEmbed);oFakeImage.setAttribute("_fckflash","true",0);oFakeImage=FCK.InsertElement(oFakeImage);}oEditor.FCKEmbedAndObjectProcessor.RefreshView(oFakeImage,oEmbed);return true;}function UpdateEmbed(a){SetAttribute(a,"type","application/x-shockwave-flash");SetAttribute(a,"pluginspage","http://www.macromedia.com/go/getflashplayer");SetAttribute(a,"src",GetE("txtUrl").value);SetAttribute(a,"width",GetE("txtWidth").value);SetAttribute(a,"height",GetE("txtHeight").value);SetAttribute(a,"id",GetE("txtAttId").value);SetAttribute(a,"scale",GetE("cmbScale").value);SetAttribute(a,"play",GetE("chkAutoPlay").checked?"true":"false");SetAttribute(a,"loop",GetE("chkLoop").checked?"true":"false");SetAttribute(a,"menu",GetE("chkMenu").checked?"true":"false");SetAttribute(a,"title",GetE("txtAttTitle").value);if(oEditor.FCKBrowserInfo.IsIE){SetAttribute(a,"className",GetE("txtAttClasses").value);a.style.cssText=GetE("txtAttStyle").value;}else{SetAttribute(a,"class",GetE("txtAttClasses").value);SetAttribute(a,"style",GetE("txtAttStyle").value);}}var ePreview;function SetPreviewElement(a){ePreview=a;if(GetE("txtUrl").value.length>0){UpdatePreview();}}function UpdatePreview(){if(!ePreview){return;}while(ePreview.firstChild){ePreview.removeChild(ePreview.firstChild);}if(GetE("txtUrl").value.length==0){ePreview.innerHTML="&nbsp;";}else{var a=ePreview.ownerDocument||ePreview.document;var b=a.createElement("EMBED");SetAttribute(b,"src",GetE("txtUrl").value);SetAttribute(b,"type","application/x-shockwave-flash");SetAttribute(b,"width","100%");SetAttribute(b,"height","100%");ePreview.appendChild(b);}}function BrowseServer(){OpenFileBrowser(FCKConfig.FlashBrowserURL,FCKConfig.FlashBrowserWindowWidth,FCKConfig.FlashBrowserWindowHeight);}function SetUrl(b,c,a){GetE("txtUrl").value=b;if(c){GetE("txtWidth").value=c;}if(a){GetE("txtHeight").value=a;}UpdatePreview();dialog.SetSelectedTab("Info");}function OnUploadCompleted(c,a,d,b){window.parent.Throbber.Hide();GetE("divUpload").style.display="";switch(c){case 0:alert("Your file has been successfully uploaded");break;case 1:alert(b);return;case 101:alert(b);break;case 201:alert('A file with the same name is already available. The uploaded file has been renamed to "'+d+'"');break;case 202:alert("Invalid file type");return;case 203:alert("Security error. You probably don't have enough permissions to upload. Please check your server.");return;case 500:alert("The connector is disabled");break;default:alert("Error on file upload. Error number: "+c);return;}SetUrl(a);GetE("frmUpload").reset();}var oUploadAllowedExtRegex=new RegExp(FCKConfig.FlashUploadAllowedExtensions,"i");var oUploadDeniedExtRegex=new RegExp(FCKConfig.FlashUploadDeniedExtensions,"i");function CheckUpload(){var a=GetE("txtUploadFile").value;if(a.length==0){alert("Please select a file to upload");return false;}if((FCKConfig.FlashUploadAllowedExtensions.length>0&&!oUploadAllowedExtRegex.test(a))||(FCKConfig.FlashUploadDeniedExtensions.length>0&&oUploadDeniedExtRegex.test(a))){OnUploadCompleted(202);return false;}window.parent.Throbber.Show(100);GetE("divUpload").style.display="none";return true;}