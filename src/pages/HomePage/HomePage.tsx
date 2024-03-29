import { FC, Suspense } from 'react';
import {
  Await,
  useLoaderData,
} from 'react-router-dom';
import { Banner } from '../../components/Banner';
import { Categories } from '../../components/Categories/Categories';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Loader } from '../../components/Loader/Loader';
import { Proposal } from '../../components/Proposal';
import { ErrorText } from '../../types/ErrorText';
import { Product } from '../../types/Product';
import { Styles } from '../../types/Styles';

const styles: Styles = require('./HomePage.module.scss');

const {
  HomePage: page,
  HomePage__Banner: banner,
  HomePage__Loader: loader,
  HomePage__section: section,
  HomePage__ErrorMessage: error,
} = styles.default;

type LoaderData = {
  newProducts: Product[];
  cheapProducts: Product[];
  phones: number;
  tablets: number;
  accessories: number;
};

export const HomePage: FC = () => {
  const {
    newProducts,
    cheapProducts,
    phones,
    tablets,
    accessories,
  } = useLoaderData() as LoaderData;

  return (
    <main className={page}>
      <Banner className={banner} />

      <Suspense
        fallback={<Loader className={loader} />}
      >
        <Await
          resolve={newProducts}
          errorElement={(
            <ErrorMessage
              message={ErrorText.Unexpected}
              warn
              isBig
              className={error}
            />
          )}
        >
          <Proposal className={section}>
            Нові моделі
          </Proposal>
        </Await>

        <Await
          resolve={Promise.all([phones, tablets, accessories])}
          errorElement={<></>}
        >
          <Categories
            className={section}
          />
        </Await>

        <Await
          resolve={cheapProducts}
          errorElement={<></>}
        >
          <Proposal className={section}>
            Гарячі ціни
          </Proposal>
        </Await>
      </Suspense>
    </main>
  );
};
