export abstract class UserHelper {
	public static getRedisId(id: number | string): string {
		return `user:id:${id}`;
	}

	public static getRedisEmail(email: string): string {
		return `user:email:${email}`;
	}
}
