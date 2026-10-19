import {
	derived,
	get,
	Readable,
	writable
} from 'svelte/store'
import {
	IRouteConfig,
	Route_Path
} from './Routes'

export interface ITextToast {

	seconds: number
	text: string
	time: number

}

export interface IToggleStore
	extends Readable<boolean> {

	toggle(): void

}

export interface ITextToastStore
	extends Readable<ITextToast> {

	toggle(
		newText: string,
		seconds?: number
	): void

}

export interface IUserInfo {
	password: string
	username: string
}

function createShowMainMenu(): IToggleStore {
	const store = writable(false)

	return {
		subscribe: store.subscribe,
		toggle: () => store.set(!get(store))
	}
}

function createTopMenuShown(): IToggleStore {
	const store = writable(false)

	return {
		subscribe: store.subscribe,
		toggle: () => store.set(!get(store))
	}
}

function createTextToast(): ITextToastStore {
	const { set, subscribe } = writable({
		seconds: 0,
		text: '',
		time: null
	})

	return {
		subscribe,
		toggle: (
			newText,
			seconds = 3
		) => {
			set({
				seconds,
				text: newText,
				time: new Date().getTime()
			})
		}
	}
}

export let authChecked = writable(false)
export let cardMove = writable<{ move: number, moved: number[] }>(null)
export let checkSizeIntervalId = writable(-1)
export let cube = writable(false)
// export let currentPage         = writable<any>(null)
export let currentPage = writable<IRouteConfig>(null)
export let currentUrl = writable<Route_Path>('')
export let emInPx = writable(0)
export let forms = writable(null)
export let isDesktop = writable(false)
export let lastPage = writable<IRouteConfig>(null)
export let lastUrl = writable<Route_Path>(null)
export let mode = writable<string>(null)
export let noOverflow = writable(false)
export let pageTitle = writable('TrumentBox')
export let popup = writable<boolean>(false)
export let portalHeight = writable(0)
export let resized = writable(false)
export let routeParams = writable<{ [key: string]: string }>(null)
export let showConfirm = writable(false)
export let showMainMenu = createShowMainMenu()
export let showSignIn = writable(false)
export let text = writable<any>({})
export let textToast = createTextToast()
export const topMenuShown = createTopMenuShown()
export let user = writable<IUserInfo>(null)
export let verticalLayout = writable(true)
export let windowWidth = writable(0)

export let showTopMenu = derived<any, boolean>([
	showMainMenu,
	topMenuShown
],
	([
		$showMainMenu,
		$topMenuShown
	]) => !$showMainMenu && $topMenuShown)

let lastSignedInState = {
	authChecked: false,
	currentPage: null,
	currentUrl: '',
	showSignIn: false,
	user: null
}

export interface ISignedInStateChanged {

	authChecked: boolean
	currentPage: boolean
	currentUrl: boolean
	showSignIn: boolean
	user: boolean

}

export interface ISignedInStateCurrent {

	authChecked: boolean
	currentPage: IRouteConfig
	currentUrl: string
	showSignIn: boolean
	user: IUserInfo

}

export interface ISignedInState {
	changed: ISignedInStateChanged
	current: ISignedInStateCurrent
}

export let signedInState = derived<any, ISignedInState>([
	authChecked,
	currentPage,
	// currentUrl,
	showSignIn,
	user
], ([
	$authChecked,
	$currentPage,
	$currentUrl,
	$showSignIn,
	$user
]) => {
	const changed = {
		authChecked: $authChecked !== lastSignedInState.authChecked,
		currentPage: $currentPage !== lastSignedInState.currentPage,
		currentUrl: $currentUrl !== lastSignedInState.currentUrl,
		showSignIn: $showSignIn !== lastSignedInState.showSignIn,
		user: $user !== lastSignedInState.user
	}

	lastSignedInState = {
		authChecked: $authChecked,
		currentPage: $currentPage,
		currentUrl: $currentUrl,
		showSignIn: $showSignIn,
		user: $user
	}

	return {
		changed,
		current: lastSignedInState
	}
})
