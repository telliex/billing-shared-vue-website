import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess } from '../_util';

// const accountList = (() => {
//   const result: any[] = [];
//   for (let index = 0; index < 20; index++) {
//     result.push({
//       id: `${index}`,
//       account: '@first',
//       email: '@email',
//       nickname: '@name()',
//       role: '@first',
//       createTime: '@datetime',
//       remark: '@word(10,20)',
//       'status|1': ['0', '1'],
//     });
//   }
//   return result;
// })();

// 角色 list
const roleList = (() => {
  let result: any[] = [];
  result = [
    {
      id: 1,
      orderNo: 1,
      roleName: 'Admin',
      roleValue: 'super',
      createTime: '2022-12-31 00:00:00',
      remark: 'Admin',
      menu: ['0', '1', '2'],
      status: '1',
    },
    {
      id: 2,
      orderNo: 2,
      roleName: 'Operation',
      roleValue: 'op',
      createTime: '2022-12-31 00:00:00',
      remark: 'Operation',
      menu: ['0', '1', '2'],
      status: '1',
    },
    {
      id: 3,
      orderNo: 3,
      roleName: 'Test',
      roleValue: 'test',
      createTime: '2022-12-31 00:00:00',
      remark: 'Test',
      menu: ['0', '1', '2'],
      status: '1',
    },

    {
      id: 4,
      orderNo: 4,
      roleName: 'Developer',
      roleValue: 'developer',
      createTime: '2022-12-31 00:00:00',
      remark: 'Developer',
      menu: ['0', '1', '2'],
      status: '1',
    },
    {
      id: 5,
      orderNo: 5,
      roleName: 'Sales',
      roleValue: 'sales',
      createTime: '2022-12-31 00:00:00',
      remark: 'Sales',
      menu: ['0', '1', '2'],
      status: '1',
    },
    {
      id: 6,
      orderNo: 6,
      roleName: 'Accountant',
      roleValue: 'accountant',
      createTime: '2022-12-31 00:00:00',
      remark: 'Accountant',
      menu: ['1', '2'],
      status: '1',
    },
    {
      id: 7,
      orderNo: 7,
      roleName: 'Bu',
      roleValue: 'bu',
      createTime: '2022-12-31 00:00:00',
      remark: 'BU',
      menu: ['1', '2'],
      status: '1',
    },
  ];
  // for (let index = 0; index < 4; index++) {
  //   result.push({
  //     id: index + 1,
  //     orderNo: `${index + 1}`,
  //     roleName: ['超級管理員', '管理員', '文章管理員', '普通用戶'][index],
  //     roleValue: '@first',
  //     createTime: '@datetime',
  //     remark: '@word(10,20)',
  //     menu: [['0', '1', '2'], ['0', '1'], ['0', '2'], ['2']][index],
  //     'status|1': ['0', '1'],
  //   });
  // }
  return result;
})();

