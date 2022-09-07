import {
  DatasourceFieldType,
  Integration,
  QueryType,
  SqlQuery,
  Table,
} from "@budibase/types"

import { BigQuery, BigQueryOptions } from "@google-cloud/bigquery"

const SCHEMA: Integration = {
  docs: "https://cloud.google.com/bigquery/docs",
  datasource: {
    projectId: {
      type: DatasourceFieldType.STRING,
      required: true,
    },
    datasetId: {
      type: DatasourceFieldType.STRING,
      required: true,
    },
    apiEndpoint: {
      type: DatasourceFieldType.STRING,
      required: false,
    },
    email: {
      type: DatasourceFieldType.STRING,
      required: true,
    },
    privateKey: {
      type: DatasourceFieldType.STRING,
      required: true,
    },
  },
  query: {
    create: {
      type: QueryType.SQL,
    },
    read: {
      type: QueryType.SQL,
    },
    update: {
      type: QueryType.SQL,
    },
    delete: {
      type: QueryType.SQL,
    },
  },
  friendlyName: "BigQuery",
  type: "Relational",
  description:
    "BigQuery is a serverless, cost-effective and multicloud data warehouse designed to help you turn big data into valuable business insights.",
}

interface BigQueryConfig extends BigQueryOptions {
  projectId: string
  datasetId: string
  apiEndpoint?: string
  email: string
  privateKey: string
}

class BigQueryIntegration {
  private client: any
  private static readonly BIG_QUERY_SCOPES = [
    "https://www.googleapis.com/auth/bigquery",
    "https://www.googleapis.com/auth/drive",
  ]
  private readonly datasetId: string
  constructor(config: BigQueryConfig) {
    this.client = new BigQuery({
      projectId: config.projectId,
      apiEndpoint: config.apiEndpoint ? config.apiEndpoint : undefined,
      credentials: {
        client_email: config.email,
        private_key: config.privateKey?.replace(/\\n/g, "\n"),
      },
      scopes: BigQueryIntegration.BIG_QUERY_SCOPES,
    })

    this.datasetId = config.datasetId

    this.createDatasetIfDoesNotExist()
    this.buildSchema("hello", {})
  }

  async createDatasetIfDoesNotExist() {
    // TODO: To prevent a race condition, try to create dataset first, only
    // return if error creating because it already exists.
    try {
      const existingDataset = await this.client.dataset(this.datasetId).get()
      if (!existingDataset) {
        await this.client.createDataset(this.datasetId)
      }
    } catch (err: any) {
      throw err?.message.split(":")[1] || err?.message
    }
  }

  async internalQuery(query: SqlQuery) {
    try {
      return await this.client.createQueryJob(query.sql)
    } catch (err: any) {
      throw err?.message.split(":")[1] || err?.message
    }
  }

  async create(query: SqlQuery) {
    return this.internalQuery(query)
  }

  async read(query: SqlQuery) {
    const [job] = await this.internalQuery(query)
    const [rows] = await job.getQueryResults()
    return rows
  }

  async update(query: SqlQuery) {
    return this.internalQuery(query)
  }

  async delete(query: SqlQuery) {
    return this.internalQuery(query)
  }

  async buildSchema(datasourceId: string, entities: Record<string, Table>) {
    // fetch all existing tables

    const dataset = this.client.dataset(this.datasetId)
    const tables = await dataset.getTables()
    console.log(tables)
  }
}

export default {
  schema: SCHEMA,
  integration: BigQueryIntegration,
}
