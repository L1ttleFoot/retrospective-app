import {TextLink} from '@ui/TextLink/TextLink';

export const ForbidenPage = () => {
    return (
        <div>
            <h1>403 - Forbidden</h1>
            <p>У вас нет доступа к этой странице.</p>
            <TextLink to={'/'}>На основную страницу</TextLink>
        </div>
    );
};
