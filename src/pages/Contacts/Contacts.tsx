import { FC } from 'react';
import { NavMap } from '../../components/NavMap';
import { PageTitle } from '../../components/PageTitle';
import { Styles } from '../../types/Styles';

const styles: Styles = require('./Contacts.module.scss');

const {
  FavoritesPage: page,
  FavoritesPage__title: title,
  Contacts__NavMap: navMap,
} = styles.default;

export const Contacts: FC = () => {
  return (
    <main className={page}>
      <NavMap
        className={navMap}
        navItems={['Контакти']}
      />

      <PageTitle
        className={title}
      >
        Контакти
      </PageTitle>

      <table>
          <p className="contacts__column">
            Україна. Київ
          </p>
          <p className="contacts__column">
            support.tech_iphones_s@gmail.com
          </p>
          <p className="contacts__column">
            +380653257890,
            +380667788008
          </p>
          <p className="contacts__column">
            Підтримка доступна з понеділка по п&#39;ятницю з 8:00 до 19:00
          </p>
        </table>
    </main>
  );
};
