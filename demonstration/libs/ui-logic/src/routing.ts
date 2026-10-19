import {
	Routes,
	Route_ParamValue,
	Route_Path,
} from './Routes'
import { APP_CONTAINER } from './container'

export function navigateToPage(
	routePath: Route_Path,
	paramMap?: {
		[paramName: string]: Route_ParamValue
	}
) {
	APP_CONTAINER.get(Routes).then(
		routes => {
			routes.navigateToPage(routePath, paramMap)
		})
}
