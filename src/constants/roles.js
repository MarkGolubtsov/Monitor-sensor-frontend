const roles = {
    admin: 'ROLE_ADMIN',
    viewer: 'ROLE_VIEWER',
}

export const isAdmin = user => user && user.role === roles.admin;

export const isViewer = user => user && (user.role === roles.viewer || user.role === roles.admin);
