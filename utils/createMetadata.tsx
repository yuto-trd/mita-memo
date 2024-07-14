import type { Metadata } from 'next';

export default function createMetadata(title: string, url: string): Metadata {
  return {
    title: title,
    openGraph: {
      title: title,
      url: url,
    },
    twitter: {
      title: title,
    },
  };
}
