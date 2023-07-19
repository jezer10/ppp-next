import { siteConfig } from '@/config/site';
import { type MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    '',
    '/dashboard/documents',
    '/dashboard/requests',
    '/dashboard/settings',
    '/dashboard/students',
    '/dashboard/supervisors',
    '/dashboard/tests',
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
  }));
  return [...routes];
}
