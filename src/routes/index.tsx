import React, { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import LayoutComponent from '@/pages/Layout';
import NoMatch from '@/pages/NoMatch';


const Home = lazy(() => import('@/pages/Home'));

/** 懒加载渲染方法 */
const lazyLoadingRenderer = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>Loading...</div>}>{comp}</React.Suspense>
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutComponent />,
    children: [
      {
        index: true,
        element: lazyLoadingRenderer(<Home />),
      },
      {
        path: 'home',
        element: lazyLoadingRenderer(<Home />),
      },
      { path: '*', element: <NoMatch /> },
    ],
  },
];

export default routes;
