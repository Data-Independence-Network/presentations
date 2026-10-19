import { Auth } from './Auth'
import { Routes } from './Routes'
import { RepositoryRecordConverter } from './converter/RepositoryRecordConverter'
import { app } from '@airport/direction-indicator'
import { QueryResultsDeserializer } from '@airport/pressurization'

const publicLogic = app({
	domain: {
		name: 'votecube.com'
	},
	name: 'ui-logic'
})

publicLogic.register(
	Auth, Routes, RepositoryRecordConverter
)

publicLogic.setDependencies(RepositoryRecordConverter, {
	queryResultsDeserializer: QueryResultsDeserializer
})
