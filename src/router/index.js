import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    // 首页
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/user/list'),
            meta: {
                title: '首页',
                icon: 'dashboard'
            }
        }]
    },
    // 用户管理
    {
        path: '/user',
        component: Layout,
        redirect: '/user/list',
        children: [{
            path: 'userlist',
            name: 'Userlist',
            component: () =>
                import ('@/views/user/list'),
            meta: {
                title: '用户管理',
                icon: 'dashboard'
            }
        }]
    },
    // 轮播图
    {
        path: '/system',
        component: Layout,
        redirect: '/system/msg',
        meta: {
            title: '轮播图',
            icon: 'tree'
        },
        children: [{
            path: 'flashView',
            component: () =>
                import ('@/views/flashView/list'),
            meta: {
                title: '轮播图',
                icon: 'dashboard'
            }
        }]
    },
    // 团队管理
    {
        path: '/team',
        component: Layout,
        redirect: '/team/list',
        children: [{
            path: 'teamlist',
            name: 'Teamlist',
            component: () =>
                import ('@/views/team/list'),
            meta: {
                title: '团队管理',
                icon: 'dashboard'
            }
        }]
    },
    // 投诉管理
    {
        path: '/complaint',
        component: Layout,
        redirect: '/complaint/list',
        children: [{
            path: 'complaintlist',
            name: 'Complaintlist',
            component: () =>
                import ('@/views/complaint/list'),
            meta: {
                title: '投诉管理',
                icon: 'dashboard'
            }
        }]
    },
    // 升级审核表
    {
        path: '/apply',
        component: Layout,
        redirect: '/apply/list',
        children: [{
            path: 'applylist',
            name: 'Applylist',
            component: () =>
                import ('@/views/apply/list'),
            meta: {
                title: '升级审核',
                icon: 'dashboard'
            }
        }]
    },
    // 升级订单表
    {
        path: '/order',
        component: Layout,
        redirect: '/order/list',
        children: [{
            path: 'orderlist',
            name: 'Orderlist',
            component: () =>
                import ('@/views/order/list'),
            meta: {
                title: '升级订单',
                icon: 'dashboard'
            }
        }]
    },
    // 例子模板
    {
        path: '/example',
        component: Layout,
        redirect: '/example/table',
        name: 'Example',
        meta: {
            title: 'Example',
            icon: 'example'
        },
        children: [{
                path: 'table',
                name: 'Table',
                component: () =>
                    import ('@/views/table/index'),
                meta: {
                    title: 'Table',
                    icon: 'table'
                }
            },
            {
                path: 'tree',
                name: 'Tree',
                component: () =>
                    import ('@/views/tree/index'),
                meta: {
                    title: 'Tree',
                    icon: 'tree'
                }
            }
        ]
    },

    {
        path: '/form',
        component: Layout,
        children: [{
            path: 'index',
            name: 'Form',
            component: () =>
                import ('@/views/form/index'),
            meta: {
                title: 'Form',
                icon: 'form'
            }
        }]
    },

    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: 'Nested',
            icon: 'nested'
        },
        children: [{
                path: 'menu1',
                component: () =>
                    import ('@/views/nested/menu1/index'), // Parent router-view
                name: 'Menu1',
                meta: {
                    title: 'Menu1'
                },
                children: [{
                        path: 'menu1-1',
                        component: () =>
                            import ('@/views/nested/menu1/menu1-1'),
                        name: 'Menu1-1',
                        meta: {
                            title: 'Menu1-1'
                        }
                    },
                    {
                        path: 'menu1-2',
                        component: () =>
                            import ('@/views/nested/menu1/menu1-2'),
                        name: 'Menu1-2',
                        meta: {
                            title: 'Menu1-2'
                        },
                        children: [{
                                path: 'menu1-2-1',
                                component: () =>
                                    import ('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                name: 'Menu1-2-1',
                                meta: {
                                    title: 'Menu1-2-1'
                                }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () =>
                                    import ('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                name: 'Menu1-2-2',
                                meta: {
                                    title: 'Menu1-2-2'
                                }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () =>
                            import ('@/views/nested/menu1/menu1-3'),
                        name: 'Menu1-3',
                        meta: {
                            title: 'Menu1-3'
                        }
                    }
                ]
            },
            {
                path: 'menu2',
                component: () =>
                    import ('@/views/nested/menu2/index'),
                meta: {
                    title: 'menu2'
                }
            }
        ]
    },

    {
        path: 'external-link',
        component: Layout,
        children: [{
            path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
            meta: {
                title: 'External Link',
                icon: 'link'
            }
        }]
    },

    // 404 page must be placed at the end !!!
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router