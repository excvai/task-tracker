export interface IStatus {
	readonly id: string;
	color: string;
	text: string;
}

export interface ITimeInterval {
	from: string;
	to: string;
}

export interface IAchievement {
	readonly id: string;
	name: string;
	description?: string;
	icon: string;
}
