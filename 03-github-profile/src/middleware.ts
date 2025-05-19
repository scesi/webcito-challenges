import type { MiddlewareHandler } from 'astro';

type Path = string;
interface ICachedResponse {
  response: Response;
  expires: number;
}

const cache = new Map<Path, ICachedResponse>();

export const onRequest: MiddlewareHandler = async (req, next) => {
  console.log('[Middleware] onRequest', req.url.pathname);

  const ttl = 31536000000;
  console.log(`[Middleware] Cache TTL: ${ttl} seconds`);

  const cached = cache.get(req.url.pathname);

  if (cached && cached.expires > Date.now()) {
    console.log(cached.response);

    return cached.response.clone();
  } else if (cached) {
    cache.delete(req.url.pathname);
  }

  const response = await next();

  if (response.status >= 400) {
    return response;
  }

  cache.set(req.url.pathname, {
    response: response.clone(),
    expires: Date.now() + ttl * Infinity,
  });

  return response;
};
