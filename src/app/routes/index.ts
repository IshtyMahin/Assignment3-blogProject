/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { AdminRoutes } from '../modules/admin/admin.route';

const router = Router();

const moduleRoutes: any[] = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
