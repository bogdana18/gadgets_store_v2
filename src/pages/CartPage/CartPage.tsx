import {
  FC, useContext,
} from 'react';
import cn from 'classnames';
import { CartContext } from '../../contexts/CartContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ProductsList } from '../../components/ProductsList';
import { NavigationLink } from '../../components/NavigationLink';
import { PageTitle } from '../../components/PageTitle';
import { Styles } from '../../types/Styles';
import { ErrorMessage } from '../../components/ErrorMessage';
import { ErrorText } from '../../types/ErrorText';

const styles: Styles = require('./CartPage.module.scss');

const {
  CartPage: page,
  CartPage__title: title,
  CartPage__content: content,
  CartPage__ProductsList: productsList,
  CartPage__total: total,
  'CartPage__total--dark': totalDark,
  'CartPage__total-price': priceTotal,
  CartPage__NavigationLink: navLink,
  'CartPage__total-description': totalDescription,
  'CartPage__total-description--dark': totalDescriptionDark,
  CartPage__ErrorMessage: error,
} = styles.default;

export const CartPage: FC = () => {
  const { cart, totalPrice, totalItems } = useContext(CartContext);
  const { isThemeDark } = useContext(ThemeContext);
  const cartItems = cart.map(({ product }) => product);

  return (
    <main className={page}>
      <NavigationLink
        className={navLink}
        direction="left"
        to="../"
      >
        Назад
      </NavigationLink>

      <PageTitle className={title}>
        Кошик
      </PageTitle>

      {cart.length
        ? (
          <div className={content}>
            <ProductsList
              className={productsList}
              products={cartItems}
              modifier="cart"
            />

            <div className={cn(
              total,
              { [totalDark]: isThemeDark },
            )}
            >
              <div className={priceTotal}>
                {`₴${totalPrice * 37}`}
              </div>

              <div className={cn(
                totalDescription,
                { [totalDescriptionDark]: isThemeDark },
              )}
              >
                {`Разом за ${totalItems} товарів`}
              </div>

              <PrimaryButton
                selected={false}
                onClick={() => {}}
              >
                <a
                rel="nofollow"
                href="https://secure.wayforpay.com/button/bb57d41aacb78"
                type="button"
                className="cart__button button  pay__link"
                >
                  Оплатити
                </a>
              </PrimaryButton>
            </div>
          </div>
        ) : (
          <ErrorMessage
            className={error}
            message={ErrorText.EmptyCart}
            isBig
          />
        )}
    </main>
  );
};
