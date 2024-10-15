import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  perspective: 'published',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_USER_ADDER_TOKEN // Set to false if statically generating pages, using ISR or tag-based revalidation
})