const translations = (message: string) => {
    switch (message) {
        case 'booking':
            return 'رزروها';
        case 'dashboard':
            return 'داشبورد';
        case 'likes':
            return 'علاقه مندی ها';
        case 'favorites':
            return 'ذخیره شده ها';
        case 'edit':
            return 'ویرایش';

        default:
            return '';
    }
};

export default translations;
