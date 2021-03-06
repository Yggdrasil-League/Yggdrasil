var fs = require('fs');


exports.commands = {

/***********************
	Set Gym Leader
***********************/

	sgl: 'setgymleader',
	setgymleader: function (target, room, user) {
		if (!this.can('makeroom')) return;
		if (!target) return this.sendReply('/setgymleader [league], [type], [user] - Adds user to GL list');
		var targetsArray = target.split(',');
		var target0 = toId(targetsArray[0]);
		var target1 = toId(targetsArray[1]);
		target1 = target1.charAt(0).toUpperCase() + target1.slice(1).toLowerCase();
		var target2 = targetsArray[2];
		if(target1 != 'Fairy' && target1 != 'Bug' && target1 != 'Dragon' && target1 != 'Psychic' && target1 != 'Water' && target1 != 'Fire' && target1 != 'Grass' && target1 != 'Ground' && target1 != 'Rock' && target1 != 'Dark' && target1 != 'Ice' && target1 != 'Electric' && target1 != 'Flying' && target1 != 'Normal' && target1 != 'Poison' && target1 != 'Ghost' && target1 != 'Steel' && target1 != 'Fighting') return this.sendReply ('Please select a valid type');
		if (fs.existsSync('storage-files/'+target0+'gymleaders.json')) {
            		var gymleaderlist = JSON.parse(fs.readFileSync('storage-files/'+target0+'gymleaders.json'));
			gymleaderlist[target1] = target2;
  			fs.writeFile('storage-files/'+target0+'gymleaders.json', JSON.stringify(gymleaderlist));
        	}else{
            		fs.writeFileSync('storage-files/'+target0+'gymleaders.json', '{}');
            		var gymleaderlist = JSON.parse(fs.readFileSync('storage-files/'+target0+'gymleaders.json'));
		    	gymleaderlist[target1] = target2;
  		    	fs.writeFile('storage-files/'+target0+'gymleaders.json', JSON.stringify(gymleaderlist));
        	}
		
		this.sendReply(target2 + ' has now been set as ' + target1 + ' Gym Leader for ' + target0 + '.');
		
		return;
	},

	vgl: 'viewgymleaders',
	viewgymleaders: function (target, room, user) {
		if (!this.canBroadcast()) return;
		if(!target) return this.sendReply ('/viewgymleaders [league] - Displays the list of Gym Leaders for selected league.');
		target = toId(target);
		if (fs.existsSync('storage-files/'+target+'gymleaders.json')) { 
  			var gymleaderlist = JSON.parse(fs.readFileSync('storage-files/'+target+'gymleaders.json'));
		}else{
			return this.sendReply ('League doesn\'t exist or hasn\'t set up a Gym Leader list.');
		}
		
		var glList = '<center><table><tr><td><b>Type</b></td><td><b>Gym Leader<b></td><td><b>Last Seen</b></td></tr><br/>';
		for (type in gymleaderlist) {
			var lastSeen = (Users.get(gymleaderlist[type]) && Users.get(toId(gymleaderlist[type])).connected) ? '<font color = "green"> online.</font>' : Core.getLastSeen(toId(gymleadrlist[type])).split(",")[0] + ' ago';
			glList += '<tr><td>' + '<img src="http://play.pokemonshowdown.com/sprites/types/' + type + '.png">' + '</td>' + '<td>' + gymleaderlist[type] + ': ' + '</td>' + '<td>' + lastSeen + '</td>' + '</tr>';
		}
		this.sendReplyBox(glList + '</table>');
	}
};
