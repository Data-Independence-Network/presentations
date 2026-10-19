import { Injected } from '@airport/direction-indicator';
import {
	BehaviorSubject,
	Observable
} from 'rxjs'
import {
	IUserInfo,
	user
} from './store'

export interface IAuthError {

	code?: string;
	message?: string;

}

export type Auth_Password = string;

export interface IAuth {

	getUser(): IUserInfo

	reactToUser(): Promise<Observable<IUserInfo>>

	signIn(
		username: string,
		password: string
	): Promise<void>

	signOut(): Promise<void>

	/*
	signUp(
		countryId: number, 
		birthMonth: number, 
		email: string, 
		username: string
	): Promise<IAuthError | void>
	*/
}

@Injected()
export class Auth
	implements IAuth {

	user: IUserInfo

	getUser(): IUserInfo {
		return this.user
	}

	async reactToUser(): Promise<Observable<IUserInfo>> {
		const subject = new BehaviorSubject<IUserInfo>(null)

		return subject
	}

	async signIn(
		username: string,
		password: string
	): Promise<void> {
		// TODO: generate RSA public/private keys and save them to local storage

		this.user = {
			password,
			username
		}
		user.set(this.user)

		// return userAccount
		// return this.user
	}

	async signOut(): Promise<void> {
		this.user = null
		user.set(null)
	}

	// private async encodePassword(
	// 	password: Auth_Password
	// ): Promise<UserAccount_PasswordHash> {
	// 	const jsSHA = await import('jssha/src/sha512')

	// 	const shaObj = new jsSHA.default('SHA-512', 'TEXT')
	// 	shaObj.update(password)

	// 	return shaObj.getHash('B64')
	// }

}
