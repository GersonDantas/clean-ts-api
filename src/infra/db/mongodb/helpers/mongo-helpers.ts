import { type Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient | null, // para o javascript não conflitar com o typescript
  url: null as string | null,

  async connect (url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url)
  },

  async disconnect (): Promise<void> {
    await this.client?.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.url)
    }

    return this.client.db().collection(name)
  }
}
