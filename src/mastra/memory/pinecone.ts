
import { PineconeVector } from '@mastra/pinecone';
import {createGeminiEmbeddingModel} from '../config/googleProvider';
import type { MastraVector } from '@mastra/core';
import { PinoLogger } from '@mastra/loggers';


const logger = new PinoLogger({
  level: 'info',
  name: 'pinecone',
});

logger.info('Initializing Pinecone vector store...');




/**
 * @const {MastraVector<VectorFilter>} pinecone
 * @description The PineconeVector instance cast to MastraVector<VectorFilter> for Memory compatibility.
 */
export const pinecone: MastraVector = new PineconeVector({
  apiKey: process.env.PINECONE_API_KEY || '',
}) as MastraVector;

// Duplicate pinecone declaration removed; using the MastraVector export above.

async function initializePinecone() {
  await pinecone.createIndex({
    indexName: "training",
    metric: "cosine",
    dimension: 768,
  });

  // Example: Define chunks as an array of objects with 'text' and 'id' properties
  const chunks = [
    { 
      id: '1', 
      text: 'Example text 1',
      source: 'source1',
      category: 'category1',
      language: 'en',
      author: 'author1',
      score: 0.95
    },
    { 
      id: '2', 
      text: 'Example text 2',
      source: 'source2',
      category: 'category2',
      language: 'en',
      author: 'author2',
      score: 0.92
    },
    // Add more chunks as needed
  ];

  // Define embedMany here if not exported from googleProvider
  async function embedMany({ model, values }: { model: ReturnType<typeof createGeminiEmbeddingModel>, values: string[] }) {
    // Assuming model.doEmbed exists and returns { embeddings: number[][] }
    return await model.doEmbed({ values });
  }

  const embedder = createGeminiEmbeddingModel();
  const { embeddings: vectors } = await embedMany({
    model: embedder,
    values: chunks.map(chunk => chunk.text)
  });

  // Store embeddings with their corresponding metadata
  await pinecone.upsert({
    indexName: "pineconeIndex",
    vectors,
    metadata: chunks.map((chunk) => ({
      text: chunk.text,
      id: chunk.id,
    })),
  });

  // Store embeddings with rich metadata for better organization and filtering
  await pinecone.upsert({
    indexName: "training",
    vectors,
    metadata: chunks.map((chunk) => ({
      text: chunk.text,
      id: chunk.id,
      source: chunk.source,
      category: chunk.category,
      createdAt: new Date().toISOString(),
      version: "1.0",
      language: chunk.language,
      author: chunk.author,
      confidenceScore: chunk.score,
    })),
  });
}

initializePinecone().catch((error) => {
  console.error("Failed to initialize Pinecone vector store:", error);
});