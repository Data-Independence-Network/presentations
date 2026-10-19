import page from 'page'
import { get } from 'svelte/store'
import {
	currentPage,
	currentUrl,
	lastPage,
	lastUrl,
	routeParams,
	showSignIn,
	signedInState,
	user
} from './store'

import { Injected } from '@airport/direction-indicator'

export type Route_Path = string

export type Component = any

export type Route_Authenticated = boolean
export type Route_RightMenu = boolean

export type Route_ParamValue = string

export interface IRouteParamMap {
	[paramName: string]: Route_ParamValue
}

export interface IRoutes {

	configPages(
		config: Array<[Route_Path, Route_RightMenu, Route_RightMenu]>
	): void

	getPageComponent(): Component

	// getTopMenuComponent(): Component

	navigateToPage(
		pageKey: Route_Path,
		paramMap?: {
			[paramName: string]: Route_ParamValue
		}
	): void

	setupRoutes(
		pageMap: {
			[pageKey: string]: Component
		},
		// topMenuMap: {
		// 	[componentKey: string]: Component
		// }
		setPageComp: (pageComp: Component) => void,
		defaultRoutePath: Route_Path,
		errorRoutePath: Route_Path
	): void

	navigateAndPostToAIRport(
		url: string | Object,
		callback?
	)

}

export interface IRouteConfig {

	authenticated: Route_Authenticated
	key: Route_Path
	rightMenu: Route_RightMenu
	url: Route_Path

}

@Injected()
export class Routes
	implements IRoutes {

	private appComp: Component

	private defaultRouteParams: IRouteParamMap = {
		mode: 'build'
	}

	private inProgressParams: IRouteParamMap

	private inProgressUrl: Route_Path

	private pageComp: Component

	private pageConf: {
		[key: string]: IRouteConfig
	} = {}

	// private topMenuComp: Component

	configPages(
		config: Array<[Route_Path, Route_RightMenu, Route_RightMenu]>
	): void {
		this.pageConf = {}

		for (const pathConfig of config) {
			const key = pathConfig[0]

			this.pageConf[key] = {
				authenticated: pathConfig[1],
				key,
				rightMenu: pathConfig[2],
				url: key
			}
		}
	}

	getPageComponent(): Component {
		return this.pageComp
	}

	// getTopMenuComponent(): Component {
	// 	return this.topMenuComp
	// }

	navigateToPage(
		pageKey: Route_Path,
		paramMap: IRouteParamMap = this.defaultRouteParams
	): void {
		const nextPage = this.pageConf[pageKey]
		this.setInProgressState(paramMap, nextPage.url)

		// FIXME: transition navigation to saper
		this.navigateAndPostToAIRport(this.inProgressUrl)

		const previousPage: IRouteConfig = get(currentPage)
		currentPage.set(nextPage)
		lastPage.set(previousPage)
		const previousUrl: Route_Path = get(currentUrl)
		currentUrl.set(nextPage.url)
		lastUrl.set(previousUrl)
		routeParams.set(paramMap)
	}

	navigateAndPostToAIRport(
		url: string | Object,
		callback?
	) {
		page(url, callback)
	}

	setupRoutes(
		pageMap: {
			[pageKey: string]: Component
		},
		setPageComp: (pageComp: Component) => void,
		defaultRoutePath: Route_Path,
		errorRoutePath: Route_Path
	): void {
		this.setupPage(
			this.pageConf[defaultRoutePath],
			pageMap[defaultRoutePath],
			setPageComp,
			errorRoutePath,
			'/'
		)

		for (const pageKey in this.pageConf) {
			this.setupPage(
				this.pageConf[pageKey],
				pageMap[pageKey],
				setPageComp,
				errorRoutePath
			)
		}

		this.navigateAndPostToAIRport({
			hashbang: true
		})
	}

	private setInProgressState(
		paramMap: IRouteParamMap,
		url: Route_Path
	): void {
		this.inProgressUrl = '' + url
		this.inProgressParams = paramMap
		if (paramMap) {
			for (const paramKey in paramMap) {
				this.inProgressUrl = this.inProgressUrl.replace(':' + paramKey, paramMap[paramKey])
			}
		}
	}

	private setPageComp(
		theCurrentPage: IRouteConfig,
		theCurrentUrl: Route_Path,
		theRouteParams: IRouteParamMap,
		PageComp: Component,
		setPageComp: (pageComp: Component) => void
	): void {
		this.pageComp = PageComp

		currentPage.set(theCurrentPage)
		currentUrl.set(theCurrentUrl)
		routeParams.set(theRouteParams)

		setPageComp(PageComp)
	}

	private setupPage(
		pageConfig: IRouteConfig,
		PageComp: Component,
		setPageComp: (pageComp: Component) => void,
		errorRoutePath: Route_Path,
		url = pageConfig.url
	): void {
		page(
			url, (context) => {
				let currentUser = get(user)
				let params = this.inProgressParams
				let nextUrl = this.inProgressUrl

				// if (!this.inProgressUrl) {
				params = this.inProgressParams = context.params
				nextUrl = this.inProgressUrl = context.path
				// }

				if (!pageConfig.authenticated || currentUser) {
					this.setPageComp(pageConfig, nextUrl, params, PageComp, setPageComp)
					return
				}
				if (currentUser) {
					this.setPageComp(pageConfig, nextUrl, params, PageComp, setPageComp)
					return
				}

				// Give Firebase Auth a bit of time to react
				setTimeout(() => {
					currentUser = get(user)
					if (currentUser) {
						this.setPageComp(pageConfig, nextUrl, params, PageComp, setPageComp)
						return
					}
					showSignIn.set(true)

					const signedInStateUnsubscribe = signedInState.subscribe(({ changed, current }) => {
						if (changed.authChecked && current.user) {
							setTimeout(() => {
								signedInStateUnsubscribe()
								showSignIn.set(false)
								this.setPageComp(pageConfig, nextUrl, params, PageComp, setPageComp)
							})
							return
						}
						if (!changed.showSignIn || current.showSignIn) {
							return
						}
						setTimeout(() => {
							signedInStateUnsubscribe()
							showSignIn.set(!current.user)
							this.setPageComp(pageConfig, nextUrl, params, PageComp, setPageComp)
							// if (current.user) {
							// } else {
							// 	// const previousPage = get(lastPage)
							// 	// const previousUrl = get(lastUrl)
							// 	// if (!previousPage || previousPage.authenticated) {
							// 	// 	navigateToPage(IDEA_LIST)
							// 	// } else if (previousUrl) {
							// 	// 	this.navigateAndPostToAIRport(previousUrl)
							// 	// }
							// 	if (!current.currentPage || current.currentPage.authenticated) {
							// 		this.navigateToPage(errorRoutePath)
							// 	} else if (current.currentUrl) {
							// 		this.navigateAndPostToAIRport(current.currentUrl)
							// 	}
							// }
						})
					})
				}, 400)
			})
	}

}
