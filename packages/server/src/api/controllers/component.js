const { DocumentTypes, getPluginParams } = require("../../db/utils")
const { getComponentLibraryManifest } = require("../../utilities/fileSystem")
const { getAppDB } = require("@budibase/backend-core/context")
const { getGlobalDB } = require("@budibase/backend-core/tenancy")

exports.fetchAppComponentDefinitions = async function (ctx) {
  const db = getAppDB()
  const app = await db.get(DocumentTypes.APP_METADATA)

  let componentManifests = await Promise.all(
    app.componentLibraries.map(async library => {
      let manifest = await getComponentLibraryManifest(library)
      return {
        manifest,
        library,
      }
    })
  )
  const definitions = {}
  for (let { manifest, library } of componentManifests) {
    for (let key of Object.keys(manifest)) {
      if (key === "features") {
        definitions[key] = manifest[key]
      } else {
        const fullComponentName = `${library}/${key}`.toLowerCase()
        definitions[fullComponentName] = {
          component: fullComponentName,
          ...manifest[key],
        }
      }
    }
  }

  // Add custom components
  const globalDB = getGlobalDB()
  const response = await globalDB.allDocs(
    getPluginParams(null, {
      include_docs: true,
    })
  )
  response.rows
    .map(row => row.doc)
    .filter(plugin => plugin.schema.type === "component")
    .forEach(plugin => {
      const fullComponentName = `plugin/${plugin.name}/${plugin.version}`
      definitions[fullComponentName] = {
        component: fullComponentName,
        ...plugin.schema.schema,
      }
    })

  ctx.body = definitions
}
