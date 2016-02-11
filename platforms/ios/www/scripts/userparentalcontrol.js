!function(e,t,a){function n(t,a){var n="";n+="<option value=''></option>";var l,o,r,i=[];for(l=0,o=t.length;o>l;l++){if(r=t[l],i.length){var u=i[i.length-1];if(u.Value===r.Value){u.Name+="/"+r.Name;continue}}i.push({Name:r.Name,Value:r.Value})}for(l=0,o=i.length;o>l;l++)r=i[l],n+="<option value='"+r.Value+"'>"+r.Name+"</option>";e("#selectMaxParentalRating",a).html(n)}function l(t,a){var n=[{name:Globalize.translate("OptionBlockBooks"),value:"Book"},{name:Globalize.translate("OptionBlockGames"),value:"Game"},{name:Globalize.translate("OptionBlockChannelContent"),value:"ChannelContent"},{name:Globalize.translate("OptionBlockLiveTvChannels"),value:"LiveTvChannel"},{name:Globalize.translate("OptionBlockLiveTvPrograms"),value:"LiveTvProgram"},{name:Globalize.translate("OptionBlockMovies"),value:"Movie"},{name:Globalize.translate("OptionBlockMusic"),value:"Music"},{name:Globalize.translate("OptionBlockTrailers"),value:"Trailer"},{name:Globalize.translate("OptionBlockTvShows"),value:"Series"},{name:Globalize.translate("OptionBlockOthers"),value:"Other"}],l="";l+='<fieldset data-role="controlgroup">',l+="<legend>"+Globalize.translate("HeaderBlockItemsWithNoRating")+"</legend>";for(var o=0,r=n.length;r>o;o++){var i=n[o],u="unratedItem"+o,c=-1!=a.Policy.BlockUnratedItems.indexOf(i.value)?' checked="checked"':"";l+='<input class="chkUnratedItem" data-itemtype="'+i.value+'" type="checkbox" id="'+u+'"'+c+" />",l+='<label for="'+u+'">'+i.name+"</label>"}l+="</fieldset>",e(".blockUnratedItems",t).html(l).trigger("create")}function o(t,a,o){Dashboard.setPageTitle(a.Name),l(t,a),r(t,a.Policy.BlockedTags),n(o,t);var i="";if(a.Policy.MaxParentalRating)for(var c=0,s=o.length;s>c;c++){var d=o[c];a.Policy.MaxParentalRating>=d.Value&&(i=d.Value)}e("#selectMaxParentalRating",t).val(i),a.Policy.IsAdministrator?e(".accessScheduleSection",t).hide():e(".accessScheduleSection",t).show(),u(t,a.Policy.AccessSchedules||[]),Dashboard.hideLoadingMsg()}function r(t,a){var n='<ul data-role="listview" data-inset="true" data-split-icon="delete">'+a.map(function(e){var t="<li>";return t+='<a href="#">',t+='<div style="font-weight:normal;">'+e+"</div>",t+="</a>",t+='<a class="blockedTag btnDeleteTag" href="#" data-tag="'+e+'"></a>',t+="</li>"}).join("")+"</ul>",l=e(".blockedTags",t).html(n).trigger("create");e(".btnDeleteTag",l).on("click",function(){var e=this.getAttribute("data-tag"),n=a.filter(function(t){return t!=e});r(t,n)})}function i(e,t,a){t.splice(a,1),u(e,t)}function u(t,a){var n='<ul data-role="listview" data-inset="true" data-split-icon="minus">',l=0;n+=a.map(function(e){var t="";return t+='<li class="liSchedule" data-day="'+e.DayOfWeek+'" data-start="'+e.StartHour+'" data-end="'+e.EndHour+'">',t+='<a href="#">',t+="<h3>"+Globalize.translate("Option"+e.DayOfWeek)+"</h3>",t+="<p>"+d(e.StartHour)+" - "+d(e.EndHour)+"</p>",t+="</a>",t+='<a href="#" data-icon="delete" class="btnDelete" data-index="'+l+'">',t+="</a>",t+="</li>",l++,t}).join(""),n+="</ul>";var o=e(".accessScheduleList",t).html(n).trigger("create");e(".btnDelete",o).on("click",function(){i(t,a,parseInt(this.getAttribute("data-index")))})}function c(){Dashboard.hideLoadingMsg(),Dashboard.alert(Globalize.translate("SettingsSaved"))}function s(t,a){t.Policy.MaxParentalRating=e("#selectMaxParentalRating",a).val()||null,t.Policy.BlockUnratedItems=e(".chkUnratedItem:checked",a).map(function(){return this.getAttribute("data-itemtype")}).get(),t.Policy.AccessSchedules=m(a),t.Policy.BlockedTags=p(a),ApiClient.updateUserPolicy(t.Id,t.Policy).then(function(){c(a)})}function d(e){var t=0,a=e%1;return a&&(t=parseInt(60*a)),new Date(2e3,1,1,e,t,0,0).toLocaleTimeString()}function h(t){for(var a="",n=0;24>n;n++)a+='<option value="'+n+'">'+d(n)+"</option>";a+='<option value="24">'+d(0)+"</option>",e("#selectStart",t).html(a),e("#selectEnd",t).html(a)}function g(t,a,n){a=a||{},e("#popupSchedule",t).popup("open"),e("#fldScheduleIndex",t).val(n),e("#selectDay",t).val(a.DayOfWeek||"Sunday"),e("#selectStart",t).val(a.StartHour||0),e("#selectEnd",t).val(a.EndHour||0)}function v(t){var a={DayOfWeek:e("#selectDay",t).val(),StartHour:e("#selectStart",t).val(),EndHour:e("#selectEnd",t).val()};if(parseFloat(a.StartHour)>=parseFloat(a.EndHour))return void alert(Globalize.translate("ErrorMessageStartHourGreaterThanEnd"));var n=m(t),l=parseInt(e("#fldScheduleIndex",t).val());-1==l&&(l=n.length),n[l]=a,u(t,n),e("#popupSchedule",t).popup("close")}function m(t){return e(".liSchedule",t).map(function(){return{DayOfWeek:this.getAttribute("data-day"),StartHour:this.getAttribute("data-start"),EndHour:this.getAttribute("data-end")}}).get()}function p(t){return e(".blockedTag",t).map(function(){return this.getAttribute("data-tag")}).get()}function f(e){require(["prompt"],function(t){t({title:Globalize.translate("LabelTag")}).then(function(t){var a=p(e);-1==a.indexOf(t)&&(a.push(t),r(e,a))})})}t.UserParentalControlPage={onSubmit:function(){var t=e(this).parents(".page");Dashboard.showLoadingMsg();var a=getParameterByName("userId");return ApiClient.getUser(a).then(function(e){s(e,t)}),!1},onScheduleFormSubmit:function(){var t=e(this).parents(".page");return v(t),!1}},e(a).on("pageinit","#userParentalControlPage",function(){var t=this;e(".btnAddSchedule",t).on("click",function(){g(t,{},-1)}),e(".btnAddBlockedTag",t).on("click",function(){f(t)}),h(t),e(".scheduleForm").off("submit",UserParentalControlPage.onScheduleFormSubmit).on("submit",UserParentalControlPage.onScheduleFormSubmit),e(".userParentalControlForm").off("submit",UserParentalControlPage.onSubmit).on("submit",UserParentalControlPage.onSubmit)}).on("pageshow","#userParentalControlPage",function(){var e=this;Dashboard.showLoadingMsg();var t=getParameterByName("userId"),a=ApiClient.getUser(t),n=ApiClient.getParentalRatings();Promise.all([a,n]).then(function(t){o(e,t[0],t[1])})})}(jQuery,window,document);