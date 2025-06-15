import {  Response, NextFunction } from 'express';
import { RequestWithPayload } from './payload';
import { PermissionsEnum } from '../domain/enums/PermissionsEnum';

export function authorizePermissions(...allowedPermissions: PermissionsEnum[]) {
  return (req: RequestWithPayload, res: Response, next: NextFunction) => {
    const userPermissions = req.payload.usuario.permissions?.map(permission => permission.id) || [];

    const hasAccess = userPermissions.some(permissionId => allowedPermissions.includes(permissionId));

    if (!hasAccess) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    next();
  };
}
