var fs = require('fs');
var gymleaderlist = JSON.parse(fs.readFileSync('storage-files/gymleaders.json'));

exports.commands = {

/***********************
	Set Gym Leader
***********************/

	sgl: 'setgymleader',
	setgymleader: function (target, room, user) {
		if (!this.can('makeroom')) return;
		if (!target) return this.sendReply('/setgymleader [type], [user] - Adds user to GL list');
		var targetsArray = target.split(',');
		var target0 = targetsArray[0];
		var target1 = targetsArray[1];
		this.sendReply(target1 + ' has now been set as ' + target0 + ' Gym Leader.');
		gymleaderlist[target0] = target1;
		fs.writeFile('storage-files/gymleaders.json', JSON.stringify(gymleaderlist));
		return;
	},

/***********************
	View Gym Leader
***********************/

	vgl: 'viewgymleaders',
	viewgymleaders: function (target, room, user) {
		if (!this.canBroadcast()) return;
		var glList = '<center><table><tr><td><b>Type</b></td><td><b>Gym Leader<b></td><td><b>Last Seen</b></td></tr><br/>';
		for (type in gymleaderlist) {
			var lastSeen = dates.lastSeen(toId(gymleadrlist[type])) + ' ago';
			if (Users.get(gymleaderlist[type]) && Users.get(toId(gymleaderlist[type])).connected) 
				lastSeen = '<font color = "green"> online.</font>';
			glList += '<tr><td>' + '<img src="http://yggdrasilleague.no-ip.org:25565/storage-files/Types/' + type + '.png">' + '</td>' + '<td>' + gymleaderlist[type] + ': ' + '</td>' + '<td>' + lastSeen + '</td>' + '</tr>';
		}
		this.sendReplyBox(glList + '</table>');
	}
};
