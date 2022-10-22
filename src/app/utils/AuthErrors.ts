const generateAuthError = (message: string) => {
  switch (message) {
    case 'EMAIL_EXISTS':
      return 'کاربر با این ایمیل از قبل وجود دارد';
    case 'USER_DISABLED':
      return 'حساب کاربری توسط مدیر غیرفعال شده است.';
    case 'EMAIL_NOT_FOUND':
    case 'INVALID_PASSWORD':
    case 'INVALID_EMAIL':
      return 'ایمیل یا رمز عبور نامعتبر است';
    default:
      return 'مشکلی وجود دارد. لطفاً بعدا دوباره امتحان کنید';
  }
};

export default generateAuthError;
