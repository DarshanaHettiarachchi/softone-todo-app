import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const encoded = btoa('new@new.com' + ':' + 'password');
  sessionStorage.setItem('authToken', 'Basic ' + encoded);
  const token = sessionStorage.getItem('authToken');

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: token,
    },
  });

  return next(authReq);
};