// const deptList = (() => {
//   const result: any[] = [];
//   for (let index = 0; index < 3; index++) {
//     result.push({
//       id: `${index}`,
//       deptName: ['ECV', 'ECR', 'CN'][index],
//       orderNo: index + 1,
//       createTime: '@datetime',
//       remark: '@word(10,20)',
//       'status|1': ['0', '0', '1'],
//       children: (() => {
//         const children: any[] = [];
//         for (let j = 0; j < 4; j++) {
//           children.push({
//             id: `${index}-${j}`,
//             deptName: ['研發部', '市場部', '商務部', '財務部'][j],
//             orderNo: j + 1,
//             createTime: '@datetime',
//             remark: '@word(10,20)',
//             'status|1': ['0', '1'],
//             parentDept: `${index}`,
//             children: undefined,
//           });
//         }
//         return children;
//       })(),
//     });
//   }
//   return result;
// })();
// 選單
const menuList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 3; index++) {
    result.push({
      id: `${index}`,
      icon: ['ion:layers-outline', 'ion:git-compare-outline', 'ion:tv-outline'][index],
      component: 'LAYOUT',
      type: 'catalog',
      description: 'This is catalog description',
      menuName: ['Dashboard', '權限管理', '功能'][index],
      permission: '',
      orderNo: index + 1,
      createTime: '@datetime',
      'status|1': ['normal', 'stop'],
      children: (() => {
        const children: any[] = [];
        for (let j = 0; j < 4; j++) {
          children.push({
            id: `${index}-${j}`,
            type: 'page',
            menuName: ['選單1', '選單2', '選單3', '選單4'][j],
            description: 'This is page description',
            icon: 'ion:document',
            permission: ['menu1:view', 'menu2:add', 'menu3:update', 'menu4:del'][index],
            componentName: [
              'name:/dashboard/welcome/index',
              'name:/dashboard/analysis/index',
              'name:/dashboard/workbench/index',
              'name:/dashboard/test/index',
            ][j],
            component: [
              '/dashboard/welcome/index',
              '/dashboard/analysis/index',
              '/dashboard/workbench/index',
              '/dashboard/test/index',
            ][j],
            orderNo: j + 1,
            createTime: '@datetime',
            'status|1': ['normal', 'stop'],
            parentMenu: `${index}`,
            children: (() => {
              const children: any[] = [];
              for (let k = 0; k < 4; k++) {
                children.push({
                  id: `${index}-${j}-${k}`,
                  type: 'button',
                  menuName: '按鈕' + (j + 1) + '-' + (k + 1),
                  description: 'This is button description',
                  icon: '',
                  permission:
                    ['menu1:view', 'menu2:add', 'menu3:update', 'menu4:del'][index] +
                    ':btn' +
                    (k + 1),
                  componentName: [
                    'neme:/dashboard/welcome/index',
                    'neme:/dashboard/analysis/index',
                    'neme:/dashboard/workbench/index',
                    'neme:/dashboard/test/index',
                  ][j],
                  component: [
                    '/dashboard/welcome/index',
                    '/dashboard/analysis/index',
                    '/dashboard/workbench/index',
                    '/dashboard/test/index',
                  ][j],
                  orderNo: j + 1,
                  createTime: '@datetime',
                  'status|1': ['normal', 'stop'],
                  parentMenu: `${index}-${j}`,
                  children: undefined,
                });
              }
              return children;
            })(),
          });
        }
        return children;
      })(),
    });
  }
  return result;
})();

export default [
  // {
  //   url: '/basic-api/system/getAccountList',
  //   timeout: 100,
  //   method: 'get',
  //   response: ({ query }) => {
  //     const { page = 1, pageSize = 20 } = query;
  //     return resultPageSuccess(page, pageSize, accountList);
  //   },
  // },
  // {
  //   url: '/basic-api/system/getRoleListByPage',
  //   timeout: 100,
  //   method: 'get',
  //   response: ({ query }) => {
  //     const { page = 1, pageSize = 20 } = query;
  //     return resultPageSuccess(page, pageSize, roleList);
  //   },
  // },
  {
    url: '/basic-api/system/setRoleStatus',
    timeout: 500,
    method: 'post',
    response: ({ query }) => {
      const { id, status } = query;
      return resultSuccess({ id, status });
    },
  },
  // {
  //   url: '/basic-api/system/getAllRoleList',
  //   timeout: 100,
  //   method: 'get',
  //   response: () => {
  //     return resultSuccess(roleList);
  //   },
  // },
  // {
  //   url: '/basic-api/system/getDeptList',
  //   timeout: 100,
  //   method: 'get',
  //   response: () => {
  //     return resultSuccess(deptList);
  //   },
  // },

  {
    url: '/basic-api/system/accountExist',
    timeout: 500,
    method: 'post',
    response: ({ body }) => {
      const { account } = body || {};
      if (account && account.indexOf('admin') !== -1) {
        return resultError('該字段不能包含admin');
      } else {
        return resultSuccess(`${account} can use`);
      }
    },
  },
] as MockMethod[];
