import {
  UserRolePermissionModel
} from '/@/api/sys/model/systemModel';

export const useReportUtils = () => {
  // check read permission for power bi
  const checkReadPermission = (permissionResult: UserRolePermissionModel[], currentPagePermissionId: number): boolean => {
    return permissionResult[0].data.find(({ read }) => {
      return read.permissionId === currentPagePermissionId && read.status === 1;
    }) ? true : false;
  };

  return {
    checkReadPermission,
  }
};
