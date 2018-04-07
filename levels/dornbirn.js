var level_dornbirn = {
	title: 'Dornbirn',
	spawns: [
		{
			type: 'enemy',
			time: 2500,
			conf: {

			}
		},
		{
			type: "platform",
			time: 500
		},
		{
			type: 'enemy',
			time: 1500,
			conf: {
				speed: -ENEMY_SPEED * 1.2
			}
		},
		{
			type: 'enemy',
			time: 2000,
			conf: {

			}
		},
		{
			type: 'finish',
			time: 0,
			conf: {
				
			}
		},
	]
}